// src/data/athletes.ts
export interface Athlete {
  id: string
  name: string
  title: string
  sport: string
  specialties: string[]
  bio: string
  fullBio?: string
  achievements: string[]
  availability: string
  rate: string
  pennFusionRate?: string
  location: string
  featured: boolean
  rating?: number
  totalSessions?: number
  responseTime?: string
  languages?: string[]
  education?: string
  sessionTypes?: Array<{
    type: string
    duration: string
    description: string
  }>
  testimonials?: Array<{
    author: string
    role: string
    text: string
    rating: number
  }>
  isFounder?: boolean
}

export const athletes: Athlete[] = [
  {
    id: "aiden-mcfadden",
    name: "Aiden McFadden",
    title: "Founder & Professional Soccer Player",
    sport: "Soccer",
    specialties: ["College Recruitment", "Professional Development", "Mental Resilience"],
    bio: "Captain at Notre Dame, professional player at Louisville City FC. Persevered to achieve 6 state titles, 2 regional titles, and 2 national league titles with Penn Fusion 98'.",
    fullBio: `Aiden McFadden's journey epitomizes the power of perspective and perseverance. He took his club soccer team, Penn Fusion 98', to 6 state titles, 2 regional titles, and 2 national league titles. He was the 2017 HS All-American game MVP and went on to captain The University of Notre Dame while earning the team-voted Most Valuable Player award his senior season before being drafted to Atlanta United.

His professional career continued this pattern of resilience. He signed a 2nd team contract. He set the then single-season goal record for Atlanta 2 in the USL as a right back, earned a first team contract, and became a sought-after player. He was brought to Louisville City on loan before they secured him permanently en route to lifting the club's first-ever supporters shield trophy.

Now, Aiden is dedicated to sharing his experiences and helping the next generation of athletes navigate their own journeys through Collective Arc.`,
    achievements: [
      "2017 HS All-American Game MVP",
      "Notre Dame Team Captain & MVP Senior Season",
      "Louisville City Supporters Shield Winner",
      "Single-season goal record at Atlanta 2",
      "6x State Champion with Penn Fusion 98'",
      "2x Regional Champion",
      "2x National League Champion"
    ],
    availability: "Mon-Fri, Limited Weekends",
    rate: "$75/session",
    pennFusionRate: "$60/session",
    location: "Louisville, KY",
    featured: true,
    rating: 5.0,
    totalSessions:'-',
    responseTime: "Usually responds within 2 hours",
    languages: ["English"],
    education: "University of Notre Dame - Business Analytics",
    sessionTypes: [
      { type: "1-on-1 Video Call", duration: "60 min", description: "Personal mentorship session via Zoom" },
      { type: "Film Review", duration: "45 min", description: "Detailed analysis of your game footage" },
      { type: "Group Q&A", duration: "90 min", description: "Small group sessions (3-5 athletes)" }
    ],
    isFounder: true,
    testimonials: []
  }
]

export const featuredAthletes = athletes.filter(a => a.featured)
export const allAthletes = athletes

// Helper function to get athlete by ID
export function getAthleteById(id: string): Athlete | undefined {
  return athletes.find(athlete => athlete.id === id)
}
