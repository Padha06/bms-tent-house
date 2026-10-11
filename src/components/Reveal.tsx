import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
  duration = 0.85,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function Stagger({
  children,
  className,
  stagger = 0.12,
  delay = 0,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Section eyebrow + heading block with a gold rule that draws itself in. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-gold-soft ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-6 bg-gold/60" />
          {eyebrow}
          <span className="h-px w-6 bg-gold/60" />
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-4xl leading-[1.08] sm:text-5xl md:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <motion.div
          className={`hairline-gold mt-6 h-px ${isCenter ? "mx-auto w-40" : "w-40"}`}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          style={{ transformOrigin: isCenter ? "center" : "left" }}
        />
      </Reveal>
      {subtitle && (
        <Reveal delay={0.24}>
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed text-cream-dim sm:text-lg ${
              isCenter ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
