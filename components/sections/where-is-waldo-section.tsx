import type { CSSProperties } from "react";
import { Aside } from "@/components/landing-primitives";
import { waldoHeroStates, waldoLiveReceipts } from "@/components/sections/waldo-capability-data";

const workSteps = [
  ["Read", "Recovery, calendar, inbox"],
  ["Decide", "Move what can move"],
  ["Do", "Write back to tools"],
] as const;

export function WhereIsWaldoSection() {
  const activeWork = waldoHeroStates[0];
  const activeReceipts = waldoLiveReceipts.slice(0, 5);

  return (
    <section id="where" className="section-shell surface-card overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-[980px] flex-col items-center text-center" data-animate="blur-fade">
        <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
          Where&apos;s Waldo?
          <br />
          Right now, doing the work.
        </h2>

        <div className="mt-8 grid w-full gap-4 lg:grid-cols-[0.95fr_1.15fr] lg:items-stretch" data-animate="stagger" data-stagger="0.06">
          <div data-stagger-item className="rounded-[20px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4 text-left sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="type-label text-[var(--ink)]">{activeWork.status}</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-t2)] px-3 py-1.5 type-caption text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] where-live-dot" aria-hidden />
                live
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {[...activeWork.inputs, ...activeWork.reads].map((item) => (
                <div key={`${item.label}-${item.value}`} className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="type-caption text-[var(--text-secondary)]">{item.label}</p>
                    <p className="type-data text-[var(--ink)]">{item.value}</p>
                  </div>
                  <Aside className="mt-2">{item.read}</Aside>
                </div>
              ))}
            </div>
          </div>

          <div data-stagger-item className="grid gap-4 rounded-[20px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4 text-left sm:p-5">
            <div className="rounded-[16px] bg-[var(--surface-t2)] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="type-label text-[var(--ink)]">Waldo run</p>
                <p className="type-caption text-[var(--text-secondary)]">6:14am</p>
              </div>

              <div className="mt-5 grid gap-3">
                {workSteps.map(([label, detail], index) => (
                  <div key={label} className="where-work-step flex items-center gap-3 rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-3" style={{ "--where-step-delay": `${index * 180}ms` } as CSSProperties}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--ink)] type-caption text-[var(--surface-t1)]">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="type-label text-[var(--ink)]">{label}</p>
                        <p className="type-caption text-[var(--text-secondary)]">done</p>
                      </div>
                      <p className="type-caption mt-1 text-[var(--text-secondary)]">{detail}</p>
                      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-[var(--surface-t4)]">
                        <span className="where-work-bar block h-full rounded-full bg-[var(--accent)]" style={{ "--where-step-delay": `${index * 180}ms` } as CSSProperties} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              {activeReceipts.map((receipt, index) => (
                <div key={`${receipt.time}-${receipt.action}`} className="where-receipt-row flex gap-3 rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3" style={{ "--where-step-delay": `${index * 110 + 520}ms` } as CSSProperties}>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <p className="type-label text-[var(--ink)]">{receipt.action}</p>
                      <p className="type-caption text-[var(--text-tertiary)]">{receipt.time}</p>
                      {receipt.requiresApproval ? <p className="rounded-full bg-[var(--surface-t1)] px-2 py-0.5 type-caption text-[var(--text-secondary)]">approval</p> : null}
                    </div>
                    <p className="type-caption mt-1 text-[var(--text-secondary)]">{receipt.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Aside className="mt-6">the answer is always an action.</Aside>
      </div>
    </section>
  );
}
