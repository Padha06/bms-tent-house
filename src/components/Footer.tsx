import { Phone, MapPin, ArrowUp } from "lucide-react";
import Logo from "./Logo";
import { WhatsAppIcon } from "./icons";
import { NAV } from "../data/nav";
import { BUSINESS, TEL_HREF, waLink } from "../lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-black/8 bg-[#efe9dc] pt-10 pb-24 sm:pt-16 sm:pb-28 lg:pb-10">
      <div className="aura left-[10%] top-0 h-[26vw] w-[26vw] max-h-[320px] max-w-[320px] text-gold/16" />

      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
          {/* brand */}
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-dim sm:mt-6">
              Premium tents, canopies &amp; chairs, proudly serving Bangalore.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-semibold text-[#1faa52] transition-colors hover:bg-[#25D366]/20"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={TEL_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-black/[0.04] px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold/50 hover:text-gold-soft"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <h4 className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-cream-dim/70">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-gold-soft"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h4 className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-cream-dim/70">
              Reach us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream-dim">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {BUSINESS.area}
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={TEL_HREF} className="transition-colors hover:text-gold-soft">
                  +91 {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-soft"
                >
                  Message on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-3 border-t border-black/8 pt-6 sm:mt-14 sm:pt-7">
          <p className="text-xs text-cream-dim/60">
            © {year} {BUSINESS.name}
          </p>
          <p className="hidden text-xs text-cream-dim/50 sm:block">
            Crafted as a design demo · Bangalore, India
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="group hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cream-dim/70 transition-colors hover:text-gold-soft sm:inline-flex"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-black/12 transition-all duration-300 group-hover:border-gold/50 group-hover:-translate-y-0.5">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
