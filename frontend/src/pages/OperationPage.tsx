import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { Link } from "react-router-dom"
import { 
  Users, 
  Recycle, 
  BookOpen, 
  ArrowRight, 
  Mail,
  Target,
  Heart,
  Globe,
  Rocket,
  Bell,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  HandCoins
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface OperationPageProps {
  operation: "ask" | "art" | "all"
}

const operationContent = {
  ask: {
    title: "Operation Ask",
    subtitle: "Athletes Sharing Knowledge",
    icon: <Users className="h-16 w-16 text-green-500" />,
    description:
      "A network of collective knowledge, fostering mentorship and shared experiences among athletes.",
    longDescription: `Imagine if you could travel back in time and share some wisdom with your younger self? Imagine how advantageous even the slightest insights might have proven if they’d been shared with you, for you, by someone you would have taken the time to listen to? Operation ASK wants to be your time machine, to be your guiding voice. We want to help you successfully navigate your athletic journey. Who better to offer insights on your athletic journey than someone who has already climbed a similar mountain or found their way out of a similar maze? We cannot guarantee results, but we can guarantee access to our collection of acquired intelligence. It might not be much, or it could be everything. What you do with it is up to you, but we are here to help. All you have to do is ASK.`,
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    borderColor: "border-green-500",
    features: [
      {
        icon: <Target className="h-6 w-6" />,
        title: "Mentorship Programs",
        description:
          "Connect with professional athletes who understand your journey, from recruitment challenges to mental resilience."
      },
      {
        icon: <Heart className="h-6 w-6" />,
        title: "Peer Support Networks",
        description:
          "Build relationships with athletes at all levels, creating a supportive community for growth and development."
      },
      {
        icon: <Globe className="h-6 w-6" />,
        title: "Knowledge Exchange",
        description:
          "Access exclusive insights on training, nutrition, college recruitment, and professional development."
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
    description:
      "Events and services combating destructive environmental practices through sustainable actions.",
    longDescription: `Operation ART (Athletes Recycling Knowledge) was the formal inception of Collective ARC; Originally titled Gifts & Thrifts, Aiden started a pop-up clothing exchange in West Chester, PA in 2024 before expanding into Louisville Ky. The Collective ARC coalition is currently looking to further combat the saturated and destructive market of fast fashion while offering creative solutions to a multitude of other environmwtal issues.`,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500",
    features: [
      {
        icon: <Recycle className="h-6 w-6" />,
        title: "Gifts and Thrifts",
        description:
          "Pop-up thrift exchanges aimed at fostering community and combating fast-fashion through a communal effort of recycling and up-cycling"
      },
      {
        icon: <Heart className="h-6 w-6" />,
        title: "Sustainability Work-shops",
        description:
          "Environmental events with local athletes, ranging from park clean-ups to up-cycling classes"
      },
      {
        icon: <Globe className="h-6 w-6" />,
        title: "Virtual Storefront: coming soon",
        description:
          "Offers online access to up-cycle artists' clothing and collaborators' gifts to the community"
      }
    ],
    goals: [
      "Collect and redistribute 10,000+ pieces of equipment in Year 1",
      "Partner with 20+ youth sports organizations",
      "Launch clothing‑swap events in 5 major cities",
      "Create athlete sustainability certification program"
    ]
  },
  all: {
    title: "Operation All",
    subtitle: "Athletes Learning & Literacy",
    icon: <BookOpen className="h-16 w-16 text-teal-500" />,
    description:
      "Inspiring and educating youth through athlete‑led learning programs and literacy initiatives.",
    longDescription: `While majoring in Business Analytics, founder Aiden McFadden received his minor in Education, Schooling, and Society. Through this program, Aiden briefly had the opportunity to work with local elementary schools through a program at Notre Dame. While the Covid-19 pandemic destroyed this partnership, it left a lasting impression and lifetime interest in one of humanity's greatest educators, the written word. This, combined with our founder’s affinity for starting book clubs, led to the formation of Operation ALL.`,
    color: "teal",
    gradient: "from-teal-500 to-cyan-500",
    borderColor: "border-teal-500",
    features: [
      {
        icon: <BookOpen className="h-6 w-6" />,
        title: "Reading Programs",
        description:
          "Athletes visit schools to read with students, showing that champions are readers too."
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Book Club: coming soon",
        description:
          "Join a book club alongside some of your favorite professional athletes."
      },
      {
        icon: <Target className="h-6 w-6" />,
        title: "Educational Resources Network: coming soon",
        description:
          "Develop sports‑themed learning materials that make education exciting and relevant."
      }
    ],
    goals: [
      "Partner with 25 schools in our first year",
      "Reach 10,000+ students through reading programs",
      "Publish an athlete‑authored children’s book series",
      "Establish a scholarship fund for student‑athletes"
    ]
  }
} as const

export function OperationPage({ operation }: OperationPageProps) {
  const content = operationContent[operation]
  const [showLong, setShowLong] = useState(false)

  const heroDescription =
    showLong && content.longDescription
      ? content.longDescription
      : content.description

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-28 text-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 dark:bg-green-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-float" />
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 dark:bg-emerald-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-float"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300 dark:bg-teal-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div className="px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
              <div className="animate-bounce-in">{content.icon}</div>
              <h1
                className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r ${content.gradient}`}
              >
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                {content.subtitle}
              </p>

              <div className="relative max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={showLong ? "long" : "short"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="text-muted-foreground text-center leading-relaxed"
                  >
                    {heroDescription}
                  </motion.p>
                </AnimatePresence>

                {content.longDescription && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLong((prev) => !prev)}
                    className="
                        ask-toggle
    mx-auto mt-4                    /* centered ≤ 639 px */
    sm:mx-auto sm:mt-0
    sm:absolute sm:right-0 sm:-bottom-4 sm:translate-y-full
  "
                  >
                    {showLong ? (
                      <>
                        Show Less{" "}
                        <ChevronUp className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                      </>
                    ) : (
                      <>
                        Learn More{" "}
                        <ChevronDown className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 rounded-full px-4 py-2">
                <Rocket className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  Launching 2025
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
                <Card
                  key={index}
                  className={`flex flex-col h-full hover:shadow-xl transition-all duration-300 border-t-4 ${content.borderColor}`}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`${
                        content.color === "green"
                          ? "text-green-500"
                          : content.color === "emerald"
                          ? "text-emerald-500"
                          : "text-teal-500"
                      } mx-auto mb-3`}
                    >
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

        {/* CTA Section */}
        <section className="w-full py-12 md:py-20">
          <div className="px-4 md:px-6">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-muted/50 to-muted">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl sm:text-3xl">
                  Ready to Make a Difference?
                </CardTitle>
                <CardDescription className="text-base">
                  Join us in building {content.title} and creating positive
                  change through sports.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${content.gradient} hover:opacity-90`}
                  asChild
                >
                  <a href="mailto:donate@collectivearc.org">
                    <HandCoins className="mr-1 h-4 w-4" />
                    Donate
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:amcfadden@collectivearc.org">
                  <Mail className="mr-1 h-4 w-4" />
                  Contact Us
                  </a>
                </Button>
                 <Button
                  size="lg"
                  className={`bg-gradient-to-r ${content.gradient} hover:opacity-90`}
                  asChild
                >
                  <a href="mailto:volunteer@collectivearc.org">
                    <HeartHandshake className="mr-1 h-4 w-4" />
                    Volunteer
                  </a>
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
                  <Card
                    key={key}
                    className="hover:shadow-lg transition-all duration-300"
                  >
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

      {/* Final CTA */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Be Part of Something Bigger
            </h2>
            <p className="mx-auto max-w-[700px] text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4 sm:px-0">
              We're just getting started. Whether you're an athlete looking to
              give back, a community member passionate about sustainability, or
              someone who believes in the power of education, there's a place
              for you in the Collective ARC.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="default"
                asChild
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm sm:text-base px-4 sm:px-6"
              >
                <Link to="/athletes/aiden-mcfadden">
                  Connect with Our Founder
                  <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

