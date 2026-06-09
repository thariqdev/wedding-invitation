// ═══════════════════════════════════════════════════════════════
// EDIT WEDDING DETAILS HERE — single source of truth for all 5 concepts.
// Phone numbers must include the country code (e.g. +91...).
// Maps URLs use the universal Google Maps "search" form, which on
// iPhone Safari opens with the option to use Apple Maps.
// ═══════════════════════════════════════════════════════════════

export const wedding = {
  bride: {
    first: "NAWAL",
    full: "NAWAL SALAH",
  },
  groom: {
    first: "HASSAN",
    full: "B KUTTY HASSAN",
  },

  monogram: "N H",
  hashtag: "#NawalWedsHassan",
  coupleImage: "/couple.jpg",

  // Headline date used for countdowns / hero (the Nikkah — the wedding day).
  // ISO so `new Date(...)` works everywhere.
  weddingDateISO: "2026-08-07T17:00:00+05:30",
  dateLong: "Friday, 07 Aug 2026",

  bismillah: {
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translit: "Bismillah ir-Rahman ir-Raheem",
    meaning: "In the name of Allah, the Most Gracious, the Most Merciful",
  },

  dua: "With Allah's blessings, we request your presence and duas as we invite you to the Nikah of our beloved daughter.",

  invitation: {
    hosts: "Salah Karadan & Nazeem Muttankadan",
    brideLine:
      "Granddaughter of Karadan Moideen Haji and Fathima Pullat & Dr. M. Aboobacker and Jameela P.",
    groomLine:
      "Son of K Mohd Zubair & Shabnam V. K and Grandson of Late B Kutty Hassan Haji & Late Kunjimoose V. K.",
    time: "05 PM",
    date: "Friday, 07 Aug 2026",
    venue: "Zubaida Park Auditorium",
    location: "Vengara, Kerala",
    verse:
      "And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect.",
    verseRef: "30:21",
  },

  // Reception — highlighted as the "Save the Date" headline.
  reception: {
    dateISO: "2026-08-09T10:00:00+05:30",
    date: "09 Aug 2026",
    day: "Sunday",
    time: "10:00 AM onwards",
    venue: "Trinita Casa Events & Banquet",
    location: "Edappally, Kochi",
  },

  events: [
    {
      id: "mehendi",
      name: "Mehendi",
      date: "06 Aug",
      day: "Thursday",
      year: "'26",
      place: "Chemmad, Malappuram",
      maps: "https://www.google.com/maps/search/?api=1&query=Chemmad+Malappuram",
    },
    {
      id: "nikkah",
      name: "Nikkah",
      date: "07 Aug",
      day: "Friday",
      year: "'26",
      place: "Zubaida Park Auditorium, Vengara",
      maps: "https://www.google.com/maps/search/?api=1&query=Zubaida+Park+Auditorium+Vengara+Kerala",
    },
    {
      id: "reception",
      name: "Reception",
      date: "09 Aug",
      day: "Sunday",
      year: "'26",
      place: "Trinita Casa Events & Banquet, Edappally",
      maps: "https://www.google.com/maps/search/?api=1&query=Trinita+Casa+Events+Banquet+Edappally+Kochi",
    },
  ],

  // For Concept 3 — "The Love Story Journey" (edit the copy freely).
  loveStory: [
    {
      chapter: "01",
      title: "How We Met",
      text: "Two families, one quiet introduction — and a conversation that never quite ended.",
    },
    {
      chapter: "02",
      title: "The First Hello",
      text: "A message turned into hours, hours turned into a habit we couldn't live without.",
    },
    {
      chapter: "03",
      title: "Growing Together",
      text: "Through every season, in laughter and in prayer, we became each other's home.",
    },
    {
      chapter: "04",
      title: "The Promise",
      text: "With our families beside us, a quiet 'yes' became a forever, Inshallah.",
    },
    {
      chapter: "05",
      title: "Save Our Date",
      text: "And now we ask for the one thing that makes it complete — you, with us.",
    },
  ],

  contacts: {
    bride: {
      person: "Mr. [Bride's Father]",
      phone: "+919876543210",
    },
    groom: {
      person: "Mr. [Groom's Father]",
      phone: "+919876543211",
    },
  },
} as const;

export type WeddingEvent = (typeof wedding.events)[number];
export type LoveStoryBeat = (typeof wedding.loveStory)[number];
