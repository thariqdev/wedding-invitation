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
  const [started, setStarted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const musicRef = useRef<AmbientMusic | null>(null);

  // dark cinema backdrop
  useEffect(() => {
    document.body.style.background = "#000000";
    document.documentElement.style.background = "#000000";
  }, []);

  // lock scroll only while the opening gate is up; always unlock once started
  useEffect(() => {
    const html = document.documentElement;
    if (started) html.classList.remove("locked");
    else html.classList.add("locked");
    return () => html.classList.remove("locked");
  }, [started]);

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

        <TrailerScenes />
        <Countdown />
        <EventsReel />
        <ClosingCredits />

        {started && <SoundToggle on={soundOn} onToggle={toggleSound} />}
        {started && <ScrollHint />}

        <OpeningGate onBegin={begin} hidden={started} />
      </main>
    </>
  );
}
