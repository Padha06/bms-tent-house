import { motion } from "framer-motion";
import { Truck, BadgeCheck, Wallet, PartyPopper } from "lucide-react";
import { SectionHeading, Stagger, StaggerItem, Reveal } from "./Reveal";
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

const STATS: { to: number; decimals?: number; suffix?: string; label: string }[] = [
  { to: 500, suffix: "+", label: "Events styled" },
  { to: 4.9, decimals: 1, suffix: "★", label: "Client rating" },
  { to: 24, suffix: " hr", label: "Booking turnaround" },
  { to: 100, suffix: "%", label: "Setup included" },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative scroll-mt-24 py-24 sm:py-32">
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

        <Stagger stagger={0.12} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {FEATURES.map(({ Icon, title, text }) => (
            <StaggerItem key={title} className="h-full">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-[1.75rem] glass p-6 sm:p-7"
              >
                <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                <span className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-black/5 transition-all duration-500 group-hover:ring-gold/40" />

                <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/20 to-transparent text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </span>

                <h3 className="mt-6 font-display text-xl font-semibold text-cream">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {text}
                </p>

                <span className="mt-6 block h-px w-full bg-gradient-to-r from-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* stats strip */}
        <Reveal delay={0.15} className="mt-16">
          <div className="glass-dark grid grid-cols-2 gap-y-8 rounded-[1.75rem] px-6 py-9 sm:grid-cols-4 sm:px-10">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${
                  i > 0 ? "sm:border-l sm:border-black/10" : ""
                }`}
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
