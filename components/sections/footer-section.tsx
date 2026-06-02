"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Aside, WaldoCTA } from "@/components/landing-primitives";

type Period = "morning" | "afternoon" | "evening" | "night";

function getPeriod(): Period {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

const backgrounds: Record<Period, string> = {
  morning:
    "radial-gradient(ellipse 120% 82% at 50% 100%, color-mix(in srgb, var(--accent) 26%, transparent) 0%, transparent 68%), linear-gradient(180deg, var(--surface-t2) 0%, var(--surface-t3) 100%)",
  afternoon:
    "radial-gradient(ellipse 120% 82% at 50% 100%, color-mix(in srgb, var(--action) 12%, transparent) 0%, transparent 68%), linear-gradient(180deg, var(--surface-t2) 0%, var(--surface-t3) 100%)",
  evening:
    "radial-gradient(ellipse 120% 82% at 50% 100%, color-mix(in srgb, var(--accent) 32%, transparent) 0%, transparent 70%), linear-gradient(180deg, var(--surface-t3) 0%, var(--surface-t2) 100%)",
  night:
    "radial-gradient(ellipse 120% 82% at 50% 100%, color-mix(in srgb, var(--surface-t2) 16%, transparent) 0%, transparent 68%), linear-gradient(180deg, var(--dark-t3) 0%, var(--dark-t2) 100%)",
};

const footerLinks = [
  ["Brief", "#brief"],
  ["Actions", "#actions"],
  ["Now", "#where"],
  ["Pattern", "#constellation"],
] as const;

export function FooterSection() {
  const ref = useRef<HTMLElement>(null);
  const [period, setPeriod] = useState<Period>("afternoon");
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    setPeriod(getPeriod());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const nextProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));
      setProgress(nextProgress);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const dark = period === "night";
  const sceneShift = (1 - progress) * 42;

  return (
    <footer
      ref={ref}
      className={`relative min-h-[780px] overflow-hidden ${dark ? "text-[var(--surface-t2)]" : "text-[var(--ink)]"} lg:h-[100svh]`}
      style={{ background: backgrounds[period] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[1] w-full select-none"
        style={{ transform: `translate3d(0, ${sceneShift}px, 0)`, willChange: "transform" }}
      >
        <picture>
          <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/footer-bg-mobile.svg" />
          <source media="(orientation: landscape) and (max-height: 600px)" srcSet="/assets/footer-bg-mobile-landscape.svg" />
          <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
          <img src="/assets/footer-bg.svg" alt="" className="waldo-breathe block w-full" />
        </picture>
      </div>

      <div className="relative z-[2] mx-auto flex min-h-[780px] max-w-[1200px] flex-col items-center justify-between px-4 pb-8 pt-28 text-center sm:px-6 lg:h-[100svh] lg:px-10 lg:pt-32">
        <div className="flex flex-col items-center gap-6">
          <h2 className={dark ? "type-h1 text-[var(--surface-t2)]" : "type-h1 text-[var(--ink)]"} data-animate="headline">
            You&apos;re not the first.
            <br />
            You&apos;re also not
            <br />
            too late. Yet.
          </h2>
          <WaldoCTA />
          <Aside className={dark ? "text-[var(--text-secondary)]" : ""}>Your watch has been waiting for this.</Aside>
        </div>

        <div
          className="grid w-full gap-6 rounded-[24px] border border-[var(--border-default)] p-5 text-left backdrop-blur-md sm:grid-cols-[1fr_auto] sm:items-end"
          style={{ background: "color-mix(in srgb, var(--surface-t2) 82%, transparent)" } as CSSProperties}
        >
          <div>
            <p className="type-label text-[var(--ink)]">Product</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {footerLinks.map(([label, href]) => (
                <a key={label} href={href} className="type-caption rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] px-3 py-2 text-[var(--text-secondary)] transition-[color,border-color] duration-150 hover:border-[var(--border-focus)] hover:text-[var(--ink)]">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <p className="type-caption text-[var(--text-tertiary)]">© 2026 Waldo</p>
        </div>
      </div>
    </footer>
  );
}
