"use client";

import Image, { type StaticImageData } from "next/image";

import goodDarkMode from "@/components/assets/good-dark-mode.svg";
import goodSleepDarkMode from "@/components/assets/good-sleep-dark-mode.svg";
import goodWeekDarkMode from "@/components/assets/good-week-dark-mode.svg";
import roughDarkMode from "@/components/assets/rough-dark-mode.svg";
import watchingDarkMode from "@/components/assets/watching-dark-mode.svg";
import { Aside, SectionIntro } from "@/components/landing-primitives";
import { MobileDots } from "@/components/mobile-dots";
import { useCardStack } from "@/hooks/use-card-stack";
import { AUTO_CARD_MS, DUR_SETTLE, EASE } from "@/lib/motion";

type ActionCard = {
  title: string;
  icon: StaticImageData;
  iconW: number;
  iconH: number;
  body: string;
  metric: string;
  read: string;
};

const actions: ActionCard[] = [
  {
    title: "The Fetch",
    icon: roughDarkMode,
    iconW: 100,
    iconH: 77,
    body: "Stress climbs, the important call stays, the soft meeting moves. Waldo protects the afternoon before it turns into a crash.",
    metric: "3pm",
    read: "kept because it matters.",
  },
  {
    title: "The Adjustment",
    icon: goodWeekDarkMode,
    iconW: 100,
    iconH: 77,
    body: "A heavy week gets lighter before Friday is gone. Time moves, the team gets the note, and the load comes down.",
    metric: "14/21",
    read: "Load is high; recovery time protected.",
  },
  {
    title: "The Patrol",
    icon: watchingDarkMode,
    iconW: 99,
    iconH: 75,
    body: "Background monitoring keeps running even when there is nothing worth saying. Most of the work stays quiet.",
    metric: "24/7",
    read: "watching quietly, not pinging loudly.",
  },
  {
    title: "The Window",
    icon: goodDarkMode,
    iconW: 77,
    iconH: 79,
    body: "Your best focus hours are found, held, and kept away from low-value work before the day gets crowded.",
    metric: "2-4pm",
    read: "best window matched to deep work.",
  },
  {
    title: "The Heads-Up",
    icon: goodSleepDarkMode,
    iconW: 89,
    iconH: 66,
    body: "When the pattern starts forming, Waldo tells you early. No panic. Just enough notice to change the shape of the day.",
    metric: "45 min",
    read: "early enough to matter.",
  },
];

const slots = [
  { rotate: "-18deg", opacity: 0.54, blur: "blur(5px)", size: "small", left: "0px", top: "48px", w: "392px", h: "430px" },
  { rotate: "16deg", opacity: 0.54, blur: "blur(5px)", size: "small", left: "620px", top: "52px", w: "392px", h: "430px" },
  { rotate: "-8deg", opacity: 0.78, blur: "blur(2px)", size: "medium", left: "150px", top: "18px", w: "430px", h: "460px" },
  { rotate: "8deg", opacity: 0.78, blur: "blur(2px)", size: "medium", left: "460px", top: "18px", w: "430px", h: "460px" },
  { rotate: "0deg", opacity: 1, blur: "none", size: "front", left: "320px", top: "0px", w: "420px", h: "500px" },
] as const;

const cardTransition = `transform ${DUR_SETTLE}ms ${EASE}, opacity ${DUR_SETTLE}ms ${EASE}, filter ${DUR_SETTLE}ms ${EASE}`;

function StackCard({ card, size }: { card: ActionCard; size: "small" | "medium" | "front" }) {
  const front = size === "front";
  const medium = size === "medium";

  return (
    <article
      className="flex h-full w-full flex-col justify-between overflow-hidden border border-[var(--border-default)] bg-[var(--surface-t2)] shadow-[var(--shadow-floating)]"
      style={{
        borderRadius: front ? 24 : medium ? 21 : 18,
        padding: front ? 42 : medium ? 34 : 30,
      }}
    >
      <div>
        <Image src={card.icon} alt="" width={card.iconW} height={card.iconH} unoptimized className="h-auto max-h-20 w-auto" />
        <h3 className={front ? "type-h2 mt-8 text-[var(--ink)]" : "type-h3 mt-7 text-[var(--ink)]"}>{card.title}</h3>
        <p className={front ? "type-body mt-4 text-[var(--text-secondary)]" : "type-caption mt-4 text-[var(--text-secondary)]"}>
          {card.body}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="type-caption text-[var(--text-secondary)]">signal</span>
          <span className="type-data text-[var(--ink)]">{card.metric}</span>
        </div>
        <Aside className="mt-2">{card.read}</Aside>
      </div>
    </article>
  );
}

export function FiveThingsSection() {
  const { slotOf, frontIndex, onClick, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } = useCardStack(actions.length, AUTO_CARD_MS);
  const frontCard = actions[frontIndex];

  return (
    <section id="actions" className="section-shell scroll-mt-28 flex flex-col gap-8 py-10 lg:gap-10 lg:py-12">
      <SectionIntro
        title={
          <>
            Five things Waldo
            <br />
            does in the background.
          </>
        }
        aside="quiet, until it matters."
      >
        <p>
          These are the visible traces. Most of the work happens before you think to ask for it.
        </p>
      </SectionIntro>

      <div className="lg:hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onClick={onClick}>
        <div className="relative mx-auto w-full max-w-[420px] px-4 pt-5">
          <div className="absolute inset-x-8 top-0 h-full rounded-[22px] border border-[var(--border-default)] bg-[var(--surface-t2)] opacity-50" />
          <div className="absolute inset-x-6 top-2 h-full rounded-[22px] border border-[var(--border-default)] bg-[var(--surface-t2)] opacity-70" />
          <div className="relative z-10 min-h-[430px]">
            <StackCard card={frontCard} size="front" />
          </div>
        </div>
        <MobileDots count={actions.length} current={frontIndex} />
      </div>

      <div
        className="relative mx-auto hidden h-[520px] w-full max-w-[1020px] cursor-pointer lg:block"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="button"
        aria-label="Agent action cards. Click to advance."
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick(event as unknown as React.MouseEvent);
          }
        }}
      >
        {actions.map((card, index) => {
          const slotIndex = slotOf(index);
          const slot = slots[slotIndex];
          const size = slot.size;

          return (
            <div
              key={card.title}
              className="absolute"
              style={{
                left: slot.left,
                top: slot.top,
                width: slot.w,
                height: slot.h,
                zIndex: slotIndex + 1,
                transition: cardTransition,
              }}
            >
              <div
                style={{
                  height: "100%",
                  opacity: slot.opacity,
                  filter: slot.blur,
                  transform: `rotate(${slot.rotate})`,
                  transition: cardTransition,
                }}
              >
                <StackCard card={card} size={size === "front" ? "front" : size === "medium" ? "medium" : "small"} />
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {actions.map((action, index) => (
            <button
              key={action.title}
              aria-label={`Show ${action.title}`}
              className="h-2 rounded-full bg-[var(--border-focus)] transition-[width,background-color] duration-300 ease-[var(--ease-premium)]"
              style={{
                width: index === frontIndex ? 24 : 8,
                background: index === frontIndex ? "var(--ink)" : "var(--border-focus)",
              }}
              onClick={(event) => {
                event.stopPropagation();
                const steps = ((index - frontIndex) % actions.length + actions.length) % actions.length;
                for (let step = 0; step < steps; step += 1) {
                  onClick(event as unknown as React.MouseEvent);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
