"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function EventsReel() {
  return (
    <section className="relative px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: EASE }}
        className="mx-auto max-w-md text-center"
      >
        <p className="text-[0.7rem] uppercase tracking-[0.5em] text-[#9aa6b2]" style={{ fontFamily: "var(--font-cinzel)" }}>
          The Occasions
        </p>
      </motion.div>

      <div className="mx-auto mt-14 max-w-md space-y-5">
        {wedding.events.map((ev, i) => (
          <motion.a
            key={ev.id}
            href={ev.maps}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            className="group flex items-center gap-5 border-b border-[#e6b450]/20 pb-5 text-left transition-colors hover:border-[#e6b450]/50 touch-manip"
          >
            <span
              className="text-[clamp(2rem,10vw,3rem)] leading-none text-[#e6b450]/40 transition-colors group-hover:text-[#e6b450]/80"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <p className="text-[clamp(1.3rem,6vw,1.7rem)] uppercase leading-none text-[#f2e6c8]" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, letterSpacing: "0.04em" }}>
                {ev.name}
              </p>
              <p className="mt-2 text-[0.9rem] italic text-[#cdbf9f]" style={{ fontFamily: "var(--font-cormorant)" }}>
                {ev.place}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#9aa6b2]" style={{ fontFamily: "var(--font-cinzel)" }}>
                {ev.day}
              </p>
              <p className="text-[clamp(1.05rem,5vw,1.3rem)] italic text-[#e6b450]" style={{ fontFamily: "var(--font-cormorant)" }}>
                {ev.date} {ev.year}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
