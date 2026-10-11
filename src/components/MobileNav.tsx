import { motion } from "framer-motion";
import { NAV } from "../data/nav";
import { useActiveSection } from "../lib/hooks";
import { EASE } from "../lib/motion";

const IDS = NAV.map((n) => n.id);

export default function MobileNav() {
  const active = useActiveSection(IDS);

  return (
    <motion.nav
      aria-label="Mobile"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
    >
      <div className="safe-bottom px-3 pb-3">
        <div className="glass-dark mx-auto flex max-w-md items-center justify-between rounded-2xl px-1.5 py-1.5 shadow-[0_-10px_40px_-14px_rgba(60,50,25,0.5)]">
          {NAV.map(({ id, label, Icon }) => {
            const on = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={on ? "page" : undefined}
                className="relative flex flex-1 flex-col items-center gap-[3px] rounded-xl px-1 py-2"
              >
                {on && (
                  <motion.span
                    layoutId="mobile-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-b from-gold-light to-gold shadow-[0_8px_20px_-8px_rgba(201,168,76,0.9)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <motion.span
                  animate={{ scale: on ? 1.06 : 1, y: on ? -1 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className="grid place-items-center"
                >
                  <Icon
                    className={`h-[19px] w-[19px] ${on ? "text-ink" : "text-cream-dim"}`}
                    strokeWidth={on ? 2.4 : 2}
                  />
                </motion.span>
                <span
                  className={`text-[0.58rem] font-semibold tracking-wide ${
                    on ? "text-ink" : "text-cream-dim/80"
                  }`}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
