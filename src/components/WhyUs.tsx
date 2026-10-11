import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Truck, BadgeCheck, Wallet, PartyPopper } from "lucide-react";
import { SectionHeading, Reveal } from "./Reveal";
import { Counter } from "./ui";

const FEATURES = [
  {
    Icon: Truck,
    title: "Fast Delivery",
    text: "Same-day dispatch across Bangalore. We arrive on time, set up quickly, and never keep your guests waiting.",
  },
  {
    Icon: BadgeCheck,
    title: "Premium Quality",
    text: "Clean, well-maintained tents and chairs that photograph beautifully and hold up through the whole event.",
  },
  {
    Icon: Wallet,
    title: "Honest Pricing",
    text: "Clear per-day rates with no hidden charges. Pay for exactly what you need — nothing more.",
  },
  {
    Icon: PartyPopper,
    title: "Professional Setup",
    text: "An experienced team handles the layout, levelling and styling so your venue looks effortless.",
  },
] as const;

type Feature = (typeof FEATURES)[number];

const STATS: { to: number; decimals?: number; suffix?: string; label: string }[] = [
  { to: 500, suffix: "+", label: "Events styled" },
  { to: 4.9, decimals: 1, suffix: "★", label: "Client rating" },
  { to: 24, suffix: " hr", label: "Booking turnaround" },
  { to: 100, suffix: "%", label: "Setup included" },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const { Icon, title, text } = feature;
  return (
    <div className="group relative flex min-h-[40vh] flex-col justify-center overflow-hidden rounded-[1.75rem] glass p-7 sm:min-h-[42vh] sm:p-10">
      <span className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-black/5 transition-all duration-500 group-hover:ring-gold/40" />
      <span className="pointer-events-none absolute right-6 top-5 font-display text-6xl font-semibold leading-none text-black/[0.06] sm:text-7xl">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/20 to-transparent text-gold sm:h-16 sm:w-16">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.9} />
      </span>
      <h3 className="relative mt-6 font-display text-2xl font-semibold text-cream sm:text-3xl">
        {title}
      </h3>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-cream-dim sm:text-base">
        {text}
      </p>
    </div>
  );
}

function StackCard({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const start = index / total;
  const end = Math.min(1, (index + 1) / total);
  const target = index === total - 1 ? 1 : 0.93;
  const scale = useTransform(progress, [start, end], [1, target]);

  return (
    <div
      className="sticky flex min-h-[54vh] items-start sm:min-h-[56vh]"
      style={{ top: `calc(5rem + ${index}rem)` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full origin-top rounded-[1.75rem] bg-white shadow-[0_30px_70px_-45px_rgba(60,50,25,0.6)] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

function FeatureStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
      {FEATURES.map((f, i) => (
        <StackCard key={f.title} index={i} total={FEATURES.length} progress={scrollYProgress}>
          <FeatureCard feature={f} index={i} />
        </StackCard>
      ))}
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="why" className="relative scroll-mt-24 py-16 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f6f3ea,#fbf9f3_50%,#f6f3ea)]" />
      <div className="aura right-[-8%] top-[10%] h-[36vw] w-[36vw] max-h-[460px] max-w-[460px] text-[#16294b]/16" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Why BMS"
          title={
            <>
              Chosen for the <span className="italic text-gold">details</span>
            </>
          }
          subtitle="The difference between a good event and a memorable one is the setup. Here's what every BMS booking comes with as standard."
        />

        <FeatureStack />

        {/* stats strip */}
        <Reveal delay={0.1} className="mt-16">
          <div className="glass-dark grid grid-cols-2 gap-y-8 rounded-[1.75rem] px-6 py-9 sm:grid-cols-4 sm:px-10">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${i > 0 ? "sm:border-l sm:border-black/10" : ""}`}
              >
                <Counter
                  value={s.to}
                  decimals={s.decimals ?? 0}
                  suffix={s.suffix}
                  className="font-display text-3xl font-semibold text-gold sm:text-4xl"
                />
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream-dim/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
