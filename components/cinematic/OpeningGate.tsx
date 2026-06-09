"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

/**
 * Dark opening title card — the "press play" moment of the trailer.
 * Calls onBegin on tap, then fades away to reveal the scenes.
 */
export default function OpeningGate({
  onBegin,
  hidden,
  onExited,
}: {
  onBegin: () => void;
  hidden: boolean;
  onExited?: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-black text-center text-[#e9e2d2]"
      onClick={onBegin}
      role="button"
      tabIndex={0}
      aria-label="Begin the film"
      aria-hidden={hidden}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onBegin();
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (hidden) onExited?.();
      }}
      style={{ pointerEvents: hidden ? "none" : "auto" }}
    >
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay" />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="px-6 text-[0.66rem] uppercase tracking-[0.55em] text-[#9aa6b2]"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Together with their families
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 flex flex-col items-center px-4 text-[clamp(2.6rem,14vw,6rem)] uppercase leading-[0.95] tracking-[0.03em] text-[#f2e6c8]"
        style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
      >
        <span>{wedding.bride.first}</span>
        <span className="my-1 text-[0.6em] text-[#e6b450]" style={{ fontFamily: "var(--font-vibes)", textTransform: "none" }}>
          &amp;
        </span>
        <span>{wedding.groom.first}</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e6b450]/50"
          style={{ animation: "nhPlayPulse 2.4s ease-in-out infinite" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#e6b450]" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span
          className="text-[0.66rem] uppercase tracking-[0.5em] text-[#9aa6b2]"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Tap to begin · then scroll
        </span>
      </motion.div>

      <style jsx global>{`
        @keyframes nhPlayPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.12); opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
}
