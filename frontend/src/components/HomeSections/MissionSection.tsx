// src/components/HomeSections/MissionSection.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Users, Recycle, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"

const missions = [
  {
    id: "ask",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-green-500" />,
    title: "Operation ASK",
    subtitle: "Athletes Sharing Knowledge",
    description: "A network of collective knowledge, fostering mentorship and shared experiences among athletes.",
  },
  {
    id: "art",
    icon: <Recycle className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-emerald-500" />,
    title: "Operation ART",
    subtitle: "Athletes Recycling & Thrifting",
    description: "A combination of events and services aimed at combating destructive environmental practices through sustainable, community-led actions.",
  },
  {
    id: "all",
    icon: <BookOpen className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-teal-500" />,
    title: "Operation ALL",
    subtitle: "Athletes Learning & Literacy",
    description: "A network designed to inspire and educate youth through learning programs and literacy initiatives.",
  },
]

export function MissionsSection() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-muted/30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            Our Missions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
{missions.map((mission, index) => (
  <Tooltip key={mission.id} delayDuration={200}>
    <TooltipTrigger asChild>
      <Link to={`/operations/${mission.id}`}>
        <Card 
          className="flex flex-col h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow overflow-hidden"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="items-center text-center pb-3 sm:pb-4 pt-6 sm:pt-8">
            <div className="mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {mission.icon}
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-semibold">{mission.title}</CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-1">{mission.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow pb-6 sm:pb-8">
            {/*<p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
              Our commitment to sustainable change.
            </p>*/}
          </CardContent>
        </Card>
      </Link>
    </TooltipTrigger>
    <TooltipContent
      side="bottom"
      className="max-w-xs p-3 sm:p-4 bg-background text-foreground border shadow-lg rounded-lg"
    >
      <p className="text-xs sm:text-sm leading-relaxed">{mission.description}</p>
    </TooltipContent>
  </Tooltip>
))}
          </div>
        </div>
      </div>
    </section>
  )
}
