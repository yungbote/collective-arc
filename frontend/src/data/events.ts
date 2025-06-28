// src/data/events.ts
export interface Event {
  id: string
  title: string
  description: string
  fullDescription?: string
  date: string
  time: string
  endTime?: string
  location: string
  address?: string
  type: 'ask' | 'art' | 'all'
  category: string
  spots: number
  spotsAvailable: number
  price: number
  image?: string
  featured: boolean
  organizers?: string[]
  schedule?: {
    time: string
    activity: string
  }[]
  requirements?: string[]
  whatToBring?: string[]
  registrationDeadline?: string
  contactEmail?: string
  tags?: string[]
  isComingSoon?: boolean
}

export const events: Event[] = [
  {
    id: "ask-mentorship-launch",
    title: "Mentorship Program Launch",
    description: "Be among the first to join our athlete mentorship network. Connect with professional athletes for guidance on your journey.",
    fullDescription: `Our inaugural mentorship program is launching soon! This program will connect aspiring athletes with professionals who've walked similar paths.

Whether you're navigating college recruitment, dealing with setbacks, or seeking guidance on professional development, our mentors will be here to help.

The program will include:
- One-on-one video sessions with professional athletes
- Group workshops on specific topics
- Access to exclusive content and resources
- A supportive community of like-minded athletes

Early registrants will receive special founding member benefits.`,
    date: "2025-08-01",
    time: "TBD",
    location: "Virtual & In-Person Options",
    type: "ask",
    category: "Mentorship",
    spots: 50,
    spotsAvailable: 50,
    price: 0,
    featured: true,
    organizers: ["Aiden McFadden"],
    contactEmail: "mentorship@collectivearc.org",
    tags: ["mentorship", "launch", "founding members"],
    isComingSoon: true
  },
  {
    id: "art-equipment-drive",
    title: "Equipment Recycling Initiative",
    description: "Help us launch our sustainable sports equipment program. Donate, volunteer, or become a partner.",
    fullDescription: `We're preparing to launch a comprehensive equipment recycling program that will collect gently used sports gear and redistribute it to youth programs in need.

This initiative aims to:
- Reduce sports equipment waste
- Make sports more accessible to all youth
- Build a network of sustainable sports communities
- Create volunteer opportunities for athletes to give back

We're currently seeking:
- Community partners
- Collection site hosts
- Volunteer coordinators
- Initial equipment donations

Join us in making sports more sustainable and accessible!`,
    date: "2025-09-15",
    time: "TBD",
    location: "Multiple Locations (TBA)",
    type: "art",
    category: "Environmental",
    spots: 200,
    spotsAvailable: 200,
    price: 0,
    featured: true,
    organizers: ["Collective Arc Team"],
    contactEmail: "recycle@collectivearc.org",
    tags: ["recycling", "sustainability", "equipment", "volunteer"],
    isComingSoon: true
  },
  {
    id: "all-reading-program",
    title: "Athletes & Literacy Program",
    description: "Professional athletes will visit schools to promote literacy through sports-themed reading sessions.",
    fullDescription: `We're developing an exciting literacy program that brings together professional athletes and young students for inspiring reading sessions.

The program will feature:
- Athletes reading their favorite children's books
- Sports-themed literacy activities
- Free books for participating students
- Mentorship opportunities through reading

We believe that champions are readers too, and we're working to inspire the next generation to discover the joy of reading.

Schools and athletes interested in participating should reach out to join our pilot program.`,
    date: "2025-10-01",
    time: "TBD",
    location: "Partner Schools (TBA)",
    type: "all",
    category: "Education",
    spots: 100,
    spotsAvailable: 100,
    price: 0,
    featured: true,
    organizers: ["Collective Arc Team"],
    contactEmail: "literacy@collectivearc.org",
    tags: ["literacy", "education", "youth", "schools"],
    isComingSoon: true
  }
]

export const featuredEvents = events.filter(e => e.featured)
export const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

// Helper function to get event by ID
export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id)
}

// Helper to get events by type
export function getEventsByType(type: 'ask' | 'art' | 'all'): Event[] {
  return events.filter(event => event.type === type)
}

// Get type color classes
export function getEventTypeColor(type: 'ask' | 'art' | 'all'): string {
  const colors = {
    ask: "from-green-500 to-emerald-500",
    art: "from-emerald-500 to-teal-500",
    all: "from-teal-500 to-cyan-500"
  }
  return colors[type]
}
