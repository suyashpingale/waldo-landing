"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type HeroState = {
  id: "recovery" | "form" | "weight";
  label: string;
  action: string;
  body: string;
  aside: string;
  score: number;
  scoreQuestion: string;
  tint: string;
  accent: string;
  wash: string;
  metrics: Array<{ label: string; value: string; note: string }>;
  connectors: Array<{ name: string; action: string }>;
};

const STATES: HeroState[] = [
  {
    id: "recovery",
    label: "Recovery",
    action: "The Brief",
    body: "Morning. Rough night - about 5h 40m of sleep and your HRV is sitting 12% below baseline. Nudged your 9am to 10:30 and 10am to noon. The afternoon looks fine.",
    aside: "already on it.",
    score: 63,
    scoreQuestion: "What did last night give you?",
    tint: "#ECFDF3",
    accent: "#22C55E",
    wash: "linear-gradient(145deg, rgba(34,197,94,0.13), rgba(250,250,248,0.2) 42%, rgba(249,115,22,0.08))",
    metrics: [
      { label: "Sleep", value: "5h 42m", note: "Short night. Morning protected." },
      { label: "HRV", value: "38ms down", note: "12% below baseline." },
      { label: "Resting HR", value: "62 bpm", note: "Slightly elevated." },
    ],
    connectors: [
      { name: "Apple Health", action: "Read at 6:12am" },
      { name: "Google Calendar", action: "2 events moved" },
      { name: "Slack", action: "Focus status set" },
    ],
  },
  {
    id: "form",
    label: "Form",
    action: "The Fetch",
    body: "Stress climbing since 1pm. Investor call at 3 stays - that one matters. Pulled the 4:30 and blocked the rest of your afternoon.",
    aside: "you didn't ask. you didn't need to.",
    score: 76,
    scoreQuestion: "What can you handle right now?",
    tint: "#FFF7ED",
    accent: "#F97316",
    wash: "linear-gradient(145deg, rgba(249,115,22,0.16), rgba(250,250,248,0.26) 44%, rgba(34,197,94,0.07))",
    metrics: [
      { label: "Circadian", value: "Aligned", note: "Best window is open." },
      { label: "Stress", value: "Climbing", note: "Pattern caught before the crash." },
      { label: "Motion", value: "4,200 steps", note: "Enough movement for now." },
    ],
    connectors: [
      { name: "Apple Health", action: "Stress flagged" },
      { name: "Google Calendar", action: "1 event pulled" },
      { name: "Gmail", action: "14 threads scanned" },
    ],
  },
  {
    id: "weight",
    label: "Weight",
    action: "The Adjustment",
    body: "22 hours of meetings this week - your second-heaviest in 8 weeks. Friday afternoon cleared. Retro moved to Monday.",
    aside: "already moved.",
    score: 84,
    scoreQuestion: "What is today asking of you?",
    tint: "#FFF1F2",
    accent: "#F43F5E",
    wash: "linear-gradient(145deg, rgba(244,63,94,0.15), rgba(250,250,248,0.28) 42%, rgba(249,115,22,0.08))",
    metrics: [
      { label: "The Stack", value: "6 meetings", note: "The morning is too dense." },
      { label: "Signal Pressure", value: "High", note: "Plenty of noise. Little of it urgent." },
      { label: "Load", value: "14/21", note: "Heavy enough to act." },
    ],
    connectors: [
      { name: "Google Calendar", action: "3 events moved" },
      { name: "Linear", action: "3 tasks reprioritised" },
      { name: "Gmail", action: "14 threads scanned" },
    ],
  },
];

function DonutRing({ score, accent }: { score: number; accent: string }) {
  const size = 116;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(26,26,26,0.08)"
        strokeWidth="12"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={accent}
        strokeWidth="12"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="49%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#1A1A1A"
        style={{ fontFamily: "var(--font-headline)", fontSize: 28 }}
      >
        {score}
      </text>
      <text
        x="50%"
        y="67%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#6B6B68"
        style={{ fontFamily: "var(--font-body)", fontSize: 11 }}
      >
        /100
      </text>
    </svg>
  );
}

function SignalCard({
  metric,
  index,
  accent,
}: {
  metric: HeroState["metrics"][number];
  index: number;
  accent: string;
}) {
  return (
    <div
      className="group rounded-[18px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8]/90 px-4 py-3 shadow-[0_16px_40px_rgba(26,26,26,0.08)] backdrop-blur transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(26,26,26,0.12)]"
      style={{ transform: `rotate(${index === 1 ? 1.2 : -1.4}deg)` }}
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
        <p
          className="text-[11px] font-medium text-[#6B6B68]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {metric.label}
        </p>
      </div>
      <p
        className="mt-1 text-[18px] text-[#1A1A1A]"
        style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}
      >
        {metric.value}
      </p>
      <p
        className="mt-2 text-[11px] text-[#6B6B68]"
        style={{ fontFamily: "var(--font-body)", lineHeight: 1.25 }}
      >
        {metric.note}
      </p>
    </div>
  );
}

function ConnectorPill({
  connector,
  accent,
}: {
  connector: HeroState["connectors"][number];
  accent: string;
}) {
  const initials = connector.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3 rounded-full border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8]/90 px-3 py-2 shadow-[0_14px_34px_rgba(26,26,26,0.07)] backdrop-blur">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-[#FAFAF8]"
        style={{ backgroundColor: accent, fontFamily: "var(--font-body)" }}
      >
        {initials}
      </span>
      <span className="min-w-0">
        <span
          className="block truncate text-[12px] font-medium text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {connector.name}
        </span>
        <span
          className="block truncate text-[11px] text-[#6B6B68]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {connector.action}
        </span>
      </span>
    </div>
  );
}

function ActionCard({ state }: { state: HeroState }) {
  return (
    <article className="rounded-[22px] border border-[rgba(26,26,26,0.09)] bg-[#FAFAF8] p-5 shadow-[0_26px_70px_rgba(26,26,26,0.13)]">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-[15px] text-[#FAFAF8]"
          style={{ backgroundColor: state.accent, fontFamily: "var(--font-headline)" }}
        >
          W
        </span>
        <div>
          <p
            className="text-[13px] font-semibold text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {state.action}
          </p>
          <p
            className="text-[11px] text-[#6B6B68]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Waldo acted 2m ago
          </p>
        </div>
      </div>
      <p
        className="mt-4 text-[14px] text-[#1A1A1A]"
        style={{ fontFamily: "var(--font-body)", lineHeight: 1.45 }}
      >
        {state.body}
      </p>
      <p
        className="mt-4 text-[13px] italic text-[#6B6B68]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {state.aside}
      </p>
    </article>
  );
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % STATES.length);
    }, 5200);

    return () => window.clearInterval(id);
  }, [paused]);

  const state = STATES[activeIndex];
  const parallax = useMemo(
    () => ({
      action: `translate(${pointer.x * -10}px, ${pointer.y * -8}px) rotate(-2deg)`,
      score: `translate(${pointer.x * 8}px, ${pointer.y * -7}px) rotate(1.5deg)`,
      signals: `translate(${pointer.x * 12}px, ${pointer.y * 9}px)`,
      connectors: `translate(${pointer.x * -7}px, ${pointer.y * 10}px)`,
      waldo: `translate(${pointer.x * 5}px, ${pointer.y * 4}px)`,
    }),
    [pointer],
  );

  return (
    <section
      className="relative isolate w-full overflow-hidden border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] px-5 py-12 sm:px-8 lg:min-h-[760px] lg:px-12 lg:py-16"
      style={{ borderRadius: 30 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setPointer({ x: 0, y: 0 });
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      }}
    >
      <div
        className="absolute inset-0 -z-10 transition-[background] duration-700"
        style={{ background: state.wash }}
      />
      <div className="absolute inset-x-8 top-8 -z-10 hidden h-[1px] bg-[linear-gradient(90deg,transparent,rgba(26,26,26,0.1),transparent)] lg:block" />

      <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
        <h1
          data-animate="headline"
          className="max-w-[760px] text-[39px] text-[#1A1A1A] sm:text-[52px] lg:text-[68px]"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.02 }}
        >
          The first app that knows
          <br />
          how you feel and does
          <br />
          something about it.
        </h1>

        <div className="mt-6 flex max-w-[690px] flex-col items-center gap-2 text-center">
          <p
            className="text-[15px] text-[#6B6B68] sm:text-[16px]"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.45 }}
          >
            Waldo monitors your health wearable 24/7 and understands what your body is actually telling you.
          </p>
          <p
            className="text-[15px] font-medium text-[#1A1A1A] sm:text-[16px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Then it does something about it.
          </p>
          <p
            className="text-[14px] italic text-[#6B6B68]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Your schedule. Your meals. Your sleep. Your stress. All of it.
          </p>
        </div>

        <Link
          href="/waitlist"
          className="mt-7 inline-flex min-h-[50px] items-center rounded-full bg-[#1A1A1A] px-6 text-[14px] text-[#FAFAF8] transition-[transform,background-color] duration-150 hover:bg-[#2B2B2B] active:scale-[0.98]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Let Waldo in -&gt;
        </Link>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-[430px] flex-col items-center gap-4 lg:hidden">
        <ActionCard state={state} />

        <div className="w-[260px]">
          <div className="relative mx-auto flex aspect-[1.35] w-full items-end justify-center rounded-[28px] border border-[rgba(26,26,26,0.08)] bg-[#1A1A1A] px-8 pt-8 shadow-[0_26px_70px_rgba(26,26,26,0.14)]">
            <Image
              src="/illustrations/default.svg"
              alt="Waldo"
              width={220}
              height={170}
              priority
              className="h-auto w-[78%] translate-y-3"
            />
          </div>
          <p
            className="mt-3 text-center text-[13px] italic text-[#6B6B68]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Waldo was already looking.
          </p>
        </div>

        <div className="w-full rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8]/90 p-4 text-center shadow-[0_18px_44px_rgba(26,26,26,0.09)] backdrop-blur">
          <DonutRing score={state.score} accent={state.accent} />
          <p
            className="mt-1 text-[16px] text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {state.label}
          </p>
          <p
            className="mx-auto mt-1 max-w-[180px] text-[12px] italic text-[#6B6B68]"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.25 }}
          >
            {state.scoreQuestion}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-3">
          {state.metrics.map((metric, index) => (
            <SignalCard key={metric.label} metric={metric} index={index} accent={state.accent} />
          ))}
        </div>

        <div className="flex w-full flex-col gap-2">
          {state.connectors.map((connector) => (
            <ConnectorPill key={connector.name} connector={connector} accent={state.accent} />
          ))}
        </div>
      </div>

      <div className="relative mx-auto hidden min-h-[520px] w-full max-w-[940px] lg:-mt-[70px] lg:block">
        <div
          className="absolute left-1/2 top-[190px] z-20 w-[260px] -translate-x-1/2 sm:top-[170px] sm:w-[310px] lg:top-[166px] lg:w-[340px]"
          style={{
            transform: `translateX(-50%) ${parallax.waldo}`,
            transition: "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div className="relative mx-auto flex aspect-[1.35] w-full items-end justify-center rounded-[28px] border border-[rgba(26,26,26,0.08)] bg-[#1A1A1A] px-8 pt-8 shadow-[0_32px_90px_rgba(26,26,26,0.18)]">
            <Image
              src="/illustrations/default.svg"
              alt="Waldo"
              width={220}
              height={170}
              priority
              className="h-auto w-[78%] translate-y-3"
            />
          </div>
          <p
            className="mt-4 text-center text-[13px] italic text-[#6B6B68]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Waldo was already looking.
          </p>
        </div>

        <div
          className="absolute left-0 top-0 z-30 w-full max-w-[390px] sm:left-[2%] lg:left-[1%] lg:top-[24px]"
          style={{
            transform: parallax.action,
            transition: "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <ActionCard state={state} />
        </div>

        <div
          className="absolute right-0 top-[235px] z-30 w-[210px] rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8]/90 p-4 text-center shadow-[0_22px_60px_rgba(26,26,26,0.1)] backdrop-blur sm:right-[4%] sm:top-[210px] lg:right-[3%] lg:top-[52px]"
          style={{
            transform: parallax.score,
            transition: "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <DonutRing score={state.score} accent={state.accent} />
          <p
            className="mt-1 text-[16px] text-[#1A1A1A]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {state.label}
          </p>
          <p
            className="mx-auto mt-1 max-w-[150px] text-[12px] italic text-[#6B6B68]"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.25 }}
          >
            {state.scoreQuestion}
          </p>
        </div>

        <div
          className="absolute bottom-[72px] left-0 z-30 grid w-full max-w-[620px] grid-cols-1 gap-3 sm:bottom-[42px] sm:grid-cols-3 lg:bottom-[58px] lg:left-[2%]"
          style={{
            transform: parallax.signals,
            transition: "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {state.metrics.map((metric, index) => (
            <SignalCard key={metric.label} metric={metric} index={index} accent={state.accent} />
          ))}
        </div>

        <div
          className="absolute bottom-0 right-0 z-30 flex w-full max-w-[280px] flex-col gap-2 sm:bottom-[28px] lg:right-[5%]"
          style={{
            transform: parallax.connectors,
            transition: "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {state.connectors.map((connector) => (
            <ConnectorPill key={connector.name} connector={connector} accent={state.accent} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {STATES.map((candidate, index) => (
          <button
            key={candidate.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="h-2 rounded-full transition-[width,background-color,opacity] duration-300"
            style={{
              width: index === activeIndex ? 26 : 8,
              backgroundColor: index === activeIndex ? state.accent : "rgba(26,26,26,0.18)",
              opacity: index === activeIndex ? 1 : 0.7,
            }}
            aria-label={`Show ${candidate.label} state`}
          />
        ))}
      </div>
    </section>
  );
}
