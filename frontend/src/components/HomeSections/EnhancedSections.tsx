// src/components/HomeSections/EnhancedSections.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { 
  Trophy, 
  Users, 
  Leaf, 
  BookOpen, 
  ArrowRight,
  Star,
  Quote,
  TrendingUp,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Target,
  Rocket
} from "lucide-react"

// Constants for consistent spacing
const SECTION_PADDING = "py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32"
const CONTAINER_PADDING = "px-4 sm:px-6 lg:px-8"
const MAX_WIDTH = "max-w-7xl mx-auto"
const HEADING_MARGIN = "mb-8 sm:mb-10 md:mb-12 lg:mb-16"

// Animated Counter Component with IntersectionObserver
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [end, duration, isVisible])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Goals Section (replacing Statistics)
export function StatisticsSection() {
  const goals = [
    { icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />, value: 500, suffix: "+", label: "Aspiring Athletes Reached", /*subtext: "Goal by 2026"*/ },
    { icon: <Leaf className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />, value: 5, suffix: "+", label: "Environmental Events", /*subtext: "Planned for Year 1"*/ },
    { icon: <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />, value: 7, suffix: "+", label: "Partner Schools", /*subtext: "Target for Literacy Program"*/ },
    { icon: <Trophy className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />, value: 5, suffix: "+", label: "Mentors Added", /*subtext: "Expansion Goal"*/ }
  ]

  return (
    <section className={`w-full ${SECTION_PADDING} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 opacity-50 pointer-events-none" />
      
      <div className={`relative ${CONTAINER_PADDING}`}>
        <div className={MAX_WIDTH}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center ${HEADING_MARGIN}`}>
            Our Vision & Goals
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4 sm:px-0">
            We're just getting started. In our first year, here's what we're working towards in our mission to unite athletes in service of their communities.
          </p>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {goals.map((goal, index) => (
              <div 
                key={index} 
                className="text-center space-y-3 sm:space-y-4 group p-4 sm:p-6 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  {goal.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                  <AnimatedCounter end={goal.value} suffix={goal.suffix} />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground font-medium">{goal.label}</p>
                <p className="text-xs sm:text-sm text-muted-foreground/70">{goal.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section - Updated for coming soon
export function TestimonialsSection() {
  return (
    <section className={`w-full ${SECTION_PADDING} bg-muted/30`}>
      <div className={CONTAINER_PADDING}>
        <div className={MAX_WIDTH}>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center ${HEADING_MARGIN}`}>
            What Athletes Will Say
          </h2>
          <Card className="overflow-hidden border-0 shadow-xl">
            <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
              <Quote className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-500 mb-4 sm:mb-6 mx-auto" />
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 italic leading-relaxed text-muted-foreground">
                  "We're building a community where athletes support each other, give back to their communities, 
                  and create lasting positive change. The stories and testimonials will come as we grow together."
                </p>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden" 
                    alt="Aiden McFadden"
                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full border-2 border-green-500"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-base sm:text-lg">Aiden McFadden</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Founder, Collective Arc</p>
                  </div>
                </div>
                <Button className="mt-6 sm:mt-8 text-sm sm:text-base" asChild>
                  <Link to="/athletes/aiden-mcfadden">
                    Be Our First Success Story
                    <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


/* ——————————————————————————————————
   Timeline Section   –  grouped accordions
—————————————————————————————————— */
type Milestone = {
  year: string
  title: string
  description: string
  icon: JSX.Element
  status: "past" | "current" | "future"
}

export function TimelineSection() {
  /* raw milestones ------------------------------------------------------- */
  const milestones: Milestone[] = [
    {
      year: "2024",
      title: "Initial Conception of Gifts & Thrifts",
      description:
        "An idea for a popup thrifting exchange was formed in an Atlanta coffee shop.",
      icon: <Rocket className="h-4 w-4" />,
      status: "past",
    },
    {
      year: "2024",
      title: "G&T I – West Chester PA",
      description: "January 6: first popup thrifting event.",
      icon: <Users className="h-4 w-4" />,
      status: "past",
    },
    {
      year: "2024",
      title: "G&T II – Porch Fest",
      description: "May 18: hosted by the West Chester Green Team.",
      icon: <Leaf className="h-4 w-4" />,
      status: "past",
    },
    {
      year: "2024",
      title: "G&T III – Louisville KY",
      description: "October: Lynn Family Stadium launch.",
      icon: <BookOpen className="h-4 w-4" />,
      status: "past",
    },
    {
      year: "2025",
      title: "Official Launch of Collective ARC",
      description: "Introducing operations ASK, ART, ALL.",
      icon: <TrendingUp className="h-4 w-4" />,
      status: "past",
    },
    {
      year: "2025",
      title: "G&T IV – Louisville KY",
      description: "Another Lynn Family Stadium event.",
      icon: <Trophy className="h-4 w-4" />,
      status: "current",
    },
        {
      year: "2025",
      title: "Mentorship Program Launch",
      description: "Part of operation ASK.",
      icon: <Trophy className="h-4 w-4" />,
      status: "future",
    },
    {
      year: "2025",
      title: "School Outreach Partnerships Begin",
      description: "",
      icon: <Trophy className="h-4 w-4" />,
      status: "future",
    },
    {
      year: "2026",
      title: "G&T V – West Chester PA",
      description: "Back to where it began.",
      icon: <Trophy className="h-4 w-4" />,
      status: "future",
    },
  ]

  /* groupings ------------------------------------------------------------ */
  const past = milestones.filter((m) => m.status === "past")
  const current = milestones.find((m) => m.status === "current") || null

  const futureByYear = milestones.reduce<Record<string, Milestone[]>>(
    (acc, m) => {
      if (m.status !== "past") {
        acc[m.year] = acc[m.year] ? [...acc[m.year], m] : [m]
      }
      return acc
    },
    {},
  )
  const years = Object.keys(futureByYear).sort()

  const rep = (arr: Milestone[]) =>
    arr.find((m) => m.status === "current") ||
    arr.sort((a, b) => a.title.localeCompare(b.title))[0]

  /* expanded-by-default accordion values */
  const defaultVals = ["completed", ...years]

  return (
    <section className={`w-full ${SECTION_PADDING}`}>
      <div className={CONTAINER_PADDING}>
        <div className={MAX_WIDTH}>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center ${HEADING_MARGIN}`}
          >
            Our&nbsp;Roadmap
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Follow our journey as we build Collective ARC.
          </p>

          <Accordion
            type="multiple"
            defaultValue={defaultVals}
            className="space-y-6 max-w-5xl mx-auto overflow-x-visible"
          >
            {/* Completed -------------------------------------------------- */}
            <AccordionItem value="completed">
              <AccordionTrigger className="no-underline hover:no-underline">
                <span className="text-lg font-semibold">Completed</span>
                <CollapsedInfo item={rep(past)} />
              </AccordionTrigger>
              <AccordionContent className="overflow-x-visible overflow-y-hidden">
                <TimelineList items={past} />
              </AccordionContent>
            </AccordionItem>

            {/* Year groups ------------------------------------------------ */}
            {years.map((yr) => {
              const items = futureByYear[yr]
              return (
                <AccordionItem key={yr} value={yr}>
                  <AccordionTrigger className="no-underline hover:no-underline">
                    <span className="text-lg font-semibold">{yr}</span>
                    <CollapsedInfo item={rep(items)} />
                  </AccordionTrigger>
                  <AccordionContent className="overflow-x-visible overflow-y-hidden">
                    <TimelineList items={items} />
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

/* Collapsed row indicator --------------------------------------------------- */
function CollapsedInfo({ item }: { item: Milestone }) {
  const badge =
    item.status === "current"
      ? "In Progress"
      : item.status === "past"
      ? "Past"
      : "Future"
  const badgeCol =
    item.status === "current"
      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 animate-pulse"
      : item.status === "past"
      ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
      : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"

  return (
    <span className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
      {item.title}
      <span className={`px-2 py-[2px] rounded-full text-[10px] ${badgeCol}`}>
        {badge}
      </span>
    </span>
  )
}

/* Timeline item list -------------------------------------------------------- */
function TimelineList({ items }: { items: Milestone[] }) {
  return (
    <div className="relative mt-6 overflow-visible">
      <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500" />

      {items.map((m, i) => (
        <div
          key={`${m.year}-${i}`}
          className={`relative flex items-center mb-6 last:mb-0 ${
            i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div
            className={`ml-12 sm:ml-16 md:ml-0 flex-1 ${
              i % 2 === 0
                ? "md:pr-8 lg:pr-12 md:text-right"
                : "md:pl-8 lg:pl-12 md:text-left"
            }`}
          >
            <Card
              className={`relative z-10 border-0 shadow hover:shadow-lg transition mx-2 ${
                m.status === "current"
                  ? "ring-2 ring-green-500"
                  : m.status === "past"
                  ? "opacity-80 grayscale"
                  : ""
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className={`text-base lg:text-lg flex items-center gap-2 ${
                    i % 2 === 0 ? "md:flex-row-reverse md:justify-end" : ""
                  }`}
                >
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">
                    {m.year}
                  </span>
                  <span>{m.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {m.description}
                </p>
                {m.status !== "past" && (
                  <span
                    className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                      m.status === "current"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {m.status === "current" ? "In Progress" : "Future"}
                  </span>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="hidden md:block flex-1" />

          <div
            className={`absolute left-4 sm:left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 bg-background shadow-lg flex items-center justify-center ${
              m.status === "current"
                ? "border-green-500 text-green-500 animate-pulse bg-green-200/30"
                : m.status === "future"
                ? "border-emerald-500 text-emerald-500"
                : "border-teal-500 text-teal-500"
            }`}
          >
            {m.icon}
          </div>
        </div>
      ))}
    </div>
  )
}




// Upcoming Events Section - Updated for coming soon
export function EventsSection() {
  const comingSoonEvents = [
    {
      id: "ask-mentorship-launch",
      date: "Coming Soon",
      title: "Mentorship Program Launch",
      location: "Virtual & In-Person",
      type: "ask",
      status: "Planning Phase"
    },
    {
      id: "art-equipment-drive",
      date: "Coming Soon",
      title: "Equipment Recycling Initiative",
      location: "Multiple Cities",
      type: "art",
      status: "Partner Recruitment"
    },
    {
      id: "all-reading-program",
      date: "Coming Soon",
      title: "Athletes & Literacy Program",
      location: "Partner Schools",
      type: "all",
      status: "School Outreach"
    },
    {
      id: "community-events",
      date: "2025",
      title: "Community Events",
      location: "Your City",
      type: "all",
      status: "Stay Tuned"
    }
  ]

  const typeColors = {
    ask: "from-green-500 to-emerald-500",
    art: "from-emerald-500 to-teal-500",
    all: "from-teal-500 to-cyan-500"
  }

  return (
    <section className={`w-full ${SECTION_PADDING} bg-muted/30`}>
      <div className={CONTAINER_PADDING}>
        <div className={MAX_WIDTH}>
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${HEADING_MARGIN}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center sm:text-left">
              Coming Soon
            </h2>
            <Button variant="outline" asChild className="shrink-0 text-sm sm:text-base">
              <Link to="/events">
                View All Plans
                <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {comingSoonEvents.map((event, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-1 bg-gradient-to-r ${typeColors[event.type as keyof typeof typeColors]}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold text-muted-foreground">{event.date}</span>
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {event.status}
                    </span>
                  </div>
                  <CardTitle className="text-base sm:text-lg line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-4">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <Button className="w-full text-xs sm:text-sm" size="sm" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-10 md:mt-12 text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Want to be notified when events launch in your area?
            </p>
            <Button asChild className="text-sm sm:text-base">
              <a href="#newsletter">
                Join Our Newsletter
                <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Athlete CTA Section - Updated for single founder
export function AthleteCTASection() {
  return (
    <section className={`w-full ${SECTION_PADDING} relative overflow-hidden`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }} />
      </div>
      
      <div className={`relative ${CONTAINER_PADDING} text-white`}>
        <div className={MAX_WIDTH}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                <span className="text-sm sm:text-base lg:text-lg font-semibold">Launching Soon: Athlete Mentorship Program</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3 sm:mb-4">
                Connect with Our Founder
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90">
                Start your mentorship journey with Aiden McFadden, professional soccer player and Collective Arc founder. 
                
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="default" 
                  className="bg-white text-green-600 hover:bg-white/90 font-semibold shadow-lg text-sm sm:text-base px-4 sm:px-6"
                  asChild
                >
                  <Link to="/athletes">
                    Meet Aiden
                    <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
                <Button 
                  size="default" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 text-sm sm:text-base px-4 sm:px-6"
                >
                  Enrollment Survey
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 sm:p-5 lg:p-6">
                <Target className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1">50+</div>
                <p className="text-xs sm:text-sm text-white/80">Athletes Joining Soon</p>
              </Card>
              {/*}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 sm:p-5 lg:p-6">
                <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 mb-2 sm:mb-3" />
                <div className="text-lg sm:text-2xl lg:text-3xl mb-0.5 sm:mb-1">Customizable</div>
                <p className="text-xs sm:text-sm text-white/80">Session Types</p>
              </Card>*/}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 sm:p-5 lg:p-6">
                <Star className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1">$60</div>
                <p className="text-xs sm:text-sm text-white/80">Founding Rate</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4 sm:p-5 lg:p-6">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1">5+</div>
                <p className="text-xs sm:text-sm text-white/80">Mentors Coming</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Newsletter Section
export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section id="newsletter" className={`w-full ${SECTION_PADDING} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className={`relative ${CONTAINER_PADDING} text-white`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3 sm:mb-4">
            Be Part of the Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4 sm:px-0">
            Join our founding community and be the first to know about events, mentorship opportunities, and ways to make an impact.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4 sm:px-0">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubscribed}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent disabled:opacity-50 transition-all text-sm sm:text-base"
            />
            <Button 
              type="submit" 
              size="default" 
              disabled={isSubscribed}
              className="bg-white text-green-600 hover:bg-white/90 disabled:opacity-50 font-semibold shadow-lg text-sm sm:text-base px-4 sm:px-6"
            >
              {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-xs sm:text-sm text-white/70 mt-4 sm:mt-6">
            Be among the first 100 founding members. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
