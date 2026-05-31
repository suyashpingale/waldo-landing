"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

type HeroState = "recovery" | "form" | "weight";

const STATES: HeroState[] = ["recovery", "form", "weight"];
const ROTATE_MS = 5000;

// ── Gradient colours per state ───────────────────────────────────────────
const STATE_GRADIENTS: Record<HeroState, { from: string; to: string; dotColor: string }> = {
  recovery: { from: "#4ADE80", to: "#22C55E", dotColor: "#22C55E" },
  form:     { from: "#FB923C", to: "#F97316", dotColor: "#F97316" },
  weight:   { from: "#FB7185", to: "#F43F5E", dotColor: "#F43F5E" },
};

// ── Floating card data per state ─────────────────────────────────────────
const STATE_CARDS: Record<HeroState, FloatingCard[]> = {
  recovery: [
    {
      id: "brief",
      position: { top: "8%", left: "3%" },
      rotation: -3,
      type: "action",
      content: {
        icon: "🟠",
        title: "The Brief",
        subtitle: "6:12am",
        body: "Rough night — 5h 40m of sleep, HRV 12% below baseline. Nudged your 9am to 10:30.",
        aside: "already on it.",
      },
    },
    {
      id: "donut",
      position: { top: "5%", right: "18%" },
      rotation: 2,
      type: "donut",
      content: { score: 63, label: "Recovery", color: "#22C55E" },
    },
    {
      id: "heart",
      position: { top: "12%", right: "8%" },
      rotation: -1,
      type: "icon-card",
      content: { icon: "❤️", label: "62 bpm", sublabel: "Resting HR" },
    },
    {
      id: "stress",
      position: { top: "6%", right: "0%" },
      rotation: 3,
      type: "metric-card",
      content: { label: "Stress", value: "Elevated", trend: "↑" },
    },
    {
      id: "sleep",
      position: { bottom: "18%", right: "2%" },
      rotation: 2,
      type: "chart-card",
      content: { label: "Sleep", value: "5h 42m", bars: [0.3, 0.7, 0.9, 0.6, 0.4, 0.8, 0.5, 0.3] },
    },
    {
      id: "hrv",
      position: { bottom: "20%", left: "5%" },
      rotation: -2,
      type: "chip",
      content: { label: "HRV", value: "38ms ↓" },
    },
  ],
  form: [
    {
      id: "fetch",
      position: { top: "8%", left: "3%" },
      rotation: -2,
      type: "action",
      content: {
        icon: "🟠",
        title: "The Fetch",
        subtitle: "1:47pm",
        body: "Stress climbing since 1pm. Pulled the 4:30 and blocked your afternoon.",
        aside: "you didn't ask. you didn't need to.",
      },
    },
    {
      id: "donut",
      position: { top: "5%", right: "18%" },
      rotation: 1,
      type: "donut",
      content: { score: 76, label: "Form", color: "#F97316" },
    },
    {
      id: "circadian",
      position: { top: "12%", right: "8%" },
      rotation: -2,
      type: "icon-card",
      content: { icon: "☀️", label: "Aligned", sublabel: "Circadian" },
    },
    {
      id: "stress",
      position: { top: "6%", right: "0%" },
      rotation: 2,
      type: "metric-card",
      content: { label: "Stress", value: "Climbing", trend: "↑" },
    },
    {
      id: "motion",
      position: { bottom: "18%", right: "2%" },
      rotation: -1,
      type: "chart-card",
      content: { label: "Motion", value: "4,200 steps", bars: [0.2, 0.4, 0.6, 0.8, 0.5, 0.3, 0.7, 0.9] },
    },
    {
      id: "calendar",
      position: { bottom: "20%", left: "5%" },
      rotation: 3,
      type: "chip",
      content: { label: "Calendar", value: "1 event pulled" },
    },
  ],
  weight: [
    {
      id: "adjustment",
      position: { top: "8%", left: "3%" },
      rotation: -1,
      type: "action",
      content: {
        icon: "🟠",
        title: "The Adjustment",
        subtitle: "5:30pm",
        body: "22 hours of meetings this week. Friday afternoon cleared. Retro moved to Monday.",
        aside: "already moved.",
      },
    },
    {
      id: "donut",
      position: { top: "5%", right: "18%" },
      rotation: -2,
      type: "donut",
      content: { score: 84, label: "Weight", color: "#F43F5E" },
    },
    {
      id: "stack",
      position: { top: "12%", right: "8%" },
      rotation: 2,
      type: "icon-card",
      content: { icon: "📅", label: "6 meetings", sublabel: "The Stack" },
    },
    {
      id: "signal",
      position: { top: "6%", right: "0%" },
      rotation: -3,
      type: "metric-card",
      content: { label: "Signal Pressure", value: "High", trend: "↑" },
    },
    {
      id: "load",
      position: { bottom: "18%", right: "2%" },
      rotation: 1,
      type: "chart-card",
      content: { label: "Load", value: "14/21", bars: [0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.7, 0.9] },
    },
    {
      id: "linear",
      position: { bottom: "20%", left: "5%" },
      rotation: -2,
      type: "chip",
      content: { label: "Linear", value: "3 tasks reprioritised" },
    },
  ],
};

// ── Types ────────────────────────────────────────────────────────────────
type FloatingCard = {
  id: string;
  position: Record<string, string>;
  rotation: number;
  type: "action" | "donut" | "icon-card" | "metric-card" | "chart-card" | "chip";
  content: Record<string, unknown>;
};

// ── Card renderers ───────────────────────────────────────────────────────

function FloatingActionCard({ content }: { content: Record<string, unknown> }) {
  return (
    <div
      className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/60 p-4 shadow-lg"
      style={{ width: "260px", fontFamily: "var(--font-body)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-[#F97316] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
          </svg>
        </div>
        <span className="text-[12px] font-medium text-[#1A1A1A]">{content.title as string}</span>
        <span className="text-[10px] text-[#9CA3AF] ml-auto">{content.subtitle as string}</span>
      </div>
      <p className="text-[11px] text-[#1A1A1A] leading-[1.4]">{content.body as string}</p>
      <p className="text-[10px] text-[#9CA3AF] mt-2 italic">{content.aside as string}</p>
    </div>
  );
}

function FloatingDonutCard({ content }: { content: Record<string, unknown> }) {
  const score = content.score as number;
  const color = content.color as string;
  const label = content.label as string;
  const size = 90;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (score / 100) * c;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/60 p-4 shadow-lg flex flex-col items-center" style={{ width: "120px" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${filled} ${c - filled}`} strokeDashoffset={c / 4} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 800ms ease" }}
        />
        <text x={size/2} y={size/2 - 2} textAnchor="middle" dominantBaseline="central" fill="#1A1A1A"
          style={{ fontFamily: "var(--font-headline)", fontSize: "22px" }}
        >{score}%</text>
      </svg>
      <span className="text-[11px] font-medium text-[#1A1A1A] mt-1" style={{ fontFamily: "var(--font-body)" }}>{label}</span>
    </div>
  );
}

function FloatingIconCard({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/60 p-3 shadow-lg flex flex-col items-center gap-1" style={{ width: "80px" }}>
      <span className="text-[20px]">{content.icon as string}</span>
      <span className="text-[11px] font-medium text-[#1A1A1A]" style={{ fontFamily: "var(--font-body)" }}>{content.label as string}</span>
      <span className="text-[9px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-body)" }}>{content.sublabel as string}</span>
    </div>
  );
}

function FloatingMetricCard({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/60 px-3 py-2.5 shadow-lg" style={{ width: "130px", fontFamily: "var(--font-body)" }}>
      <div className="text-[9px] text-[#9CA3AF] uppercase tracking-wider">{content.label as string}</div>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span className="text-[14px] font-medium text-[#1A1A1A]">{content.value as string}</span>
        <span className="text-[11px] text-[#F97316]">{content.trend as string}</span>
      </div>
    </div>
  );
}

function FloatingChartCard({ content }: { content: Record<string, unknown> }) {
  const bars = content.bars as number[];
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/60 p-3 shadow-lg" style={{ width: "160px", fontFamily: "var(--font-body)" }}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[9px] text-[#9CA3AF] uppercase tracking-wider">{content.label as string}</span>
        <span className="text-[11px] font-medium text-[#1A1A1A]">{content.value as string}</span>
      </div>
      <div className="flex items-end gap-[3px] h-[28px]">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{
            height: `${h * 100}%`,
            backgroundColor: i === bars.length - 1 ? "#F97316" : "rgba(249,115,22,0.25)",
            transition: "height 600ms ease",
          }} />
        ))}
      </div>
    </div>
  );
}

function FloatingChipCard({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-full border border-white/60 px-4 py-2 shadow-lg flex items-center gap-2" style={{ fontFamily: "var(--font-body)" }}>
      <span className="text-[10px] text-[#9CA3AF]">{content.label as string}</span>
      <span className="text-[11px] font-medium text-[#1A1A1A]">{content.value as string}</span>
    </div>
  );
}

function renderFloatingCard(card: FloatingCard) {
  switch (card.type) {
    case "action":     return <FloatingActionCard content={card.content} />;
    case "donut":      return <FloatingDonutCard content={card.content} />;
    case "icon-card":  return <FloatingIconCard content={card.content} />;
    case "metric-card": return <FloatingMetricCard content={card.content} />;
    case "chart-card": return <FloatingChartCard content={card.content} />;
    case "chip":       return <FloatingChipCard content={card.content} />;
  }
}

// ── Mouse parallax hook ──────────────────────────────────────────────────
function useMouseParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) / rect.width,
        y: (e.clientY - cy) / rect.height,
      });
    };

    const onLeave = () => setOffset({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return { ref, offset };
}

// ── Hero section ─────────────────────────────────────────────────────────
export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref: parallaxRef, offset } = useMouseParallax();

  const advance = useCallback(() => {
    setActiveIndex(i => (i + 1) % STATES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, advance]);

  const state = STATES[activeIndex];
  const gradient = STATE_GRADIENTS[state];
  const cards = STATE_CARDS[state];

  return (
    <section
      className="relative w-full overflow-hidden rounded-[30px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      ref={parallaxRef}
    >
      {/* ── Orange gradient top with concentric arcs ───────────── */}
      <div
        className="relative w-full"
        style={{ height: "520px", minHeight: "420px" }}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${gradient.from} 0%, ${gradient.to} 60%, ${gradient.to}88 100%)`,
            transition: "background 1000ms ease",
          }}
        />

        {/* Concentric arc overlays */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute"
            style={{
              bottom: "-60%",
              left: "-10%",
              right: "-10%",
              height: "120%",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              transition: "background 1000ms ease",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "-70%",
              left: "-5%",
              right: "-5%",
              height: "120%",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              transition: "background 1000ms ease",
            }}
          />
        </div>

        {/* ── Floating cards ──────────────────────────────────── */}
        <div className="absolute inset-0 hidden lg:block">
          {cards.map((card, i) => {
            const depth = (i % 3) + 1;
            const px = offset.x * depth * 12;
            const py = offset.y * depth * 8;

            return (
              <div
                key={`${state}-${card.id}`}
                className="absolute z-10"
                style={{
                  ...card.position,
                  transform: `rotate(${card.rotation}deg) translate(${px}px, ${py}px)`,
                  transition: "transform 200ms ease-out",
                  animation: `hero-card-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms both`,
                }}
              >
                {renderFloatingCard(card)}
              </div>
            );
          })}
        </div>

        {/* ── Mascot ──────────────────────────────────────────── */}
        <div
          className="absolute left-1/2 z-20"
          style={{
            bottom: "15%",
            transform: `translateX(-50%) translate(${offset.x * 3}px, ${offset.y * 2}px)`,
            transition: "transform 300ms ease-out",
          }}
        >
          <Image
            src="/illustrations/default.svg"
            alt="Waldo the dalmatian"
            width={100}
            height={100}
            className="drop-shadow-lg"
            priority
          />
        </div>
      </div>

      {/* ── Curved transition to white ────────────────────────── */}
      <div className="relative" style={{ marginTop: "-80px" }}>
        <svg viewBox="0 0 1440 120" fill="none" className="w-full block" preserveAspectRatio="none">
          <path d="M0 120V60C0 60 360 0 720 0C1080 0 1440 60 1440 60V120H0Z" fill="#FAFAF8" />
        </svg>
      </div>

      {/* ── White content area ─────────────────────────────────── */}
      <div className="bg-[#FAFAF8] relative z-10">
        <div className="flex flex-col items-center px-6 sm:px-10 lg:px-20 pb-16 lg:pb-20" style={{ marginTop: "-20px" }}>
          {/* Headline */}
          <h1
            data-animate="headline"
            className="text-center text-[32px] sm:text-[40px] lg:text-[52px]"
            style={{
              fontFamily: "var(--font-headline)",
              lineHeight: 1.08,
              color: "#1A1A1A",
            }}
          >
            The first app that knows
            <br />
            how you feel and does
            <br />
            something about it.
          </h1>

          {/* Sub-copy */}
          <div className="mt-6 flex flex-col items-center gap-1.5 max-w-[520px]">
            <p
              className="text-center text-[15px] sm:text-[16px] text-[#6B6B68]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Waldo monitors your health wearable 24/7 and understands what your body is actually telling you.
            </p>
            <p
              className="text-center text-[15px] sm:text-[16px] text-[#1A1A1A] font-medium"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Then it does something about it.
            </p>
            <p
              className="text-center text-[13px] sm:text-[14px] text-[#9CA3AF] italic"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Your schedule. Your meals. Your sleep. Your stress. All of it.
            </p>
          </div>

          {/* CTA */}
          <a
            href="/waitlist"
            className="mt-8 inline-flex items-center gap-1.5 rounded-xl bg-[#1A1A1A] px-7 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-80 active:scale-[0.98]"
            style={{ fontFamily: "var(--font-body)", transition: "opacity 150ms, transform 100ms" }}
          >
            Let Waldo in →
          </a>

          {/* State indicator dots */}
          <div className="mt-8 flex items-center gap-2">
            {STATES.map((s, i) => {
              const isActive = i === activeIndex;
              const dotColor = STATE_GRADIENTS[s].dotColor;
              return (
                <button
                  key={s}
                  onClick={() => { setActiveIndex(i); setPaused(true); }}
                  aria-label={`Show ${s} state`}
                  className="transition-all duration-300"
                  style={{
                    width: isActive ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: isActive ? dotColor : "rgba(26,26,26,0.15)",
                    cursor: "pointer",
                    border: "none",
                    padding: 0,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile: simplified card showcase ───────────────────── */}
      <div className="lg:hidden absolute top-4 left-0 right-0 px-4" style={{ zIndex: 15 }}>
        <div className="flex justify-center gap-3 flex-wrap" key={state} style={{ animation: "content-enter 0.5s ease both" }}>
          {cards.slice(0, 3).map(card => (
            <div key={card.id} className="scale-[0.85] origin-top">
              {renderFloatingCard(card)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
