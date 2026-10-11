import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "C:/Users/User/Downloads/bgm";
const OUT = path.resolve("public/images");
await mkdir(OUT, { recursive: true });

const gallery = (n, slug) => ({
  in: `gallery-0${n}-${slug}.jpg.png`,
  out: `gallery-0${n}.webp`,
  width: 1400,
  q: 80,
});

const jobs = [
  { in: "Hero.png", out: "hero.webp", width: 2000, q: 80 },
  { in: "product-canopy-white.jpg.png", out: "product-canopy-white.webp", width: 1100, q: 82 },
  { in: "product-canopy-red.jpg.png", out: "product-canopy-red.webp", width: 1100, q: 82 },
  { in: "product-tiffany-white.jpg.png", out: "product-tiffany-white.webp", width: 1100, q: 82 },
  { in: "product-tiffany-gold.jpg.png", out: "product-tiffany-gold.webp", width: 1100, q: 82 },
  { in: "product-plastic-red.jpg.png", out: "product-plastic-red.webp", width: 1100, q: 82 },
  { in: "product-banquet-blue.jpg.png", out: "product-banquet-blue.webp", width: 1100, q: 82 },
  { in: "product-banquet-red.jpg.png", out: "product-banquet-red.webp", width: 1100, q: 82 },
  gallery(1, "wedding-reception"),
  gallery(2, "tiffany-walkway"),
  gallery(3, "red-canopy-stage"),
  gallery(4, "banquet-blue"),
  gallery(5, "cocktail-hour"),
  gallery(6, "bulk-seating"),
  gallery(7, "corporate-setup"),
  gallery(8, "open-air-mandap"),
  { in: "og.jpg.png", out: "og.jpg", width: 1200, height: 630, cover: true, q: 84, type: "jpeg" },
  { in: "logo-mark.png.jpg", out: "logo-mark.png", width: 512, type: "png" },
];

let total = 0;
for (const j of jobs) {
  const src = path.join(SRC, j.in);
  const dst = path.join(OUT, j.out);
  let pipe = sharp(src).rotate();

  if (j.type === "png") {
    pipe = pipe.resize({ width: j.width, withoutEnlargement: true }).png({ compressionLevel: 9 });
  } else if (j.type === "jpeg") {
    pipe = pipe
      .resize(j.width, j.height, { fit: "cover", position: "attention" })
      .jpeg({ quality: j.q, mozjpeg: true });
  } else {
    pipe = pipe
      .resize({ width: j.width, withoutEnlargement: true })
      .webp({ quality: j.q, effort: 5 });
  }

  const info = await pipe.toFile(dst);
  total += info.size;
  console.log(`${j.out.padEnd(34)} ${String(Math.round(info.size / 1024)).padStart(5)} KB  ${info.width}x${info.height}`);
}
console.log(`\nTOTAL: ${(total / 1024 / 1024).toFixed(2)} MB`);
