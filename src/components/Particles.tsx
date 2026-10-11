import { useMemo } from "react";
import { motion } from "framer-motion";

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Particles({
  count = 16,
  className = "",
  seed = 7,
}: {
  count?: number;
  className?: string;
  seed?: number;
}) {
  const dots = useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      left: rnd() * 100,
      top: 20 + rnd() * 80,
      size: 2 + rnd() * 5,
      delay: rnd() * 6,
      duration: 9 + rnd() * 12,
      drift: (rnd() - 0.5) * 70,
      opacity: 0.12 + rnd() * 0.5,
      gold: rnd() > 0.35,
    }));
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.gold ? "#c9a84c" : "#b9932f",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, d.opacity, 0],
            y: [0, -(120 + d.drift), 0],
            x: [0, d.drift, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
