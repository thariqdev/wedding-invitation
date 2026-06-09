"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Animated "Scroll" cue shown after entering; fades once the user scrolls. */
export default function ScrollHint() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) setHide(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hide) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="pointer-events-none fixed bottom-[9vh] left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 text-[#e6b450]"
    >
      <span
        className="text-[0.6rem] uppercase tracking-[0.45em] text-[#cdbf9f]"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Scroll
      </span>
      <motion.svg
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </motion.div>
  );
}
