// src/pages/AthletesPage.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Rocket
} from "lucide-react"
import { athletes, featuredAthletes } from "@/data/athletes"

// Avatar component for athlete initials
function AthleteAvatar({ name, size = "default" }: { name: string, size?: "small" | "default" | "large" }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  const sizeClasses = {
    small: "h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm",
    default: "h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-base",
    large: "h-14 w-14 sm:h-16 sm:w-16 text-lg sm:text-xl"
  }
  
  // Generate consistent color based on name
  const colors = [
    "from-green-500 to-emerald-500",
    "from-emerald-500 to-teal-500",
    "from-teal-500 to-cyan-500",
    "from-blue-500 to-indigo-500",
    "from-purple-500 to-pink-500",
  ]
  const colorIndex = name.charCodeAt(0) % colors.length
  
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white font-semibold shadow-lg`}>
      {initials}
    </div>
  )
}

export function AthletesPage() {
  const founder = athletes.find(a => a.isFounder)

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-28 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 sm:-top-30 md:-top-40 -right-20 sm:-right-30 md:-right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float" />
            <div className="absolute -bottom-20 sm:-bottom-30 md:-bottom-40 -left-20 sm:-left-30 md:-left-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float" style={{ animationDelay: "2s" }} />
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
                      <AthleteAvatar name={founder.name} size="large" />
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Trophy className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                        <span className="text-xs sm:text-sm font-semibold">Founder</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">{founder.name}</CardTitle>
                    <CardDescription className="font-medium text-base sm:text-lg">{founder.title}</CardDescription>
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
                        <h4 className="font-semibold mb-2 text-sm sm:text-base">Specialties:</h4>
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
                          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">{founder.rate}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Standard Rate</p>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-muted/50 rounded-lg">
                          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">{founder.pennFusionRate}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Penn Fusion Rate</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-4 sm:p-6 pt-0">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm sm:text-base" size="default" asChild>
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
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-10 md:mb-16">
                Growing Our Network
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Placeholder Cards */}
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
                  <CardHeader className="relative">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 mb-3 sm:mb-4 flex items-center justify-center">
                      <UserPlus className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-muted-foreground">Basketball Mentors</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Coming Soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      D1 and professional basketball players joining to share their expertise in recruitment and skill development.
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 dark:text-green-400">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Expected Q3 2025</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
                  <CardHeader className="relative">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 mb-3 sm:mb-4 flex items-center justify-center">
                      <UserPlus className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-muted-foreground">Track & Field Athletes</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Coming Soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      Olympic and collegiate track athletes focusing on speed training and competition preparation.
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 dark:text-green-400">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Expected Q3 2025</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10" />
                  <CardHeader className="relative">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 mb-3 sm:mb-4 flex items-center justify-center">
                      <UserPlus className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-muted-foreground">More Sports</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Coming Soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      Football, volleyball, swimming, and more sports joining our mentorship network.
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 dark:text-green-400">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Expected Q4 2025</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Become a Mentor CTA */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="px-4 sm:px-6 lg:px-8">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardHeader className="text-center">
                <div className="inline-flex mx-auto mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Rocket className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl">Are You an Athlete?</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Join Collective Arc as a founding mentor and help shape the future of athlete mentorship.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 mt-1.5 sm:mt-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Share your journey and expertise with aspiring athletes
                    </p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 mt-1.5 sm:mt-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Set your own schedule and session rates
                    </p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 mt-1.5 sm:mt-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Be part of our founding mentor community
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button size="default" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm sm:text-base">
                    Apply to Be a Mentor
                  </Button>
                  <Button size="default" variant="outline" className="text-sm sm:text-base">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export { AthleteAvatar }
