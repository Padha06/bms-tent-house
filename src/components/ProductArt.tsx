import { useId } from "react";
import type { ArtKind, ColorKey } from "../data/products";
import { SWATCHES } from "../data/products";

/* ---------- colour helpers ---------- */
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
function mix(hex: string, amt: number, to: "white" | "black") {
  const { r, g, b } = hexToRgb(hex);
  const t = to === "white" ? 255 : 0;
  const f = (c: number) => Math.round(c + (t - c) * amt);
  return (
    "#" +
    [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, "0")).join("")
  );
}

interface Props {
  kind: ArtKind;
  color?: ColorKey;
  className?: string;
}

export default function ProductArt({
  kind,
  color = "white",
  className = "",
}: Props) {
  const uid = useId().replace(/[:]/g, "");
  const base = SWATCHES[color].hex;
  const light = mix(base, 0.42, "white");
  const dark = mix(base, 0.5, "black");
  const mid = mix(base, 0.16, "black");
  const gold = "#C9A84C";
  const goldLight = "#EBD79B";
  const goldDark = "#8E7028";

  const common = {
    viewBox: "0 0 400 320",
    className,
    xmlns: "http://www.w3.org/2000/svg",
    role: "img" as const,
  };

  const defs = (
    <defs>
      <linearGradient id={`fabric-${uid}`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor={light} />
        <stop offset="55%" stopColor={base} />
        <stop offset="100%" stopColor={dark} />
      </linearGradient>
      <linearGradient id={`fabric2-${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={base} />
        <stop offset="100%" stopColor={dark} />
      </linearGradient>
      <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={goldLight} />
        <stop offset="45%" stopColor={gold} />
        <stop offset="100%" stopColor={goldDark} />
      </linearGradient>
      <radialGradient id={`floor-${uid}`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <filter id={`soft-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
  );

  const floor = (
    <ellipse cx="200" cy="292" rx="128" ry="22" fill={`url(#floor-${uid})`} />
  );

  /* ---------------- CANOPY ---------------- */
  if (kind === "canopy") {
    const scallop = Array.from({ length: 8 })
      .map(() => "q -19 13 -38 0")
      .join(" ");
    return (
      <svg {...common}>
        {defs}
        {floor}
        {/* back legs */}
        <rect x="116" y="120" width="6" height="150" rx="3" fill={dark} opacity="0.85" />
        <rect x="278" y="120" width="6" height="150" rx="3" fill={dark} opacity="0.85" />
        {/* roof facets */}
        <g filter={`url(#soft-${uid})`}>
          <path d="M200 38 L48 128 L200 128 Z" fill={`url(#fabric-${uid})`} />
          <path d="M200 38 L352 128 L200 128 Z" fill={`url(#fabric2-${uid})`} />
          {/* ridge + edge trim */}
          <path d="M200 38 L200 128" stroke={gold} strokeWidth="2" opacity="0.5" />
          <path d="M48 128 L200 38 L352 128" fill="none" stroke={gold} strokeWidth="2.4" opacity="0.65" strokeLinejoin="round" />
        </g>
        {/* front legs */}
        <rect x="52" y="126" width="8" height="146" rx="4" fill={`url(#fabric2-${uid})`} />
        <rect x="340" y="126" width="8" height="146" rx="4" fill={`url(#fabric2-${uid})`} />
        <rect x="50" y="266" width="12" height="7" rx="3" fill={gold} />
        <rect x="338" y="266" width="12" height="7" rx="3" fill={gold} />
        {/* valance */}
        <path
          d={`M48 126 H352 V142 ${scallop} Z`}
          fill={`url(#fabric-${uid})`}
        />
        <path d="M48 127 H352" stroke={gold} strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }

  /* ---------------- TIFFANY ---------------- */
  if (kind === "tiffany") {
    const spindles = [153, 172, 191, 209, 228, 247];
    return (
      <svg {...common}>
        {defs}
        {floor}
        {/* back legs */}
        <path d="M166 200 L160 284" stroke={goldDark} strokeWidth="7" strokeLinecap="round" />
        <path d="M234 200 L240 284" stroke={goldDark} strokeWidth="7" strokeLinecap="round" />
        {/* frame */}
        <g filter={`url(#soft-${uid})`}>
          <path d="M141 176 L141 78" stroke={`url(#gold-${uid})`} strokeWidth="9" strokeLinecap="round" />
          <path d="M259 176 L259 78" stroke={`url(#gold-${uid})`} strokeWidth="9" strokeLinecap="round" />
          <path d="M141 80 Q200 52 259 80" fill="none" stroke={`url(#gold-${uid})`} strokeWidth="9" strokeLinecap="round" />
          <path d="M141 108 L259 108" stroke={`url(#gold-${uid})`} strokeWidth="6" strokeLinecap="round" />
          {spindles.map((x) => (
            <path key={x} d={`M${x} 108 L${x} 172`} stroke={`url(#gold-${uid})`} strokeWidth="4.6" strokeLinecap="round" />
          ))}
          <path d="M133 190 L267 190" stroke={`url(#gold-${uid})`} strokeWidth="9" strokeLinecap="round" />
        </g>
        {/* cushion */}
        <rect x="130" y="166" width="140" height="27" rx="13" fill="#F3EEE2" filter={`url(#soft-${uid})`} />
        <rect x="130" y="166" width="140" height="12" rx="9" fill="#FFFFFF" opacity="0.85" />
        <path d="M138 192 L262 192" stroke="#cfc7b4" strokeWidth="1.6" opacity="0.7" />
        {/* front legs */}
        <path d="M147 196 L139 286" stroke={`url(#gold-${uid})`} strokeWidth="8" strokeLinecap="round" />
        <path d="M253 196 L261 286" stroke={`url(#gold-${uid})`} strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  /* ---------------- PLASTIC ---------------- */
  if (kind === "plastic") {
    return (
      <svg {...common}>
        {defs}
        {floor}
        {/* back legs */}
        <path d="M170 186 L156 268" stroke={dark} strokeWidth="13" strokeLinecap="round" />
        <path d="M230 186 L244 268" stroke={dark} strokeWidth="13" strokeLinecap="round" />
        {/* seat + back */}
        <g filter={`url(#soft-${uid})`}>
          <path
            d="M134 96 Q134 66 164 66 H236 Q266 66 266 96 V150 Q266 166 250 166 H150 Q134 166 134 150 Z"
            fill={`url(#fabric-${uid})`}
          />
          {/* slat grooves */}
          {[92, 112, 132].map((y) => (
            <rect key={y} x="152" y={y} width="96" height="7" rx="3.5" fill={mid} opacity="0.55" />
          ))}
          {/* armrests */}
          <path d="M128 118 Q108 128 112 156 Q114 168 130 168" fill="none" stroke={`url(#fabric2-${uid})`} strokeWidth="10" strokeLinecap="round" />
          <path d="M272 118 Q292 128 288 156 Q286 168 270 168" fill="none" stroke={`url(#fabric2-${uid})`} strokeWidth="10" strokeLinecap="round" />
          {/* seat */}
          <path d="M124 158 H276 Q282 158 280 172 L272 186 Q268 192 258 192 H142 Q132 192 128 186 L120 172 Q118 158 124 158 Z" fill={`url(#fabric-${uid})`} />
          <path d="M136 166 H264" stroke={light} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        </g>
        {/* front legs */}
        <path d="M154 190 L134 288" stroke={`url(#fabric2-${uid})`} strokeWidth="15" strokeLinecap="round" />
        <path d="M246 190 L266 288" stroke={`url(#fabric2-${uid})`} strokeWidth="15" strokeLinecap="round" />
      </svg>
    );
  }

  /* ---------------- BANQUET ---------------- */
  return (
    <svg {...common}>
      {defs}
      {floor}
      {/* back legs */}
      <path d="M158 204 L152 288" stroke={goldDark} strokeWidth="8" strokeLinecap="round" />
      <path d="M242 204 L248 288" stroke={goldDark} strokeWidth="8" strokeLinecap="round" />
      {/* upholstered back */}
      <g filter={`url(#soft-${uid})`}>
        <rect x="128" y="56" width="144" height="120" rx="22" fill={`url(#fabric-${uid})`} />
        <rect x="142" y="72" width="116" height="88" rx="16" fill="none" stroke={light} strokeWidth="2.4" opacity="0.5" />
        <path d="M128 100 Q200 84 272 100" fill="none" stroke={light} strokeWidth="2" opacity="0.35" />
        {/* seat */}
        <rect x="120" y="168" width="160" height="34" rx="14" fill={`url(#fabric-${uid})`} />
        <rect x="120" y="168" width="160" height="14" rx="10" fill={light} opacity="0.4" />
        {/* gold rail */}
        <rect x="120" y="198" width="160" height="10" rx="5" fill={`url(#gold-${uid})`} />
      </g>
      {/* front legs */}
      <path d="M138 208 L132 290" stroke={`url(#gold-${uid})`} strokeWidth="9" strokeLinecap="round" />
      <path d="M262 208 L268 290" stroke={`url(#gold-${uid})`} strokeWidth="9" strokeLinecap="round" />
      {/* gold caps */}
      <circle cx="132" cy="290" r="4.6" fill={goldLight} />
      <circle cx="268" cy="290" r="4.6" fill={goldLight} />
      <circle cx="152" cy="288" r="4" fill={gold} />
      <circle cx="248" cy="288" r="4" fill={gold} />
    </svg>
  );
}
