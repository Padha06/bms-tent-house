export const BUSINESS = {
  name: "BMS Tent House",
  tagline: "Elevate Every Occasion",
  subtagline: "Premium tents, canopies & chairs for unforgettable events.",
  phoneDisplay: "98450 01633",
  phoneRaw: "9845001633",
  whatsapp: "919845001633",
  area: "Bangalore, India",
  hours: "Open daily · 7 AM – 10 PM",
} as const;

export const TEL_HREF = `tel:${BUSINESS.phoneRaw}`;

/**
 * Build a wa.me deep link with a sensible, product-aware pre-filled message.
 */
export function waLink(message?: string): string {
  const text =
    message ??
    `Hi ${BUSINESS.name}! I'd like a quote for tent & chair rental in Bangalore. Please share availability and pricing.`;
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function productWaLink(item: string, price?: string, color?: string): string {
  const bits = [`Hi ${BUSINESS.name}! I'm interested in renting ${item}`];
  if (color) bits.push(`(${color})`);
  if (price) bits.push(`at ${price}`);
  bits.push("for my event. Please share availability and a quote.");
  return waLink(bits.join(" "));
}
