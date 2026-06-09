"use client";

export default function SoundToggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      aria-pressed={on}
      className="fixed bottom-[9vh] right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-[#e6b450]/40 bg-black/50 text-[#e6b450] backdrop-blur-sm transition-transform duration-200 hover:scale-105 active:scale-95 touch-manip"
    >
      {on ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
          <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
          <path d="m23 9-6 6M17 9l6 6" />
        </svg>
      )}
    </button>
  );
}
