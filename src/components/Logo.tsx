export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#home"
      aria-label="BMS Tent House — home"
      className={`group flex items-center gap-3 ${className}`}
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gradient-to-br from-black/[0.05] to-transparent">
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden>
          <defs>
            <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E7CE8B" />
              <stop offset="0.5" stopColor="#C9A84C" />
              <stop offset="1" stopColor="#9A7B2E" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#logo-gold)" strokeLinejoin="round" strokeLinecap="round">
            <path d="M32 10 54 46H10L32 10Z" strokeWidth="3.4" />
            <path d="M32 10v36M20 28 10 46M44 28 54 46" strokeWidth="2.2" opacity="0.85" />
          </g>
        </svg>
        <span className="absolute inset-0 rounded-xl bg-gold/10 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-cream">
          BMS <span className="text-gold">Tent House</span>
        </span>
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-cream-dim/70">
          Bangalore
        </span>
      </span>
    </a>
  );
}
