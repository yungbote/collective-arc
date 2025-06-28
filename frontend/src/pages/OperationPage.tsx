import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { Link } from "react-router-dom"
import { 
  Users, 
  Recycle, 
  BookOpen, 
  ArrowRight, 
  Calendar,
  Mail,
  CheckCircle2,
  Target,
  Heart,
  Globe,
  Rocket,
  Bell
} from "lucide-react"

interface OperationPageProps {
  operation: "ask" | "art" | "all"
}

const operationContent = {
  ask: {
    title: "Operation Ask",
    subtitle: "Athletes Sharing Knowledge",
    icon: <Users className="h-16 w-16 text-green-500" />,
    description: "A network of collective knowledge, fostering mentorship and shared experiences among athletes.",
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    borderColor: "border-green-500",
    features: [
      {
        icon: <Target className="h-6 w-6" />,
        title: "Mentorship Programs",
        description: "Connect with professional athletes who understand your journey, from recruitment challenges to mental resilience."
      },
      {
        icon: <Heart className="h-6 w-6" />,
        title: "Peer Support Networks",
        description: "Build relationships with athletes at all levels, creating a supportive community for growth and development."
      },
      {
        icon: <Globe className="h-6 w-6" />,
        title: "Knowledge Exchange",
        description: "Access exclusive insights on training, nutrition, college recruitment, and professional development."
      }
    ],
    goals: [
      "Launch with 50+ professional athlete mentors by Q3 2025",
      "Create specialized programs for different sports and levels",
      "Develop mobile app for seamless mentor-athlete connections",
      "Host quarterly virtual summits for community building"
    ]
  },
  art: {
    title: "Operation Art",
    subtitle: "Athletes Recycling & Thrifting",
    icon: <Recycle className="h-16 w-16 text-emerald-500" />,
    description: "A combination of events and services aimed at combatting destructive environmental practices through sustainable actions.",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500",
    features: [
      {
        icon: <Recycle className="h-6 w-6" />,
        title: "Equipment Recycling",
        description: "Collect and redistribute sports equipment to underserved communities, reducing waste and increasing access."
      },
      {
        icon: <Globe className="h-6 w-6" />,
        title: "Sustainable Events",
        description: "Host zero-waste sporting events and teach athletes how to reduce their environmental footprint."
      },
      {
        icon: <Heart className="h-6 w-6" />,
        title: "Community Clean-ups",
        description: "Organize athlete-led environmental initiatives that combine fitness with community service."
      }
    ],
    goals: [
      "Collect and redistribute 10,000+ pieces of equipment in Year 1",
      "Partner with 20+ youth sports organizations",
      "Launch clothing swap events in 5 major cities",
      "Create athlete sustainability certification program"
    ]
  },
  all: {
    title: "Operation All",
    subtitle: "Athletes Learning & Literacy",
    icon: <BookOpen className="h-16 w-16 text-teal-500" />,
    description: "A network designed to inspire and educate youth through learning programs and literacy initiatives.",
    color: "teal",
    gradient: "from-teal-500 to-cyan-500",
    borderColor: "border-teal-500",
    features: [
      {
        icon: <BookOpen className="h-6 w-6" />,
        title: "Reading Programs",
        description: "Athletes visit schools to read with students, showing that champions are readers too."
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Youth Workshops",
        description: "Interactive sessions combining sports and education to inspire young minds."
      },
      {
        icon: <Target className="h-6 w-6" />,
        title: "Educational Resources",
        description: "Develop sports-themed learning materials that make education exciting and relevant."
      }
    ],
    goals: [
      "Partner with 25 schools in our first year",
      "Reach 10,000+ students through reading programs",
      "Create athlete-authored children's book series",
      "Establish scholarship fund for student-athletes"
    ]
  }
}

export function OperationPage({ operation }: OperationPageProps) {
  const content = operationContent[operation]
  
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-28 text-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 dark:bg-green-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-float" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 dark:bg-emerald-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300 dark:bg-teal-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float" style={{ animationDelay: "4s" }} />
          </div>
          
          <div className="px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
              <div className="animate-bounce-in">{content.icon}</div>
              <h1 className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r ${content.gradient}`}>
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                {content.subtitle}
              </p>
              <p className="text-muted-foreground max-w-2xl text-center leading-relaxed">
                {content.description}
              </p>
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 rounded-full px-4 py-2">
                <Rocket className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  Launching 2025
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-20 bg-muted/30">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10 md:mb-16">
              What We're Building
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {content.features.map((feature, index) => (
                <Card key={index} className={`flex flex-col h-full hover:shadow-xl transition-all duration-300 border-t-4 ${content.borderColor}`}>
                  <CardHeader className="text-center">
                    <div className={`${content.color === 'green' ? 'text-green-500' : content.color === 'emerald' ? 'text-emerald-500' : 'text-teal-500'} mx-auto mb-3`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="w-full py-12 md:py-20">
          <div className="px-4 md:px-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10 md:mb-16">
              Our Goals
            </h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {content.goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${content.gradient} flex items-center justify-center text-white text-sm font-bold`}>
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground">{goal}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-20 bg-muted/30">
          <div className="px-4 md:px-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10 md:mb-16">
              How You Can Help
            </h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${content.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Join Our Community</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sign up for our newsletter to stay updated on launch dates, volunteer opportunities, and ways to get involved.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${content.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Spread the Word</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Share our mission with fellow athletes, schools, and organizations that might benefit from or contribute to our programs.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${content.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Become a Partner</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're an athlete, educator, or organization leader, we're looking for partners to help bring these initiatives to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-20">
          <div className="px-4 md:px-6">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-muted/50 to-muted">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl sm:text-3xl">Ready to Make a Difference?</CardTitle>
                <CardDescription className="text-base">
                  Join us in building {content.title} and creating positive change through sports.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className={`bg-gradient-to-r ${content.gradient} hover:opacity-90`} asChild>
                  <a href="#newsletter">
                    <Bell className="mr-2 h-4 w-4" />
                    Get Updates
                  </a>
                </Button>
                <Button size="lg" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Other Operations Section */}
        <section className="w-full py-12 md:py-20 bg-muted/30">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10 md:mb-16">
              Explore Other Operations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {Object.entries(operationContent)
                .filter(([key]) => key !== operation)
                .map(([key, op]) => (
                  <Card key={key} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="scale-75">{op.icon}</div>
                        <div>
                          <CardTitle>{op.title}</CardTitle>
                          <CardDescription>{op.subtitle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {op.description}
                      </p>
                      <Button variant="outline" asChild className="w-full">
                        <Link to={`/operations/${key}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  )
}
