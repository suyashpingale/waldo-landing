import Image from "next/image";
import Link from "next/link";

function SlackCard() {
  return (
    <div className="absolute left-[6%] top-[18%] hidden w-[235px] -rotate-[9deg] rounded-[12px] bg-[#FAFAF8] px-5 py-4 shadow-[0_22px_46px_rgba(26,26,26,0.16)] lg:block">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
        <span
          className="text-[8px] text-[#8D8D88]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Slack
        </span>
        <span
          className="ml-auto text-[8px] text-[#B7B7B0]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          11:49
        </span>
      </div>
      <p
        className="mt-1 truncate text-[12px] text-[#1A1A1A]"
        style={{ fontFamily: "var(--font-body)", lineHeight: 1.2 }}
      >
        Need to talk about the sales review for Q1...
      </p>
      <p
        className="mt-1 text-[9px] italic text-[#73736E]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        *Sunday, 11:43pm, really?*
      </p>
    </div>
  );
}

function RecoveryBadge() {
  const size = 120;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="absolute right-[20%] top-[8%] hidden h-[118px] w-[118px] rounded-full bg-[#FAFAF8] p-2 shadow-[0_20px_44px_rgba(26,26,26,0.16)] lg:block">
      <svg width={size - 16} height={size - 16} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx="60" cy="60" r={radius} fill="#EFF7D8" stroke="#DCECC0" strokeWidth="14" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#8CD91F"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.37}
          transform="rotate(-88 60 60)"
        />
        <text
          x="60"
          y="58"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1A1A1A"
          style={{ fontFamily: "var(--font-body)", fontSize: 26, fontWeight: 700 }}
        >
          63%
        </text>
        <text
          x="60"
          y="78"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#7A7A74"
          style={{ fontFamily: "var(--font-body)", fontSize: 11 }}
        >
          Recovery
        </text>
      </svg>
    </div>
  );
}

function HeartTile() {
  return (
    <div className="absolute right-[13.8%] top-[13.2%] hidden h-[52px] w-[52px] rotate-[13deg] items-center justify-center rounded-[12px] bg-[#FAFAF8] shadow-[0_18px_36px_rgba(26,26,26,0.14)] lg:flex">
      <span
        className="text-[26px]"
        style={{ filter: "drop-shadow(0 6px 8px rgba(244,63,94,0.35))" }}
      >
        ♥
      </span>
    </div>
  );
}

function StressTile() {
  const points = "4,36 16,31 24,18 34,23 44,12 53,18 64,10";

  return (
    <div className="absolute right-[5.8%] top-[10.2%] hidden h-[80px] w-[70px] -rotate-[5deg] rounded-[9px] bg-[#FAFAF8] px-2 py-2 shadow-[0_18px_36px_rgba(26,26,26,0.14)] lg:block">
      <svg viewBox="0 0 70 46" className="h-[46px] w-full" aria-hidden="true">
        {[12, 24, 36, 48, 60].map((x) => (
          <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="44" stroke="#ECEBE6" strokeWidth="1" />
        ))}
        {[11, 22, 33].map((y) => (
          <line key={`h-${y}`} x1="0" x2="70" y1={y} y2={y} stroke="#ECEBE6" strokeWidth="1" />
        ))}
        <polyline points={points} fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex items-center gap-1">
        <span
          className="text-[8px] font-medium text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Stress
        </span>
        <span
          className="text-[6px] text-[#73736E]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Elevated
        </span>
      </div>
    </div>
  );
}

function ActivityCard() {
  const bars = [12, 22, 15, 30, 36, 18, 42, 24, 38, 28, 44, 18, 32, 52, 24, 39, 20, 45, 36, 30, 48, 18];

  return (
    <div className="absolute right-[6.5%] top-[25.5%] hidden w-[190px] rotate-[10deg] rounded-[12px] bg-[#FAFAF8] px-4 py-3 shadow-[0_22px_46px_rgba(26,26,26,0.16)] lg:block">
      <p
        className="text-[15px] font-black uppercase italic text-[#1A1A1A]"
        style={{ fontFamily: "var(--font-body)", lineHeight: 1 }}
      >
        Activity <span className="text-[#F43F5E]">→345</span>{" "}
        <span className="text-[#84CC16]">→43</span>{" "}
        <span className="text-[#06B6D4]">→10</span>
      </p>
      <div className="mt-2 grid h-[44px] grid-cols-[repeat(22,minmax(0,1fr))] items-end gap-[2px] border-b border-[#D8D8D2]">
        {bars.map((height, index) => (
          <span
            key={index}
            className="rounded-t-[1px]"
            style={{
              height,
              backgroundColor: index < 9 ? "#F43F5E" : index < 16 ? "#84CC16" : "#06B6D4",
            }}
          />
        ))}
      </div>
      <div
        className="mt-1 flex justify-between text-[7px] text-[#8D8D88]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <span>12AM</span>
        <span>6AM</span>
        <span>12PM</span>
        <span>6PM</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-[760px] overflow-hidden bg-[#F4F3F0] sm:min-h-[820px] lg:min-h-0"
      style={{
        aspectRatio: "1440 / 989",
        borderRadius: 0,
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        width: "100vw",
      }}
    >
      <Image
        src="/assets/hero-bg.svg"
        alt=""
        fill
        priority
        sizes="(max-width: 1440px) calc(100vw - 40px), 1440px"
        className="pointer-events-none select-none object-fill"
      />

      <SlackCard />
      <RecoveryBadge />
      <HeartTile />
      <StressTile />
      <ActivityCard />

      <div className="absolute left-1/2 top-[30.5%] z-20 w-[8.2%] min-w-[86px] max-w-[134px] -translate-x-1/2">
        <Image
          src="/illustrations/default.svg"
          alt="Waldo"
          width={169}
          height={131}
          priority
          className="h-auto w-full drop-shadow-[0_7px_0_rgba(255,255,255,0.68)]"
        />
      </div>

      <div className="absolute left-1/2 top-[52%] z-20 flex w-[74%] max-w-[760px] -translate-x-1/2 flex-col items-center text-center">
        <h1
          data-animate="headline"
          className="text-[34px] text-[#1A1A1A] sm:text-[54px] lg:text-[62px]"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.08 }}
        >
          The first app that knows
          <br />
          how you feel and does
          <br />
          something about it.
        </h1>

        <p
          className="mt-8 max-w-[620px] text-[17px] text-[#73736E] sm:text-[20px]"
          style={{ fontFamily: "var(--font-body)", lineHeight: 1.38 }}
        >
          Waldo scans complex data from your health wearable, and{" "}
          <br className="hidden sm:block" />
          figures your day before you smell your morning coffee.
        </p>

        <Link
          href="/waitlist"
          className="mt-14 inline-flex min-h-[60px] items-center justify-center rounded-full bg-[#1A1A1A] px-10 text-[18px] text-[#FAFAF8] shadow-[0_18px_32px_rgba(26,26,26,0.14)] transition-[transform,background-color] duration-150 hover:bg-[#2B2B2B] active:scale-[0.98]"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Get Started -&gt;
        </Link>
      </div>
    </section>
  );
}
