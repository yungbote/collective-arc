import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Lightbulb, CalendarDays, BookHeart } from "lucide-react"
import { useEffect, useState } from "react"

const slides = [
  {
    id: "journey",
    icon: <Lightbulb className="h-12 w-12 md:h-16 md:w-16 text-green-500 mb-6" />,
    text: "Do you want help with your soccer journey? All you have to do is ASK.",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
    textColor: "text-green-800 dark:text-green-200",
  },
  {
    id: "events",
    icon: <CalendarDays className="h-12 w-12 md:h-16 md:w-16 text-emerald-500 mb-6" />,
    text: "Do you wish to donate, volunteer, or model for our ART initiatives?",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    textColor: "text-emerald-800 dark:text-emerald-200",
  },
  {
    id: "reading",
    icon: <BookHeart className="h-12 w-12 md:h-16 md:w-16 text-teal-500 mb-6" />,
    text: "Do you want to read with or alongside your favorite athletes?",
    bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20",
    textColor: "text-teal-800 dark:text-teal-200",
  },
]

export function SlideshowSection() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    onSelect()

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // Auto-play carousel
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={slide.id}>
                  <Card className={`overflow-hidden shadow-xl border-0 ${slide.bgColor}`}>
                    <CardContent className="flex flex-col aspect-[16/9] sm:aspect-[2/1] items-center justify-center p-8 md:p-12 text-center">
                      <div className={`transition-all duration-500 ${current === index ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                        {slide.icon}
                        <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold ${slide.textColor} max-w-2xl leading-tight`}>
                          {slide.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex shadow-lg" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:flex shadow-lg" />
          </Carousel>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-green-500 w-8" 
                    : "bg-muted-foreground/30 w-2"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
