import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import WhyUs from "./components/WhyUs";
import Gallery from "./components/Gallery";
import Marquee from "./components/Marquee";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { useSmoothScroll } from "./lib/useLenis";

export default function App() {
  const [loading, setLoading] = useState(true);
  useSmoothScroll();

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <div className="grain relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />

      <main>
        <Hero />
        <Products />
        <WhyUs />
        <Gallery />
        <Marquee />
        <Contact />
      </main>

      <Footer />
      <MobileNav />
      <FloatingWhatsApp />
    </div>
  );
}
