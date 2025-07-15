// src/pages/AthletesPage.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { Link } from "react-router-dom"
import {
  Users,
  Trophy,
  GraduationCap,
  Target,
  ArrowRight,
  Star,
  Calendar,
  MapPin,
  Sparkles,
  UserPlus,
  Rocket,
} from "lucide-react"
import { athletes, featuredAthletes } from "@/data/athletes"

/* ——————————————————————————————————
   Avatar component
—————————————————————————————————— */
function AthleteAvatar({
  name,
  size = "default",
  src,
}: {
  name: string
  size?: "small" | "default" | "large"
  /** optional photo path, e.g. “/aiden.jpg” (served from /public) */
  src?: string
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const sizeClasses = {
    small: "h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm",
    default: "h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-base",
    large: "h-14 w-14 sm:h-16 sm:w-16 text-lg sm:text-xl",
  }

  /* if an image is provided, show the photo with identical sizing */
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300`}
      />
    )
  }

  /* otherwise fall back to gradient‑initials avatar */
  const colors = [
    "from-green-500 to-emerald-500",
    "from-emerald-500 to-teal-500",
    "from-teal-500 to-cyan-500",
    "from-blue-500 to-indigo-500",
    "from-purple-500 to-pink-500",
  ]
  const colorIndex = name.charCodeAt(0) % colors.length

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${
        colors[colorIndex]
      } flex items-center justify-center text-white font-semibold shadow-lg`}
    >
      {initials}
    </div>
  )
}

/* ——————————————————————————————————
   Page
—————————————————————————————————— */
export function AthletesPage() {
  const founder = athletes.find((a) => a.isFounder)

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-28 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 sm:-top-30 md:-top-40 -right-20 sm:-right-30 md:-right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float" />
            <div
              className="absolute -bottom-20 sm:-bottom-30 md:-bottom-40 -left-20 sm:-left-30 md:-left-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col items-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
              <div className="animate-bounce-in">
                <Users className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600">
                Meet Our Founder
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-2xl px-4 sm:px-0">
                Start your mentorship journey with a professional athlete who understands the challenges you face
              </p>
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                <span className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-300">
                  More Athletes Joining Soon!
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Profile Section */}
        {founder && (
          <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-0 shadow overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      {/* avatar now shows founder’s headshot */}
                      <AthleteAvatar
                        name={founder.name}
                        size="large"
                        src="/aiden.jpg"
                      />
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Trophy className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                        <span className="text-xs sm:text-sm font-semibold">
                          Founder
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">
                      {founder.name}
                    </CardTitle>
                    <CardDescription className="font-medium text-base sm:text-lg">
                      {founder.title}
                    </CardDescription>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                        {founder.sport}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        {founder.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                      {founder.bio}
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base">
                          Specialties:
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {founder.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="text-xs sm:text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                        <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                            {founder.rate}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Standard Rate
                          </p>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                            {founder.pennFusionRate}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Penn Fusion Rate
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-4 sm:p-6 pt-0">
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm sm:text-base"
                      asChild
                    >
                      <Link to={`/athletes/${founder.id}`}>
                        Book a Session with Aiden
                        <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Coming Soon Section */}
        {/* … (unchanged sections omitted for brevity) */}
      </div>
      <Footer />
    </div>
  )
}

export { AthleteAvatar } // keep export for reuse

