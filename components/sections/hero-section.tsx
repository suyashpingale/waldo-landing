import Image from "next/image";
import { WaldoCTA } from "@/components/landing-primitives";
import { HeroProofScene } from "@/components/sections/hero-proof-scene";
import { waldoHeroStates } from "@/components/sections/waldo-capability-data";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[var(--surface-t3)]"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        width: "100vw",
      }}
    >
      {/* Dome — provided asset, shown at its native 1440/989 proportions (never cropped). */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0" style={{ aspectRatio: "1440 / 989" }}>
        <Image
          src="/assets/hero-bg.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-dome-image select-none object-cover object-top"
        />
      </div>

      <HeroProofScene states={waldoHeroStates}>
        {({ active, activeState, progress, selectState, states }) => (
          <div className="waldo-hero-copy relative z-20 mx-auto flex max-w-[840px] flex-col items-center px-6 text-center" data-animate="blur-fade">
            <p className="type-caption hero-status-pill" aria-hidden="true">
              {activeState.status}
            </p>

            <h1 className="type-display mt-5 text-[var(--ink)]" data-animate="fade-up">
              <span className="hero-title-mobile">
                The first app that knows
                <br />
                what kind of day
                <br />
                you&apos;re having and gets
                <br />
                the work moving.
              </span>
              <span className="hero-title-desktop">
                The first app that knows
                <br />
                what kind of day you&apos;re having
                <br />
                and gets the work moving.
              </span>
            </h1>

            <p className="type-h3 hero-action-receipt mt-6 text-[var(--ink)]">{activeState.headlineReceipt}</p>

            <p className="type-body tone-secondary mt-4 max-w-[62ch] sm:mt-5">
              Waldo reads the signals your body already gives off, understands the work around you, and gets the right tools and agents moving.
              <br className="hidden sm:inline" /> Calendar, inbox, tasks, apps, accounts, and agents. Already on it.
            </p>

            <div className="hero-progress-segments mt-7" role="tablist" aria-label="Hero proof states">
              {states.map((state, index) => {
                const isActive = index === active;
                const isComplete = index < active;
                const width = isActive ? progress * 100 : isComplete ? 100 : 0;

                return (
                  <button
                    key={state.key}
                    type="button"
                    className="hero-progress-segment focusable-ring"
                    aria-current={isActive ? "true" : undefined}
                    aria-label={state.status}
                    onClick={() => selectState(index)}
                  >
                    <span className="hero-progress-track">
                      <span className="hero-progress-fill" style={{ width: `${width}%` }} />
                    </span>
                  </button>
                );
              })}
            </div>

            <WaldoCTA className="mt-3 sm:mt-6" />
          </div>
        )}
      </HeroProofScene>
    </section>
  );
}
