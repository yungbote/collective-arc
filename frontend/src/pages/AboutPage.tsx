// src/pages/AboutPage.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { Link } from "react-router-dom"
import { Target, Heart, Globe, Users, ArrowRight, Sparkles, Trophy, GraduationCap, Recycle, Rocket, Calendar } from "lucide-react"

export function AboutPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 sm:-top-30 md:-top-40 -right-20 sm:-right-30 md:-right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float" />
            <div className="absolute -bottom-20 sm:-bottom-30 md:-bottom-40 -left-20 sm:-left-30 md:-left-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float" style={{ animationDelay: "2s" }} />
          </div>
          
          <div className="px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col items-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full border px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold transition-colors mb-2 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                <Rocket className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Launching 2025
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600">
                About Collective Arc
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-2xl px-4 sm:px-0">
                A new coalition of operations centered around athletes, recycling, and community, 
                launching to create positive change.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <Card className="h-full">
                <CardHeader className="text-center">
                  <Target className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3 sm:mb-4" />
                  <CardTitle className="text-xl sm:text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    To use our guiding light to ignite similar passions in you. We believe that 
                    the commonality of our operations—being a foundation in athletics, recycling, 
                    and community—will pull like-minded individuals into our orbit. At our core, 
                    we know what we stand for, and we're committed to creating lasting positive change.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="h-full">
                <CardHeader className="text-center">
                  <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-500 mx-auto mb-3 sm:mb-4" />
                  <CardTitle className="text-xl sm:text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    To create a world where athletes leverage their influence and experiences to 
                    foster sustainable practices, share knowledge, and inspire education. We envision 
                    communities connected through sport, environmental consciousness, and a shared 
                    commitment to lifting each other up.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Now Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-10 md:mb-16">
              Why We're Starting Collective Arc
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                    <span>Athletes Need Connection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Too many athletes face their journeys alone. From recruitment challenges to career transitions, 
                    we're building a network where experienced athletes can guide those coming behind them, 
                    creating a supportive community that extends beyond individual sports.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                    <Recycle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 flex-shrink-0" />
                    <span>Sports Can Be Sustainable</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    The sports industry generates massive waste through equipment turnover and fast fashion. 
                    We're launching initiatives to recycle equipment, promote sustainable practices, and show 
                    that athletic excellence and environmental responsibility can go hand in hand.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-teal-500 flex-shrink-0" />
                    <span>Education Needs Champions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Young people look up to athletes. By connecting athletes with schools and literacy programs, 
                    we can inspire a love of learning and show students that success requires both physical 
                    and mental development. Champions are readers too.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-10 md:mb-16">
              Our Founder's Story
            </h2>
            <Card className="overflow-hidden border-0 shadow-lg">
              <CardContent className="pt-6 sm:pt-8">
                <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert mx-auto max-w-none">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    <span className="font-semibold">Aiden McFadden</span>, founder and CEO of Collective Arc, 
                    grew up in West Chester, Pennsylvania. His journey epitomizes the power of perspective and perseverance.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    He took his club soccer team, Penn Fusion 98', to 6 state titles, 
                    2 regional titles, and 2 national league titles. He was the 2017 HS All-American game MVP 
                    and went on to captain The University of Notre Dame while earning the team-voted 
                    Most Valuable Player award his senior season before being drafted to Atlanta United.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    His professional career continued this pattern of resilience. He set the then single-season 
                    goal record for Atlanta 2 in the USL as a right back, earned a first team contract, 
                    and became a sought-after player. He was brought to Louisville City on loan before 
                    they secured him permanently en route to lifting the club's first-ever supporters shield trophy.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    It's all about perspective and perseverance. This journey has shaped Aiden's vision 
                    for Collective Arc—an organization that believes in the power of athletes to create 
                    positive change, no matter the obstacles they've faced. Now, he's building this platform 
                    to help other athletes share their knowledge, give back to their communities, and create 
                    a lasting impact beyond the field.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What's Next Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center mb-8 sm:mb-10 md:mb-16">
              What's Coming in 2025
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
              <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-t-4 border-t-green-500">
                <CardHeader className="text-center">
                  <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-green-500 mx-auto mb-2 sm:mb-3" />
                  <CardTitle className="text-lg sm:text-xl">Q2: Platform Launch</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
                    Our mentorship platform goes live, connecting athletes with those seeking guidance on their journey.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-t-4 border-t-emerald-500">
                <CardHeader className="text-center">
                  <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500 mx-auto mb-2 sm:mb-3" />
                  <CardTitle className="text-lg sm:text-xl">Q3: First Events</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
                    Launch our equipment recycling drives and host our first sustainable sports events.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-t-4 border-t-teal-500">
                <CardHeader className="text-center">
                  <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-teal-500 mx-auto mb-2 sm:mb-3" />
                  <CardTitle className="text-lg sm:text-xl">Q4: School Programs</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
                    Begin our literacy programs with athlete reading sessions in partner schools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4 sm:space-y-6 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                Be Part of Something Bigger
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4 sm:px-0">
                We're just getting started. Whether you're an athlete looking to give back, 
                a community member passionate about sustainability, or someone who believes in 
                the power of education, there's a place for you in the Collective Arc.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="default" asChild className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm sm:text-base px-4 sm:px-6">
                  <Link to="/athletes/aiden-mcfadden">
                    Connect with Our Founder
                    <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
                <Button size="default" variant="outline" asChild className="text-sm sm:text-base px-4 sm:px-6">
                  <a href="#newsletter">
                    Join Our Newsletter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
