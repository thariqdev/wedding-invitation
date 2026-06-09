"use client";

import { motion } from "framer-motion";

/**
 * Persistent cinematic overlay: letterbox bars, film grain, vignette and a
 * slow drifting lens flare. Sits above the scenes, ignores pointer events.
 */
export default function CinematicFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {/* letterbox bars */}
      <motion.div
        initial={{ height: "50vh" }}
        animate={{ height: "7vh" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-x-0 top-0 bg-black"
      />
      <motion.div
        initial={{ height: "50vh" }}
        animate={{ height: "7vh" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 bg-black"
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 52%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* drifting lens flare */}
      <motion.div
        className="absolute h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(230,180,80,0.16), transparent 65%)",
          filter: "blur(8px)",
        }}
        initial={{ x: "-20vw", y: "10vh", opacity: 0.5 }}
        animate={{ x: "70vw", y: "30vh", opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      {/* film grain */}
      <div
        className="film-grain absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{ animation: "nhGrain 0.5s steps(3) infinite" }}
      />

      <style jsx global>{`
        @keyframes nhGrain {
          0% { transform: translate(0, 0); }
          33% { transform: translate(-2%, 1%); }
          66% { transform: translate(1%, -2%); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
