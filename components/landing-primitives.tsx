import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export const typeStyles = {
  display: {
    fontFamily: "var(--font-headline)",
    fontSize: "clamp(2.5rem, 2.2rem + 0.9vw, 3.125rem)",
    fontWeight: "var(--mottle-display-weight)",
    letterSpacing: "0px",
    lineHeight: 1,
  },
  h1: {
    fontFamily: "var(--font-headline)",
    fontSize: "clamp(2rem, 1.65rem + 0.9vw, 2.5rem)",
    fontWeight: "var(--mottle-display-weight)",
    letterSpacing: "0px",
    lineHeight: 1.08,
  },
  h2: {
    fontFamily: "var(--font-headline)",
    fontSize: "clamp(1.625rem, 1.45rem + 0.5vw, 2rem)",
    fontWeight: "var(--mottle-display-weight)",
    letterSpacing: "0px",
    lineHeight: 1.12,
  },
  h3: {
    fontFamily: "var(--font-body)",
    fontSize: "18px",
    fontWeight: 500,
    letterSpacing: "0.02em",
    lineHeight: "28px",
  },
  body: {
    fontFamily: "var(--font-body)",
    fontSize: "18px",
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: "28px",
  },
  label: {
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    lineHeight: 1.44,
  },
  eyebrow: {
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: 1.44,
  },
  caption: {
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: 1.44,
  },
  aside: {
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    fontStyle: "oblique 10deg",
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: 1.44,
  },
  data: {
    fontFamily: "var(--font-body)",
    fontVariantNumeric: "tabular-nums",
    fontWeight: 500,
    letterSpacing: "0.02em",
  },
} satisfies Record<string, CSSProperties>;

export function WaldoCTA({ className = "" }: { className?: string }) {
  return (
    <Link href="/waitlist" className={`waldo-cta focusable-ring ${className}`}>
      Let Waldo in →
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
  aside,
  dark = false,
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center ${className}`}>
      {eyebrow ? (
        <p className={dark ? "type-eyebrow text-[var(--text-tertiary)]" : "type-eyebrow text-[var(--text-tertiary)]"}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={dark ? "type-h1 text-[var(--panel-ink)]" : "type-h1 text-[var(--ink)]"} data-animate="headline">
        {title}
      </h2>
      {children ? (
        <div className={dark ? "type-body tone-d-secondary max-w-[58ch]" : "type-body tone-secondary max-w-[58ch]"} data-animate="fade-up">
          {children}
        </div>
      ) : null}
      {aside ? (
        <p className="type-aside tone-tertiary" data-animate="fade-up">
          {aside}
        </p>
      ) : null}
    </div>
  );
}

export function Aside({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`type-aside tone-tertiary ${className}`}>{children}</p>;
}

// Highlight — one weight up (regular → medium) and, via the parent `tone-*`
// class, one colour state up. Use inside a block carrying a tone class.
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="hl">{children}</span>;
}

// Render a string with `*…*` marking the highlighted runs, e.g.
// "Late bedtime pulled your *Recovery to 63*." → wraps that run in <Highlight>.
export function withHighlights(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, index) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <Highlight key={index}>{part.slice(1, -1)}</Highlight>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function Readout({
  label,
  value,
  read,
  dark = false,
}: {
  label: string;
  value: string;
  read: string;
  dark?: boolean;
}) {
  return (
    <div className={dark ? "rounded-[12px] border border-[var(--panel-border)] bg-[var(--panel-card)] p-4" : "surface-card-top p-4"}>
      <div className="flex items-baseline justify-between gap-3">
        <span className={dark ? "type-label text-[var(--panel-ink)]" : "type-label text-[var(--ink)]"}>{label}</span>
        <span className={dark ? "type-data text-[var(--panel-ink)]" : "type-data text-[var(--ink)]"}>{value}</span>
      </div>
      <p className={dark ? "type-aside tone-d-tertiary mt-2" : "type-aside tone-tertiary mt-2"}>
        {read}
      </p>
    </div>
  );
}
