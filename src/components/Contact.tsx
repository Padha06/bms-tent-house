import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, Calendar, MessageSquare, MapPin, Clock, Check } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { GoldButton, GhostButton } from "./ui";
import { WhatsAppIcon } from "./icons";
import { BUSINESS, TEL_HREF, waLink } from "../lib/whatsapp";
import { EASE } from "../lib/motion";

const FIELD =
  "w-full rounded-xl border border-black/12 bg-white/70 px-4 py-3 text-sm text-cream placeholder:text-cream-dim/55 outline-none transition-all duration-300 focus:border-gold/60 focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,168,76,0.15)]";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `Hi ${BUSINESS.name}! I'd like a quote for my event.`,
      ``,
      `Name: ${form.name || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Event date: ${form.date || "To be confirmed"}`,
      form.message ? `Details: ${form.message}` : "",
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  }

  const cards: {
    Icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    href?: string;
  }[] = [
    { Icon: Phone, label: "Call us", value: BUSINESS.phoneDisplay, href: TEL_HREF },
    { Icon: WhatsAppIcon, label: "WhatsApp", value: "Chat instantly", href: waLink() },
    { Icon: MapPin, label: "Service area", value: BUSINESS.area, href: undefined },
    { Icon: Clock, label: "Hours", value: BUSINESS.hours, href: undefined },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="aura left-1/2 top-0 h-[40vw] w-[40vw] max-h-[520px] max-w-[520px] -translate-x-1/2 bg-gold/12" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Let's Plan"
          title={
            <>
              Ready to make it <span className="italic text-gold">unforgettable?</span>
            </>
          }
          subtitle="Tell us about your event and we'll get back within hours with availability and a tailored quote."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* left — message + contact cards */}
          <Reveal>
            <div className="flex h-full flex-col">
              <p className="text-lg leading-relaxed text-cream-dim">
                From single canopies to full wedding setups, {BUSINESS.name} makes
                planning simple. Message us on WhatsApp with your date and headcount —
                we'll handle the rest.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <GoldButton
                  href={waLink()}
                  external
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                >
                  WhatsApp Us
                </GoldButton>
                <GhostButton href={TEL_HREF} icon={<Phone className="h-4 w-4" />}>
                  Call Now
                </GhostButton>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {cards.map(({ Icon, label, value, href }) => {
                  const Inner = (
                    <>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cream-dim/70">
                          {label}
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-cream">
                          {value}
                        </span>
                      </span>
                    </>
                  );
                  return href ? (
                    <motion.a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ y: -4 }}
                      className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-gold/40"
                    >
                      {Inner}
                    </motion.a>
                  ) : (
                    <div
                      key={label}
                      className="glass flex items-center gap-4 rounded-2xl p-4"
                    >
                      {Inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* right — form */}
          <Reveal delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="glass relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
              <h3 className="font-display text-2xl font-semibold text-cream">
                Request a quote
              </h3>
              <p className="mt-2 text-sm text-cream-dim">
                We'll reply on WhatsApp — no spam, ever.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="relative sm:col-span-1">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim/60" />
                  <label htmlFor="name" className="sr-only">Your name</label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    className={`${FIELD} pl-11`}
                  />
                </div>
                <div className="relative sm:col-span-1">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim/60" />
                  <label htmlFor="phone" className="sr-only">Phone number</label>
                  <input
                    id="phone"
                    required
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="Phone number"
                    className={`${FIELD} pl-11`}
                  />
                </div>
                <div className="relative sm:col-span-2">
                  <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim/60" />
                  <label htmlFor="date" className="sr-only">Event date</label>
                  <input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className={`${FIELD} pl-11`}
                  />
                </div>
                <div className="relative sm:col-span-2">
                  <MessageSquare className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-cream-dim/60" />
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your event — venue, headcount, colours…"
                    className={`${FIELD} resize-none pl-11`}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="sheen mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-7 py-4 text-sm font-bold uppercase tracking-wider text-ink shadow-[0_12px_34px_-10px_rgba(201,168,76,0.7)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Send via WhatsApp
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 8, height: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mt-4 flex items-center gap-2 overflow-hidden text-sm font-medium text-[#1faa52]"
                  >
                    <Check className="h-4 w-4" />
                    Opening WhatsApp with your details…
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
