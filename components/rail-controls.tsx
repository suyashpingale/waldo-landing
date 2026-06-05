"use client";

import { useEffect, useRef, useState } from "react";

// Shared horizontal-rail scroll controls. One source of truth for every
// card rail (Use Cases, Security, …) so the affordance is identical everywhere.

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d={direction === "next" ? "M6.5 3.5 10.5 8.5 6.5 13.5" : "M10.5 3.5 6.5 8.5 10.5 13.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function useRailScroll(cardSelector = "[data-rail-card='true']") {
  const railRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateControls = () => {
    const rail = railRef.current;
    if (!rail) return;
    setCanGoBack(rail.scrollLeft > 1);
    setCanGoForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 1);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateControls();
    rail.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    return () => {
      rail.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  const scrollByCard = (direction: "prev" | "next") => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(cardSelector);
    if (!rail || !card) return;

    const step = card.offsetWidth + 16;
    rail.scrollBy({ left: direction === "next" ? step : -step, behavior: "smooth" });
  };

  return { railRef, canGoBack, canGoForward, scrollByCard };
}

export function RailArrows({
  label,
  canGoBack,
  canGoForward,
  onScroll,
  className = "",
}: {
  label: string;
  canGoBack: boolean;
  canGoForward: boolean;
  onScroll: (direction: "prev" | "next") => void;
  className?: string;
}) {
  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      <button
        type="button"
        className="focusable-ring flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t2)] text-[var(--ink)] transition-opacity duration-150 disabled:opacity-[0.42]"
        aria-label={`Previous ${label}`}
        disabled={!canGoBack}
        onClick={() => onScroll("prev")}
      >
        <ChevronIcon direction="prev" />
      </button>
      <button
        type="button"
        className="focusable-ring flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t2)] text-[var(--ink)] transition-opacity duration-150 disabled:opacity-[0.42]"
        aria-label={`Next ${label}`}
        disabled={!canGoForward}
        onClick={() => onScroll("next")}
      >
        <ChevronIcon direction="next" />
      </button>
    </div>
  );
}
