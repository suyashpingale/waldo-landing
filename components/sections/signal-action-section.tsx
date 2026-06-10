import type { CSSProperties } from "react";

import { Aside, SectionIntro } from "@/components/landing-primitives";

const signalRows = [
  {
    signal: "Sleep 5h 42m + HRV down",
    read: "Recovery is low",
    action: "Moved product review to 10:30",
    chip: "Calendar",
    approval: false,
  },
  {
    signal: "Stress rising + 3 meetings",
    read: "Afternoon at risk",
    action: "Blocked 1-2pm",
    chip: "Calendar",
    approval: false,
  },
  {
    signal: "104 emails + late Slack",
    read: "Signal pressure high",
    action: "Surfaced 2 threads",
    chip: "Gmail + Slack",
    approval: false,
  },
  {
    signal: "Missing brief + 3pm review",
    read: "Needs a specialist pass",
    action: "Research agent returned a draft",
    chip: "Agent",
    approval: true,
  },
] as const;

function FlowCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="waldo-signal-cell rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
      <p className="type-caption text-[var(--text-tertiary)]">{label}</p>
      <p className="type-label mt-2 text-[var(--ink)]">{value}</p>
    </div>
  );
}

export function SignalActionSection() {
  return (
    <section id="signal-action" className="section-shell waldo-signal-action-section w-full scroll-mt-28 overflow-hidden rounded-[30px] bg-[var(--surface-t2)] p-5 sm:p-6 lg:p-8">
      <div data-animate="blur-fade">
        <SectionIntro
          title={
            <>
              Raw signal -&gt; Waldo read
              <br />
              -&gt; work done.
            </>
          }
          aside="numbers become receipts."
        >
          <p>
            Waldo does not stop at interpretation. It turns human context into a bounded action, then shows the receipt.
          </p>
        </SectionIntro>
      </div>

      <div className="mt-9 grid gap-3" data-animate="stagger" data-stagger="0.065">
        {signalRows.map((row, index) => (
          <article
            key={row.signal}
            data-stagger-item
            className="waldo-signal-row relative grid gap-3 rounded-[20px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-3 lg:grid-cols-[1fr_74px_1fr_74px_1.12fr]"
            style={{ "--signal-delay": `${index * 180}ms` } as CSSProperties}
          >
            <FlowCell label="Raw signal" value={row.signal} />

            <div className="waldo-signal-path-wrap hidden items-center justify-center lg:flex" aria-hidden>
              <svg className="waldo-signal-path" viewBox="0 0 74 24" fill="none">
                <path d="M2 12 C20 2 48 22 72 12" />
              </svg>
            </div>

            <FlowCell label="Waldo read" value={row.read} />

            <div className="waldo-signal-path-wrap hidden items-center justify-center lg:flex" aria-hidden>
              <svg className="waldo-signal-path" viewBox="0 0 74 24" fill="none">
                <path d="M2 12 C20 22 48 2 72 12" />
              </svg>
            </div>

            <div className="waldo-action-receipt rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="type-caption text-[var(--text-tertiary)]">Work done</p>
                <span className="type-caption rounded-full bg-[var(--surface-t1)] px-3 py-1 text-[var(--text-secondary)]">{row.chip}</span>
              </div>
              <p className="type-label mt-3 text-[var(--ink)]">{row.action}</p>
              {row.approval ? (
                <p className="type-caption mt-3 inline-flex rounded-full bg-[var(--ink)] px-3 py-1 text-[var(--surface-t2)]">
                  approval waiting
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <Aside className="mt-6 text-center">the loop is simple: read the day, change the work, leave proof.</Aside>
    </section>
  );
}
