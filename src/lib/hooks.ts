import { useEffect, useState } from "react";

/** Highlights the nav item for the section currently in view. Throttled. */
export function useActiveSection(ids: string[], line = 0.35): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let raf = 0;
    let last = 0;
    let cached: { id: string; el: HTMLElement }[] = [];

    const collect = () => {
      cached = ids
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((x): x is { id: string; el: HTMLElement } => Boolean(x.el));
    };
    collect();

    const measure = () => {
      if (!cached.length) collect();
      const refY = window.innerHeight * line;
      let current = ids[0] ?? "";
      for (const { id, el } of cached) {
        if (el.getBoundingClientRect().top <= refY) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      const now = performance.now();
      if (now - last < 90) return;
      last = now;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|"), line]);

  return active;
}

/** True once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    let last = false;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const next = window.scrollY > threshold;
        if (next !== last) {
          last = next;
          setScrolled(next);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return scrolled;
}
