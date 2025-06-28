import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { Calendar } from "@/components/Calendar"
import { BookingForm, type BookingFormData } from "@/components/BookingForm"
import { AthleteAvatar } from "@/pages/AthletesPage"
import { getAthleteById } from "@/data/athletes"
import { 
  Trophy, 
  GraduationCap, 
  Target,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  ArrowLeft,
  X,
  MessageSquare,
  Video,
  Award
} from "lucide-react"

// Mock booked slots
const mockBookedSlots = [
  { date: "2025-06-24", time: "10:00 AM" },
  { date: "2025-06-24", time: "2:00 PM" },
  { date: "2025-06-25", time: "9:00 AM" },
  { date: "2025-06-25", time: "11:00 AM" },
  { date: "2025-06-26", time: "3:00 PM" },
]

export function AthleteProfilePage() {
  const { athleteId } = useParams<{ athleteId: string }>()
  const [showBooking, setShowBooking] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const athlete = getAthleteById(athleteId || "")

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

  const handleScheduleSession = (date: Date, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (formData: BookingFormData) => {
    // Handle booking submission
    console.log('Booking submitted:', { date: selectedDate, time: selectedTime, ...formData })
    // Show success message, send emails, etc.
    setShowBooking(false)
    setShowBookingForm(false)
  }

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
                        <AthleteAvatar name={athlete.name} size="large" />
                        <div className="flex-1">
                          <h1 className="text-3xl font-bold mb-2">{athlete.name}</h1>
                          <p className="text-lg text-muted-foreground mb-4">{athlete.title}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Trophy className="h-4 w-4" />
                              {athlete.sport}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {athlete.location}
                            </span>
                            {athlete.responseTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {athlete.responseTime}
                              </span>
                            )}
                          </div>

                          {athlete.rating && (
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(athlete.rating!) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                                  />
                                ))}
                                <span className="ml-2 font-semibold">{athlete.rating}</span>
                              </div>
                              {athlete.totalSessions && (
                                <span className="text-sm text-muted-foreground">
                                  {athlete.totalSessions} sessions completed
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* About Section */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl">About {athlete.name.split(' ')[0]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {(athlete.fullBio || athlete.bio).split('\n\n').map((paragraph: string, index: number) => (
                          <p key={index} className="text-muted-foreground mb-4 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-500" />
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {athlete.achievements.map((achievement: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Session Types */}
                  {athlete.sessionTypes && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl">Session Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {athlete.sessionTypes.map((session: any, index: number) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                              <Video className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold">{session.type}</h4>
                                  <span className="text-sm text-muted-foreground">{session.duration}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{session.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Testimonials */}
                  {athlete.testimonials && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-green-500" />
                          What Athletes Say
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {athlete.testimonials.map((testimonial: any, index: number) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 italic">"{testimonial.text}"</p>
                              <p className="text-sm font-semibold">
                                {testimonial.author} • <span className="font-normal text-muted-foreground">{testimonial.role}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Booking Card */}
                  <Card className="border-0 shadow-lg sticky top-24">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                      <CardTitle className="text-xl">Book a Session</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Standard Rate:</span>
                          <span className="text-2xl font-bold">{athlete.rate}</span>
                        </div>
                        {athlete.pennFusionRate && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Penn Fusion Rate:</span>
                            <span className="text-xl font-semibold text-green-600">{athlete.pennFusionRate}</span>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {athlete.specialties.map((specialty: string) => (
                              <span 
                                key={specialty}
                                className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 space-y-3">
                          <Button 
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            size="lg"
                            onClick={() => setShowBooking(true)}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Schedule Session
                          </Button>
                          <Button variant="outline" className="w-full">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Message
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground text-center">
                          {athlete.availability}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Info */}
                  {(athlete.education || athlete.languages || athlete.responseTime) && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          {athlete.education && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Education:</span>
                              <span className="font-medium">{athlete.education}</span>
                            </div>
                          )}
                          {athlete.languages && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Languages:</span>
                              <span className="font-medium">{athlete.languages.join(', ')}</span>
                            </div>
                          )}
                          {athlete.responseTime && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Response Time:</span>
                              <span className="font-medium text-green-600">{athlete.responseTime}</span>
                            </div>
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

        {/* Booking Modal */}
        {showBooking && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-6xl my-8">
              <Card className="w-full animate-bounce-in">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Schedule Session with {athlete.name}</CardTitle>
                      <CardDescription>Choose a date and time for your session</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setShowBooking(false)
                        setShowBookingForm(false)
                        setSelectedDate(null)
                        setSelectedTime(null)
                      }}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {!showBookingForm ? (
                    <>
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-500" />
                          Session Details
                        </h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Duration: 45-60 minutes</li>
                          <li>• Format: Video call via Zoom</li>
                          <li>• Cost: {athlete.rate} {athlete.pennFusionRate && `(Penn Fusion members: ${athlete.pennFusionRate})`}</li>
                          <li>• Topics: Any from specialties or custom questions</li>
                        </ul>
                      </div>
                      
                      <Calendar 
                        bookedSlots={mockBookedSlots}
                        onSelectSlot={handleScheduleSession}
                      />
                    </>
                  ) : (
                    <BookingForm
                      selectedDate={selectedDate!}
                      selectedTime={selectedTime!}
                      onSubmit={handleBookingSubmit}
                      isPennFusion={false}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}
