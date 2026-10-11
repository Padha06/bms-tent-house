import { motion, useScroll, useSpring } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { NAV } from "../data/nav";
import { useActiveSection, useScrolled } from "../lib/hooks";
import { BUSINESS, TEL_HREF, waLink } from "../lib/whatsapp";
import { EASE } from "../lib/motion";

const IDS = NAV.map((n) => n.id);

export default function Navbar() {
  const scrolled = useScrolled(30);
  const active = useActiveSection(IDS);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0%" }}
        className="h-[2px] w-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
      />

      <div className="container-x">
        <div
          className={`mt-3 flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 transition-all duration-500 sm:px-5 sm:py-3 ${
            scrolled
              ? "glass-dark shadow-[0_18px_50px_-24px_rgba(60,50,25,0.35)]"
              : "border border-transparent bg-transparent"
          }`}
        >
          <Logo />

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map(({ id, label }) => {
              const on = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    on ? "text-ink" : "text-cream-dim hover:text-cream"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-gold-light to-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {label}
                </a>
              );
            })}
          </nav>

          {/* actions — always visible, compact on mobile */}
          <div className="flex items-center gap-2">
            <a
              href={TEL_HREF}
              aria-label={`Call ${BUSINESS.name} at ${BUSINESS.phoneDisplay}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/12 bg-black/[0.035] px-3 text-cream backdrop-blur transition-colors hover:border-gold/60 hover:text-gold-soft sm:px-4"
            >
              <Phone className="h-[18px] w-[18px]" />
              <span className="hidden text-sm font-semibold sm:inline">Call</span>
            </a>

            <motion.a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get an instant quote on WhatsApp"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="sheen inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-4 text-sm font-bold text-ink shadow-[0_10px_28px_-10px_rgba(201,168,76,0.7)]"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
