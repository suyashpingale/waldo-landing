"use client";

import { useEffect, useRef, useState } from "react";

import { Aside, withHighlights } from "@/components/landing-primitives";

const AUTO_DWELL_MS = 6150;
const AUTO_SCROLL_MS = 1000;

function appleGalleryEase(progress: number) {
  const x1 = 0.2;
  const y1 = 0;
  const x2 = 0;
  const y2 = 1;
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  let t = progress;

  for (let i = 0; i < 5; i += 1) {
    const x = ((ax * t + bx) * t + cx) * t - progress;
    const dx = (3 * ax * t + 2 * bx) * t + cx;
    if (Math.abs(dx) < 0.0001) break;
    t = Math.max(0, Math.min(1, t - x / dx));
  }

  return ((ay * t + by) * t + cy) * t;
}

type VisualKind = "recovery" | "stress" | "patterns" | "body" | "longGame";
type HealthTone = "sleep" | "heart" | "stress" | "recovery" | "motion";

type FeaturePanel = {
  label: string;
  title: string;
  body: string;
  tone: HealthTone;
  metric: string;
};

type ShowcaseSlide = {
  tab: string;
  headline: string;
  subheadline: string;
  aside: string;
  visual: VisualKind;
  badge?: string;
  panels: FeaturePanel[];
};

const slides: ShowcaseSlide[] = [
  {
    tab: "Recovery is not a number.",
    headline: "Recovery is not a number.",
    subheadline: "It answers one question: what did last night give you?",
    aside: "already on it.",
    visual: "recovery",
    panels: [
      {
        label: "Sleep, stage by stage.",
        title: "Sleep, stage by stage.",
        body:
          "Waldo tracks deep, REM, light, and awake. Duration alone does not tell you much. *Deep sleep in a short night can beat light sleep in a long one.* Waldo knows the difference.",
        tone: "sleep",
        metric: "stages read",
      },
      {
        label: "HRV tells the real story.",
        title: "HRV tells the real story.",
        body:
          "Heart rate variability is the closest thing to a readiness signal your body produces. Waldo checks RMSSD against your 7-day baseline. *When it dips, Waldo acts on it.*",
        tone: "heart",
        metric: "baseline checked",
      },
      {
        label: "Resting state, quietly watched.",
        title: "Resting state, quietly watched.",
        body:
          "Resting heart rate, respiratory rate, wrist temperature, and blood oxygen paint one picture: how recovered your nervous system actually is. *Waldo reads all four every night.*",
        tone: "recovery",
        metric: "4 signals",
      },
      {
        label: "Sleep debt does not lie.",
        title: "Sleep debt does not lie.",
        body:
          "A 14-day weighted average tracks how much sleep you owe yourself. One bad night is recoverable. Four in a row is a pattern. *Waldo adjusts your week before the crash lands.*",
        tone: "sleep",
        metric: "14-day debt",
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "Recovery at 63 and a 9am meeting? Pushed to 10:30. Recovery at 85? Your calendar stays untouched. *You wake up to the result, not the reasoning.*",
        tone: "recovery",
        metric: "morning moved",
      },
    ],
  },
  {
    tab: "Your stress, handled in real time.",
    headline: "Your stress, handled in real time.",
    subheadline: "Not a chart you check later. Waldo catches it before you feel it.",
    aside: "you didn't ask. you didn't need to.",
    visual: "stress",
    panels: [
      {
        label: "Stress confidence.",
        title: "Stress confidence, not stress score.",
        body:
          "Most apps give you a number. Waldo watches confidence: how certain the signal is that stress is sustained. *When the read is strong enough to trust, Waldo moves.*",
        tone: "stress",
        metric: "confidence rising",
      },
      {
        label: "The Fetch fires mid-day.",
        title: "The Fetch fires mid-day.",
        body:
          "The moment stress sustains above threshold, Waldo pulls low-priority meetings from your afternoon and blocks recovery time. *No prompt asking if you are okay. Just cleared space.*",
        tone: "stress",
        metric: "space cleared",
      },
      {
        label: "Cooldown built in.",
        title: "Cooldown built in.",
        body:
          "Dismiss a Fetch and Waldo backs off. It does not nag. It waits, watches, and only fires again if the signal re-escalates after the cooldown. *Quiet by design.*",
        tone: "recovery",
        metric: "cooldown active",
      },
      {
        label: "Circadian context matters.",
        title: "Circadian context matters.",
        body:
          "A stress spike in the morning means something different than one after lunch. Waldo checks stress against circadian position and Form before deciding whether to intervene. *Context keeps it from overreacting.*",
        tone: "motion",
        metric: "context checked",
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "Stress climbing and your investor call matters? That stays. The low-priority 4:30? Pulled. *Waldo moves what you would cancel yourself and keeps what you would not.*",
        tone: "stress",
        metric: "meeting pulled",
      },
    ],
  },
  {
    tab: "See what you're too close to see.",
    headline: "See what you're too close to see.",
    subheadline: "Waldo scans quietly. When something matters, you hear about it.",
    aside: "~70 scans a day. you never notice.",
    visual: "patterns",
    panels: [
      {
        label: "The Patrol keeps watch.",
        title: "The Patrol keeps watch.",
        body:
          "Waldo scans your biometric signals against your calendar, tasks, and communication load throughout the day. Most scans find nothing notable. *The useful ones get logged.*",
        tone: "recovery",
        metric: "quiet scan",
      },
      {
        label: "Spots are single observations.",
        title: "Spots are single observations.",
        body:
          "\"Your worst sleep follows your heaviest meeting days.\" One data point. One sentence. Waldo surfaces it when confidence is high enough, not before. *Small, useful, restrained.*",
        tone: "sleep",
        metric: "Spot found",
      },
      {
        label: "Constellations connect dots.",
        title: "Constellations connect the dots.",
        body:
          "Multiple Spots link into a named behavioral pattern. The Tuesday Crash becomes something Waldo can name, track, and act on. *Coming soon.*",
        tone: "heart",
        metric: "pattern named",
      },
      {
        label: "Pre-activity readiness.",
        title: "Pre-activity readiness.",
        body:
          "Before a high-stakes meeting, Waldo checks your Form score, context from last week, attendee list, and duration. *Not a generic reminder. A readiness check grounded in your actual data.*",
        tone: "motion",
        metric: "ready check",
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "Patterns are not useful if nothing changes. Tuesday overload causing Wednesday depletion? *Waldo starts protecting Wednesday mornings before the cycle repeats.*",
        tone: "recovery",
        metric: "cycle broken",
      },
    ],
  },
  {
    tab: "Your body, actually understood.",
    headline: "Your body, actually understood.",
    subheadline: "Your watch tracks 15+ signals. Waldo acts on the ones that matter today.",
    aside: "your watch tracks it. Waldo does something with it.",
    visual: "body",
    panels: [
      {
        label: "Sleep that changes tomorrow.",
        title: "Sleep that changes tomorrow.",
        body:
          "Stages, duration, debt, bedtime consistency. The point is not the data. *Short night? Your morning adjusts. Debt accumulating? Your week shifts before the crash.*",
        tone: "sleep",
        metric: "tomorrow adjusted",
      },
      {
        label: "Heart rate that means something.",
        title: "Heart rate that means something.",
        body:
          "HRV trends, resting HR, and baseline tracking are not notifications. A dip below your 7-day average becomes a trigger. *Waldo connects the signal to your calendar.*",
        tone: "heart",
        metric: "HRV read",
      },
      {
        label: "Stress you do not manage.",
        title: "Stress you do not manage.",
        body:
          "Real-time confidence scoring is not a daily summary. It is a live signal that triggers The Fetch when it sustains too long. *Waldo catches it before you feel it.*",
        tone: "stress",
        metric: "Fetch armed",
      },
      {
        label: "Recovery drives the day.",
        title: "Recovery drives the day.",
        body:
          "Sleep, HRV, and resting state combine into one score. The score powers The Brief. The Brief powers your morning. *One signal, end to end.*",
        tone: "recovery",
        metric: "Brief ready",
      },
      {
        label: "Motion with context.",
        title: "Motion with context.",
        body:
          "Steps, exercise, VO2 Max, and active energy are more than counts. *A hard workout at 7am means your 9am needs to be light.*",
        tone: "motion",
        metric: "load softened",
      },
    ],
  },
  {
    tab: "Learns every week you wear it.",
    headline: "Learns every week you wear it.",
    subheadline: "Week one is calibration. By week three, Waldo knows your patterns.",
    aside: "patterns you can't see from the inside.",
    visual: "longGame",
    badge: "Coming soon",
    panels: [
      {
        label: "Memory that compounds.",
        title: "Memory that compounds.",
        body:
          "Waldo remembers facts, events, discoveries, preferences, and advice. It does not just remember your HRV. *It remembers what usually causes it to drop.*",
        tone: "heart",
        metric: "memory linked",
      },
      {
        label: "Dreaming Mode.",
        title: "Dreaming Mode.",
        body:
          "At 2am, Waldo consolidates. It promotes patterns, merges related memories, and pre-builds tomorrow's Brief. *By the time you wake up, it already knows what kind of day is waiting.*",
        tone: "sleep",
        metric: "2am pass",
      },
      {
        label: "Corrections sharpen it.",
        title: "Corrections sharpen it.",
        body:
          "Undo a Fetch? Waldo learns. Keep a meeting it tried to move? Noted. *The first week has friction. The third week feels quietly familiar.*",
        tone: "recovery",
        metric: "model tuned",
      },
      {
        label: "The Slope watches trajectory.",
        title: "The Slope watches the trajectory.",
        body:
          "Four weeks of data across recovery, form, demand, meeting load, communication pressure, and task pileup. *When the whole picture declines, Waldo escalates.*",
        tone: "motion",
        metric: "4-week slope",
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "When The Tuesday Crash repeats, Waldo does not just tell you. *It starts protecting Wednesdays, then keeps doing it.*",
        tone: "stress",
        metric: "Wednesday held",
      },
    ],
  },
];

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

function PlayPauseIcon({ playing, ended }: { playing: boolean; ended: boolean }) {
  if (ended) {
    return (
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden>
        <path d="M15.4 8.8a5.8 5.8 0 1 1-1.8-4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M15.5 3.4v4.1h-4.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (playing) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M6.5 4.25v9.5M11.5 4.25v9.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M6.75 4.7v8.6l6.2-4.3-6.2-4.3Z" fill="currentColor" />
    </svg>
  );
}

function HealthIcon({ tone }: { tone: HealthTone }) {
  const common = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (tone === "sleep") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M16.5 14.5A7 7 0 0 1 7.5 5.5 7.5 7.5 0 1 0 16.5 14.5Z" {...common} />
      </svg>
    );
  }

  if (tone === "heart") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 18s-6.5-3.8-6.5-8.4A3.6 3.6 0 0 1 11 7.4a3.6 3.6 0 0 1 6.5 2.2C17.5 14.2 11 18 11 18Z" {...common} />
      </svg>
    );
  }

  if (tone === "stress") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 3.5v6l4 2.5M5.5 17.5a8 8 0 1 0 11-11" {...common} />
      </svg>
    );
  }

  if (tone === "recovery") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M17 7.5A6.5 6.5 0 1 0 18 12M18 4.5v4h-4" {...common} />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M12.5 3.5 5.5 12h5L9.5 18.5l7-8.5h-5l1-6.5Z" {...common} />
    </svg>
  );
}

function PanelPill({
  panel,
  index,
  isOpen,
  onOpen,
}: {
  panel: FeaturePanel;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const panelId = `${panel.label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${index}`;

  return (
    <div>
      <button
        type="button"
        className={`focusable-ring flex w-full items-center gap-3 rounded-full px-4 py-3 text-left transition-[background-color,color] duration-200 ease-[var(--ease-premium)] ${
          isOpen ? "bg-[var(--surface-t1)] text-[var(--ink)]" : "bg-[var(--surface-t3)] text-[var(--text-secondary)]"
        }`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onOpen}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-200 ease-[var(--ease-premium)] ${
            isOpen ? "bg-[var(--ink)] text-[var(--surface-t2)]" : "bg-[var(--surface-t2)] text-[var(--ink)]"
          }`}
          aria-hidden
        >
          {isOpen ? (
            <span className="h-[2px] w-3 rounded-full bg-current" />
          ) : (
            <span className="relative h-3 w-3">
              <span className="absolute left-0 top-1/2 h-[2px] w-3 -translate-y-1/2 rounded-full bg-current" />
              <span className="absolute left-1/2 top-0 h-3 w-[2px] -translate-x-1/2 rounded-full bg-current" />
            </span>
          )}
        </span>
        <span className="type-label">{panel.label}</span>
      </button>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[var(--ease-premium)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 rounded-[16px] bg-[var(--surface-t1)] p-5">
            <p className="type-body tone-secondary">{withHighlights(panel.body)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WatchSignalStage({ slide, panel }: { slide: ShowcaseSlide; panel: FeaturePanel }) {
  const isRecovery = slide.visual === "recovery";
  const isStress = slide.visual === "stress";
  const isPatterns = slide.visual === "patterns";
  const isBody = slide.visual === "body";

  return (
    <div className="relative flex h-full min-h-[260px] items-center justify-center overflow-hidden rounded-[18px] bg-[var(--surface-t1)] max-lg:min-h-[220px]">
      <div className="absolute inset-x-8 top-8 hidden h-px bg-[var(--border-default)] lg:block" />
      <div className="absolute inset-x-10 bottom-10 hidden h-px bg-[var(--border-default)] lg:block" />

      <div className="relative flex h-[310px] w-[248px] items-center justify-center rounded-[54px] border-[8px] border-[var(--ink)] bg-[var(--dark-t4)] p-5 text-[var(--surface-t2)] sm:h-[360px] sm:w-[290px] lg:h-[450px] lg:w-[360px]">
        <div className="absolute left-1/2 top-5 h-6 w-24 -translate-x-1/2 rounded-full bg-[var(--ink)]" />
        <div className="flex h-full w-full flex-col justify-between rounded-[34px] bg-[var(--dark-t3)] p-6 pt-14">
          <div>
            <p className="type-caption text-[var(--on-dark-subtle)]">{slide.tab}</p>
            <h4 className="type-h3 mt-3 max-w-[14ch] text-[var(--surface-t2)]">{panel.metric}</h4>
          </div>

          {isRecovery ? (
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-[conic-gradient(var(--zone-peak)_0_62%,var(--dark-t1)_62%_100%)] p-4">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--dark-t3)]">
                <span className="type-h2 text-[var(--surface-t2)]">63</span>
              </div>
            </div>
          ) : null}

          {isStress ? (
            <div className="space-y-3">
              {[68, 82, 58].map((value, index) => (
                <div key={value} className="h-3 overflow-hidden rounded-full bg-[var(--dark-t1)]">
                  <div
                    className="h-full rounded-full bg-[var(--surface-t2)]"
                    style={{ width: `${value - index * 8}%`, opacity: 0.86 - index * 0.16 }}
                  />
                </div>
              ))}
            </div>
          ) : null}

          {isPatterns ? (
            <div className="relative mx-auto h-36 w-36">
              {[0, 1, 2, 3, 4].map((node) => (
                <span
                  key={node}
                  className="absolute h-5 w-5 rounded-full bg-[var(--surface-t2)]"
                  style={{
                    left: `${18 + (node % 3) * 34}%`,
                    top: `${18 + Math.floor(node / 3) * 44 + (node % 2) * 14}%`,
                    opacity: node === 2 ? 1 : 0.56,
                  }}
                />
              ))}
              <svg className="absolute inset-0 h-full w-full text-[var(--surface-t2)] opacity-40" viewBox="0 0 144 144" fill="none" aria-hidden>
                <path d="M32 44 C56 24 76 82 104 54 C112 46 118 64 122 92" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" />
                <path d="M50 110 C62 70 84 102 96 40" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" />
              </svg>
            </div>
          ) : null}

          {isBody ? (
            <div className="grid grid-cols-2 gap-3">
              {["sleep", "hrv", "stress", "motion"].map((item) => (
                <div key={item} className="rounded-[12px] bg-[var(--dark-t1)] p-3">
                  <p className="type-caption text-[var(--on-dark-subtle)]">{item}</p>
                  <div className="mt-3 h-2 rounded-full bg-[var(--dark-t4)]">
                    <div className="h-full w-2/3 rounded-full bg-[var(--surface-t2)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {!isRecovery && !isStress && !isPatterns && !isBody ? (
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className="aspect-square rounded-[8px] bg-[var(--surface-t2)]"
                  style={{ opacity: index % 6 === 0 || index % 11 === 0 ? 0.9 : 0.24 }}
                />
              ))}
            </div>
          ) : null}

          <div className="rounded-[18px] bg-[var(--dark-t1)] p-4">
            <p className="type-label text-[var(--surface-t2)]">{panel.title}</p>
            <p className="type-caption mt-2 text-[var(--on-dark-muted)]">action layer ready</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-[16px] bg-[var(--surface-t2)] p-4 lg:left-auto lg:right-8 lg:w-[260px]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[var(--surface-t1)] text-[var(--ink)]">
            <HealthIcon tone={panel.tone} />
          </div>
          <div>
            <p className="type-label text-[var(--ink)]">{panel.metric}</p>
            <p className="type-caption text-[var(--text-tertiary)]">Waldo read</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideContent({
  slide,
  slideIndex,
  openPanel,
  onOpenPanel,
}: {
  slide: ShowcaseSlide;
  slideIndex: number;
  openPanel: number;
  onOpenPanel: (panelIndex: number) => void;
}) {
  const panel = slide.panels[openPanel] ?? slide.panels[0];

  return (
    <div className="grid h-full min-h-0 gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(330px,0.92fr)_minmax(420px,1.35fr)] lg:p-6">
      <div className="flex min-h-0 flex-col rounded-[20px] bg-[var(--surface-t2)] p-3 sm:p-4">
        <div className="rounded-[16px] bg-[var(--surface-t1)] p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p className="type-eyebrow text-[var(--text-tertiary)]">Tab {slideIndex + 1}</p>
            {slide.badge ? (
              <span className="type-caption rounded-full bg-[var(--surface-t3)] px-3 py-1 text-[var(--text-secondary)]">
                {slide.badge}
              </span>
            ) : null}
          </div>
          <h3 className="type-h2 max-w-[14ch] text-[var(--ink)]">{slide.headline}</h3>
          <p className="type-body tone-secondary mt-4 max-w-[48ch]">{slide.subheadline}</p>
        </div>

        <div className="mt-3 space-y-3 pr-1 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          {slide.panels.map((item, index) => (
            <PanelPill
              key={item.label}
              panel={item}
              index={index}
              isOpen={openPanel === index}
              onOpen={() => onOpenPanel(index)}
            />
          ))}
        </div>
        <Aside className="mt-4 px-2">{slide.aside}</Aside>
      </div>

      <WatchSignalStage slide={slide} panel={panel} />
    </div>
  );
}

export function AlreadyDoneSection() {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const progressAnimationRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const lastProgressTickRef = useRef<number | null>(null);
  const scrollSnapTypeRef = useRef<string | null>(null);
  const programmaticScrollRef = useRef(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ended, setEnded] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [isScrollAnimating, setIsScrollAnimating] = useState(false);
  const [openPanels, setOpenPanels] = useState<Record<number, number>>({});

  const shouldTickProgress = playing && !ended && !reducedMotion && !interactionPaused && !documentHidden && !isScrollAnimating;
  const activeSlide = slides[active];
  const activeLabel = activeSlide.tab;

  const setProgressValue = (value: number) => {
    const bounded = Math.max(0, Math.min(1, value));
    progressRef.current = bounded;
    setProgress(bounded);
  };

  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  useEffect(() => {
    const handleVisibility = () => setDocumentHidden(document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) window.cancelAnimationFrame(scrollAnimationRef.current);
      if (progressAnimationRef.current !== null) window.cancelAnimationFrame(progressAnimationRef.current);
    };
  }, []);

  useEffect(() => {
    if (!shouldTickProgress) {
      lastProgressTickRef.current = null;
      return;
    }

    const tick = (now: number) => {
      const last = lastProgressTickRef.current ?? now;
      const delta = now - last;
      lastProgressTickRef.current = now;
      const next = Math.min(1, progressRef.current + delta / AUTO_DWELL_MS);

      setProgressValue(next);

      if (next >= 1) {
        lastProgressTickRef.current = null;
        if (active < slides.length - 1) {
          setProgressValue(0);
          scrollToSlide(active + 1, true);
        } else {
          setEnded(true);
          setPlaying(false);
        }
        return;
      }

      progressAnimationRef.current = window.requestAnimationFrame(tick);
    };

    progressAnimationRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (progressAnimationRef.current !== null) {
        window.cancelAnimationFrame(progressAnimationRef.current);
        progressAnimationRef.current = null;
      }
    };
  }, [active, shouldTickProgress]);

  const cancelScrollAnimation = () => {
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    if (trackRef.current && scrollSnapTypeRef.current !== null) {
      trackRef.current.style.scrollSnapType = scrollSnapTypeRef.current;
      scrollSnapTypeRef.current = null;
    }
    programmaticScrollRef.current = false;
    setIsScrollAnimating(false);
  };

  const scrollToSlide = (index: number, auto = false) => {
    const track = trackRef.current;
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const card = track?.children[nextIndex] as HTMLElement | undefined;

    cancelScrollAnimation();
    lastProgressTickRef.current = null;
    setProgressValue(0);
    setEnded(false);
    setActive(nextIndex);
    if (!track || !card) return;

    const paddingStart = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    const left = card.offsetLeft - paddingStart;
    const startLeft = track.scrollLeft;
    const distance = left - startLeft;

    if (reducedMotion || Math.abs(distance) < 1) {
      track.scrollLeft = left;
      return;
    }

    const duration = auto ? AUTO_SCROLL_MS : AUTO_SCROLL_MS;
    const startTime = performance.now();

    programmaticScrollRef.current = true;
    scrollSnapTypeRef.current = track.style.scrollSnapType || window.getComputedStyle(track).scrollSnapType;
    track.style.scrollSnapType = "none";
    setIsScrollAnimating(true);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      track.scrollLeft = startLeft + distance * appleGalleryEase(progress);

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
        return;
      }

      track.scrollLeft = left;
      track.style.scrollSnapType = scrollSnapTypeRef.current ?? "";
      scrollSnapTypeRef.current = null;
      scrollAnimationRef.current = null;
      programmaticScrollRef.current = false;
      setIsScrollAnimating(false);
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  };

  const goTo = (index: number) => {
    setPlaying(false);
    setEnded(false);
    scrollToSlide(index, false);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    if (programmaticScrollRef.current) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);

      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });

    if (nearest !== active) {
      setActive(nearest);
      setProgressValue(0);
      setEnded(false);
    }
  };

  return (
    <section
      id="already-handled"
      className="waldo-highlights w-screen max-w-none scroll-mt-28 overflow-hidden py-8 lg:py-12"
    >
      <div className="mb-8 flex w-full flex-col gap-6 px-[var(--slide-padding)] lg:mb-10">
        <div>
          <p className="type-eyebrow mb-4 text-[var(--text-tertiary)]">Health features</p>
          <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
            This is what your day
            <br />
            looks like with Waldo.
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="grid w-full auto-cols-[var(--slide-width)] grid-flow-col snap-x snap-mandatory scroll-pl-0 gap-[var(--slide-gap)] overflow-x-auto px-[var(--slide-padding)] pb-2 [scrollbar-width:none] max-[734px]:scroll-pl-[var(--slide-padding)] [&::-webkit-scrollbar]:hidden"
        aria-live="polite"
        aria-label={`Showing ${activeLabel}`}
        onScroll={handleScroll}
        onPointerDown={() => {
          cancelScrollAnimation();
          setPlaying(false);
          setEnded(false);
          setInteractionPaused(true);
        }}
        onPointerUp={() => {
          setInteractionPaused(false);
        }}
        onTouchStart={() => {
          cancelScrollAnimation();
          setPlaying(false);
          setEnded(false);
          setInteractionPaused(true);
        }}
        onTouchEnd={() => {
          setInteractionPaused(false);
        }}
      >
        {slides.map((slide, index) => {
          const isActive = active === index;
          const openPanel = openPanels[index] ?? 0;

          return (
            <article
              key={slide.tab}
              id={`health-feature-card-${index}`}
              aria-label={slide.tab}
              aria-current={isActive}
              className="h-[var(--slide-height)] w-[var(--slide-width)] snap-center overflow-y-auto rounded-[24px] bg-[var(--surface-t2)] [scrollbar-width:none] max-[734px]:snap-start lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
            >
              <SlideContent
                slide={slide}
                slideIndex={index}
                openPanel={openPanel}
                onOpenPanel={(panelIndex) => {
                  setPlaying(false);
                  setEnded(false);
                  setOpenPanels((current) => ({ ...current, [index]: panelIndex }));
                }}
              />
            </article>
          );
        })}
      </div>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div
          className="waldo-carousel-controls flex h-14 w-[200px] items-center justify-center gap-3 rounded-full bg-[var(--surface-t2)] px-4 sm:w-[216px] sm:gap-4"
          style={{ animation: "waldo-carousel-control-in 740ms var(--ease-premium) both" }}
          onFocusCapture={() => setInteractionPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false);
          }}
        >
          {slides.map((slide, index) => {
            const isCurrent = active === index;
            const isComplete = index < active || (ended && index <= active);
            const fillWidth = isCurrent ? progress : isComplete ? 1 : 0;
            const fillClass = isComplete && !isCurrent ? "bg-[var(--bar-fill-neutral)]" : "";
            const fillBackground = isCurrent && !reducedMotion
              ? "linear-gradient(90deg, var(--bar-fill-ink) 0%, var(--bar-fill-ink) calc(100% - 12px), color-mix(in srgb, var(--bar-fill-ink) 30%, transparent) 100%)"
              : isCurrent
              ? "var(--bar-fill-ink)"
              : undefined;

            return (
              <button
                key={slide.tab}
                type="button"
                aria-label={`Show ${slide.tab}`}
                className="focusable-ring flex h-11 w-6 items-center justify-center rounded-full"
                onClick={() => goTo(index)}
              >
                <span
                  className="relative block h-2 shrink-0 overflow-hidden rounded-[var(--bar-radius)] bg-[var(--bar-track)] transition-[width,background-color] duration-[250ms] ease-[var(--ease-premium)]"
                  style={{
                    width: isCurrent ? "var(--active-dot-width)" : "8px",
                    boxShadow: "var(--bar-track-inset)",
                  }}
                >
                  <span
                    className={`absolute inset-y-0 left-0 rounded-[var(--bar-radius)] ${fillClass}`}
                    style={{
                      width: `${fillWidth * 100}%`,
                      background: fillBackground,
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="waldo-carousel-controls focusable-ring flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-t2)] text-[var(--ink)] transition-[background-color] duration-150 ease-[var(--ease-premium)] hover:bg-[var(--surface-t1)]"
          style={{ animation: "waldo-carousel-control-in 940ms var(--ease-premium) both" }}
          aria-label={ended ? "Replay carousel" : playing ? "Pause carousel" : "Play carousel"}
          onClick={() => {
            if (ended) {
              scrollToSlide(0, false);
              setPlaying(true);
              return;
            }
            setPlaying((current) => !current);
          }}
        >
          <PlayPauseIcon playing={playing && !reducedMotion} ended={ended} />
        </button>
      </div>
    </section>
  );
}
