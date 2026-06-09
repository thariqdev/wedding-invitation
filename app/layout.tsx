import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Cinzel,
  Amiri,
  Playfair_Display,
  Great_Vibes,
  Outfit,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vibes",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

// ⬇️ REPLACE with your real deployed URL after deploying (e.g. https://nawal-hassan.netlify.app)
const SITE_URL = "https://nawal-hassan.netlify.app/";
const TITLE = "Nawal & Hassan | Wedding Invitation";
const DESCRIPTION =
  "You are warmly invited to celebrate our special day — the Wedding Reception of Nawal & Hassan, Sunday 09 Aug 2026, Trinita Casa Events & Banquet, Edappally, Kochi.";

const SHARE_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Nawal & Hassan — Wedding Invitation",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Nawal & Hassan Wedding",
    type: "website",
    locale: "en_US",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        cormorant.variable,
        playfair.variable,
        cinzel.variable,
        vibes.variable,
        amiri.variable,
        outfit.variable,
      ].join(" ")}
    >
      <body className="font-serif">{children}</body>
    </html>
  );
}
