import Image from "next/image";

import { Aside, SectionIntro } from "@/components/landing-primitives";

const dimensions = [
  ["Recovery", "down", "last night gave less."],
  ["Form", "uneven", "capacity keeps moving."],
  ["Weight", "up", "day is asking more."],
  ["The Stack", "dense", "meetings keep clustering."],
  ["Signal Pressure", "high", "volume is shaping the day."],
  ["Task Pileup", "rising", "unfinished work is carrying over."],
] as const;

function DeviceConstellation() {
  return (
    <div className="relative mt-8 hidden h-[210px] overflow-hidden lg:block">
      <div className="absolute left-[7%] top-[72px] w-[136px]">
        <Image src="/figma-assets/health-iphone-left.png" alt="" width={272} height={450} className="h-auto w-full" />
      </div>
      <div className="absolute left-[21%] top-0 w-[520px]">
        <Image src="/figma-assets/health-ipad.png" alt="" width={1042} height={633} className="h-auto w-full" />
      </div>
      <div className="absolute right-[2%] top-[82px] w-[244px]">
        <Image src="/figma-assets/health-iphone-right.png" alt="" width={486} height={410} className="h-auto w-full" />
      </div>
      <div className="absolute left-0 top-[142px] w-[62px]">
        <Image src="/figma-assets/health-watch.png" alt="" width={120} height={128} className="h-auto w-full" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--dark-t3)] to-transparent" />
    </div>
  );
}

export function SmarterSection() {
  return (
    <section id="constellation" className="section-shell dark-panel scroll-mt-28 overflow-hidden rounded-[30px] p-6 sm:p-8 lg:p-12">
      <SectionIntro
        dark
        title={
          <>
            The longer it runs,
            <br />
            the more Waldo sees.
          </>
        }
        aside="patterns you cannot see from the inside."
      >
        <p>
          Tuesdays and Thursdays looked ordinary until the pattern had enough shape. Your worst sleep follows the heaviest meeting days. You were too close to see it. Waldo was not.
        </p>
      </SectionIntro>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="dark-card relative min-h-[520px] overflow-hidden p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="type-label text-[var(--surface-t2)]">The Constellation</p>
              <p className="type-aside mt-1 text-[var(--text-tertiary)]">The Tuesday Crash.</p>
            </div>
            <span className="type-caption rounded-full border border-[var(--border-dark)] bg-[var(--dark-t1)] px-3 py-1 text-[var(--text-secondary)]">
              4-week map
            </span>
          </div>

          <svg viewBox="0 0 640 360" className="mt-6 h-auto w-full" role="img" aria-label="Pattern map showing heavy meetings connected to short sleep and lower recovery.">
            <g stroke="var(--border-dark-focus)" strokeWidth="1.5">
              <line x1="130" y1="90" x2="315" y2="160" />
              <line x1="315" y1="160" x2="500" y2="90" />
              <line x1="315" y1="160" x2="450" y2="270" />
              <line x1="315" y1="160" x2="170" y2="268" />
              <line x1="170" y1="268" x2="450" y2="270" />
            </g>
            {[
              [130, 90, "Meeting stack"],
              [315, 160, "Short sleep"],
              [500, 90, "Late messages"],
              [170, 268, "Lower recovery"],
              [450, 270, "Next-day drift"],
            ].map(([x, y, label]) => (
              <g key={label as string}>
                <circle cx={x as number} cy={y as number} r="28" fill="var(--dark-t1)" stroke="var(--border-dark-focus)" />
                <circle cx={x as number} cy={y as number} r="10" fill="var(--surface-t2)" opacity="0.9" />
                <text x={x as number} y={(y as number) + 52} textAnchor="middle" fill="var(--text-secondary)" style={{ fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: 0 }}>
                  {label}
                </text>
              </g>
            ))}
          </svg>

          <DeviceConstellation />
        </div>

        <div className="grid gap-3">
          {dimensions.map(([label, value, read]) => (
            <div key={label} className="rounded-2xl border border-[var(--border-dark)] bg-[var(--dark-t2)] p-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="type-label text-[var(--surface-t2)]">{label}</p>
                <p className="type-data text-[var(--surface-t2)]">{value}</p>
              </div>
              <p className="type-aside mt-2 text-[var(--text-tertiary)]">{read}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-[var(--border-dark)] bg-[var(--dark-t1)] p-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="type-label text-[var(--surface-t2)]">6 dimensions</p>
              <p className="type-data text-[var(--surface-t2)]">watched</p>
            </div>
            <Aside className="mt-2 text-[var(--text-tertiary)]">enough angles to stop guessing.</Aside>
          </div>
        </div>
      </div>
    </section>
  );
}
