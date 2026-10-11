import { useEffect } from "react";
import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 1050);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-page"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
    >
      <div className="flex flex-col items-center">
        <motion.svg
          viewBox="0 0 64 64"
          className="h-12 w-12"
          initial="hidden"
          animate="show"
          aria-hidden
        >
          <defs>
            <linearGradient id="pre-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E7CE8B" />
              <stop offset="1" stopColor="#9A7B2E" />
            </linearGradient>
          </defs>
          <motion.path
            d="M32 10 54 46H10L32 10Z"
            fill="none"
            stroke="url(#pre-gold)"
            strokeWidth="3.4"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: EASE }}
          />
        </motion.svg>

        <motion.span
          className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.4em] text-cream-dim"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
        >
          BMS Tent House
        </motion.span>

        <div className="mt-6 h-px w-40 overflow-hidden bg-black/10">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1, ease: EASE }}
          />
        </div>
      </div>
    </motion.div>
  );
}
