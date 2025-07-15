import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import { events } from "@/data/events"

export function GiftsAndThriftsSection() {
  /* pull only the Gifts & Thrifts items */
  const gifts = events.filter((e) => e.category === "Gifts & Thrifts")

  /* badge look‑ups */
  const badgeTheme = {
    past: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
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

  return (
    <section className="w-full py-12 md:py-20">
      <div className="px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
            Our Events
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-10 md:mb-16 max-w-2xl mx-auto">
            Explore the Gifts & Thrifts journey—where we’ve been, what’s
            happening now, and what’s next.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {gifts.map((evt) => (
              <Card
                key={evt.id}
                className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-0 shadow overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeTheme[evt.status ?? "future"]}`}
                    >
                      {badgeLabel[evt.status ?? "future"]}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{evt.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(evt.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{evt.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    {evt.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

