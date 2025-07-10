// src/components/HomeSections/HeroSection.tsx
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight, Play, Rocket } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 text-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-30 md:-top-40 -right-20 sm:-right-30 md:-right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-green-300 dark:bg-green-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-float" />
        <div className="absolute -bottom-20 sm:-bottom-30 md:-bottom-40 -left-20 sm:-left-30 md:-left-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-emerald-300 dark:bg-emerald-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-teal-300 dark:bg-teal-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className={`max-w-3xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {/* Launch Badge */}
              <div className="inline-flex items-center rounded-full border px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold transition-colors mb-4 sm:mb-6 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                <Rocket className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Launching Our Mission
              </div>

              <h1 
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tighter mt-2 mb-4 sm:mb-6 transition-all duration-1000 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 animate-gradient">
                  Welcome to Collective ARC
                </span>
              </h1>

              <p 
                className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground transition-all duration-1000 delay-100 px-4 sm:px-0 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                A coalition of operations & initiatives centered around athletes, recycling, and community.
              </p>

              <p 
                className={`text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground/80 mt-3 sm:mt-4 transition-all duration-1000 delay-150 px-6 sm:px-0 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Join us as we build a movement where athletes unite to create positive change
              </p>

              {/* CTA Buttons */}
              <div 
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 transition-all duration-1000 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Button 
                  size="default" 
                  asChild 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base px-4 sm:px-6 h-9 sm:h-10"
                >
                  <Link to="/athletes/aiden-mcfadden">
                    Meet Our Founder
                    <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
                <Button 
                  size="default" 
                  variant="outline" 
                  className="group border-2 hover:border-green-500 transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 h-9 sm:h-10"
                  asChild
                >
                  <a href="#footer">
                    Join the Movement
                    <Rocket className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:text-green-500 transition-colors" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero Image with Overlay Effects */}
            <div 
              className={`w-full max-w-5xl aspect-[16/12] sm:aspect-[16/10] md:aspect-[16/9] mt-8 sm:mt-10 md:mt-12 overflow-hidden rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl md:shadow-2xl relative group transition-all duration-1000 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image */}
              <img
                src="/field.jpeg"
                alt="Lush green field representing community and nature"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              
              {/* Floating Stats Cards */}
              <div 
                className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 text-white z-20 border border-white/20 transition-all duration-1000 delay-700 ${
                  isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <p className="text-base sm:text-xl md:text-2xl font-bold">3</p>
                <p className="text-xs sm:text-sm opacity-90">Core Operations</p>
              </div>
              
              <div 
                className={`absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 text-white z-20 border border-white/20 transition-all duration-1000 delay-800 ${
                  isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
              >
                <p className="text-base sm:text-xl md:text-2xl font-bold">2025</p>
                <p className="text-xs sm:text-sm opacity-90">The Beginning</p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
              <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-muted-foreground/30 rounded-full mt-1.5 sm:mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
