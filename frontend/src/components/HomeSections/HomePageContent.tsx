// src/components/HomeSections/HomePageContent.tsx
import { HeroSection } from "@/components/HomeSections/HeroSection"
import { MissionsSection } from "@/components/HomeSections/MissionSection"
import { SlideshowSection } from "@/components/HomeSections/SlideshowSection"
import { 
  StatisticsSection, 
  TestimonialsSection, 
  TimelineSection, 
  EventsSection,
  NewsletterSection,
  AthleteCTASection  // Import the new section
} from "@/components/HomeSections/EnhancedSections"
import { Footer } from "@/components/Footer"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function HomePageContent() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col items-center w-full overflow-x-hidden">
        <HeroSection />
        <MissionsSection />
        <StatisticsSection />
        <AthleteCTASection />  {/* Add the new Athlete CTA section here */}
        <TimelineSection />
        <SlideshowSection />
        {/*<TestimonialsSection />*/}
        {/*<EventsSection />*/}
        {/*<NewsletterSection />*/}
        <Footer />
      </div>
    </TooltipProvider>
  )
}
