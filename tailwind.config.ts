import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      colors: {
        // ── Shared / Concept 1 (Luxury) ─────────────────────────
        cream: {
          50: "#fdfaf3",
          100: "#faf5ea",
          200: "#f4ecd9",
          300: "#ebe0c4",
        },
        blush: {
          50: "#fdf6f0",
          100: "#fbeae0",
          200: "#f5d7c5",
          300: "#e9bca8",
          400: "#d49079",
        },
        sage: {
          200: "#dde3d4",
          300: "#c5d1bb",
          500: "#a8b89e",
          700: "#7d8d78",
        },
        terracotta: {
          300: "#e3b8a8",
          400: "#dc9c83",
          500: "#d49079",
          700: "#a96e5c",
        },
        gold: {
          1: "#e8d4a0",
          2: "#c9a86e",
          3: "#9a7e4a",
        },
        ink: {
          DEFAULT: "#2a2018",
          soft: "#5a4a3c",
          muted: "#8c7a68",
          subtle: "#b8a896",
        },
        ivory: {
          DEFAULT: "#f4ead7",
          dark: "#ebdcb8",
        },
        // ── Concept 2 (Celebration) — festive pop ────────────────
        fiesta: {
          bg: "#fff6ee",
          ink: "#2c0f2e",
          coral: "#ff5d73",
          magenta: "#ff2e8b",
          tangerine: "#ff8a3d",
          sun: "#ffc23d",
          grape: "#7b2ff7",
          mint: "#2dd4bf",
        },
        // ── Concept 4 (Cinematic) — noir + amber ─────────────────
        noir: {
          0: "#000000",
          1: "#08080a",
          2: "#101014",
          amber: "#e6b450",
          amberhi: "#ffd98a",
          steel: "#9aa6b2",
        },
        // ── Concept 5 (Future) — glass + iridescent ──────────────
        aurora: {
          bg: "#06060c",
          bg2: "#0b0b18",
          violet: "#8b5cff",
          indigo: "#5b6bff",
          cyan: "#28e0d8",
          pink: "#ff5fa2",
          ice: "#e8ecff",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Times New Roman", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "serif"],
        script: ["var(--font-vibes)", "cursive"],
        arabic: ["var(--font-amiri)", "serif"],
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        outfit: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        caveat: ["var(--font-caveat)", "cursive"],
        anton: ["var(--font-anton)", "Impact", "sans-serif"],
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "soft-pulse": "softPulse 2.4s ease-in-out infinite",
        shimmer: "shimmer 7s linear infinite",
        "shimmer-fast": "shimmer 2.6s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "spin-slow": "spin 26s linear infinite",
        "gradient-pan": "gradientPan 12s ease infinite",
        marquee: "marquee 30s linear infinite",
        flicker: "flicker 4s linear infinite",
      },
      keyframes: {
        softPulse: {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        gradientPan: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.45" },
          "43%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.6" },
          "94%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
