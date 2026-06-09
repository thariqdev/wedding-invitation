"use client";

import { useEffect, useRef, useState } from "react";
import CinematicFrame from "@/components/cinematic/CinematicFrame";
import OpeningGate from "@/components/cinematic/OpeningGate";
import SoundToggle from "@/components/cinematic/SoundToggle";
import TrailerScenes from "@/components/cinematic/TrailerScenes";
import EventsReel from "@/components/cinematic/EventsReel";
import ClosingCredits from "@/components/cinematic/ClosingCredits";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const begin = () => {
    setStarted(true);
    if (soundOn) audioRef.current?.play().catch(() => {});
  };

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev;
      const a = audioRef.current;
      if (a) {
        if (next) a.play().catch(() => {});
        else a.pause();
      }
      return next;
    });
  };

  return (
    <main className="relative bg-black text-[#e9e2d2]">
      {/* ambient score — optional; silently no-ops if /music.mp3 is absent */}
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />

      <CinematicFrame />

      <TrailerScenes />
      <EventsReel />
      <ClosingCredits />

      {started && <SoundToggle on={soundOn} onToggle={toggleSound} />}

      <OpeningGate onBegin={begin} hidden={started} />
    </main>
  );
}
