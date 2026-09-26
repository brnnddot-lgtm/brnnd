import { useRouter } from "@tanstack/react-router";
import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  const router = useRouter();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.hash.length < 2) return;

      const el = document.querySelector(anchor.hash);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(el, { offset: -88 });
    };

    document.addEventListener("click", onAnchorClick);

    const unsub = router.subscribe("onResolved", () => {
      lenis.scrollTo(0, { immediate: true });
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchorClick);
      unsub();
      lenis.destroy();
    };
  }, [router]);

  return null;
}
