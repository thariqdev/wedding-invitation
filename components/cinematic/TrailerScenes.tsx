"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";

const EASE = [0.22, 1, 0.36, 1] as const;

const dt = new Date(wedding.reception.dateISO);
const fmt = (o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", ...o }).format(dt);
const DATE = `${fmt({ day: "2-digit" })} · ${fmt({ month: "2-digit" })} · ${fmt({ year: "numeric" })}`;

// drifting embers (static so SSR == client)
const EMBERS = [
  { l: "14%", s: 4, d: 9, delay: 0 },
  { l: "34%", s: 3, d: 11, delay: 2 },
  { l: "54%", s: 5, d: 8, delay: 1 },
  { l: "74%", s: 3, d: 12, delay: 3 },
  { l: "88%", s: 4, d: 10, delay: 1.5 },
];

/** Soft atmospheric backdrop so the dark scenes feel cinematic, not empty. */
function SceneGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(230,180,80,0.15), transparent 65%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute left-[18%] top-[28%] h-[46vmin] w-[46vmin] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(122,27,33,0.20), transparent 70%)" }}
      />
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: e.l,
            bottom: "-12px",
            width: `${e.s}px`,
            height: `${e.s}px`,
            background: "rgba(230,180,80,0.5)",
            filter: "blur(0.5px)",
            animation: `nhEmber ${e.d}s linear ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** A full-viewport scene whose content slow-zooms + fades in on scroll. */
function Scene({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 ${className}`}>
      <SceneGlow />
      <motion.div
        initial={{ opacity: 0, scale: 1.16, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 1.5, ease: EASE }}
        className="relative text-center will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function TrailerScenes() {
  return (
    <>
      {/* Opening lines — combined into one cinematic scene, revealed in sequence */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center gap-5 overflow-hidden px-6 text-center sm:gap-8">
        <SceneGlow />
        {["Two souls.", "One journey.", "One date."].map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, delay: i * 0.5, ease: EASE }}
            className="relative text-[clamp(2.1rem,9vw,4.5rem)] text-[#f2e6c8]"
            style={{
              fontFamily: "var(--font-bodoni)",
              fontWeight: 400,
              letterSpacing: "0.1em",
              lineHeight: 1.2,
              textShadow: "0 2px 30px rgba(0,0,0,0.6)",
            }}
          >
            {line}
          </motion.p>
        ))}
      </section>

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
          <p
            className="text-[clamp(0.7rem,3vw,1.3rem)] uppercase tracking-[0.45em] text-[#e6b450]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Starring
          </p>
          <h2
            className="mt-6 flex flex-col items-center leading-[0.95] text-[#f5ead0]"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
          >
            <span className="text-[clamp(2.6rem,14vw,5.5rem)] uppercase" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}>
              {wedding.bride.first}
            </span>
            <span
              className="my-3 text-[clamp(3rem,16vw,6.5rem)] leading-none text-[#e6b450] sm:my-5"
              style={{ fontFamily: "var(--font-vibes)", fontWeight: 400 }}
            >
              &amp;
            </span>
            <span className="text-[clamp(2.6rem,14vw,5.5rem)] uppercase" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}>
              {wedding.groom.first}
            </span>
          </h2>
          <p
            className="mt-7 whitespace-nowrap text-[clamp(0.62rem,3vw,1.2rem)] uppercase tracking-[0.12em] text-[#cdbf9f]"
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
          Wedding Reception · {wedding.reception.day}
        </p>
        <p
          className="mt-1.5 text-[0.66rem] uppercase tracking-[0.4em] text-[#9aa6b2]"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {wedding.reception.time}
        </p>
      </Scene>

      <style jsx global>{`
        @keyframes nhEmber {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-72vh) scale(0.4); opacity: 0; }
        }
      `}</style>
    </>
  );
}
