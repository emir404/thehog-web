"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowClockwiseIcon,
  CornersInIcon,
  CornersOutIcon,
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  /** YouTube video id (e.g. "VAXbqcowvT4"). */
  videoId: string;
  /** Poster image shown before playback and on replay (e.g. "/about/hero-media.webp"). */
  poster: string;
  /** Accessible label + poster alt text. */
  title: string;
  /** Outer-frame classes — radius, aspect ratio, margins, background. */
  className?: string;
};

/**
 * A custom-chrome video player over a controls-less YouTube iframe. The iframe
 * is mounted lazily as it nears the viewport, then muted-autoplays once it
 * scrolls into view (browser policy forbids unmuted autoplay) with our own
 * control bar so visitors can unmute and watch. Honours prefers-reduced-motion
 * by skipping autoplay and offering a poster + play button instead.
 */
export function VideoPlayer({ videoId, poster, title, className }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const userPausedRef = useRef(false);
  const hideTimerRef = useRef<number | null>(null);

  const reduceMotion = useReducedMotion() ?? false;
  // Defer loading YouTube's script until the frame is near the viewport.
  const nearView = useInView(containerRef, { once: true, margin: "200px" });
  // Drives muted autoplay / pause as the frame enters and leaves the viewport.
  const inView = useInView(containerRef, { amount: 0.4 });

  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasUnmuted, setHasUnmuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Build the YT player once the frame nears the viewport.
  useEffect(() => {
    if (!nearView || playerRef.current || !hostRef.current) return;
    let cancelled = false;

    loadYouTubeApi().then((YTApi) => {
      if (cancelled || !hostRef.current) return;
      playerRef.current = new YTApi.Player(hostRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0, // we trigger play ourselves once in view
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          mute: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            setDuration(e.target.getDuration());
            setReady(true);
          },
          onStateChange: (e) => {
            if (cancelled) return;
            const state = e.data;
            const States = window.YT?.PlayerState;
            if (!States) return;
            if (state === States.PLAYING) {
              setStarted(true);
              setPlaying(true);
              setEnded(false);
            } else if (state === States.PAUSED) {
              setPlaying(false);
              setControlsVisible(true);
            } else if (state === States.ENDED) {
              // Stop on the first frame and re-show the poster, masking
              // YouTube's end-screen of related videos.
              setPlaying(false);
              setEnded(true);
              setControlsVisible(true);
              userPausedRef.current = true;
              e.target.seekTo(0, true);
              e.target.pauseVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [nearView, videoId]);

  // Destroy the player on unmount (guards React strict-mode double-mount).
  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  // Muted autoplay while in view; pause when scrolled away. Skipped entirely
  // under reduced motion — the user starts playback from the poster instead.
  useEffect(() => {
    if (!ready || reduceMotion) return;
    const player = playerRef.current;
    if (!player) return;
    if (inView && !userPausedRef.current) {
      player.mute();
      player.playVideo();
    } else if (!inView) {
      player.pauseVideo();
    }
  }, [inView, ready, reduceMotion]);

  // Poll progress while playing (the IFrame API has no timeupdate event).
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      setCurrent(player.getCurrentTime());
      const d = player.getDuration();
      if (d) setDuration(d);
    }, 200);
    return () => window.clearInterval(id);
  }, [playing]);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setControlsVisible(false), 2500);
  }, []);

  // Auto-hide controls a couple seconds into playback. They're re-shown on
  // pause/end from the onStateChange handler, so this effect never sets state
  // synchronously — it only schedules the hide timer.
  useEffect(() => {
    if (!playing || reduceMotion) return;
    scheduleHide();
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [playing, reduceMotion, scheduleHide]);

  // Track fullscreen entered/exited on our container.
  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (playing && !reduceMotion) scheduleHide();
  }, [playing, reduceMotion, scheduleHide]);

  const hideControlsSoon = useCallback(() => {
    if (playing && !reduceMotion) setControlsVisible(false);
  }, [playing, reduceMotion]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (ended) {
      userPausedRef.current = false;
      setEnded(false);
      player.seekTo(0, true);
      player.playVideo();
    } else if (playing) {
      userPausedRef.current = true;
      player.pauseVideo();
    } else {
      userPausedRef.current = false;
      player.playVideo();
    }
  }, [ready, ended, playing]);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (muted) {
      player.unMute();
      player.setVolume(100);
      setMuted(false);
      setHasUnmuted(true);
    } else {
      player.mute();
      setMuted(true);
    }
  }, [ready, muted]);

  // Poster / replay button — a deliberate user gesture, so play with sound.
  const playFromPoster = useCallback(() => {
    const player = playerRef.current;
    if (!player || !ready) return;
    userPausedRef.current = false;
    if (ended) {
      setEnded(false);
      player.seekTo(0, true);
    }
    player.unMute();
    player.setVolume(100);
    setMuted(false);
    setHasUnmuted(true);
    player.playVideo();
  }, [ready, ended]);

  const seek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerRef.current;
    if (!player) return;
    const t = Number(e.target.value);
    setCurrent(t);
    player.seekTo(t, true);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void containerRef.current?.requestFullscreen?.();
    }
  }, []);

  const posterVisible = !started || ended;
  const showControlBar = started && !ended;
  const showSoundNudge = showControlBar && muted && !hasUnmuted;
  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={title}
      onPointerMove={revealControls}
      onPointerLeave={hideControlsSoon}
      className={cn("group relative w-full overflow-hidden", className)}
    >
      {/* YouTube iframe is mounted here (the host div is replaced by the iframe).
          pointer-events-none routes all interaction through our own controls. */}
      <div className="pointer-events-none absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full">
        <div ref={hostRef} className="h-full w-full" />
      </div>

      {/* Click anywhere on the frame to toggle playback (mouse convenience;
          keyboard users use the labelled control bar below). */}
      {showControlBar && (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={togglePlay}
          className="absolute inset-0 z-10 cursor-pointer"
        />
      )}

      {/* Poster + center play/replay button, shown before first play and on end. */}
      <AnimatePresence>
        {posterVisible && (
          <motion.div
            key="poster"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-30"
          >
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(min-width: 1440px) 1200px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-ink-deep/10" />
            <button
              type="button"
              onClick={playFromPoster}
              disabled={!ready}
              aria-label={ended ? "Replay video" : "Play video"}
              className="absolute inset-0 flex items-center justify-center disabled:cursor-default"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-ink-deep shadow-[0_2px_16px_rgba(0,0,0,0.18)] transition group-hover:scale-105">
                {ended ? (
                  <ArrowClockwiseIcon className="size-7" weight="bold" />
                ) : (
                  <PlayIcon className="ml-0.5 size-7" weight="fill" />
                )}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Tap for sound" nudge — playback starts muted by browser policy. */}
      {showSoundNudge && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-[2px] bg-ink-deep/70 px-2.5 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm transition hover:bg-ink-deep/85"
        >
          <SpeakerSlashIcon className="size-4" weight="fill" />
          Tap for sound
        </button>
      )}

      {/* Custom control bar. */}
      {showControlBar && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-3 pb-3 pt-12 transition-opacity duration-300 focus-within:pointer-events-auto focus-within:opacity-100",
            controlsVisible ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <ControlButton onClick={togglePlay} label={playing ? "Pause" : "Play"}>
            {playing ? (
              <PauseIcon className="size-5" weight="fill" />
            ) : (
              <PlayIcon className="size-5" weight="fill" />
            )}
          </ControlButton>

          {/* Scrubber: visible track + brand fill, with a transparent range
              input on top handling clicks, drags and keyboard seeking. */}
          <div className="relative flex h-5 flex-1 items-center">
            <div className="pointer-events-none absolute inset-x-0 h-1 rounded-full bg-white/25" />
            <div
              className="pointer-events-none absolute left-0 h-1 rounded-full bg-brand"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              step="any"
              value={current}
              onChange={seek}
              aria-label="Seek"
              aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
              className={cn(
                "absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent outline-none",
                "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent",
                "[&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow",
                "[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent",
                "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white",
              )}
            />
          </div>

          <span className="shrink-0 font-sans text-[12px] tabular-nums text-white/80">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <ControlButton onClick={toggleMute} label={muted ? "Unmute" : "Mute"}>
            {muted ? (
              <SpeakerSlashIcon className="size-5" weight="fill" />
            ) : (
              <SpeakerHighIcon className="size-5" weight="fill" />
            )}
          </ControlButton>

          <ControlButton onClick={toggleFullscreen} label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            {isFullscreen ? (
              <CornersInIcon className="size-5" weight="bold" />
            ) : (
              <CornersOutIcon className="size-5" weight="bold" />
            )}
          </ControlButton>
        </div>
      )}
    </div>
  );
}

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-[2px] text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      {children}
    </button>
  );
}

function formatTime(seconds: number): string {
  const s = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// --- YouTube IFrame API loader (module scope; injects the script once) ---
let apiPromise: Promise<NonNullable<Window["YT"]>> | null = null;

function loadYouTubeApi(): Promise<NonNullable<Window["YT"]>> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}
