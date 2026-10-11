import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import ProductArt from "./ProductArt";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "./Reveal";
import { Tilt } from "./ui";
import {
  PRODUCTS,
  SWATCHES,
  formatPrice,
  productImage,
  type ColorKey,
  type Product,
} from "../data/products";
import { productWaLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { EASE } from "../lib/motion";

function Swatches({
  variants,
  value,
  onChange,
}: {
  variants: ColorKey[];
  value: ColorKey;
  onChange: (c: ColorKey) => void;
}) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Colour variants">
      {variants.map((key) => {
        const s = SWATCHES[key];
        const on = value === key;
        return (
          <button
            key={key}
            type="button"
            aria-label={`Select ${s.label}`}
            aria-pressed={on}
            onClick={() => onChange(key)}
            className={`relative grid h-7 w-7 place-items-center rounded-full border transition-all duration-300 ${
              on
                ? "border-gold scale-110 shadow-[0_0_0_3px_rgba(201,168,76,0.18)]"
                : "border-black/20 hover:border-black/45"
            }`}
            style={{ background: s.hex }}
          >
            {on && (
              <Check
                className="h-3.5 w-3.5"
                strokeWidth={3}
                style={{ color: key === "white" ? "#111" : "#fff" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [color, setColor] = useState<ColorKey>(product.variants[0]);
  const swatchLabel = SWATCHES[color].label;
  const img = productImage(product.id, color);
  const href = productWaLink(
    product.name,
    `₹${formatPrice(product.price)}/${product.unit}`,
    swatchLabel
  );

  return (
    <Tilt max={6} className="h-full">
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] glass transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(201,168,76,0.55)]"
      >
        <span className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-black/5 transition-all duration-500 group-hover:ring-gold/40" />

        {/* image */}
        <div className="relative overflow-hidden bg-[#f3ecdd]">
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(55%_60%_at_50%_10%,rgba(201,168,76,0.12),transparent_70%)]" />
          {product.tag && (
            <span className="absolute left-4 top-4 z-20 rounded-full border border-gold/40 bg-white/85 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold-soft backdrop-blur">
              {product.tag}
            </span>
          )}
          <div className="relative aspect-[4/5] w-full">
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
              <AnimatePresence initial={false}>
                {img ? (
                  <motion.img
                    key={img}
                    src={img}
                    alt={`${product.name} — ${swatchLabel}, available for rent in Bangalore`}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                ) : (
                  <motion.div
                    key={color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <ProductArt kind={product.art} color={color} className="h-full w-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-cream">
              {product.name}
            </h3>
            <div className="shrink-0 text-right leading-none">
              <span className="block font-display text-xl font-semibold text-gold">
                ₹{formatPrice(product.price)}
              </span>
              <span className="text-[0.68rem] uppercase tracking-widest text-cream-dim/70">
                / {product.unit}
              </span>
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-cream-dim">
            {product.blurb}
          </p>

          <ul className="mt-4 space-y-1.5">
            {product.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs text-cream-dim/85">
                <span className="h-1 w-1 rounded-full bg-gold/70" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
            <Swatches
              variants={product.variants}
              value={color}
              onChange={setColor}
            />
            <span className="text-[0.68rem] font-semibold uppercase tracking-widest text-cream-dim/70">
              {swatchLabel}
            </span>
          </div>

          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="sheen group/btn mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Enquire Now
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </motion.a>
        </div>
      </motion.article>
    </Tilt>
  );
}

export default function Products() {
  return (
    <section id="products" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="aura left-[-6%] top-[20%] h-[34vw] w-[34vw] max-h-[440px] max-w-[440px] text-gold/16" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Collection"
          title={
            <>
              Rentals that make an <span className="italic text-gold">entrance</span>
            </>
          }
          subtitle="Transparent daily pricing on everything you need to host beautifully — pick your colours, tap enquire, and we'll confirm on WhatsApp."
        />

        <Stagger stagger={0.12} className="mt-14">
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-3 sm:-mx-2 sm:px-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {PRODUCTS.map((p) => (
              <StaggerItem
                key={p.id}
                className="min-w-[80%] snap-center sm:min-w-[46%] lg:min-w-0"
              >
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="text-sm text-cream-dim">
            Need a custom setup or bulk order?{" "}
            <a
              href={productWaLink("a bulk tent & chair package")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-soft"
            >
              Message us for a bulk quote →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
