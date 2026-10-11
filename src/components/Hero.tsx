import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import Particles from "./Particles";
import { GoldButton } from "./ui";
import { BUSINESS, TEL_HREF, waLink } from "../lib/whatsapp";
import { EASE } from "../lib/motion";
import { WhatsAppIcon } from "./icons";

/* ============================ MOBILE ============================ */
const SLIDES = [
  { src: "/images/hero.webp", label: "Weddings" },
  { src: "/images/gallery-01.webp", label: "Receptions" },
  { src: "/images/gallery-03.webp", label: "Festive Stages" },
  { src: "/images/gallery-05.webp", label: "Cocktail Evenings" },
  { src: "/images/gallery-08.webp", label: "Ceremonies" },
];

function MobileHero() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % SLIDES.length);

  useEffect(() => {
    const t = window.setInterval(next, 5200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden lg:hidden">
      {/* image carousel */}
      <div className="absolute inset-0" onClick={next} role="presentation">
        <AnimatePresence initial={false}>
          <motion.img
            key={SLIDES[i].src}
            src={SLIDES[i].src}
            alt={`BMS Tent House ${SLIDES[i].label} setup in Bangalore`}
            initial={{ opacity: 0, scale: 1.09 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: EASE },
              scale: { duration: 6, ease: "linear" },
            }}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/40" />
      </div>

      {/* brand mark — the top header is hidden on mobile */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2.5 px-5 pt-6">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold/40 bg-black/25 backdrop-blur">
          <svg viewBox="0 0 64 64" className="h-4 w-4" aria-hidden>
            <g fill="none" stroke="#E7CE8B" strokeLinejoin="round" strokeLinecap="round">
              <path d="M32 10 54 46H10L32 10Z" strokeWidth="4" />
              <path d="M32 10v36" strokeWidth="2.6" />
            </g>
          </svg>
        </span>
        <span className="font-display text-base font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          BMS <span className="text-gold-light">Tent House</span>
        </span>
      </div>

      {/* content over the images */}
      <div className="relative z-10 px-5 pb-28 pt-16">
        <motion.span
          key={SLIDES[i].label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-gold-light backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {SLIDES[i].label}
        </motion.span>

        <h1 className="mt-5 font-display text-[clamp(2.4rem,11vw,3.4rem)] font-semibold leading-[1.0] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          Elevate Every
          <br />
          <span className="italic text-gold-light">Occasion</span>
        </h1>

        <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-relaxed text-white/85">
          Premium tents, canopies &amp; chairs — delivered, set up &amp; styled
          across Bangalore.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <GoldButton
            href={waLink()}
            external
            className="w-full"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Get Instant Quote
          </GoldButton>
          <motion.a
            href={TEL_HREF}
            whileTap={{ scale: 0.97 }}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur"
          >
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phoneDisplay}
          </motion.a>
        </div>

        {/* slide dots */}
        <div className="mt-6 flex items-center gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show ${s.label}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === i ? "w-7 bg-gold" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ DESKTOP ============================ */
function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden py-[0.06em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Float({
  children,
  className = "",
  delay = 0,
  duration = 6,
  amp = 12,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amp?: number;
}) {
  return (
    <motion.div
      className={`will-change-transform ${className}`}
      animate={{ y: [0, -amp, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function DesktopHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative hidden min-h-[100svh] items-center overflow-hidden pt-28 pb-32 lg:flex lg:pt-32 lg:pb-20"
    >
      {/* ---- background layers ---- */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_-10%,#ffffff_0%,#f7f4ec_45%,#efe8d9_100%)]" />
      <div className="aura left-[-10%] top-[8%] h-[42vw] w-[42vw] max-h-[560px] max-w-[560px] text-gold/30" />
      <div className="aura right-[-8%] top-[30%] h-[38vw] w-[38vw] max-h-[520px] max-w-[520px] text-[#c41e3a]/14" />
      <div className="aura bottom-[-12%] left-[30%] h-[30vw] w-[30vw] max-h-[420px] max-w-[420px] text-[#16294b]/16" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,21,15,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(23,21,15,0.5) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />
      <Particles count={12} seed={11} />

      {/* ---- content ---- */}
      <div className="container-x relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.04fr] lg:gap-10">
          {/* text column */}
          <motion.div style={{ y: yText, opacity: fade }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-black/[0.04] px-4 py-2 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-soft">
                Tent · Canopy · Chair Rentals
              </span>
            </motion.div>

            <h1 className="mt-7 font-display text-[clamp(2.7rem,9vw,5.4rem)] font-semibold leading-[0.97] tracking-tight text-cream">
              <MaskLine delay={0.25}>Elevate Every</MaskLine>
              <MaskLine delay={0.38}>
                <span className="italic text-gold">Occasion</span>
              </MaskLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-cream-dim sm:text-lg"
            >
              Premium tents, canopies &amp; chairs — delivered, set up and styled
              across Bangalore for weddings, corporate events &amp; celebrations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <GoldButton
                href={waLink()}
                external
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Get Instant Quote
              </GoldButton>
              <a
                href={TEL_HREF}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-black/12 bg-black/[0.035] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-cream backdrop-blur transition-colors hover:border-gold/60 hover:text-gold-soft"
              >
                <Phone className="h-4 w-4" />
                Call {BUSINESS.phoneDisplay}
              </a>
            </motion.div>

            {/* trust row */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
              className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              {[
                { icon: <Star className="h-4 w-4 fill-gold text-gold" />, top: "4.9 / 5", sub: "Client rating" },
                { icon: <Truck className="h-4 w-4 text-gold" />, top: "Same-day", sub: "Delivery & setup" },
                { icon: <ShieldCheck className="h-4 w-4 text-gold" />, top: "500+", sub: "Events styled" },
              ].map((s) => (
                <div key={s.sub} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-black/[0.04]">
                    {s.icon}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold text-cream">{s.top}</span>
                    <span className="block text-xs text-cream-dim/80">{s.sub}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* visual column */}
          <motion.div
            style={{ y: yVisual }}
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="absolute inset-0 grid place-items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
                className="h-[93%] w-[93%] rounded-full border border-dashed border-gold/25"
              />
            </div>
            <div className="aura left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 text-gold/25" />

            <Float duration={7.5} amp={14}>
              <div className="glass relative overflow-hidden rounded-[2rem] p-2.5 shadow-[0_40px_90px_-40px_rgba(80,66,32,0.5)] sm:p-3">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/images/hero.webp"
                    alt="White canopy tent with draped valance and rows of gold Tiffany chairs arranged on a lawn for an outdoor wedding reception"
                    width={2000}
                    height={1116}
                    className="h-full w-full scale-[1.02] object-cover"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>
            </Float>

            {/* floating chips */}
            <Float duration={6} delay={0.4} className="absolute -left-3 top-10 sm:-left-6">
              <div className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/15 text-gold">
                  <Star className="h-4 w-4 fill-gold" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-cream">10×10 Canopy</span>
                  <span className="block text-xs text-gold-soft">₹1,500 / day</span>
                </span>
              </div>
            </Float>

            <Float duration={6.6} delay={1.1} className="absolute -right-2 bottom-16 sm:-right-6">
              <div className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#25D366]/15 text-[#1faa52]">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-cream">Tiffany Chairs</span>
                  <span className="block text-xs text-gold-soft">₹100 / day</span>
                </span>
              </div>
            </Float>

            <Float duration={5.4} delay={0.8} amp={9} className="absolute right-4 top-3 sm:right-2">
              <div className="glass-dark rounded-2xl px-3.5 py-2 shadow-xl">
                <span className="text-xs font-semibold text-cream">
                  4.9 <span className="text-gold">★</span> · 500+ events
                </span>
              </div>
            </Float>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#products"
        aria-label="Scroll to products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-cream-dim/70">
          Scroll
        </span>
        <span className="relative h-10 w-[1px] overflow-hidden bg-black/15">
          <motion.span
            className="absolute left-0 top-0 h-3 w-full bg-gold"
            animate={{ y: [-12, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

export default function Hero() {
  return (
    <div id="home" className="scroll-mt-24">
      <MobileHero />
      <DesktopHero />
    </div>
  );
}
