import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";

/* ------------------------- MAGNETIC HOOK ------------------------- */
/** Subtly pulls an element toward the cursor (desktop only, no-op on touch). */
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return { ref, style: { x, y }, onMouseMove, onMouseLeave };
}

/* ------------------------- BUTTONS ------------------------- */
type BtnProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export function GoldButton({
  href,
  children,
  icon,
  className = "",
  external,
  ariaLabel,
}: BtnProps) {
  const mag = useMagnetic(0.28);
  return (
    <motion.a
      ref={mag.ref}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      style={mag.style}
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className={`sheen group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[0_10px_30px_-8px_rgba(201,168,76,0.65)] ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </motion.a>
  );
}

export function GhostButton({
  href,
  children,
  icon,
  className = "",
  external,
  ariaLabel,
}: BtnProps) {
  const mag = useMagnetic(0.28);
  return (
    <motion.a
      ref={mag.ref}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      style={mag.style}
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full border border-black/12 bg-black/[0.035] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-cream backdrop-blur transition-colors hover:border-gold/60 hover:text-gold-soft ${className}`}
    >
      {icon}
      <span>{children}</span>
    </motion.a>
  );
}

/* ------------------------- COUNTER ------------------------- */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------- TILT ------------------------- */
export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 160,
    damping: 18,
  });

  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(360px circle at ${gx}% ${gy}%, rgba(201,168,76,0.22), transparent 60%)`
  );

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  );
}
