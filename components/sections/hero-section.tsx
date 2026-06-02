"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import appleHealthAsset from "@/components/assets/health-apple -watch.png";
import whoopAsset from "@/components/assets/health-whoop.png";

type MetricKey = "recovery" | "form" | "weight";

type MetricState = {
  key: MetricKey;
  label: string;
  value: number;
  question: string;
  read: string;
  period: string;
  zoneColor: string;
  detail: Array<{ label: string; value: string; read: string }>;
};

const METRICS: MetricState[] = [
  {
    key: "recovery",
    label: "Recovery",
    value: 63,
    question: "What did last night give you?",
    read: "rested enough to push today.",
    period: "past",
    zoneColor: "#22C55E",
    detail: [
      { label: "Sleep", value: "5h 42m", read: "short, but workable." },
      { label: "HRV", value: "38ms", read: "below baseline." },
      { label: "Resting HR", value: "62", read: "steady enough." },
    ],
  },
  {
    key: "form",
    label: "Form",
    value: 76,
    question: "What can you handle right now?",
    read: "steady, with one rough edge.",
    period: "present",
    zoneColor: "#FB943F",
    detail: [
      { label: "Stress", value: "0.58", read: "watching the climb." },
      { label: "Motion", value: "4,200", read: "enough movement." },
      { label: "Circadian", value: "aligned", read: "morning is usable." },
    ],
  },
  {
    key: "weight",
    label: "Weight",
    value: 84,
    question: "What is today asking of you?",
    read: "heavy day; Waldo trims demand.",
    period: "demand",
    zoneColor: "#F43F5E",
    detail: [
      { label: "The Stack", value: "6 blocks", read: "too front-loaded." },
      { label: "Signal Pressure", value: "high", read: "triage only." },
      { label: "Load", value: "14/21", read: "strain is real." },
    ],
  },
];

const SOURCE_APPS = [
  {
    alt: "Apple Health watch screen",
    image: appleHealthAsset,
    label: "Apple Health",
    read: "read at 6:12am.",
    value: "24/7",
  },
  {
    alt: "WHOOP sleep data screen",
    image: whoopAsset,
    label: "WHOOP",
    read: "sleep context imported.",
    value: "8:44",
  },
] as const;

const POSITIONS = [
  { left: "50%", top: "8%", x: "-50%", rotate: "-1deg", scale: 1.04, depth: 16, opacity: 1 },
  { left: "13%", top: "21%", x: "0", rotate: "-7deg", scale: 0.93, depth: 9, opacity: 0.88 },
  { left: "77%", top: "22%", x: "0", rotate: "6deg", scale: 0.93, depth: 11, opacity: 0.88 },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function MetricDonut({ metric, compact = false }: { compact?: boolean; metric: MetricState }) {
  const size = compact ? 112 : 132;
  const radius = compact ? 43 : 50;
  const stroke = compact ? 10 : 12;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - metric.value / 100);

  return (
    <div className="relative flex shrink-0 items-center justify-center rounded-full bg-white p-3 shadow-[inset_0_0_0_1px_var(--border-default)]">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${metric.label} ${metric.value} percent, ${metric.read}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(26,26,26,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={metric.zoneColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - stroke * 1.35}
          fill="#FAFAF8"
          stroke="rgba(26,26,26,0.08)"
          strokeWidth="1"
        />
        <text
          x={size / 2}
          y={size / 2 - 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1A1A1A"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: compact ? 24 : 28,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {metric.value}%
        </text>
        <text
          x={size / 2}
          y={size / 2 + (compact ? 22 : 25)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#6B6B68"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: compact ? 10 : 11,
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          {metric.label}
        </text>
      </svg>
    </div>
  );
}

function MetricCard({
  active,
  metric,
  mouse,
  position,
  reducedMotion,
}: {
  active: boolean;
  metric: MetricState;
  mouse: { x: number; y: number };
  position: (typeof POSITIONS)[number];
  reducedMotion: boolean;
}) {
  const parallaxX = reducedMotion ? 0 : mouse.x * position.depth;
  const parallaxY = reducedMotion ? 0 : mouse.y * position.depth;

  return (
    <article
      className="hero-floating-card absolute hidden w-[min(250px,24vw)] rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] p-4 text-left shadow-[0_22px_46px_rgba(26,26,26,.16)] md:block xl:w-[258px]"
      style={
        {
          left: position.left,
          opacity: position.opacity,
          top: position.top,
          "--card-rotate": position.rotate,
          "--card-scale": position.scale,
          "--parallax-x": `${parallaxX}px`,
          "--parallax-y": `${parallaxY}px`,
          transform: `translate3d(calc(${position.x} + ${parallaxX}px), ${parallaxY}px, 0) rotate(${position.rotate}) scale(${position.scale})`,
          zIndex: active ? 12 : 8,
        } as CSSProperties
      }
    >
      <div className="flex items-start gap-3">
        <MetricDonut compact metric={metric} />
        <div className="min-w-0 pt-1">
          <p
            className="text-[13px] font-medium text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
          >
            {metric.label}
          </p>
          <p
            className="mt-1 text-[12px] text-[#6B6B68]"
            style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.3 }}
          >
            {metric.question}
          </p>
        </div>
      </div>
      <p
        className="mt-3 text-[13px] text-[#9A9A96]"
        style={{
          fontFamily: "var(--font-body)",
          fontStyle: "oblique 10deg",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        {metric.value}% — {metric.read}
      </p>
    </article>
  );
}

function MobileMetricCard({ metric }: { metric: MetricState }) {
  return (
    <article className="mx-auto flex w-full max-w-[342px] items-center gap-4 rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] p-4 text-left shadow-[0_22px_46px_rgba(26,26,26,.13)] md:hidden">
      <MetricDonut compact metric={metric} />
      <div className="min-w-0">
        <p
          className="text-[14px] font-medium text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
        >
          {metric.label} {metric.value}%
        </p>
        <p
          className="mt-1 text-[13px] text-[#6B6B68]"
          style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.35 }}
        >
          {metric.question}
        </p>
        <p
          className="mt-2 text-[12px] text-[#9A9A96]"
          style={{ fontFamily: "var(--font-body)", fontStyle: "oblique 10deg", letterSpacing: "-0.01em", lineHeight: 1.3 }}
        >
          {metric.read}
        </p>
      </div>
    </article>
  );
}

function SignalCard({ metric }: { metric: MetricState }) {
  return (
    <article className="absolute left-[2%] top-[60%] hidden w-[222px] rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] p-4 shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.05)] xl:block">
      <p
        className="text-[13px] font-medium text-[#1A1A1A]"
        style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
      >
        {metric.period}
      </p>
      <div className="mt-4 grid gap-2">
        {metric.detail.map((item) => (
          <div
            key={item.label}
            className="rounded-[12px] bg-white px-3 py-2 shadow-[inset_0_0_0_1px_rgba(26,26,26,0.08)]"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span
                className="text-[12px] text-[#6B6B68]"
                style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
              >
                {item.label}
              </span>
              <span
                className="text-[13px] font-medium text-[#1A1A1A]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {item.value}
              </span>
            </div>
            <p
              className="mt-1 text-[11px] text-[#9A9A96]"
              style={{ fontFamily: "var(--font-body)", fontStyle: "oblique 10deg", letterSpacing: "-0.01em", lineHeight: 1.25 }}
            >
              {item.read}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function SourceAppCard({
  card,
  index,
  mouse,
  reducedMotion,
}: {
  card: (typeof SOURCE_APPS)[number];
  index: number;
  mouse: { x: number; y: number };
  reducedMotion: boolean;
}) {
  const depth = index === 0 ? 7 : 10;
  const parallaxX = reducedMotion ? 0 : mouse.x * depth;
  const parallaxY = reducedMotion ? 0 : mouse.y * depth;

  return (
    <article
      className="hero-floating-card absolute hidden w-[164px] rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] p-3 shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.05)] sm:block"
      style={
        {
          left: index === 0 ? "16%" : "72%",
          top: index === 0 ? "60%" : "58%",
          "--card-rotate": index === 0 ? "5deg" : "-5deg",
          "--card-scale": 1,
          "--parallax-x": `${parallaxX}px`,
          "--parallax-y": `${parallaxY}px`,
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) rotate(${index === 0 ? "5deg" : "-5deg"})`,
          zIndex: 9,
        } as CSSProperties
      }
    >
      <div className="h-[82px] overflow-hidden rounded-[12px] bg-white shadow-[inset_0_0_0_1px_rgba(26,26,26,0.08)]">
        <Image
          src={card.image}
          alt={card.alt}
          width={148}
          height={92}
          className="h-full w-full object-cover object-top"
          sizes="148px"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p
          className="truncate text-[12px] font-medium text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.15 }}
        >
          {card.label}
        </p>
        <p
          className="text-[12px] font-medium text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-body)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", lineHeight: 1.15 }}
        >
          {card.value}
        </p>
      </div>
      <p
        className="mt-1 text-[11px] text-[#9A9A96]"
        style={{ fontFamily: "var(--font-body)", fontStyle: "oblique 10deg", letterSpacing: "-0.01em", lineHeight: 1.25 }}
      >
        {card.read}
      </p>
    </article>
  );
}

function StateDots({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-7 flex items-center justify-center gap-2" aria-label="Hero state selector">
      {METRICS.map((metric, index) => (
        <button
          key={metric.key}
          type="button"
          aria-label={`Show ${metric.label}`}
          aria-current={active === index}
          className={`h-2 rounded-full transition-[width,background-color,opacity] duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
            active === index ? "w-8 bg-[#1A1A1A]" : "w-2 bg-[rgba(26,26,26,0.22)]"
          }`}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % METRICS.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const orderedMetrics = useMemo(() => {
    return METRICS.map((metric, index) => {
      const offset = (index - active + METRICS.length) % METRICS.length;
      return { metric, position: POSITIONS[offset], offset };
    });
  }, [active]);

  const activeMetric = METRICS[active];

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[860px] w-screen flex-col overflow-hidden bg-[#F4F3F0] px-4 pb-14 pt-[132px] sm:min-h-[880px] lg:min-h-[920px] lg:pt-[116px]"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
      onPointerMove={(event) => {
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
        });
      }}
      onPointerLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <div className="hero-orange-dome pointer-events-none absolute left-1/2 top-0 z-0 h-[clamp(360px,42vw,560px)] w-[min(1180px,calc(100vw-24px))] -translate-x-1/2 rounded-b-[999px]" />
      <div className="pointer-events-none absolute left-1/2 top-[84px] z-0 h-[min(520px,46vw)] w-[min(980px,calc(100vw-40px))] -translate-x-1/2 rounded-b-[999px] border border-[rgba(251,148,63,0.12)]" />

      <div className="relative z-10 mx-auto h-[318px] w-full max-w-[1160px] sm:h-[350px] lg:h-[384px]">
        {orderedMetrics.map(({ metric, position, offset }) => (
          <MetricCard
            key={metric.key}
            active={offset === 0}
            metric={metric}
            mouse={mouse}
            position={position}
            reducedMotion={reducedMotion}
          />
        ))}

        <MobileMetricCard metric={activeMetric} />

        {SOURCE_APPS.map((card, index) => (
          <SourceAppCard
            key={card.label}
            card={card}
            index={index}
            mouse={mouse}
            reducedMotion={reducedMotion}
          />
        ))}

        <SignalCard metric={activeMetric} />

        <div className="pointer-events-none absolute left-1/2 top-[calc(100%-120px)] z-10 w-[112px] -translate-x-1/2 sm:top-[calc(100%-128px)] sm:w-[132px] lg:top-[calc(100%-142px)] lg:w-[148px]">
          <Image
            src="/illustrations/default.svg"
            alt="Waldo"
            width={169}
            height={131}
            priority
            className="h-auto w-full drop-shadow-[0_18px_28px_rgba(26,26,26,0.18)]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 flex w-full max-w-[780px] flex-col items-center text-center sm:mt-5 lg:mt-8">
        <h1
          data-animate="headline"
          className="text-[#1A1A1A]"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "clamp(2.25rem,1rem + 5vw,3.875rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.06,
          }}
        >
          The first app that knows
          <br />
          how you feel and does
          <br />
          something about it.
        </h1>

        <div
          className="mt-7 max-w-[58ch] text-[16px] text-[#6B6B68]"
          style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.5 }}
        >
          <p>Waldo monitors your health wearable 24/7 and understands what your body is actually telling you.</p>
          <p className="mt-1 font-medium text-[#1A1A1A]">Then it does something about it.</p>
          <p
            className="mt-3 text-[13px] text-[#9A9A96]"
            style={{ fontStyle: "oblique 10deg", lineHeight: 1.3 }}
          >
            quietly, before the day gets heavy.
          </p>
        </div>

        <Link
          href="/waitlist"
          className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#1A1A1A] px-8 text-[16px] font-medium text-[#FAFAF8] shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.05)] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-px hover:bg-[#272725] active:scale-[0.98] sm:px-9"
          style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
        >
          Let Waldo in →
        </Link>

        <StateDots active={active} onSelect={setActive} />
      </div>
    </section>
  );
}
