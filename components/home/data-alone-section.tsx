"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import { ConnectorChip } from "@/components/connectors/connector-chip";
import { connectors, type Connector } from "@/components/connectors/connector-data";

type AutonomyKey = "inform" | "propose" | "autonomous";

type AutonomyLevel = {
  key: AutonomyKey;
  label: string;
  level: "L1" | "L2" | "L3";
  mode: string;
  body: ReactNode;
  primaryAction: string;
  secondaryAction: string;
};

const connectorById = new Map(connectors.map((connector) => [connector.id, connector]));
const informMoveCopy = "I'd move your 9am to 10:30";

function getConnector(id: string): Connector {
  const connector = connectorById.get(id);

  if (!connector) {
    throw new Error(`Missing connector: ${id}`);
  }

  return connector;
}

const autonomyLevels: AutonomyLevel[] = [
  {
    key: "inform",
    label: "Inform",
    level: "L1",
    mode: "Inform first",
    body: (
      <>
        I am seeing some movement in vitals, <strong>{informMoveCopy}.</strong> Do you want me to?
      </>
    ),
    primaryAction: "Walk me through it first",
    secondaryAction: "Chat",
  },
  {
    key: "propose",
    label: "Propose",
    level: "L2",
    mode: "Propose Changes",
    body: (
      <>
        I can move your 9am to 10:30, send the room a note, and keep the deck review where it is.
      </>
    ),
    primaryAction: "Approve change",
    secondaryAction: "Adjust",
  },
  {
    key: "autonomous",
    label: "Autonomous",
    level: "L3",
    mode: "Full agency",
    body: (
      <>
        Vitals moved enough, so <strong>I moved your 9am to 10:30</strong> and sent the room the new plan.
      </>
    ),
    primaryAction: "View handoff",
    secondaryAction: "Undo",
  },
];

export function DataAloneSection() {
  const [activeLevel, setActiveLevel] = useState<AutonomyKey>("inform");
  const activeAutonomyLevel = autonomyLevels.find((level) => level.key === activeLevel) ?? autonomyLevels[0];

  return (
    <section className="new-data-alone-section new-home-section" aria-labelledby="data-alone-title">
      <div className="new-data-alone-copy new-home-copy-stack new-home-center" data-animate="blur-fade">
        <Image
          className="new-data-alone-waldo new-section-mascot waldo-mascot-consistent"
          src="/assets/home/mascots/good-week-dark-mode.svg"
          alt=""
          width={198}
          height={147}
        />
        <h2 id="data-alone-title" className="type-h2">
          The data? Yours alone.
        </h2>
        <p
          aria-label="Your health data stays in your hands. We do not sell data. We do not share with advertisers. The wheel is always in your hands."
          className="type-body tone-secondary"
        >
          <strong>Your health data stays in your hands.</strong> We do not sell <span className="new-reference-accent">data.</span> We do
          <br className="new-reference-break" />{" "}
          not share with advertisers. The wheel is always in your hands.
        </p>
      </div>

      <div className="new-data-alone-stage" data-animate="blur-fade">
        <svg className="new-data-alone-line-svg" viewBox="0 0 952 548" fill="none" aria-hidden="true">
          <path
            className="new-data-alone-line new-data-alone-line-handoff"
            data-flow-line
            d="M487 238 H527"
          />
        </svg>

        <div className="new-data-alone-map" aria-label="The part only Waldo needs to worry about">
          <div className="new-data-alone-map-inner" aria-hidden="true">
            <Image
              alt=""
              className="new-data-alone-map-image"
              height={461}
              src="/assets/home/data-alone/data-alone-left-cluster.svg"
              width={461}
            />
          </div>
        </div>

        <article className="new-data-alone-handoff-card" data-level={activeAutonomyLevel.key} key={activeAutonomyLevel.key}>
          <div className="new-data-alone-handoff-meta">
            <span>{activeAutonomyLevel.level}</span>
            <span>{activeAutonomyLevel.mode}</span>
          </div>
          <div className="new-data-alone-handoff-title">
            <span>Readiness check for</span>
            <strong>
              Weekly team Sync - 9:00
              <span className="new-data-alone-handoff-icons" aria-hidden="true">
                <ConnectorChip connector={getConnector("google-calendar")} label={false} />
                <ConnectorChip connector={getConnector("gmail")} label={false} />
              </span>
            </strong>
          </div>
          <p>{activeAutonomyLevel.body}</p>
          <div className="new-data-alone-handoff-actions">
            <button type="button">{activeAutonomyLevel.primaryAction}</button>
            <button type="button">{activeAutonomyLevel.secondaryAction}</button>
          </div>
        </article>

        <div className="new-data-alone-toggle" role="tablist" aria-label="Autonomy level">
          {autonomyLevels.map((level) => (
            <button
              aria-label={`${level.level}: ${level.mode}`}
              aria-pressed={activeLevel === level.key}
              className="new-data-alone-toggle-button"
              data-active={activeLevel === level.key ? "true" : "false"}
              key={level.key}
              onClick={() => setActiveLevel(level.key)}
              type="button"
            >
              <span>{level.label}</span>
              <em>{level.level}</em>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
