import { Home, Armchair, Gem, Images, Phone } from "lucide-react";

export const NAV = [
  { id: "home", label: "Home", Icon: Home },
  { id: "products", label: "Products", Icon: Armchair },
  { id: "why", label: "Why Us", Icon: Gem },
  { id: "gallery", label: "Gallery", Icon: Images },
  { id: "contact", label: "Contact", Icon: Phone },
] as const;

export type NavId = (typeof NAV)[number]["id"];
