"use client";

import { useState, useEffect, useCallback } from "react";

// ── State definitions ────────────────────────────────────────────────────
type HeroState = "recovery" | "form" | "weight";

const STATES: HeroState[] = ["recovery", "form", "weight"];
const ROTATE_MS = 5000;

const STATE_CONFIG = {
  recovery: {
    wash: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.08) 0%, transparent 70%)",
    dotColor: "#22C55E",
    action: {
      label: "The Brief",
      time: "6:12am",
      body: "Morning. Rough night — about 5h 40m of sleep and your HRV is sitting 12% below baseline. Nudged your 9am to 10:30 and 10am to noon. The afternoon looks fine.",
      aside: "already on it.",
    },
    donut: { score: 63, max: 100, label: "Recovery", question: "What did last night give you?", color: "#F97316" },
    chips: [
      { label: "Sleep", value: "5h 42m" },
      { label: "HRV", value: "38ms ↓" },
      { label: "Resting HR", value: "62 bpm" },
    ],
    connectors: [
      { name: "Apple Health", action: "Read at 6:12am" },
      { name: "Google Calendar", action: "2 events moved" },
      { name: "Slack", action: "Focus status set" },
    ],
  },
  form: {
    wash: "radial-gradient(ellipse at 50% 40%, rgba(249,115,22,0.08) 0%, transparent 70%)",
    dotColor: "#F97316",
    action: {
      label: "The Fetch",
      time: "1:47pm",
      body: "Stress climbing since 1pm. Investor call at 3 stays — that one matters. Pulled the 4:30 and blocked the rest of your afternoon.",
      aside: "you didn't ask. you didn't need to.",
    },
    donut: { score: 76, max: 100, label: "Form", question: "What can you handle right now?", color: "#F97316" },
    chips: [
      { label: "Circadian", value: "Aligned" },
      { label: "Stress", value: "Climbing ↑" },
      { label: "Motion", value: "4,200 steps" },
    ],
    connectors: [
      { name: "Apple Health", action: "Stress flagged" },
      { name: "Google Calendar", action: "1 event pulled" },
      { name: "Gmail", action: "14 threads scanned" },
    ],
  },
  weight: {
    wash: "radial-gradient(ellipse at 50% 40%, rgba(244,63,94,0.08) 0%, transparent 70%)",
    dotColor: "#F43F5E",
    action: {
      label: "The Adjustment",
      time: "5:30pm",
      body: "22 hours of meetings this week — your second-heaviest in 8 weeks. Friday afternoon cleared. Retro moved to Monday.",
      aside: "already moved.",
    },
    donut: { score: 84, max: 100, label: "Weight", question: "What is today asking of you?", color: "#F43F5E" },
    chips: [
      { label: "The Stack", value: "6 meetings" },
      { label: "Signal Pressure", value: "High" },
      { label: "Load", value: "14/21" },
    ],
    connectors: [
      { name: "Google Calendar", action: "3 events moved" },
      { name: "Linear", action: "3 tasks reprioritised" },
      { name: "Gmail", action: "14 threads scanned" },
    ],
  },
} as const;

// ── Donut ring ───────────────────────────────────────────────────────────
function DonutRing({ score, max, color }: { score: number; max: number; color: string }) {
  const size = 120;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / max) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="rgba(26,26,26,0.06)" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeDashoffset={circumference / 4}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 800ms ease" }}
      />
      <text
        x={size / 2} y={size / 2 - 4}
        textAnchor="middle" dominantBaseline="central"
        fill="#1A1A1A"
        style={{ fontFamily: "var(--font-headline)", fontSize: "28px" }}
      >
        {score}
      </text>
      <text
        x={size / 2} y={size / 2 + 18}
        textAnchor="middle" dominantBaseline="central"
        fill="#9CA3AF"
        style={{ fontFamily: "var(--font-body)", fontSize: "10px" }}
      >
        / {max}
      </text>
    </svg>
  );
}

// ── Signal chip ──────────────────────────────────────────────────────────
function SignalChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-black/8 bg-white/60 backdrop-blur-sm px-3 py-1.5"
      style={{ fontFamily: "var(--font-body)", fontSize: "12px" }}
    >
      <span className="text-[#9CA3AF]">{label}</span>
      <span className="text-[#1A1A1A] font-medium">{value}</span>
    </div>
  );
}

// ── Connector icon ───────────────────────────────────────────────────────
function ConnectorBadge({ name, action }: { name: string; action: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2);
  return (
    <div className="group relative flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-lg bg-[#1A1A1A]/5 flex items-center justify-center text-[10px] font-medium text-[#1A1A1A]/60 shrink-0"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {initials}
      </div>
      <div
        className="hidden sm:block text-[11px] text-[#9CA3AF]"
        style={{ fontFamily: "var(--font-body)", fontStyle: "italic" }}
      >
        {action}
      </div>
    </div>
  );
}

// ── Action card ──────────────────────────────────────────────────────────
function ActionCard({ label, time, body, aside }: {
  label: string; time: string; body: string; aside: string;
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-black/8 p-5 shadow-sm max-w-[380px] w-full"
      style={{ transform: "rotate(-1deg)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
          </svg>
        </div>
        <span
          className="text-[13px] font-medium text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </span>
        <span
          className="text-[11px] text-[#9CA3AF] ml-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {time}
        </span>
      </div>
      <p
        className="text-[14px] text-[#1A1A1A] leading-[1.45]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {body}
      </p>
      <p
        className="text-[13px] text-[#9CA3AF] mt-3 italic"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {aside}
      </p>
    </div>
  );
}

// ── Hero section ─────────────────────────────────────────────────────────
export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setActiveIndex(i => (i + 1) % STATES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, advance]);

  const state = STATES[activeIndex];
  const config = STATE_CONFIG[state];

  return (
    <section
      className="relative w-full overflow-hidden rounded-[30px]"
      style={{ background: "#FAFAF8" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Colour wash per state */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: config.wash,
          transition: "background 800ms ease",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
        {/* ── Headline ─────────────────────────────────────────── */}
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

        {/* ── Sub-copy ─────────────────────────────────────────── */}
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

        {/* ── CTA ──────────────────────────────────────────────── */}
        <a
          href="/waitlist"
          className="mt-8 inline-flex items-center gap-1.5 rounded-xl bg-[#1A1A1A] px-7 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-80 active:scale-[0.98]"
          style={{ fontFamily: "var(--font-body)", transition: "opacity 150ms, transform 100ms" }}
        >
          Let Waldo in →
        </a>

        {/* ── Floating elements stage ──────────────────────────── */}
        <div className="mt-14 lg:mt-20 w-full max-w-[900px]">
          <div
            className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-10"
            key={state}
            style={{ animation: "content-enter 0.6s ease both" }}
          >
            {/* Action card */}
            <ActionCard {...config.action} />

            {/* Right column: donut + chips + connectors */}
            <div className="flex flex-col items-center gap-6">
              {/* Donut ring */}
              <div className="flex flex-col items-center gap-1">
                <DonutRing {...config.donut} />
                <span
                  className="text-[14px] font-medium text-[#1A1A1A] mt-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {config.donut.label}
                </span>
                <span
                  className="text-[12px] text-[#9CA3AF] italic"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {config.donut.question}
                </span>
              </div>

              {/* Signal chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {config.chips.map(c => (
                  <SignalChip key={c.label} {...c} />
                ))}
              </div>

              {/* Connector badges */}
              <div className="flex flex-col gap-2">
                {config.connectors.map(c => (
                  <ConnectorBadge key={c.name} {...c} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── State indicator dots ─────────────────────────────── */}
        <div className="mt-10 flex items-center gap-2">
          {STATES.map((s, i) => {
            const isActive = i === activeIndex;
            const dotColor = STATE_CONFIG[s].dotColor;
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
    </section>
  );
}
