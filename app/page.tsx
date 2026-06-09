"use client";

import { useEffect, useRef, useState } from "react";
import CinematicFrame from "@/components/cinematic/CinematicFrame";
import OpeningGate from "@/components/cinematic/OpeningGate";
import SoundToggle from "@/components/cinematic/SoundToggle";
import TrailerScenes from "@/components/cinematic/TrailerScenes";
import Countdown from "@/components/cinematic/Countdown";
import EventsReel from "@/components/cinematic/EventsReel";
import ClosingCredits from "@/components/cinematic/ClosingCredits";
import ScrollHint from "@/components/cinematic/ScrollHint";
import BougainvilleaBg from "@/components/cinematic/BougainvilleaBg";
import { AmbientMusic } from "@/components/cinematic/ambient";

export default function Page() {
  const [started, setStarted] = useState(false); // tap happened → gate begins exit
  const [revealed, setRevealed] = useState(false); // gate exit done → content shows
  const [soundOn, setSoundOn] = useState(true);
  const musicRef = useRef<AmbientMusic | null>(null);

  // dark cinema backdrop
  useEffect(() => {
    document.body.style.background = "#000000";
    document.documentElement.style.background = "#000000";
  }, []);

  // keep scroll locked through the ENTIRE intro; unlock only once revealed
  useEffect(() => {
    const html = document.documentElement;
    if (revealed) html.classList.remove("locked");
    else html.classList.add("locked");
    return () => html.classList.remove("locked");
  }, [revealed]);

  // tear down the audio engine on unmount
  useEffect(() => () => musicRef.current?.dispose(), []);

  const begin = () => {
    setStarted(true);
    // create + start the synth on the user gesture (autoplay-safe)
    if (!musicRef.current) musicRef.current = new AmbientMusic();
    musicRef.current.setEnabled(soundOn);
    musicRef.current.start();
  };

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev;
      musicRef.current?.setEnabled(next);
      return next;
    });
  };

  return (
    <>
      {/* fixed backdrop behind everything (auto-shows only if the image exists) */}
      <BougainvilleaBg />

      <main className="relative z-10 overflow-x-hidden text-[#e9e2d2]">
        <CinematicFrame />

        {/* Invitation content — kept fully hidden until the gate has finished
            exiting, so it can never flash/flicker before the reveal. */}
        <div
          style={{
            opacity: revealed ? 1 : 0,
            visibility: revealed ? "visible" : "hidden",
            pointerEvents: revealed ? "auto" : "none",
            transition: "opacity 900ms ease",
          }}
        >
          <TrailerScenes />
          <Countdown />
          <EventsReel />
          <ClosingCredits />
        </div>

        {started && <SoundToggle on={soundOn} onToggle={toggleSound} />}
        {revealed && <ScrollHint />}

        {/* Gate stays until its fade-out completes, then unmounts cleanly */}
        {!revealed && (
          <OpeningGate
            onBegin={begin}
            hidden={started}
            onExited={() => setRevealed(true)}
          />
        )}
      </main>
    </>
  );
}
