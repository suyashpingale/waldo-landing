import Image from "next/image";

export function LongGameSection() {
  return (
    <section className="new-long-game-section new-home-section" aria-labelledby="long-game-title">
      <div className="new-long-game-copy new-home-copy-stack new-home-center" data-animate="blur-fade">
        <h2 id="long-game-title" className="type-h2">
          Longer he learns, smarter he gets.
        </h2>
        <p className="type-body tone-secondary">
          <strong>Months in, Waldo gets to know you, more than you do.</strong> It finds
          <br className="new-reference-break" />{" "}
          <span className="new-reference-accent">the patterns.</span> Shows how you can compound. No tool has all of it.
        </p>
      </div>

      <div className="new-long-game-map" data-animate="blur-fade">
        <Image
          className="new-long-game-map-image"
          src="/assets/home/longer-he-runs.svg"
          alt="Waldo connecting recurring signals into the Tuesday Crash pattern."
          width={975}
          height={590}
          sizes="(max-width: 734px) calc(100vw - 44px), 975px"
          unoptimized
        />
      </div>
    </section>
  );
}
