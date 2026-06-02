import type { ReactNode } from "react";
import Image from "next/image";

import { CinematicVideo } from "@/components/cinematic-video";
import { NotificationStack } from "@/components/notification-stack";
import { Aside, Readout, SectionIntro, WaldoCTA } from "@/components/landing-primitives";

const handledReads = [
  { label: "Sleep", value: "5h 42m", read: "short night; morning load cut." },
  { label: "HRV", value: "38ms", read: "below baseline; pace slowed." },
  { label: "Calendar", value: "4 meetings", read: "too dense; first block moved." },
];

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <circle cx="4" cy="4" r="2.8" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M6.5 6.5 9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SidebarItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface-t4)] text-[var(--ink)]">
        {icon}
      </span>
      <span className="type-caption whitespace-nowrap text-[var(--ink)]">{label}</span>
    </div>
  );
}

function WaldoConsoleDemo() {
  return (
    <div className="surface-card hidden w-full overflow-hidden bg-[var(--surface-t3)] p-1.5 lg:flex">
      <aside className="flex w-[170px] flex-col gap-5 rounded-l-[20px] bg-[var(--surface-t3)] p-5">
        <Image src="/logo.svg" alt="Waldo" width={74} height={18} unoptimized className="h-auto w-[74px]" />
        <div className="flex flex-col gap-2">
          <SidebarItem icon={<PlusIcon />} label="New chat" />
          <SidebarItem icon={<SearchIcon />} label="Connectors" />
        </div>
        <div className="h-px w-full bg-[var(--border-focus)]" />
        <div className="flex flex-col gap-2">
          <SidebarItem icon={<SearchIcon />} label="Fetches" />
          <SidebarItem icon={<SearchIcon />} label="Constellations" />
        </div>
        <div className="h-px w-full bg-[var(--border-focus)]" />
        <div className="flex flex-col gap-2">
          <p className="type-caption text-[var(--ink)]">Recents</p>
          <p className="type-caption text-[var(--text-secondary)]">Morning load review</p>
          <p className="type-caption text-[var(--text-secondary)]">Friday afternoon</p>
          <p className="type-caption text-[var(--text-secondary)]">Tuesday pattern</p>
        </div>
      </aside>

      <CinematicVideo
        src="/waldo_demo.mp4"
        containerClassName="flex-1 overflow-hidden border border-[var(--border-default)] bg-[var(--dark-t3)]"
        containerStyle={{ height: "560px", borderRadius: "18px" }}
      />
    </div>
  );
}

export function AlreadyDoneSection() {
  return (
    <section id="already-handled" className="section-shell scroll-mt-28 flex flex-col gap-8 py-4 lg:gap-10">
      <SectionIntro
        title={
          <>
            Not another chart.
            <br />
            Not another ping.
            <br />
            Already handled.
          </>
        }
      >
        <p>
          Waldo reads what your wearable collects, understands what your body is actually saying, and handles the rest.
        </p>
      </SectionIntro>

      <WaldoConsoleDemo />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="surface-card flex min-h-[440px] flex-col justify-center p-6 sm:p-8">
          <p className="type-label mb-6 text-center text-[var(--text-secondary)]">The old way</p>
          <NotificationStack />
          <Aside className="mt-5 text-center">everything noticed, nothing handled.</Aside>
        </div>

        <div className="dark-panel flex min-h-[440px] flex-col justify-between rounded-[30px] p-5 sm:p-6">
          <div className="dark-card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="type-label text-[var(--surface-t2)]">Waldo</p>
              <span className="type-caption rounded-full border border-[var(--border-dark)] bg-[var(--dark-t1)] px-3 py-1 text-[var(--text-secondary)]">
                handled
              </span>
            </div>

            <div className="mt-6 rounded-[18px] border border-[var(--border-dark)] bg-[var(--dark-t1)] p-5">
              <p className="type-body text-[var(--surface-t2)]">
                Rough morning. Your 9am moved to 10:30, the low-priority follow-up shifted to noon, and focus stays protected until lunch.
              </p>
              <p className="type-aside mt-4 text-[var(--text-tertiary)]">warm enough to start slowly.</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {handledReads.map((read) => (
                <Readout key={read.label} {...read} dark />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <WaldoCTA />
      </div>
    </section>
  );
}
