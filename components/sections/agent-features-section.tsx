"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Aside, withHighlights } from "@/components/landing-primitives";

const SCROLL_DURATION_MS = 1000;

type AgentSlide = {
  label: string;
  headline: string;
  description: string;
  wide?: boolean;
  aside?: string;
  visual: ReactNode;
};

const connectors = [
  ["AH", "Apple Health", "Read at 6:12am", "V1"],
  ["GC", "Google Calendar", "2 events moved", "V1"],
  ["GM", "Gmail", "14 threads scanned", "V1"],
  ["TD", "Todoist", "3 tasks reprioritised", "V1"],
  ["LN", "Linear", "Sprint tickets pulled", "V1"],
  ["AC", "Apple Calendar", "All calendars synced", "V1"],
  ["OM", "Open-Meteo", "Weather and UV fed to Brief", "V1"],
  ["TG", "Telegram", "Brief delivered", "V1"],
  ["SL", "Slack", "Focus status set", "Phase 2"],
  ["SP", "Spotify", "Mood: calm, focused", "Phase 2"],
  ["ST", "Strava", "Recovery day suggested", "Phase 2"],
  ["GH", "GitHub", "PR load: 3 reviews pending", "Phase 2"],
  ["GD", "Google Drive", "Doc search across 200 files", "Phase 2"],
] as const;

const overnightLog = [
  ["11:14pm", "The Close: day summary delivered"],
  ["11:15pm", "Patrol: quiet hours activated"],
  ["2:00am", "Dreaming Mode: consolidated 14 memories"],
  ["2:01am", 'Promoted pattern: "Tuesday crashes" (3+ occurrences)'],
  ["2:02am", "Pre-computed tomorrow's Brief (2.3 seconds)"],
  ["6:12am", "Patrol: scanned overnight HRV"],
  ["6:14am", "Brief ready. Waiting for your alarm."],
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

function easeInOutQuad(progress: number) {
  return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
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

function ChatVisual() {
  return (
    <div className="grid h-full gap-3 lg:grid-cols-[0.96fr_1.04fr]">
      <div className="flex flex-col justify-end gap-3">
        <div className="ml-auto max-w-[82%] rounded-[18px] bg-[var(--ink)] px-4 py-3 text-[var(--surface-t2)]">
          <p className="type-caption">How did I sleep?</p>
        </div>
        <div className="max-w-[90%] rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t1)] px-4 py-3">
          <p className="type-caption text-[var(--ink)]">Not great, honestly.</p>
        </div>
        <div className="max-w-[94%] rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="type-label text-[var(--ink)]">Sleep</p>
            <p className="type-data text-[var(--ink)]">5h 42m</p>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {[42, 70, 36, 58, 28].map((height, index) => (
              <span key={index} className="block rounded-full bg-[var(--surface-t4)]" style={{ height: `${height}px` }} />
            ))}
          </div>
          <Aside className="mt-3">deep sleep below baseline.</Aside>
        </div>
        <div className="max-w-[90%] rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t1)] px-4 py-3">
          <p className="type-caption text-[var(--text-secondary)]">
            Recovery is sitting at 61 today. I&apos;ve already pushed your 9am.
          </p>
        </div>
      </div>

      <div className="hidden flex-col justify-end gap-3 lg:flex">
        <div className="ml-auto max-w-[86%] rounded-[18px] bg-[var(--ink)] px-4 py-3 text-[var(--surface-t2)]">
          <p className="type-caption">Prep me for my 3pm</p>
        </div>
        <div className="rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
          <p className="type-label text-[var(--ink)]">Board review</p>
          <div className="mt-3 grid gap-2">
            {["8 attendees", "90 minutes", "Form is 72, steady enough", "3 follow-ups from last week"].map((line) => (
              <div key={line} className="rounded-[8px] bg-[var(--surface-t3)] px-3 py-2">
                <p className="type-caption text-[var(--text-secondary)]">{line}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="type-caption rounded-full bg-[var(--ink)] px-3 py-2 text-[var(--surface-t2)]">View prep brief</span>
            <span className="type-caption rounded-full bg-[var(--surface-t3)] px-3 py-2 text-[var(--text-secondary)]">Skip</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DraftsVisual() {
  const drafts = [
    ["Document", "Q3 Engineering Retro", "Based on: Linear tickets, Calendar, team velocity", "Export to Drive"],
    ["Email", "Re: Product strategy review", '"Hey Suyash, We do not care if you received..."', "Send requires your tap"],
    ["Task", "Review deck before Friday", "Priority: High, Due: Thu, Source: Calendar follow-up", "Created in Todoist"],
  ] as const;

  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {drafts.map(([type, title, body, action]) => (
        <div key={title} className="rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="type-caption text-[var(--text-tertiary)]">{type}</p>
            <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
          </div>
          <p className="type-label mt-3 text-[var(--ink)]">{title}</p>
          <p className="type-caption tone-secondary mt-2">{body}</p>
          <p className="type-aside tone-tertiary mt-3">{action}</p>
        </div>
      ))}
    </div>
  );
}

function ConnectorsVisual() {
  return (
    <div className="grid h-full content-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {connectors.map(([initials, name, label, phase]) => (
        <div key={name} className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[var(--border-default)] bg-[var(--surface-t2)]">
              <span className="type-caption text-[var(--ink)]">{initials}</span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="type-caption truncate text-[var(--ink)]">{name}</p>
                <span className="type-caption rounded-full bg-[var(--surface-t3)] px-2 py-0.5 text-[var(--text-tertiary)]">
                  {phase}
                </span>
              </div>
              <p className="type-caption tone-secondary mt-1">{label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OvernightVisual() {
  return (
    <div className="flex h-full flex-col justify-center rounded-[18px] bg-[var(--dark-t2)] p-4 text-[var(--on-dark)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
        <p className="type-caption uppercase text-[var(--on-dark-muted)]">Overnight patrol</p>
      </div>
      <div className="grid gap-2">
        {overnightLog.map(([time, line]) => (
          <div key={time + line} className="grid grid-cols-[62px_1fr] gap-3 rounded-[10px] bg-[var(--dark-t1)] px-3 py-2">
            <p className="type-data text-[var(--on-dark-muted)]">{time}</p>
            <p className="type-caption text-[var(--on-dark)]">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const slides: AgentSlide[] = [
  {
    label: "Chat",
    headline: "Ask anything. Or don't.",
    description:
      "Text or voice. Ask about your health, your schedule, your tasks, or why Waldo moved your 9am. But you never have to. *Waldo works without being asked.* Chat is there when you want to dig in.",
    wide: true,
    aside: "there when you want the why.",
    visual: <ChatVisual />,
  },
  {
    label: "Drafts",
    headline: "Waldo drafts. You approve.",
    description:
      "Emails, documents, tasks, spreadsheet entries. Waldo creates them. You review them. *Emails never auto-send.* Tasks never auto-complete. Some things always need a human.",
    aside: "hands off until your tap.",
    visual: <DraftsVisual />,
  },
  {
    label: "Connectors",
    headline: "One agent. Every tool you use.",
    description:
      "Calendar. Email. Tasks. Code. Music. Exercise. Weather. And your body. *One agent reading all of them*, writing back to the ones that matter.",
    wide: true,
    aside: "everything you use, connected to everything you feel.",
    visual: <ConnectorsVisual />,
  },
  {
    label: "Overnight",
    headline: "Waldo works while you sleep.",
    description:
      "At 2am, Waldo dreams. It consolidates what it learned, finds patterns, and pre-builds your morning. *By the time your alarm goes off, it is already done.*",
    aside: "start a task. take a nap. come back to it handled.",
    visual: <OvernightVisual />,
  },
];

export function AgentFeaturesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const offsetsRef = useRef<number[]>([]);
  const animationRef = useRef<number | null>(null);
  const scrollSnapTypeRef = useRef<string | null>(null);
  const scrollDebounceRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const measureOffsets = () => {
    const firstOffset = itemRefs.current[0]?.offsetLeft ?? 0;
    offsetsRef.current = itemRefs.current.map((item) => Math.max(0, (item?.offsetLeft ?? firstOffset) - firstOffset));
  };

  useEffect(() => {
    measureOffsets();
    window.addEventListener("resize", measureOffsets);
    return () => window.removeEventListener("resize", measureOffsets);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
      if (scrollDebounceRef.current) window.clearTimeout(scrollDebounceRef.current);
    };
  }, []);

  const finishAnimation = () => {
    const viewport = viewportRef.current;
    if (viewport && scrollSnapTypeRef.current !== null) {
      viewport.style.scrollSnapType = scrollSnapTypeRef.current;
      scrollSnapTypeRef.current = null;
    }
    animationRef.current = null;
  };

  const animateTo = (index: number) => {
    const viewport = viewportRef.current;
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const to = offsetsRef.current[nextIndex] ?? 0;
    setActive(nextIndex);

    if (!viewport) return;
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);

    const from = viewport.scrollLeft;
    const distance = to - from;

    if (reducedMotion || Math.abs(distance) < 1) {
      viewport.scrollLeft = to;
      return;
    }

    const startTime = performance.now();
    scrollSnapTypeRef.current = viewport.style.scrollSnapType || window.getComputedStyle(viewport).scrollSnapType;
    viewport.style.scrollSnapType = "none";

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / SCROLL_DURATION_MS);
      viewport.scrollLeft = from + distance * easeInOutQuad(progress);

      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(step);
        return;
      }

      viewport.scrollLeft = to;
      finishAnimation();
    };

    animationRef.current = window.requestAnimationFrame(step);
  };

  const updateActiveFromScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nearest = offsetsRef.current.reduce(
      (best, offset, index) => {
        const distance = Math.abs(viewport.scrollLeft - offset);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: active, distance: Number.POSITIVE_INFINITY },
    ).index;

    if (nearest !== active) setActive(nearest);
  };

  const handleScroll = () => {
    if (scrollDebounceRef.current) window.clearTimeout(scrollDebounceRef.current);
    scrollDebounceRef.current = window.setTimeout(updateActiveFromScroll, 200);
  };

  return (
    <section id="agent-features" className="waldo-agent-gallery w-screen max-w-none scroll-mt-28 overflow-hidden py-10 lg:py-14">
      <div className="px-[var(--agent-side-padding)]">
        <p className="type-eyebrow mb-4 text-[var(--text-tertiary)]">Agent features</p>
        <h2 className="type-h1 max-w-[760px] text-[var(--ink)]" data-animate="headline">
          One agent. Twenty-four tools.
          <br />
          Your body is just the beginning.
        </h2>
      </div>

      <div
        ref={viewportRef}
        className="mt-12 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory", scrollPaddingInline: "var(--agent-side-padding)" }}
        aria-label="Agent features gallery"
        onScroll={handleScroll}
      >
        <ul
          role="list"
          className="grid w-fit grid-flow-col gap-[var(--agent-card-gap)] px-[var(--agent-side-padding)]"
        >
          {slides.map((slide, index) => (
            <li
              key={slide.label}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={`${slide.wide ? "w-[var(--agent-wide-card-width)]" : "w-[var(--agent-card-width)]"} scroll-ml-0 snap-start`}
              aria-current={active === index}
            >
              <article className="h-full">
                <div className="h-[var(--agent-card-height)] overflow-hidden rounded-[28px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4 sm:p-5">
                  {slide.visual}
                </div>
                <div className="mt-[var(--agent-card-block-top)] px-[var(--agent-card-block-inline)]">
                  <p className="type-eyebrow text-[var(--text-tertiary)]">{slide.label}</p>
                  <h3 className="type-h2 mt-3 text-[var(--ink)]">{slide.headline}</h3>
                  <p className="type-body tone-secondary mt-4">{withHighlights(slide.description)}</p>
                  {slide.aside ? <Aside className="mt-4">{slide.aside}</Aside> : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex justify-end px-[var(--agent-side-padding)] max-[480px]:justify-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="focusable-ring flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-t4)] text-[var(--ink)] transition-opacity duration-150 disabled:opacity-[0.42]"
            aria-label="Previous agent feature"
            disabled={active === 0}
            onClick={() => animateTo(active - 1)}
          >
            <ArrowIcon direction="prev" />
          </button>
          <button
            type="button"
            className="focusable-ring flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-t4)] text-[var(--ink)] transition-opacity duration-150 disabled:opacity-[0.42]"
            aria-label="Next agent feature"
            disabled={active === slides.length - 1}
            onClick={() => animateTo(active + 1)}
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
