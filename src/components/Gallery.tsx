import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading, Reveal } from "./Reveal";
import { waLink } from "../lib/whatsapp";
import { EASE } from "../lib/motion";

interface Tile {
  title: string;
  tag: string;
  src: string;
  aspect: string;
  alt: string;
}

const TILES: Tile[] = [
  {
    title: "Wedding Reception",
    tag: "Canopy · White",
    src: "/images/gallery-01.webp",
    aspect: "aspect-[4/3]",
    alt: "White canopy tent reception with gold Tiffany chairs arranged on a lawn at golden hour",
  },
  {
    title: "Tiffany Walkway",
    tag: "Chairs · Gold",
    src: "/images/gallery-02.webp",
    aspect: "aspect-[3/4]",
    alt: "Aisle walkway lined with gold Tiffany chairs with white cushions",
  },
  {
    title: "Grand Red Canopy",
    tag: "Canopy · Red",
    src: "/images/gallery-03.webp",
    aspect: "aspect-[4/3]",
    alt: "Festive red canopy tent over an outdoor event stage",
  },
  {
    title: "Banquet in Blue",
    tag: "Chairs · Blue",
    src: "/images/gallery-04.webp",
    aspect: "aspect-[1/1]",
    alt: "Formal banquet setup with royal-blue upholstered chairs on gold frames",
  },
  {
    title: "Cocktail Hour",
    tag: "Chairs · White",
    src: "/images/gallery-05.webp",
    aspect: "aspect-[4/3]",
    alt: "Outdoor cocktail hour with high tables and gold Tiffany chairs under string lights",
  },
  {
    title: "Bulk Guest Seating",
    tag: "Chairs · Red",
    src: "/images/gallery-06.webp",
    aspect: "aspect-[1/1]",
    alt: "Large outdoor gathering with rows of red plastic chairs",
  },
  {
    title: "Corporate Setup",
    tag: "Chairs · Red",
    src: "/images/gallery-07.webp",
    aspect: "aspect-[4/3]",
    alt: "Outdoor corporate event with red banquet chairs in neat rows",
  },
  {
    title: "Open-Air Mandap",
    tag: "Canopy · White",
    src: "/images/gallery-08.webp",
    aspect: "aspect-[4/3]",
    alt: "Open-air ceremony mandap aisle under a white canopy tent",
  },
];

function GalleryTile({ tile, index }: { tile: Tile; index: number }) {
  return (
    <motion.a
      href={waLink(
        `Hi BMS Tent House! I'd love a setup like "${tile.title}" (${tile.tag}). Please share pricing and availability.`
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${tile.title} — enquire on WhatsApp`}
      initial={{ opacity: 0, y: 46, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: EASE, delay: (index % 3) * 0.08 }}
      className="group mb-5 block break-inside-avoid"
    >
      <div
        className={`relative overflow-hidden rounded-[1.5rem] bg-[#e9e2d2] ring-1 ring-inset ring-black/8 transition-all duration-500 group-hover:ring-gold/50 ${tile.aspect}`}
      >
        {/* image with zoom-out reveal + hover zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.16 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <img
            src={tile.src}
            alt={tile.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold-light">
              {tile.tag}
            </span>
            <h3 className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
              {tile.title}
            </h3>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Showcase"
          title={
            <>
              Settings we've <span className="italic text-gold">styled</span>
            </>
          }
          subtitle="From intimate gatherings to grand celebrations — a peek at the setups our clients love."
        />

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {TILES.map((t, i) => (
            <GalleryTile key={t.src} tile={t} index={i} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 text-center">
          <motion.a
            href={waLink("Hi BMS Tent House! I'd like to plan an event setup. Can we discuss?")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
          >
            Plan your setup on WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
