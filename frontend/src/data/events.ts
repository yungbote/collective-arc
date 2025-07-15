// ──────────────────────────────────────────────────────────────────────────────
//  Event model
// ──────────────────────────────────────────────────────────────────────────────
export interface Event {
  id: string
  title: string
  description: string
  fullDescription?: string
  date: string
  time?: string
  endTime?: string
  location: string
  address?: string

  /* NEW (optional) – lets us show Past / In Progress / Upcoming badges
     without touching styles elsewhere                                       */
  status?: "past" | "current" | "future"

  type: "ask" | "art" | "all"
  category: string
  spots: number
  spotsAvailable: number
  price: number
  image?: string
  featured: boolean
  organizers?: string[]
  schedule?: { time: string; activity: string }[]
  requirements?: string[]
  whatToBring?: string[]
  registrationDeadline?: string
  contactEmail?: string
  tags?: string[]
  isComingSoon?: boolean
}

// ──────────────────────────────────────────────────────────────────────────────
//  Gifts & Thrifts   (past → present → future)
// ──────────────────────────────────────────────────────────────────────────────
export const events: Event[] = [
  {
    id: "gnt-i-west-chester-pa",
    title: "G&T I – West Chester PA",
    description: "January 6 2024 • first popup thrifting event.",
    date: "2024-01-06",
    location: "West Chester, PA",
    status: "past",

    type: "art",
    category: "Gifts & Thrifts",
    spots: 0,
    spotsAvailable: 0,
    price: 0,
    featured: false,
  },
  {
    id: "gnt-ii-porch-fest",
    title: "G&T II – Porch Fest",
    description: "May 18 2024 • hosted by the West Chester Green Team.",
    date: "2024-05-18",
    location: "West Chester, PA",
    status: "past",

    type: "art",
    category: "Gifts & Thrifts",
    spots: 0,
    spotsAvailable: 0,
    price: 0,
    featured: false,
  },
  {
    id: "gnt-iii-louisville",
    title: "G&T III – Louisville KY",
    description: "October 2024 • Lynn Family Stadium launch (ongoing).",
    date: "2024-10-15",
    location: "Louisville, KY",
    status: "current",

    type: "art",
    category: "Gifts & Thrifts",
    spots: 0,
    spotsAvailable: 0,
    price: 0,
    featured: true,
  },
  {
    id: "gnt-iv-louisville",
    title: "G&T IV – Louisville KY",
    description: "Planned 2025 return event at Lynn Family Stadium.",
    date: "2025-05-10",
    location: "Louisville, KY",
    status: "future",

    type: "art",
    category: "Gifts & Thrifts",
    spots: 0,
    spotsAvailable: 0,
    price: 0,
    featured: false,
  },
  {
    id: "gnt-v-west-chester",
    title: "G&T V – West Chester PA",
    description: "Back to where it began – target Q2 2026.",
    date: "2026-06-01",
    location: "West Chester, PA",
    status: "future",

    type: "art",
    category: "Gifts & Thrifts",
    spots: 0,
    spotsAvailable: 0,
    price: 0,
    featured: false,
  },

  // ───────── (other non‑G&T events stay exactly as they were) ─────────
  {
    id: "ask-mentorship-launch",
    title: "Mentorship Program Launch",
    description:
      "Be among the first to join our athlete mentorship network. Connect with professional athletes for guidance on your journey.",
    fullDescription: `Our inaugural mentorship program is launching soon! ...`,
    date: "2025-08-01",
    location: "Virtual & In‑Person Options",
    status: "future",

    type: "ask",
    category: "Mentorship",
    spots: 50,
    spotsAvailable: 50,
    price: 0,
    featured: true,
    organizers: ["Aiden McFadden"],
    contactEmail: "mentorship@collectivearc.org",
    tags: ["mentorship", "launch", "founding members"],
    isComingSoon: true,
  },
  {
    id: "art-equipment-drive",
    title: "Equipment Recycling Initiative",
    description:
      "Help us launch our sustainable sports equipment program. Donate, volunteer, or become a partner.",
    fullDescription: `We're preparing to launch a comprehensive equipment recycling program ...`,
    date: "2025-09-15",
    location: "Multiple Locations (TBA)",
    status: "future",

    type: "art",
    category: "Environmental",
    spots: 200,
    spotsAvailable: 200,
    price: 0,
    featured: true,
    organizers: ["Collective Arc Team"],
    contactEmail: "recycle@collectivearc.org",
    tags: ["recycling", "sustainability", "equipment", "volunteer"],
    isComingSoon: true,
  },
  {
    id: "all-reading-program",
    title: "Athletes & Literacy Program",
    description:
      "Professional athletes will visit schools to promote literacy through sports-themed reading sessions.",
    fullDescription: `We're developing an exciting literacy program that brings together professional athletes ...`,
    date: "2025-10-01",
    location: "Partner Schools (TBA)",
    status: "future",

    type: "all",
    category: "Education",
    spots: 100,
    spotsAvailable: 100,
    price: 0,
    featured: true,
    organizers: ["Collective Arc Team"],
    contactEmail: "literacy@collectivearc.org",
    tags: ["literacy", "education", "youth", "schools"],
    isComingSoon: true,
  },
]

// ──────────────────────────────────────────────────────────────────────────────
//  Helpers (unchanged)
// ──────────────────────────────────────────────────────────────────────────────
export const featuredEvents = events.filter((e) => e.featured)

export const upcomingEvents = events
  .filter((e) => new Date(e.date) > new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id)
}

export function getEventsByType(type: "ask" | "art" | "all"): Event[] {
  return events.filter((event) => event.type === type)
}

export function getEventTypeColor(type: "ask" | "art" | "all"): string {
  const colors = {
    ask: "from-green-500 to-emerald-500",
    art: "from-emerald-500 to-teal-500",
    all: "from-teal-500 to-cyan-500",
  } as const
  return colors[type]
}

