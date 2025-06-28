import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { getEventById, getEventTypeColor } from "@/data/events"
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Tag,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Info,
  AlertCircle,
  X
} from "lucide-react"

// Registration Form Component
function RegistrationForm({ event, onClose }: { event: any, onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teamName: "",
    additionalInfo: "",
    agreeToTerms: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registration submitted:', formData)
    // Handle registration logic here
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-8">
        <Card className="w-full animate-bounce-in">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Register for {event.title}</CardTitle>
                <CardDescription>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personal Information</h3>
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Event Specific Fields */}
              {event.category === "Environmental" && event.title.includes("Team") && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Team Name (if applicable)</label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your team name"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-1 block">Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Any dietary restrictions, special needs, or questions?"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the event terms and conditions and understand the cancellation policy.
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={!formData.agreeToTerms}
                >
                  Complete Registration
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function EventPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const [showRegistration, setShowRegistration] = useState(false)
  const event = getEventById(eventId || "")

  if (!event) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Event not found</p>
            <Button asChild>
              <Link to="/events">Back to Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { text: "Event has passed", isPast: true }
    if (diffDays === 0) return { text: "Today!", isPast: false }
    if (diffDays === 1) return { text: "Tomorrow", isPast: false }
    return { text: `In ${diffDays} days`, isPast: false }
  }

  const eventStatus = getDaysUntil(event.date)
  const spotsPercentage = (event.spotsAvailable / event.spots) * 100

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getEventTypeColor(event.type)} opacity-10`} />
          
          <div className="px-4 md:px-6 relative">
            <div className="max-w-7xl mx-auto">
              <Button variant="ghost" asChild className="mb-6">
                <Link to="/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Link>
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Event Header */}
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${getEventTypeColor(event.type)}`} />
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                          <p className="text-lg text-muted-foreground">{event.description}</p>
                        </div>
                        {event.featured && (
                          <span className="text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Calendar className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-foreground">{formatDate(event.date)}</p>
                            <p className="text-sm">{eventStatus.text}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Clock className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-foreground">{event.time} {event.endTime && `- ${event.endTime}`}</p>
                            <p className="text-sm">Local Time</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <MapPin className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-foreground">{event.location}</p>
                            {event.address && <p className="text-sm">{event.address}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Tag className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-foreground">Operation {event.type.toUpperCase()}</p>
                            <p className="text-sm">{event.category}</p>
                          </div>
                        </div>
                      </div>

                      {/* Availability Bar */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Spots Available</span>
                          <span className="text-sm text-muted-foreground">{event.spotsAvailable} of {event.spots}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${spotsPercentage > 50 ? 'from-green-500 to-emerald-500' : spotsPercentage > 20 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-pink-500'} transition-all duration-500`}
                            style={{ width: `${spotsPercentage}%` }}
                          />
                        </div>
                        {spotsPercentage < 20 && (
                          <p className="text-sm text-red-600 dark:text-red-400 mt-1">Limited spots remaining!</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* About Section */}
                  {event.fullDescription && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Info className="h-5 w-5 text-green-500" />
                          About This Event
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          {event.fullDescription.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-muted-foreground mb-4 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Schedule */}
                  {event.schedule && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Clock className="h-5 w-5 text-green-500" />
                          Event Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {event.schedule.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                              <span className="text-sm font-semibold text-green-600 dark:text-green-400 min-w-[80px]">
                                {item.time}
                              </span>
                              <span className="text-sm text-muted-foreground">{item.activity}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Requirements & What to Bring */}
                  {(event.requirements || event.whatToBring) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {event.requirements && (
                        <Card className="border-0 shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                              Requirements
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {event.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-muted-foreground">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {event.whatToBring && (
                        <Card className="border-0 shadow-lg">
                          <CardHeader>
                            <CardTitle className="text-lg">What to Bring</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {event.whatToBring.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-muted-foreground">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* Organizers */}
                  {event.organizers && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl">Event Organizers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-3">
                          {event.organizers.map((organizer, index) => (
                            <div key={index} className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-semibold">
                                {organizer.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm font-medium">{organizer}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Registration Card */}
                  <Card className="border-0 shadow-lg sticky top-24">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                      <CardTitle className="text-xl">Event Registration</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          {event.price === 0 ? (
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">FREE</span>
                          ) : (
                            <span className="text-2xl font-bold">${event.price}</span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <span className={`font-medium ${eventStatus.isPast ? 'text-red-600' : 'text-green-600'}`}>
                              {eventStatus.isPast ? 'Past Event' : 'Registration Open'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Spots:</span>
                            <span className="font-medium">{event.spotsAvailable} available</span>
                          </div>
                          {event.registrationDeadline && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Deadline:</span>
                              <span className="font-medium">
                                {new Date(event.registrationDeadline).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 space-y-3">
                          <Button 
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            size="lg"
                            onClick={() => setShowRegistration(true)}
                            disabled={eventStatus.isPast || event.spotsAvailable === 0}
                          >
                            {eventStatus.isPast ? 'Event Passed' : event.spotsAvailable === 0 ? 'Sold Out' : 'Register Now'}
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Event
                          </Button>
                        </div>

                        {event.contactEmail && (
                          <div className="pt-4 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Questions?</p>
                            <a 
                              href={`mailto:${event.contactEmail}`}
                              className="text-sm text-green-600 dark:text-green-400 hover:underline flex items-center justify-center gap-1"
                            >
                              <Mail className="h-3 w-3" />
                              Contact Organizer
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  {event.tags && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">Event Tags</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Modal */}
        {showRegistration && (
          <RegistrationForm 
            event={event} 
            onClose={() => setShowRegistration(false)} 
          />
        )}
      </div>
      
      <Footer />
    </div>
  )
}
