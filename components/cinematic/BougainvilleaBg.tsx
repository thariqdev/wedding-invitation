"use client";

import { useEffect, useState } from "react";

// Bougainvillea backdrop image (in /public).
// If the file is absent, this renders nothing and the dark cinema look stays.
const SRC = "/bg3.jpeg";

export default function BougainvilleaBg() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = new Image();
    img.onload = () => setOk(true);
    img.onerror = () => setOk(false);
    img.src = SRC;
  }, []);

  if (!ok) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* the photo, gently darkened so the cinematic text stays readable */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${SRC})`,
          filter: "brightness(0.5) saturate(1.05) contrast(1.02)",
          transform: "scale(1.06)",
        }}
      />
      {/* tonal scrim for depth + legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,6,2,0.55), rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.75))",
        }}
      />
      {/* a whisper of grain to blend with the film treatment */}
      <div className="film-grain absolute inset-0 opacity-[0.22] mix-blend-overlay" />
    </div>
  );
}
