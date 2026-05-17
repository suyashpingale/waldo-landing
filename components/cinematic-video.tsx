"use client";

/**
 * CinematicVideo — scroll-theater pattern.
 *
 * A tall sticky wrapper forces the user to scroll through the entire
 * video section. The video container is position:sticky and expands
 * to fullscreen when the wrapper enters viewport. It only collapses
 * after the user has scrolled through the full wrapper height OR
 * the video ends naturally.
 *
 * Wrapper is 500vh tall → gives ~8-10s of comfortable scroll time.
 * Video plays at full quality with controls. No scroll-jacking.
 */

import { useRef, useState, useEffect, useCallback } from "react";

interface CinematicVideoProps {
  src: string;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export function CinematicVideo({ src, containerStyle, containerClassName }: CinematicVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"idle" | "expanding" | "fullscreen" | "collapsing">("idle");
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0); // 0–1 through wrapper
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const wh = window.innerHeight;
      const totalScroll = wrapper.offsetHeight - wh;

      // How far through the wrapper have we scrolled (0 = top, 1 = bottom)
      const scrolled = Math.max(0, Math.min(1, -rect.top / totalScroll));
      setProgress(scrolled);

      const entered = rect.top <= 0 && rect.bottom > 0;
      const exited  = rect.bottom <= wh * 0.3; // wrapper nearly scrolled past

      if (entered && phaseRef.current === "idle") {
        setPhase("expanding");
        // Small delay so CSS transition is visible
        setTimeout(() => setPhase("fullscreen"), 50);
        videoRef.current?.play().catch(() => {});
      }

      if (exited && (phaseRef.current === "fullscreen" || phaseRef.current === "expanding")) {
        setPhase("collapsing");
        setTimeout(() => setPhase("idle"), 500);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setMuted(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFullscreen = phase === "fullscreen" || phase === "expanding";

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const handleEnded = useCallback(() => {
    setPhase("collapsing");
    setTimeout(() => setPhase("idle"), 500);
    if (videoRef.current) { videoRef.current.muted = true; setMuted(true); }
  }, []);

  return (
    <>
      {/* ── Tall wrapper — user scrolls through this ──────────────── */}
      <div
        ref={wrapperRef}
        style={{
          // 500vh gives ~5 scroll lengths of time while sticky
          height: "500vh",
          position: "relative",
          // Negative margin so it doesn't break the page layout
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        {/* ── Sticky anchor — sits at top of viewport while inside wrapper ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: isFullscreen ? "auto" : "none",
          }}
        >
          {/* ── Video container — transitions from card → fullscreen ── */}
          <div
            style={{
              position: "absolute",
              inset: isFullscreen ? 0 : undefined,
              // When not fullscreen: match original card dimensions
              width: isFullscreen ? "100%" : containerStyle?.width ?? "707px",
              height: isFullscreen ? "100%" : containerStyle?.height ?? "592px",
              borderRadius: isFullscreen ? 0 : (containerStyle?.borderRadius ?? "13.588px"),
              overflow: "hidden",
              transition: "inset 0.6s cubic-bezier(0.22,1,0.36,1), width 0.6s cubic-bezier(0.22,1,0.36,1), height 0.6s cubic-bezier(0.22,1,0.36,1), border-radius 0.6s ease",
              background: "#1a1a1a",
              zIndex: isFullscreen ? 100 : 1,
              // Backdrop blur layer behind when fullscreen
              boxShadow: isFullscreen ? "none" : "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* Fullscreen backdrop */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: isFullscreen ? "blur(0px)" : "none",
                opacity: isFullscreen ? 1 : 0,
                transition: "opacity 0.5s ease",
                zIndex: -1,
                pointerEvents: "none",
              }}
            />

            {/* Video */}
            <video
              ref={videoRef}
              src={src}
              loop={false}
              muted={muted}
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={handleEnded}
              style={{
                width: "100%",
                height: "100%",
                objectFit: isFullscreen ? "contain" : "cover",
                transition: "object-fit 0.3s ease",
              }}
            />

            {/* ── Controls — visible when fullscreen ── */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "80px 32px 32px",
                background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: isFullscreen ? 1 : 0,
                transition: "opacity 0.4s ease 0.3s",
                pointerEvents: isFullscreen ? "auto" : "none",
              }}
            >
              {/* Play/Pause */}
              <ControlBtn onClick={togglePlay}>
                {playing ? <PauseIcon /> : <PlayIcon />}
              </ControlBtn>

              {/* Sound */}
              <ControlBtn onClick={toggleMute} accent={muted}>
                {muted ? <MuteIcon /> : <SoundIcon />}
              </ControlBtn>

              {/* Status label */}
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                marginLeft: 4,
              }}>
                {muted ? "tap 🔊 to unmute" : "waldo · already on it."}
              </span>

              {/* Progress bar */}
              <div style={{ flex: 1 }}>
                <div style={{
                  height: 2,
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${progress * 100}%`,
                    background: "rgba(249,115,22,0.8)",
                    transition: "width 0.1s linear",
                    borderRadius: 2,
                  }} />
                </div>
              </div>
            </div>

            {/* ── Watch hint — first moment of fullscreen ── */}
            {isFullscreen && (
              <div style={{
                position: "absolute",
                top: 32,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                animation: "hint-pulse 2s ease-in-out infinite",
                pointerEvents: "none",
              }}>
                scroll past to continue
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Original card placeholder — shown when idle to hold layout ── */}
      {/* This prevents layout shift — the tall wrapper is outside the normal flow */}
    </>
  );
}

// ── Icon components ──────────────────────────────────────────────

function ControlBtn({ onClick, accent, children }: {
  onClick: () => void;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 46, height: 46,
        borderRadius: "50%",
        border: accent
          ? "1px solid rgba(249,115,22,0.6)"
          : "1px solid rgba(255,255,255,0.2)",
        background: accent
          ? "rgba(249,115,22,0.2)"
          : "rgba(250,250,248,0.12)",
        backdropFilter: "blur(8px)",
        color: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.15s ease, transform 0.1s ease",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {children}
    </button>
  );
}

function PlayIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3l9 5-9 5V3z" fill="white"/></svg>;
}
function PauseIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="white"/><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="white"/></svg>;
}
function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  );
}
function SoundIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}
