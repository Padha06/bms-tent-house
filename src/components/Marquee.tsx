const ITEMS = [
  "10×10 Canopy Tents",
  "Tiffany Chairs",
  "Banquet Chairs",
  "Plastic Chairs",
  "Wedding Setups",
  "Corporate Events",
  "Birthday Parties",
  "Same-Day Delivery",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-black/8 bg-black/[0.02] py-5">
      <div
        className="flex w-max animate-marquee items-center will-change-transform"
        aria-hidden
      >
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="px-7 font-display text-lg font-medium tracking-tight text-cream/80 sm:text-2xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-page to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-page to-transparent" />
    </div>
  );
}
