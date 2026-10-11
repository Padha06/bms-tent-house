import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { waLink } from "../lib/whatsapp";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.1 }}
          className="fixed right-4 bottom-[5.6rem] z-50 lg:right-6 lg:bottom-6"
        >
          <motion.a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with BMS Tent House on WhatsApp"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="group relative flex items-center"
          >
            {/* tooltip */}
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[#1b1810] px-3.5 py-2 text-xs font-semibold text-[#f6f1e6] opacity-0 shadow-xl ring-1 ring-black/10 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 lg:block">
              Chat with us
            </span>

            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#37e07a] to-[#1faa52] text-white shadow-[0_14px_38px_-8px_rgba(37,211,102,0.75)] ring-1 ring-white/20">
              <WhatsAppIcon className="h-7 w-7" />
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
