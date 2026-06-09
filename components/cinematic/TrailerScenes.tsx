"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

const dt = new Date(wedding.reception.dateISO);
const fmt = (o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", ...o }).format(dt);
const DATE = `${fmt({ day: "2-digit" })} · ${fmt({ month: "2-digit" })} · ${fmt({ year: "numeric" })}`;

/** A full-viewport scene whose content slow-zooms + fades in on scroll. */
function Scene({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative flex min-h-[100svh] items-center justify-center px-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.16, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 1.5, ease: EASE }}
        className="text-center will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[clamp(2.4rem,10vw,5rem)] italic leading-tight text-[#f2e6c8]"
      style={{ fontFamily: "var(--font-cormorant)", textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
    >
      {children}
    </p>
  );
}

export default function TrailerScenes() {
  return (
    <>
      <Scene><Line>Two souls.</Line></Scene>
      <Scene><Line>One journey.</Line></Scene>
      <Scene><Line>One date.</Line></Scene>

      {/* Bismillah */}
      <Scene>
        <p
          className="text-[clamp(1.6rem,7vw,2.6rem)] leading-relaxed text-[#e6b450]"
          style={{ fontFamily: "var(--font-amiri)" }}
          dir="rtl"
        >
          {wedding.bismillah.arabic}
        </p>
        <p
          className="mt-6 text-[0.7rem] uppercase tracking-[0.4em] text-[#9aa6b2]"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {wedding.bismillah.translit}
        </p>
      </Scene>

      {/* Ken Burns photo + names */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
        <motion.img
          src="/couple-photo.jpg"
          alt=""
          aria-hidden
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1.18 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 14, ease: "linear" }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(0.35) sepia(0.35) contrast(1.05) brightness(0.7)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(20,10,0,0.35) 45%, rgba(0,0,0,0.8))" }} />
        <div className="absolute inset-0 mix-blend-overlay" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(230,180,80,0.35), transparent 70%)" }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="relative text-center"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.5em] text-[#e6b450]" style={{ fontFamily: "var(--font-cinzel)" }}>
            Starring
          </p>
          <h2
            className="mt-5 text-[clamp(2.6rem,13vw,6rem)] uppercase leading-[0.9] text-[#f5ead0]"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}
          >
            {wedding.bride.first}
            <span className="block text-[clamp(2rem,8vw,3.4rem)] text-[#e6b450]" style={{ fontFamily: "var(--font-vibes)", fontWeight: 400 }}>
              &amp;
            </span>
            {wedding.groom.first}
          </h2>
          <p
            className="mx-auto mt-6 max-w-xs text-[0.72rem] uppercase tracking-[0.22em] text-[#cdbf9f]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {wedding.bride.full} · {wedding.groom.full}
          </p>
        </motion.div>
      </section>

      {/* Save the Date */}
      <Scene>
        <p
          className="text-[clamp(0.8rem,4vw,1.1rem)] uppercase tracking-[0.55em] text-[#9aa6b2]"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Save the Date
        </p>
        <p
          className="mt-6 whitespace-nowrap text-[clamp(1.9rem,10vw,6rem)] leading-none text-[#e6b450]"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, textShadow: "0 0 50px rgba(230,180,80,0.35)" }}
        >
          {DATE}
        </p>
        <p
          className="mt-7 text-[clamp(1rem,4.6vw,1.4rem)] italic text-[#f2e6c8]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {wedding.reception.venue}, {wedding.reception.location}
        </p>
        <p
          className="mt-4 text-[0.66rem] uppercase tracking-[0.4em] text-[#9aa6b2]"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Wedding Reception · {wedding.reception.day} · {wedding.reception.time}
        </p>
      </Scene>
    </>
  );
}
