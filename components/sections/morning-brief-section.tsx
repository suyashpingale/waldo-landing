import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { WaldoFace } from "./waldo-face";
import { SmartSectionActivity } from "./smart-section-activity";

import phoneMockup from "@/components/assets/iphone-mockup.webp";

type FlowStyle = CSSProperties & {
  "--asset-crop"?: string;
  "--card-width"?: string;
  "--flow-delay"?: string;
  "--flow-y"?: string;
  "--flow-drift"?: string;
  "--flow-rotate"?: string;
  "--flow-scale"?: string;
  "--flow-mid-scale"?: string;
  "--flow-tuck-scale"?: string;
  "--flow-mobile-peak-scale"?: string;
  "--flow-mobile-mid-scale"?: string;
  "--flow-mobile-tuck-scale"?: string;
  "--receipt-delay"?: string;
};

type SourceCardBase = {
  width: string;
  y: string;
  delay: string;
  drift?: string;
  rotate?: string;
  scale?: string;
};

type SourceAssetCard = SourceCardBase & {
  kind?: "asset";
  src: string;
  alt: string;
  naturalWidth: number;
  naturalHeight: number;
};

type SourceConnectorCard = SourceCardBase & {
  kind: "connector";
  label: string;
  icon: string;
  tone: string;
};

type SourceCard = SourceAssetCard | SourceConnectorCard;

const SOURCE_ASSET_CARD_SCALE = 0.9;
const SOURCE_ASSET_WIDTH_MULTIPLIER = 1.08;
const SOURCE_MEDIUM_ASSET_WIDTH_MULTIPLIER = 1.14;
const SOURCE_NARROW_ASSET_WIDTH_MULTIPLIER = 1.22;
const SOURCE_CONNECTOR_CARD_SCALE = 0.82;

function getReadableAssetWidth(width: string) {
  const value = Number.parseFloat(width);
  if (!Number.isFinite(value) || !width.endsWith("px")) {
    return width;
  }

  const multiplier =
    value < 150
      ? SOURCE_NARROW_ASSET_WIDTH_MULTIPLIER
      : value < 180
        ? SOURCE_MEDIUM_ASSET_WIDTH_MULTIPLIER
        : SOURCE_ASSET_WIDTH_MULTIPLIER;

  return `${Math.round(value * multiplier)}px`;
}

function getCompactFlowScale(scale: string | undefined, compactScale: number) {
  const value = Number.parseFloat(scale ?? "1");
  if (!Number.isFinite(value)) {
    return scale ?? `${compactScale}`;
  }

  return `${Math.round(value * compactScale * 1000) / 1000}`;
}

function getSourceAssetCrop(src: string) {
  if (src.includes("/assets/home/data-bento/")) {
    return "inset(0 round 14px)";
  }

  if (src.includes("nutrition-minerals") || src.includes("nutrition-fiber")) {
    return "inset(5% 31% 24% 11% round 18px)";
  }

  if (src.includes("nutrition-macros")) {
    return "inset(8% 22% 22% 7% round 18px)";
  }

  if (src.includes("zone-")) {
    return "inset(16% 10% 45% 8% round 12px)";
  }

  if (src.includes("sleep-stages") || src.includes("vitals-typical") || src.includes("stress-monitor")) {
    return "inset(10% 24% 22% 12% round 16px)";
  }

  if (src.includes("sleep-score")) {
    return "inset(10% 20% 28% 7% round 16px)";
  }

  if (src.includes("stress-heart-rate") || src.includes("hours-vs-need")) {
    return "inset(9% 18% 27% 7% round 16px)";
  }

  return "inset(12% 20% 30% 8% round 16px)";
}

type ProcessedCard = {
  tone: "sleep" | "inbox" | "calendar" | "nutrition" | "stress" | "recovery";
  eyebrow: string;
  label: string;
  body: ReactNode;
  aside: string;
  connectors: Array<{
    label: string;
    src?: string;
  }>;
  delay: string;
};

const sourceCards: SourceAssetCard[] = [
  {
    src: "/assets/home/data-bento/slack-q1-prep.png",
    alt: "Slack Q1 preparation card.",
    naturalWidth: 522,
    naturalHeight: 230,
    width: "238px",
    y: "318px",
    delay: "-35.1s",
    drift: "-18px",
    rotate: "-1.4deg",
  },
  {
    src: "/assets/home/data-bento/time-asleep.png",
    alt: "Time asleep card.",
    naturalWidth: 458,
    naturalHeight: 141,
    width: "224px",
    y: "392px",
    delay: "-33.3s",
    drift: "16px",
    rotate: "1deg",
    scale: "0.96",
  },
  {
    src: "/assets/home/data-bento/gmail-q1-review.png",
    alt: "Gmail Q1 review card.",
    naturalWidth: 458,
    naturalHeight: 162,
    width: "224px",
    y: "478px",
    delay: "-31.5s",
    drift: "-20px",
    rotate: "0.6deg",
  },
  {
    src: "/assets/home/data-bento/sleep-score.png",
    alt: "Sleep score card showing a 74 score.",
    naturalWidth: 459,
    naturalHeight: 283,
    width: "214px",
    y: "564px",
    delay: "-29.7s",
    drift: "18px",
    rotate: "1.3deg",
  },
  {
    src: "/assets/home/data-bento/imessage-binge.png",
    alt: "iMessage card about watching the next episodes.",
    naturalWidth: 522,
    naturalHeight: 184,
    width: "236px",
    y: "336px",
    delay: "-27.9s",
    drift: "8px",
    rotate: "1.1deg",
  },
  {
    src: "/assets/home/data-bento/vitals-mini.png",
    alt: "Vitals card showing typical overnight readings.",
    naturalWidth: 230,
    naturalHeight: 217,
    width: "132px",
    y: "622px",
    delay: "-26.1s",
    drift: "-18px",
    rotate: "-0.8deg",
    scale: "0.92",
  },
  {
    src: "/assets/home/data-bento/calendar-strategy.png",
    alt: "Calendar product strategy review card.",
    naturalWidth: 458,
    naturalHeight: 252,
    width: "222px",
    y: "430px",
    delay: "-24.3s",
    drift: "-10px",
    rotate: "-1deg",
  },
  {
    src: "/assets/home/data-bento/sleep-mini.png",
    alt: "Sleep mini card.",
    naturalWidth: 218,
    naturalHeight: 217,
    width: "128px",
    y: "514px",
    delay: "-22.5s",
    drift: "20px",
    rotate: "0.8deg",
    scale: "0.94",
  },
  {
    src: "/assets/home/data-bento/gmail-newsletter.png",
    alt: "Gmail newsletter card.",
    naturalWidth: 470,
    naturalHeight: 252,
    width: "226px",
    y: "608px",
    delay: "-20.7s",
    drift: "10px",
    rotate: "0.8deg",
  },
  {
    src: "/assets/home/data-bento/hours-vs-need.png",
    alt: "Hours versus sleep need chart.",
    naturalWidth: 458,
    naturalHeight: 314,
    width: "218px",
    y: "370px",
    delay: "-18.9s",
    drift: "-22px",
    rotate: "-0.6deg",
    scale: "0.94",
  },
  {
    src: "/assets/home/data-bento/stress-monitor.png",
    alt: "Stress monitor gauge card.",
    naturalWidth: 188,
    naturalHeight: 195,
    width: "118px",
    y: "484px",
    delay: "-17.1s",
    drift: "-8px",
    rotate: "-1.2deg",
    scale: "0.94",
  },
  {
    src: "/assets/home/data-bento/recovery.png",
    alt: "Recovery bar chart card.",
    naturalWidth: 272,
    naturalHeight: 194,
    width: "166px",
    y: "580px",
    delay: "-15.3s",
    drift: "14px",
    rotate: "1.6deg",
    scale: "0.9",
  },
  {
    src: "/assets/home/data-bento/stress-heart-rate.png",
    alt: "Stress and heart rate chart card.",
    naturalWidth: 470,
    naturalHeight: 338,
    width: "232px",
    y: "332px",
    delay: "-13.5s",
    drift: "20px",
    rotate: "0.8deg",
    scale: "0.92",
  },
  {
    src: "/assets/home/data-bento/zone-5.png",
    alt: "Zone 5 activity load card.",
    naturalWidth: 470,
    naturalHeight: 78,
    width: "230px",
    y: "442px",
    delay: "-11.7s",
    drift: "-18px",
    rotate: "-0.9deg",
    scale: "0.92",
  },
  {
    src: "/assets/home/data-bento/zone-4.png",
    alt: "Zone 4 activity load card.",
    naturalWidth: 470,
    naturalHeight: 78,
    width: "230px",
    y: "548px",
    delay: "-9.9s",
    drift: "16px",
    rotate: "0.8deg",
    scale: "0.92",
  },
  {
    src: "/assets/home/data-bento/zone-3.png",
    alt: "Zone 3 activity load card.",
    naturalWidth: 470,
    naturalHeight: 78,
    width: "230px",
    y: "574px",
    delay: "-8.1s",
    drift: "-12px",
    rotate: "1.1deg",
    scale: "0.92",
  },
  {
    src: "/assets/home/data-bento/net-energy.png",
    alt: "Net energy card showing minus 100 kilocalories.",
    naturalWidth: 522,
    naturalHeight: 216,
    width: "238px",
    y: "398px",
    delay: "-6.3s",
    drift: "14px",
    rotate: "0.7deg",
    scale: "0.92",
  },
  {
    src: "/assets/home/data-bento/nutrition-details.png",
    alt: "Nutritional details card with fat, carbs, and protein.",
    naturalWidth: 522,
    naturalHeight: 342,
    width: "246px",
    y: "506px",
    delay: "-4.5s",
    drift: "-20px",
    rotate: "-0.8deg",
    scale: "0.9",
  },
  {
    src: "/assets/home/data-bento/micronutrients-left.png",
    alt: "Micronutrients card showing fiber, potassium, and iron.",
    naturalWidth: 264,
    naturalHeight: 404,
    width: "126px",
    y: "650px",
    delay: "-2.7s",
    drift: "18px",
    rotate: "1deg",
    scale: "0.9",
  },
  {
    src: "/assets/home/data-bento/micronutrients-right.png",
    alt: "Micronutrients card showing magnesium, calcium, and vitamin D.",
    naturalWidth: 250,
    naturalHeight: 404,
    width: "124px",
    y: "458px",
    delay: "-0.9s",
    drift: "-14px",
    rotate: "-1deg",
    scale: "0.9",
  },
];

const workspaceConnectorCards: SourceConnectorCard[] = [
  {
    kind: "connector",
    label: "Gmail",
    icon: "/assets/connectors/gmail.svg",
    tone: "gmail",
    width: "132px",
    y: "366px",
    delay: "-34.4s",
    drift: "16px",
    rotate: "1deg",
  },
  {
    kind: "connector",
    label: "Drive",
    icon: "/assets/connectors/google-drive.svg",
    tone: "drive",
    width: "128px",
    y: "558px",
    delay: "-31.2s",
    drift: "-10px",
    rotate: "-1deg",
    scale: "0.98",
  },
  {
    kind: "connector",
    label: "Outlook",
    icon: "/assets/connectors/microsoft-outlook.svg",
    tone: "outlook",
    width: "136px",
    y: "314px",
    delay: "-29.6s",
    drift: "10px",
    rotate: "0.7deg",
  },
  {
    kind: "connector",
    label: "Slack",
    icon: "/assets/connectors/slack.svg",
    tone: "slack",
    width: "126px",
    y: "638px",
    delay: "-26.4s",
    drift: "-16px",
    rotate: "-1.2deg",
  },
  {
    kind: "connector",
    label: "WhatsApp",
    icon: "/assets/connectors/whatsapp.svg",
    tone: "whatsapp",
    width: "150px",
    y: "468px",
    delay: "-23.2s",
    drift: "16px",
    rotate: "1.2deg",
  },
  {
    kind: "connector",
    label: "Telegram",
    icon: "/assets/connectors/telegram.svg",
    tone: "telegram",
    width: "148px",
    y: "574px",
    delay: "-20s",
    drift: "-8px",
    rotate: "-0.8deg",
    scale: "0.98",
  },
  {
    kind: "connector",
    label: "Figma",
    icon: "/assets/connectors/figma.svg",
    tone: "figma",
    width: "128px",
    y: "378px",
    delay: "-18.4s",
    drift: "-18px",
    rotate: "-1.1deg",
  },
  {
    kind: "connector",
    label: "Linear",
    icon: "/assets/connectors/linear.svg",
    tone: "linear",
    width: "132px",
    y: "648px",
    delay: "-15.2s",
    drift: "14px",
    rotate: "1deg",
  },
  {
    kind: "connector",
    label: "GitHub",
    icon: "/assets/connectors/github.svg",
    tone: "github",
    width: "134px",
    y: "326px",
    delay: "-12s",
    drift: "-12px",
    rotate: "-0.7deg",
  },
  {
    kind: "connector",
    label: "Asana",
    icon: "/assets/connectors/asana.svg",
    tone: "asana",
    width: "126px",
    y: "506px",
    delay: "-8.8s",
    drift: "18px",
    rotate: "1.1deg",
  },
  {
    kind: "connector",
    label: "Zendesk",
    icon: "/assets/connectors/zendesk.svg",
    tone: "zendesk",
    width: "140px",
    y: "542px",
    delay: "-5.6s",
    drift: "-14px",
    rotate: "-1deg",
  },
  {
    kind: "connector",
    label: "Salesforce",
    icon: "/assets/connectors/salesforce.svg",
    tone: "salesforce",
    width: "154px",
    y: "442px",
    delay: "-2.4s",
    drift: "12px",
    rotate: "0.9deg",
  },
  {
    kind: "connector",
    label: "Notion",
    icon: "/assets/connectors/notion.svg",
    tone: "notion",
    width: "128px",
    y: "548px",
    delay: "-0.8s",
    drift: "-10px",
    rotate: "-0.8deg",
  },
  {
    kind: "connector",
    label: "HubSpot",
    icon: "/assets/composio-connectors/hubspot.svg",
    tone: "hubspot",
    width: "138px",
    y: "352px",
    delay: "1.6s",
    drift: "18px",
    rotate: "1.2deg",
  },
];

const sourceFlowCards: SourceCard[] = sourceCards.flatMap((card, index) => {
  const connector = workspaceConnectorCards[index];
  return connector ? [card, connector] : [card];
});

const processedCards: ProcessedCard[] = [
  {
    tone: "sleep",
    eyebrow: "Sleep",
    label: "Brief",
    body: (
      <>
        6h 12m asleep and a 74 score. Waldo moved the <strong>9am Q1 review</strong> to the first safer window.
      </>
    ),
    aside: "you need the extra hour more than they need punctuality.",
    connectors: [
      { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "-8.6s",
  },
  {
    tone: "inbox",
    eyebrow: "Inbox",
    label: "Pressure",
    body: (
      <>
        104 emails, 49 Slack pings, and two late asks. Waldo kept <strong>the real work</strong> and muted the rest.
      </>
    ),
    aside: "noise moved out of the way.",
    connectors: [
      { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "0.4s",
  },
  {
    tone: "recovery",
    eyebrow: "Recovery",
    label: "Load",
    body: (
      <>
        Recovery dipped, sleep need rose, and zone load stacked up. Waldo protected <strong>deep work after lunch.</strong>
      </>
    ),
    aside: "your body got veto power before the calendar did.",
    connectors: [
      { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Linear", src: "/assets/composio-connectors/linear.svg" },
      { label: "More" },
    ],
    delay: "9.4s",
  },
  {
    tone: "stress",
    eyebrow: "Stress",
    label: "Cooldown",
    body: (
      <>
        Stress climbed while heart rate stayed noisy. Waldo delayed low-priority messages until <strong>the signal cooled.</strong>
      </>
    ),
    aside: "not another alert. a quieter afternoon.",
    connectors: [
      { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "18.4s",
  },
  {
    tone: "nutrition",
    eyebrow: "Nutrition",
    label: "Fuel",
    body: (
      <>
        Magnesium, fiber, and net energy were off. Waldo suggested a <strong>lighter lunch window</strong> before meetings resumed.
      </>
    ),
    aside: "small inputs, better afternoon.",
    connectors: [
      { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "27.4s",
  },
];

function ConnectorIcon({ connector }: { connector: ProcessedCard["connectors"][number] }) {
  if (!connector.src) {
    return (
      <span className="waldo-smart-connector" aria-label={connector.label}>
        +
      </span>
    );
  }

  return (
    <span className="waldo-smart-connector">
      <Image src={connector.src} alt={connector.label} width={18} height={18} />
    </span>
  );
}

function SourceCardItem({ card }: { card: SourceCard }) {
  const isConnector = card.kind === "connector";
  const compactScale = isConnector ? SOURCE_CONNECTOR_CARD_SCALE : SOURCE_ASSET_CARD_SCALE;

  const style: FlowStyle = {
    "--card-width": isConnector ? card.width : getReadableAssetWidth(card.width),
    "--flow-delay": card.delay,
    "--flow-y": card.y,
    "--flow-drift": card.drift ?? "0px",
    "--flow-rotate": card.rotate ?? "0deg",
    "--flow-scale": getCompactFlowScale(card.scale, compactScale),
    "--flow-mid-scale": isConnector ? "0.62" : "0.68",
    "--flow-tuck-scale": isConnector ? "0.48" : "0.52",
    "--flow-mobile-peak-scale": isConnector ? "0.62" : "0.67",
    "--flow-mobile-mid-scale": isConnector ? "0.44" : "0.48",
    "--flow-mobile-tuck-scale": isConnector ? "0.36" : "0.39",
  };

  if (isConnector) {
    return (
      <div className="waldo-smart-source-card waldo-smart-logo-card" data-logo-tone={card.tone} style={style}>
        <span className="waldo-smart-logo-icon" aria-hidden>
          <Image src={card.icon} alt="" width={24} height={24} />
        </span>
        <span className="waldo-smart-logo-label">{card.label}</span>
      </div>
    );
  }

  const assetStyle: FlowStyle = {
    ...style,
    "--asset-crop": getSourceAssetCrop(card.src),
  };

  return (
    <div className="waldo-smart-source-card waldo-smart-asset-card" style={assetStyle}>
      <Image
        src={card.src}
        alt={card.alt}
        width={card.naturalWidth}
        height={card.naturalHeight}
        className="h-auto w-full select-none"
        sizes="(min-width: 1024px) 340px, 190px"
      />
    </div>
  );
}

function ProcessedReceipt({ card }: { card: ProcessedCard }) {
  const style: FlowStyle = {
    "--receipt-delay": card.delay,
  };

  return (
    <article className="waldo-smart-receipt" data-tone={card.tone} style={style}>
      <div className="waldo-smart-receipt-tags">
        <span className="waldo-smart-receipt-dot" />
        <span>{card.eyebrow}</span>
        <span>{card.label}</span>
      </div>
      <p className="waldo-smart-receipt-body">{card.body}</p>
      <p className="waldo-smart-receipt-aside">{card.aside}</p>
      <div className="waldo-smart-connectors" aria-label="Connectors involved">
        {card.connectors.map((connector) => (
          <ConnectorIcon key={connector.label} connector={connector} />
        ))}
      </div>
    </article>
  );
}

type MorningBriefSectionProps = {
  showIntro?: boolean;
};

export function MorningBriefSection({ showIntro = true }: MorningBriefSectionProps) {
  return (
    <section id="brief" className="waldo-smart-section scroll-mt-28 overflow-hidden">
      <SmartSectionActivity className="waldo-smart-panel relative overflow-hidden border-y border-[var(--border-default)] bg-[var(--surface-t2)] text-center">
        {showIntro ? (
          <div className="waldo-smart-copy" data-animate="blur-fade">
            <h2 className="type-h2 text-[var(--ink)]">Smart like Alfred, goofy like Pluto.</h2>
            <p className="type-body tone-secondary mt-5">
              It handles the serious part quietly, before you&apos;ve asked. Then it tells
              <br className="new-reference-break" />{" "}
              you about it like a dog that&apos;s a little pleased with itself.
            </p>
          </div>
        ) : null}

        <div className="waldo-smart-stage" data-animate="blur-fade">
          <div className="waldo-smart-source-lane" aria-hidden>
            {sourceFlowCards.map((card, index) => (
              <SourceCardItem
                key={card.kind === "connector" ? `${card.label}-${index}` : `${card.src}-${index}`}
                card={card}
              />
            ))}
          </div>

          <div className="waldo-smart-phone-wrap" aria-hidden>
            <div className="waldo-smart-phone-screen">
              <div className="waldo-smart-phone-output-lane">
                {processedCards.map((card) => (
                  <ProcessedReceipt key={`phone-${card.eyebrow}-${card.label}`} card={card} />
                ))}
              </div>
            </div>
            <WaldoFace />
            <Image src={phoneMockup} alt="" className="waldo-smart-phone-image relative z-40 h-auto w-full select-none" sizes="420px" />
          </div>

          <div className="waldo-smart-output-lane">
            {processedCards.map((card) => (
              <ProcessedReceipt key={`${card.eyebrow}-${card.label}`} card={card} />
            ))}
          </div>
        </div>
      </SmartSectionActivity>
    </section>
  );
}
