"use client";

import { useEffect, useRef, useState } from "react";

import { Aside } from "@/components/landing-primitives";

const taskLines = [
  "Rescheduled your 9am to 10:30",
  "Logged your 2am HRV dip",
  "Protecting your Friday afternoon",
  "Matching your best hours to deep work",
  "Scanning 14 email threads for urgency",
  "Blocking 2-4pm for recovery",
  "Moving the retro to Monday",
];

const finalLine = "Already on it.";
const wordMs = 70;

type Status = "queued" | "active" | "done";

function SpinningPawIcon() {
  return (
    <span className="waldo-loading-spin inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <svg width="16" height="16" viewBox="-0.5 -1 24 22" fill="none" aria-hidden>
        <path d="M12.0455 8.19435C8.5546 8.63273 6.68628 1.37044 10.4049 0.0167778C14.1721 -0.400611 15.7586 7.09811 12.0455 8.19435Z" fill="var(--accent)" />
        <path d="M8.3092 10.5135C6.58923 13.9893 -0.949651 11.5404 0.0997341 7.32816C2.00498 3.60923 9.58249 6.4543 8.3092 10.5135Z" fill="var(--accent)" />
        <path d="M16.2786 9.83065C13.9189 7.43667 17.1194 2.50187 20.161 4.61989C22.6742 7.23047 19.1635 12.07 16.2786 9.83065Z" fill="var(--accent)" />
        <path d="M17.6058 13.2603C18.102 11.0572 22.6427 11.375 22.6197 13.8989C22.0525 16.2652 17.4372 15.7294 17.6058 13.2603Z" fill="var(--accent)" />
        <path d="M14.9478 15.3381C16.0796 14.5281 18.5029 18.2428 17.5123 19.5964C16.2774 20.4397 13.8966 16.5483 14.9478 15.3381Z" fill="var(--accent)" />
        <path d="M12.4438 16.4828C13.658 16.5976 13.532 19.6799 12.1468 19.9149C10.8424 19.7685 11.0872 16.6145 12.4438 16.4828Z" fill="var(--accent)" />
        <path d="M8.14378 17.1963C7.28218 17.5051 6.42602 17.6249 5.54174 17.3248C4.67747 17.041 4.12053 16.212 4.48021 15.3153C4.77929 14.5697 5.47458 14.0913 6.18381 13.7831C9.6415 12.3095 11.8426 15.68 8.14378 17.1963Z" fill="var(--accent)" />
      </svg>
    </span>
  );
}

export function WhereIsWaldoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordCountsRef = useRef<number[]>(taskLines.map(() => 0));
  const [started, setStarted] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>(taskLines.map(() => "queued"));
  const [wordCounts, setWordCounts] = useState<number[]>(taskLines.map(() => 0));
  const [finalWords, setFinalWords] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const timers: Array<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>> = [];

    function advanceToTask(index: number) {
      if (index >= taskLines.length) {
        setShowCursor(false);
        streamFinal();
        return;
      }

      setStatuses((current) => current.map((status, statusIndex) => (statusIndex === index ? "active" : status)));
      setShowCursor(true);
      streamTask(index);
    }

    function streamTask(taskIndex: number) {
      const words = taskLines[taskIndex].split(" ");
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        wordCountsRef.current = wordCountsRef.current.map((wordCount, index) => (index === taskIndex ? count : wordCount));
        setWordCounts([...wordCountsRef.current]);

        if (count >= words.length) {
          clearInterval(interval);
          const doneTimer = setTimeout(() => {
            setStatuses((current) => current.map((status, index) => (index === taskIndex ? "done" : status)));
            setShowCursor(false);
            const nextTimer = setTimeout(() => advanceToTask(taskIndex + 1), 180);
            timers.push(nextTimer);
          }, 320);
          timers.push(doneTimer);
        }
      }, wordMs);
      timers.push(interval);
    }

    function streamFinal() {
      const words = finalLine.split(" ");
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setFinalWords(count);
        if (count >= words.length) clearInterval(interval);
      }, wordMs + 20);
      timers.push(interval);
    }

    const startTimer = setTimeout(() => advanceToTask(0), 360);
    timers.push(startTimer);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [started]);

  const visibleWords = (index: number) => taskLines[index].split(" ").slice(0, wordCounts[index]).join(" ");
  const finalText = finalLine.split(" ").slice(0, finalWords).join(" ");

  return (
    <section id="where" ref={sectionRef} className="section-shell surface-card scroll-mt-28 overflow-hidden p-6 sm:p-8 lg:p-12">
      <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
        <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
          Where&apos;s Waldo?
          <br />
          Right now, handling
        </h2>

        <div className="mt-8 w-full max-w-[620px] rounded-[24px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-6 text-left shadow-[var(--shadow-card)] sm:p-8">
          <p className="type-aside mb-6">live agent log</p>

          <div className="flex flex-col gap-4">
            {taskLines.map((line, index) => {
              const status = statuses[index];
              const isActive = status === "active";
              const isDone = status === "done";
              const isQueued = status === "queued";

              return (
                <div
                  key={line}
                  className="grid grid-cols-[18px_1fr] gap-3 transition-opacity duration-300"
                  style={{ opacity: isQueued ? 0.28 : 1 }}
                >
                  {isActive ? (
                    <SpinningPawIcon />
                  ) : (
                    <span className={isDone ? "type-caption text-[var(--text-tertiary)]" : "type-caption text-[var(--text-disabled)]"}>
                      {isDone ? "✓" : "·"}
                    </span>
                  )}

                  <p className={isDone ? "type-body text-[var(--text-tertiary)]" : "type-body text-[var(--ink)]"}>
                    {isQueued || isDone ? line : visibleWords(index)}
                    {isActive && showCursor && (
                      <span
                        className="ml-1 inline-block h-[1em] w-0.5 align-text-top"
                        style={{ background: "var(--accent)", animation: "hint-pulse 0.7s ease-in-out infinite" }}
                        aria-hidden
                      />
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <p
            className="type-h2 overflow-hidden text-[var(--accent)] transition-[max-height,margin-top,opacity] duration-500 ease-[var(--ease-premium)]"
            style={{
              maxHeight: finalWords > 0 ? 72 : 0,
              marginTop: finalWords > 0 ? 32 : 0,
              opacity: finalWords > 0 ? 1 : 0,
            }}
          >
            {finalText}
            {finalWords > 0 && finalWords < finalLine.split(" ").length && (
              <span
                className="ml-1 inline-block h-[0.85em] w-0.5 align-text-top"
                style={{ background: "var(--accent)", animation: "hint-pulse 0.7s ease-in-out infinite" }}
                aria-hidden
              />
            )}
          </p>
        </div>

        <Aside className="mt-6">the answer is always an action.</Aside>
      </div>
    </section>
  );
}
