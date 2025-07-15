import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { AthleteAvatar } from "@/pages/AthletesPage"
import { getAthleteById } from "@/data/athletes"
import {
  Trophy,
  MapPin,
  ArrowLeft,
  Video,
  Award,
  CheckCircle2,
  Mail as MailIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

/* ——————————————————————————————————
   Page
—————————————————————————————————— */
export function AthleteProfilePage() {
  const { athleteId } = useParams<{ athleteId: string }>()
  const athlete = getAthleteById(athleteId || "")

  const [showAbout, setShowAbout] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showSessions, setShowSessions] = useState(false)
  const [showContact, setShowContact] = useState(false)

  if (!athlete) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Athlete not found</p>
            <Button asChild>
              <Link to="/athletes">Back to Athletes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  /* ------------------------------------------------------------------ */
  /* Reusable toggle button                                             */
  /* ------------------------------------------------------------------ */
  const ToggleBtn = ({
    open,
    onClick,
    ariaLabel,
  }: {
    open: boolean
    onClick: () => void
    ariaLabel: string
  }) => (
    <Button
      size="icon"
      variant="ghost"
      aria-label={ariaLabel}
      onClick={onClick}
      className="rounded-full ring-1 ring-green-500/20 backdrop-blur-md bg-green-500/10 dark:bg-green-400/10 hover:bg-green-500/20 dark:hover:bg-green-400/20 transition-all"
    >
      {open ? (
        <ChevronUp className="h-5 w-5" />
      ) : (
        <ChevronDown className="h-5 w-5" />
      )}
    </Button>
  )

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <Button variant="ghost" asChild className="mb-6">
                <Link to="/athletes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Athletes
                </Link>
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Profile Header */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        <AthleteAvatar
                          name={athlete.name}
                          size="large"
                          src="/aiden.jpg"
                        />
                        <div className="flex-1">
                          <h1 className="text-3xl font-bold mb-2">
                            {athlete.name}
                          </h1>
                          <p className="text-lg text-muted-foreground mb-4">
                            {athlete.title}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Trophy className="h-4 w-4" />
                              {athlete.sport}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {athlete.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* About Section */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-xl">
                        About {athlete.name.split(" ")[0]}
                      </CardTitle>
                      <ToggleBtn
                        open={showAbout}
                        onClick={() => setShowAbout((p) => !p)}
                        ariaLabel="toggle about section"
                      />
                    </CardHeader>
                    <AnimatePresence>
                      {showAbout && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <CardContent>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              {(athlete.fullBio || athlete.bio)
                                .split("\n\n")
                                .map((p: string, i: number) => (
                                  <p
                                    key={i}
                                    className="text-muted-foreground mb-4 last:mb-0"
                                  >
                                    {p}
                                  </p>
                                ))}
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Achievements */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-500" />
                        Achievements
                      </CardTitle>
                      <ToggleBtn
                        open={showAchievements}
                        onClick={() => setShowAchievements((p) => !p)}
                        ariaLabel="toggle achievements"
                      />
                    </CardHeader>
                    <AnimatePresence>
                      {showAchievements && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <CardContent>
                            <ul className="space-y-2">
                              {athlete.achievements.map(
                                (ach: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{ach}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Session Types */}
                  {athlete.sessionTypes && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl">Session Types</CardTitle>
                        <ToggleBtn
                          open={showSessions}
                          onClick={() => setShowSessions((p) => !p)}
                          ariaLabel="toggle session types"
                        />
                      </CardHeader>
                      <AnimatePresence>
                        {showSessions && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <CardContent>
                              <div className="space-y-4">
                                {athlete.sessionTypes.map(
                                  (s: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg"
                                    >
                                      <Video className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <h4 className="font-semibold">
                                            {s.type}
                                          </h4>
                                          <span className="text-sm text-muted-foreground">
                                            {s.duration}
                                          </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          {s.description}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Card */}
                  <Card className="border-0 shadow-lg sticky top-24">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Get in Touch</CardTitle>
                        {athlete.availability && (
                          <CardDescription className="pt-1">
                            {athlete.availability}
                          </CardDescription>
                        )}
                      </div>
                      <ToggleBtn
                        open={showContact}
                        onClick={() => setShowContact((p) => !p)}
                        ariaLabel="toggle contact"
                      />
                    </CardHeader>
                    <AnimatePresence>
                      {showContact && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-6">
                            <Button
                              size="lg"
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              asChild
                            >
                              <a href="mailto:amcfadden@collectivearc.org">
                                <MailIcon className="mr-2 h-4 w-4" />
                                Get in Touch
                              </a>
                            </Button>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Quick Info */}
                  {(athlete.education ||
                    athlete.languages ||
                    athlete.responseTime) && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          {athlete.education && (
                            <InfoRow label="Education" value={athlete.education} />
                          )}
                          {athlete.languages && (
                            <InfoRow
                              label="Languages"
                              value={athlete.languages.join(", ")}
                            />
                          )}
                          {athlete.responseTime && (
                            <InfoRow
                              label="Response Time"
                              value={athlete.responseTime}
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

/* ——————————————————————————————————
   Helper component
—————————————————————————————————— */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

