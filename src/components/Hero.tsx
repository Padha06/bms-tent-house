import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import Particles from "./Particles";
import { GoldButton, GhostButton } from "./ui";
import { BUSINESS, TEL_HREF, waLink } from "../lib/whatsapp";
import { EASE } from "../lib/motion";
import { WhatsAppIcon } from "./icons";

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

export default function Hero() {
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
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-32 lg:pt-32 lg:pb-20"
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
              {/* Premium tents, canopies & chairs — delivered, */}
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
              <GhostButton
                href={TEL_HREF}
                icon={<Phone className="h-4 w-4" />}
              >
                Call {BUSINESS.phoneDisplay}
              </GhostButton>
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
            <Float
              duration={6}
              delay={0.4}
              className="absolute -left-3 top-10 sm:-left-6"
            >
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

            <Float
              duration={6.6}
              delay={1.1}
              className="absolute -right-2 bottom-16 sm:-right-6"
            >
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

            <Float
              duration={5.4}
              delay={0.8}
              amp={9}
              className="absolute right-4 top-3 sm:right-2"
            >
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
        className="absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:bottom-8 lg:flex"
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
