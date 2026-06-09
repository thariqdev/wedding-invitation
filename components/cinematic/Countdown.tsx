"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

const TARGET = new Date(wedding.reception.dateISO).getTime();
const EASE = [0.22, 1, 0.36, 1] as const;

type T = { d: string; h: string; m: string; s: string };
const PLACEHOLDER: T = { d: "--", h: "--", m: "--", s: "--" };
const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

function compute(): T {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { d: "0", h: "00", m: "00", s: "00" };
  const s = Math.floor(diff / 1000);
  return {
    d: String(Math.floor(s / 86400)),
    h: pad(Math.floor((s % 86400) / 3600)),
    m: pad(Math.floor((s % 3600) / 60)),
    s: pad(s % 60),
  };
}

export default function Countdown() {
  const [t, setT] = useState<T>(PLACEHOLDER); // neutral on SSR → no hydration mismatch

  useEffect(() => {
    setT(compute());
    const id = window.setInterval(() => setT(compute()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const boxes: { k: keyof T; label: string }[] = [
    { k: "d", label: "Days" },
    { k: "h", label: "Hrs" },
    { k: "m", label: "Min" },
    { k: "s", label: "Sec" },
  ];

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* soft amber glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(230,180,80,0.13), transparent 65%)" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative text-center text-[0.7rem] uppercase tracking-[0.5em] text-[#9aa6b2]"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Counting down to the celebration
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="relative mt-10 grid grid-cols-4 gap-2.5 sm:gap-6"
      >
        {boxes.map(({ k, label }) => (
          <div key={k} className="flex flex-col items-center">
            <div className="flex aspect-square w-full min-w-[56px] items-center justify-center rounded-lg border border-[#e6b450]/30 bg-white/[0.04] px-1 backdrop-blur-sm sm:min-w-[88px]">
              <span
                className="text-[clamp(1.5rem,8vw,3.2rem)] leading-none text-[#e6b450]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
              >
                {t[k]}
              </span>
            </div>
            <span
              className="mt-3 text-[0.58rem] uppercase tracking-[0.22em] text-[#9aa6b2]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative mt-12 text-center text-[clamp(1.1rem,5vw,1.6rem)] italic text-[#f2e6c8]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        until the celebration begins
      </motion.p>
    </section>
  );
}
