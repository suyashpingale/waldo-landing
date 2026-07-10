"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type AssetCard = {
  type: "asset";
  src: string;
  width: number;
  height: number;
};

type AssetPair = {
  type: "pair";
  cards: [AssetCard, AssetCard];
};

type DataCard = AssetCard | AssetPair;

const dataBentoAsset = (name: string, width: number, height: number): AssetCard => ({
  type: "asset",
  src: `/assets/home/data-bento/${name}.png`,
  width,
  height,
});

const leftColumn: DataCard[] = [
  dataBentoAsset("slack-q1-prep", 522, 230),
  dataBentoAsset("imessage-binge", 522, 184),
  dataBentoAsset("nutrition-details", 522, 342),
  dataBentoAsset("net-energy", 522, 216),
  {
    type: "pair",
    cards: [dataBentoAsset("micronutrients-left", 264, 404), dataBentoAsset("micronutrients-right", 250, 404)],
  },
];

const middleColumn: DataCard[] = [
  dataBentoAsset("gmail-q1-review", 458, 162),
  dataBentoAsset("calendar-strategy", 458, 252),
  dataBentoAsset("time-asleep", 458, 141),
  {
    type: "pair",
    cards: [dataBentoAsset("sleep-mini", 218, 217), dataBentoAsset("vitals-mini", 230, 217)],
  },
  dataBentoAsset("sleep-score", 459, 283),
  dataBentoAsset("hours-vs-need", 458, 314),
];

const rightColumn: DataCard[] = [
  dataBentoAsset("gmail-newsletter", 470, 252),
  dataBentoAsset("slack-sales-short", 470, 160),
  dataBentoAsset("zone-5", 470, 78),
  dataBentoAsset("zone-4", 470, 78),
  dataBentoAsset("zone-3", 470, 78),
  dataBentoAsset("zone-2", 470, 78),
  dataBentoAsset("zone-1", 470, 78),
  {
    type: "pair",
    cards: [dataBentoAsset("stress-monitor", 188, 195), dataBentoAsset("recovery", 272, 194)],
  },
  dataBentoAsset("stress-heart-rate", 470, 338),
];

const wearableDevices = [
  { src: "/assets/home/devices/apple-watchface.svg", alt: "Apple Watch", width: 30, height: 44 },
  { src: "/assets/home/devices/wearable-band.svg", alt: "Wearable band", width: 29, height: 42 },
  { src: "/assets/home/devices/wearable-ring.svg", alt: "Smart ring", width: 43, height: 43 },
  { src: "/assets/home/devices/analog-watch-check.svg", alt: "Garmin watch", width: 31, height: 44 },
  { src: "/assets/home/devices/wearable-tilted-ring.svg", alt: "Oura ring", width: 50, height: 52 },
  { src: "/assets/home/devices/analog-watch.svg", alt: "Samsung Watch", width: 32, height: 44 },
];

function canUseFinePointer() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function AssetCardView({ card }: { card: AssetCard }) {
  return (
    <article className="new-data-asset-card">
      <Image src={card.src} alt="" width={card.width} height={card.height} draggable={false} />
    </article>
  );
}

function AssetPairView({ pair }: { pair: AssetPair }) {
  return (
    <div
      className="new-data-asset-pair"
      style={{ gridTemplateColumns: `${pair.cards[0].width}fr ${pair.cards[1].width}fr` }}
    >
      {pair.cards.map((card) => (
        <AssetCardView key={card.src} card={card} />
      ))}
    </div>
  );
}

function DataCardView({ card }: { card: DataCard }) {
  if (card.type === "pair") {
    return <AssetPairView pair={card} />;
  }

  return <AssetCardView card={card} />;
}

function DataColumn({ cards, direction }: { cards: DataCard[]; direction: "up" | "down" }) {
  return (
    <div className="new-data-column" data-direction={direction}>
      <div className="new-data-marquee-track">
        {[0, 1].map((set) => (
          <div key={set} className="new-data-marquee-set">
            {cards.map((card, index) => (
              <DataCardView key={`${set}-${card.type}-${index}`} card={card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TooMuchDataSection() {
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const waldoRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const applyPointer = useCallback(() => {
    frameRef.current = null;
    const { x, y } = pointerRef.current;

    if (waldoRef.current) {
      waldoRef.current.style.transform = `translate3d(calc(-50% + ${x * 8}px), calc(-50% + ${y * 5}px), 0) rotate(${x * 1.2}deg)`;
    }
  }, []);

  const updatePointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!canUseFinePointer()) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(applyPointer);
    }
  }, [applyPointer]);

  const resetPointer = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    pointerRef.current = { x: 0, y: 0 };

    if (waldoRef.current) {
      waldoRef.current.style.transform = "";
    }
  }, []);

  const showBubble = useCallback(() => {
    setIsBubbleVisible(true);
  }, []);

  const hideBubble = useCallback(() => {
    setIsBubbleVisible(false);
  }, []);

  useEffect(() => resetPointer, [resetPointer]);

  return (
    <section className="new-too-much-data-section" aria-labelledby="too-much-data-title">
      <h2 id="too-much-data-title" className="sr-only">
        Waldo reads the scattered data you already have.
      </h2>
      <div
        className="new-too-much-data-card"
        data-animate="blur-fade"
        onPointerLeave={resetPointer}
        onPointerMove={updatePointer}
      >
        <div className="new-too-much-data-inner" aria-hidden="true">
          <DataColumn cards={leftColumn} direction="up" />
          <DataColumn cards={middleColumn} direction="down" />
          <DataColumn cards={rightColumn} direction="up" />
        </div>
        <div
          ref={waldoRef}
          className="new-too-much-data-waldo"
          data-bubble-visible={isBubbleVisible ? "true" : "false"}
        >
          <span
            className="new-too-much-data-waldo-illustration"
            onPointerEnter={showBubble}
            onPointerLeave={hideBubble}
          >
            <Image
              src="/assets/home/mascots/waldo-facepalm.svg"
              alt=""
              width={114}
              height={97}
              className="waldo-mascot-consistent"
              draggable={false}
            />
          </span>
          <p data-visible={isBubbleVisible ? "true" : "false"}>oof, thats a lot of data</p>
        </div>
      </div>
      <div className="new-too-much-data-story">
        <div className="new-too-much-data-copy" data-animate="blur-fade">
          <h2>You already have everything Waldo needs.</h2>
          <p>
            <strong>Months of health data, sitting idle.</strong> From the calendar you live by to the inbox you fight
            with. Waldo takes what you already have and puts it to work - no buying, no building, no complex setup.
          </p>
        </div>
        <div className="new-wearable-device-row" aria-label="Wearables Waldo can read" data-animate="blur-fade">
          {wearableDevices.map((device) => (
            <span key={device.src} className="new-wearable-device">
              <Image src={device.src} alt={device.alt} width={device.width} height={device.height} draggable={false} />
            </span>
          ))}
        </div>
        <p className="new-wearable-copy" data-animate="blur-fade">
          <strong>Got a wearable? Thats all Waldo needs.</strong>{" "}
          Apple Watch, WHOOP, OURA ring, Samsung Watch,
          FitBit, and Garmin. if it&apos;s reading your body, Waldo already speaks its language.
        </p>
      </div>
    </section>
  );
}
