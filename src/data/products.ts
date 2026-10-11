export type ColorKey = "white" | "red" | "blue" | "gold";

export interface Swatch {
  key: ColorKey;
  label: string;
  hex: string;
}

export const SWATCHES: Record<ColorKey, Swatch> = {
  white: { key: "white", label: "White", hex: "#F3EEE2" },
  red: { key: "red", label: "Red", hex: "#C41E3A" },
  blue: { key: "blue", label: "Blue", hex: "#2B4A8B" },
  gold: { key: "gold", label: "Gold", hex: "#C9A84C" },
};

export type ArtKind = "canopy" | "tiffany" | "plastic" | "banquet";

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  blurb: string;
  bullets: string[];
  variants: ColorKey[];
  art: ArtKind;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "canopy-10x10",
    name: "10×10 Canopy Tent",
    price: 1500,
    unit: "day",
    blurb:
      "Sturdy, weather-ready canopy that turns any open space into an elegant, shaded venue.",
    bullets: ["10ft × 10ft footprint", "Strong powder-coated frame", "Clean draped valance"],
    variants: ["white", "red"],
    art: "canopy",
    tag: "Most booked",
  },
  {
    id: "tiffany",
    name: "Tiffany Chairs",
    price: 100,
    unit: "day",
    blurb:
      "The classic chiavari silhouette — an elegant gold frame with a soft white cushion.",
    bullets: ["Gold-finish frame", "Plush white cushion", "Stackable & event-ready"],
    variants: ["white", "gold"],
    art: "tiffany",
    tag: "Premium",
  },
  {
    id: "plastic",
    name: "Plastic Chairs",
    price: 20,
    unit: "day",
    blurb:
      "Bright, durable seating that scales to any crowd without stretching the budget.",
    bullets: ["Heavy-duty moulded build", "Easy to clean & stack", "Ideal for large gatherings"],
    variants: ["red"],
    art: "plastic",
    tag: "Best value",
  },
  {
    id: "banquet",
    name: "Banquet Chairs",
    price: 80,
    unit: "day",
    blurb:
      "Fully upholstered banquet chairs with a polished gold frame — comfort with a formal finish.",
    bullets: ["Upholstered back & seat", "Polished gold metal frame", "Available in Blue & Red"],
    variants: ["blue", "red"],
    art: "banquet",
    tag: "Comfort",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

/**
 * Real product photography, one file per colour variant.
 * Present files live in /public/images. Missing entries fall back to the SVG art.
 */
export const PRODUCT_IMAGE: Record<string, Partial<Record<ColorKey, string>>> = {
  "canopy-10x10": {
    white: "/images/product-canopy-white.webp",
    red: "/images/product-canopy-red.webp",
  },
  tiffany: {
    white: "/images/product-tiffany-white.webp",
    gold: "/images/product-tiffany-gold.webp",
  },
  plastic: {
    red: "/images/product-plastic-red.webp",
  },
  banquet: {
    blue: "/images/product-banquet-blue.webp",
    red: "/images/product-banquet-red.webp",
  },
};

export function productImage(id: string, color: ColorKey): string | undefined {
  return PRODUCT_IMAGE[id]?.[color];
}
