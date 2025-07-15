import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Calendar,
  MapPin,
  Users,
  Rocket,
  Target,
  Bell,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { events, getEventTypeColor } from "@/data/events"

/* ─────────── badge helpers ─────────── */
const badgeTheme = {
  past: "bg-teal-100  dark:bg-teal-900/30  text-teal-700  dark:text-teal-300",
  current:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  future:
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
} as const

const badgeLabel = {
  past: "Past",
  current: "In Progress",
  future: "Upcoming",
} as const
/* ───────────────────────────────────── */

export function EventsPage() {
  /* operation‑type filter */
  const [filterType, setFilterType] = useState<
    "all" | "ask" | "art" | "all-literacy"
  >("all")

  /* timeline filter */
  const [timeFilter, setTimeFilter] = useState<
    "allTime" | "past" | "current" | "future"
  >("allTime")

  /* apply both filters */
  const filteredEvents = events
    .filter((e) =>
      filterType === "all"
        ? true
        : filterType === "all-literacy"
        ? e.type === "all"
        : e.type === filterType
    )
    .filter((e) =>
      timeFilter === "allTime" ? true : e.status === timeFilter
    )

  const typeLabels = {
    ask: "Athletes Sharing Knowledge",
    art: "Athletes Recycling & Thrifting",
    all: "Athletes Learning & Literacy",
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1">
        {/* ───────────────── Hero ───────────────── */}
        <section className="w-full py-12 md:py-20 lg:py-28 text-center relative overflow-hidden">
          {/* gradient blobs (unchanged) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-normal blur-xl opacity-20 dark:opacity-10 animate-float" />
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mix-blend-multiply dark:mix-blend-normal blur-xl opacity-20 dark:opacity-10 animate-float"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal blur-xl opacity-10 dark:opacity-5 animate-float"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div className="px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
              <div className="animate-bounce-in">
                <Calendar className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600">
                Events Coming Soon
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl">
                We’re planning exciting events to bring athletes together for
                mentorship, sustainability, and education
              </p>

              {/* ───────── timeline filter (small) ───────── */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {(
                  [
                    ["allTime", "All"],
                    ["past", "Past"],
                    ["current", "Present"],
                    ["future", "Future"],
                  ] as const
                ).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={timeFilter === key ? "default" : "ghost"}
                    size="sm"
                    className="text-xs px-2 py-1"
                    onClick={() => setTimeFilter(key)}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              {/* ───────── operation filter ───────── */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
                  {(
                    [
                      ["all", "All Events"],
                      ["ask", "ASK"],
                      ["art", "ART"],
                      ["all-literacy", "ALL"],
                    ] as const
                  ).map(([key, label]) => (
                    <Button
                      key={key}
                      variant={filterType === key ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilterType(key)}
                      className="transition-all"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* description of applied filters */}
        {(filterType !== "all" || timeFilter !== "allTime") && (
          <section className="w-full py-4 bg-muted/30">
            <div className="px-4 md:px-6">
              <div className="max-w-7xl mx-auto text-center">
                <p className="text-muted-foreground">
                  {filterType !== "all" && (
                    <>
                      Showing{" "}
                      <span className="font-semibold">
                        Operation {filterType.toUpperCase()}
                      </span>{" "}
                      events:{" "}
                      {typeLabels[
                        filterType === "all-literacy" ? "all" : filterType
                      ]}
                    </>
                  )}
                  {filterType !== "all" && timeFilter !== "allTime" && " • "}
                  {timeFilter !== "allTime" && (
                    <>
                      <span className="font-semibold">
                        {badgeLabel[timeFilter as "past" | "current" | "future"]}
                      </span>{" "}
                      timeline
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ───────── event cards ───────── */}
        <section className="w-full py-12 md:py-20">
          <div className="px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
                Events in Development
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-10 md:mb-16 max-w-2xl mx-auto">
                We’re working hard to bring these programs to life. Be among the
                first to participate!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredEvents.map((event, index) => (
                  <Card
                    key={event.id}
                    className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-0 shadow overflow-hidden group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`h-2 bg-gradient-to-r ${getEventTypeColor(
                        event.type
                      )}`}
                    />
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeTheme[event.status ?? "future"]}`}
                        >
                          {badgeLabel[event.status ?? "future"]}
                        </span>
                        <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                          {event.type.toUpperCase()}
                        </span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">
                        {event.description}
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Target className="h-4 w-4" />
                          <span>
                            Initial capacity: {event.spots} participants
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Target launch:{" "}
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
              <div className="p-4 pt-0">
                <Button className="w-full" variant="outline" asChild>
                  {/* change THIS <a> element: */}
                  <a
                    href="https://www.instagram.com/collective_arc_"   // ← put the account here
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                        Get Notified
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">
                    No events found for this filter.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setFilterType("all")
                      setTimeFilter("allTime")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* Newsletter CTA Section */}
        <section id="notify" className="w-full py-12 md:py-20">
          <div className="px-4 md:px-6">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardHeader className="text-center">
                <div className="inline-flex mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Bell className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl">Be First to Know</CardTitle>
                <CardDescription className="text-base">
                  Get exclusive early access to event registrations and founding member benefits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm text-muted-foreground">Priority registration for all events</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm text-muted-foreground">Exclusive founding member pricing</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm text-muted-foreground">Updates on new programs and initiatives</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/*<Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Join the Newsletter
                  </Button>*/}
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://www.instagram.com/collective_arc_" target="_blank" rel="noopener noreferrer"
                    >
                    <Users className="mr-2 h-4 w-4" />
                    Follow Us
                    </a>
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
