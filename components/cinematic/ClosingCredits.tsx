"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ClosingCredits() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="mx-auto max-w-md text-[clamp(1.15rem,5.2vw,1.7rem)] italic leading-relaxed text-[#f2e6c8]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {wedding.dua}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        className="mt-14"
      >
        <p className="text-[0.66rem] uppercase tracking-[0.5em] text-[#9aa6b2]" style={{ fontFamily: "var(--font-cinzel)" }}>
          We request your prayers &amp; presence
        </p>
        <h2
          className="mt-6 text-[clamp(2.4rem,12vw,5rem)] uppercase leading-[0.9] text-[#e6b450]"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
        >
          {wedding.bride.first}
          <span className="mx-3 text-[#f2e6c8]" style={{ fontFamily: "var(--font-vibes)", textTransform: "none" }}>
            &amp;
          </span>
          {wedding.groom.first}
        </h2>
        <p className="mt-8 text-[0.7rem] uppercase tracking-[0.45em] text-[#9aa6b2]" style={{ fontFamily: "var(--font-cinzel)" }}>
          {wedding.hashtag}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="mt-20 text-[clamp(2rem,8vw,3rem)] leading-none text-[#9aa6b2]/70"
        style={{ fontFamily: "var(--font-vibes)" }}
      >
        Fin
      </motion.p>
    </section>
  );
}
