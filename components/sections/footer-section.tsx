// Footer — "Your health isn't going to fix itself."
// 100svh with Suyash's responsive scene SVGs + subtle scene parallax on desktop.
// Overlay dog removed — was causing double-dalmatian. Baked-in dog is the real one.

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function FooterSection() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r  = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = footer just entering from bottom; 1 = footer fully scrolled into view
      const p  = Math.max(0, Math.min(1, (vh - r.top) / vh));
      setProgress(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", update); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // Stronger parallax: scene drifts down 50px as footer enters, settles to 0
  const sceneShift = (1 - progress) * 50;

  return (
    <footer ref={ref} className="relative w-full overflow-hidden bg-[#f4f3f0]" style={{ height: "100svh" }}>
      {/* Gradient sky */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, background: "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(255,140,0,0.7) 0%, rgba(255,185,5,0.6) 18%, rgba(255,242,0,0) 70%)" }} />

      {/* Scene illustration — single layer, no dog overlay */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
        style={{ zIndex: 1, transform: `translate3d(0, ${sceneShift}px, 0)`, willChange: "transform" }}
      >
        <picture>
          <source media="(max-width: 639px) and (orientation: portrait)"              srcSet="/assets/footer-bg-mobile.svg" />
          <source media="(orientation: landscape) and (max-height: 600px)"            srcSet="/assets/footer-bg-mobile-landscape.svg" />
          <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
          <img src="/assets/footer-bg.svg" alt="" aria-hidden="true" className="w-full block waldo-breathe" style={{ "--breath-delay": "200ms" } as React.CSSProperties} />
        </picture>
      </div>

      {/* Text + CTA */}
      <div className="relative flex flex-col items-center gap-6 lg:gap-10 px-4 pt-[92px] lg:pt-[48px]" style={{ zIndex: 2 }}>
        <p className="font-medium italic text-[#6b6b68] text-[12px] lg:text-[14px] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}>
          you&apos;re not the first. you&apos;re also not too late. yet.
        </p>
        <div className="flex flex-col gap-5 lg:gap-8 items-center text-[#1a1a1a] text-center" style={{ fontFamily: "var(--font-headline)" }}>
          <p className="text-[32px] sm:text-[40px] lg:text-[48px] max-w-[422px]" style={{ lineHeight: 1.1 }}>Your health isn&apos;t going to fix itself.</p>
          <div className="text-[18px] lg:text-[25px]" style={{ lineHeight: 1.2 }}>
            <p style={{ marginBottom: 0 }}>Waldo already knows what&apos;s wrong.</p>
            <p>You just have to let it in.</p>
          </div>
        </div>
        <Link
          href="/waitlist"
          className="flex min-h-14 items-center justify-center rounded-full bg-[#1A1A1A] px-9 text-[16px] font-medium text-[#FAFAF8] shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.05)] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-px hover:bg-[#272725] active:scale-[0.98] lg:text-[16px]"
          style={{ fontFamily: "var(--font-body)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
        >
          Let Waldo in →
        </Link>
        <div className="flex gap-5 lg:gap-[30px] font-normal text-[#6b6b68] text-[10px] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}>
          <span>[Privacy Policy]</span>
          <span>[Contact]</span>
          <span>© 2026 Waldo</span>
        </div>
      </div>
    </footer>
  );
}
