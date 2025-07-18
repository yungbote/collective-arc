"use client"

import type React from "react"
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { getEventById, getEventTypeColor, type Event } from "@/data/events"
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Info,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Enhanced Lightbox component with perfect responsiveness
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance for mobile (in pixels)
  const minSwipeDistance = 50

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200) // Wait for exit animation
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'
    window.addEventListener("keydown", handleKeyDown)
    
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onPrev, onNext])

  // Reset loading state when image changes
  useEffect(() => {
    setImageLoading(true)
  }, [currentIndex])

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && images.length > 1) {
      onNext()
    }
    if (isRightSwipe && images.length > 1) {
      onPrev()
    }
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoading(false)
    const img = e.currentTarget
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
  }

  return (
    <div 
      className={`
        fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm 
        transition-all duration-200 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleClose}
      ref={containerRef}
    >
      {/* Main container with proper padding for controls */}
      <div 
        className={`
          relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12
          transition-all duration-300 ease-out delay-100
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Close button - fixed position with safe area */}
        <button
          className="
            fixed top-4 right-4 z-[110]
            w-10 h-10 sm:w-12 sm:h-12
            flex items-center justify-center
            bg-black/50 hover:bg-black/70
            backdrop-blur-sm
            text-white/80 hover:text-white
            rounded-full
            transition-all duration-200
            hover:scale-110
          "
          onClick={handleClose}
          aria-label="Close lightbox"
        >
          <X size={20} className="sm:hidden" />
          <X size={24} className="hidden sm:block" />
        </button>

        {/* Navigation buttons - only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              className="
                absolute left-2 sm:left-4 md:left-8
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                flex items-center justify-center
                bg-black/50 hover:bg-black/70
                backdrop-blur-sm
                text-white/80 hover:text-white
                rounded-full
                transition-all duration-200
                hover:scale-110
                z-[105]
              "
              onClick={onPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="sm:hidden" />
              <ChevronLeft size={32} className="hidden sm:block md:hidden" />
              <ChevronLeft size={40} className="hidden md:block" />
            </button>

            <button
              className="
                absolute right-2 sm:right-4 md:right-8
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                flex items-center justify-center
                bg-black/50 hover:bg-black/70
                backdrop-blur-sm
                text-white/80 hover:text-white
                rounded-full
                transition-all duration-200
                hover:scale-110
                z-[105]
              "
              onClick={onNext}
              aria-label="Next image"
            >
              <ChevronRight size={24} className="sm:hidden" />
              <ChevronRight size={32} className="hidden sm:block md:hidden" />
              <ChevronRight size={40} className="hidden md:block" />
            </button>
          </>
        )}

        {/* Image container with loading state */}
        <div className="relative w-full h-full flex items-center justify-center px-14 sm:px-16 md:px-20">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          
          <img
            src={images[Math.min(currentIndex, images.length - 1)] || "/placeholder.svg"}
            alt={`Gallery image ${Math.min(currentIndex + 1, images.length)} of ${images.length}`}
            className={`
              max-w-full max-h-full
              w-auto h-auto
              object-contain
              rounded-lg shadow-2xl
              transition-all duration-300
              ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
            `}
            onLoad={handleImageLoad}
            style={{
              maxWidth: 'calc(100vw - 7rem)',
              maxHeight: 'calc(100vh - 8rem)',
            }}
          />
        </div>

        {/* Image counter and info */}
        <div className="
          fixed bottom-4 left-1/2 transform -translate-x-1/2
          bg-black/50 backdrop-blur-sm
          text-white/90 text-sm sm:text-base
          px-4 py-2 rounded-full
          z-[105]
        ">
          <span>{Math.min(currentIndex + 1, images.length)} / {images.length}</span>
          {imageDimensions.width > 0 && (
            <span className="hidden sm:inline ml-3 text-white/60">
              {imageDimensions.width} × {imageDimensions.height}
            </span>
          )}
        </div>

        {/* Touch indicator for mobile */}
        {images.length > 1 && (
          <div className="
            sm:hidden
            fixed bottom-16 left-1/2 transform -translate-x-1/2
            text-white/60 text-xs
            animate-pulse
          ">
            Swipe to navigate
          </div>
        )}
      </div>
    </div>
  )
}

// UPDATED: Component for displaying past ART event recaps with a perfected, fully responsive gallery
function ArtEventRecapPage({ event }: { event: Event }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const openLightbox = (index: number) => {
    if (event.gallery && event.gallery.length > 0) {
      setCurrentImageIndex(index)
      setLightboxOpen(true)
    }
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = useCallback(() => {
    if (event.gallery && event.gallery.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? event.gallery!.length - 1 : prevIndex - 1
      )
    }
  }, [event.gallery])

  const goToNext = useCallback(() => {
    if (event.gallery && event.gallery.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === event.gallery!.length - 1 ? 0 : prevIndex + 1
      )
    }
  }, [event.gallery])

  // Calculate optimal number of columns based on container width
  const calculateColumns = useCallback((width: number) => {
    // Dynamic column calculation based on container width
    // Ensures optimal image sizes across all screens
    if (width >= 1536) return Math.min(6, Math.max(5, Math.floor(width / 300)))
    if (width >= 1280) return Math.min(5, Math.max(4, Math.floor(width / 320)))
    if (width >= 1024) return Math.min(4, Math.max(3, Math.floor(width / 340)))
    if (width >= 768) return Math.min(3, Math.max(2, Math.floor(width / 360)))
    if (width >= 640) return 2
    return 1
  }, [])

  // Responsive container width tracking
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    
    const resizeObserver = new ResizeObserver(updateWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const numColumns = useMemo(() => calculateColumns(containerWidth), [containerWidth, calculateColumns])

  // Calculate dynamic gap based on screen size
  const gap = useMemo(() => {
    if (containerWidth >= 1024) return 16 // lg screens
    if (containerWidth >= 640) return 12 // sm screens
    return 8 // mobile
  }, [containerWidth])

  // Distribute images across columns with better height balancing
  const imageColumns = useMemo(() => {
    if (!event.gallery || numColumns === 0) return []
    
    const columns: Array<{ images: string[]; height: number }> = Array.from(
      { length: numColumns }, 
      () => ({ images: [], height: 0 })
    )
    
    // Simple height estimation (can be enhanced with actual image dimensions)
    event.gallery.forEach((imgSrc, index) => {
      // Find the column with minimum height
      let minHeightColumn = 0
      let minHeight = columns[0].height
      
      for (let i = 1; i < columns.length; i++) {
        if (columns[i].height < minHeight) {
          minHeight = columns[i].height
          minHeightColumn = i
        }
      }
      
      columns[minHeightColumn].images.push(imgSrc)
      // Estimate height (assuming average aspect ratio)
      columns[minHeightColumn].height += 1
    })
    
    return columns.map(col => col.images)
  }, [event.gallery, numColumns])

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => new Set(prev).add(index))
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1 bg-gray-50 dark:bg-background">
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="px-2 sm:px-4 md:px-6 max-w-[1600px] mx-auto" ref={containerRef}>
            <Button variant="ghost" asChild className="mb-6 sm:mb-8">
              <Link to="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Events
              </Link>
            </Button>

            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 px-4">
                {event.title}
              </h1>
              <div className="flex items-center justify-center flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base">
                <span className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-teal-500" />
                  {event.location}
                </span>
              </div>
            </div>

            {(event.fullDescription || event.description) && (
              <Card className="mb-8 sm:mb-10 md:mb-12 border-0 shadow-lg bg-card mx-auto max-w-4xl">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg text-center">
                    {event.fullDescription || event.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {event.gallery && event.gallery.length > 0 ? (
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8">Event Gallery</h2>
                <div 
                  className="grid auto-rows-auto"
                  style={{
                    gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
                    gap: `${gap}px`,
                  }}
                >
                  {imageColumns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col" style={{ gap: `${gap}px` }}>
                      {column.map((imgSrc) => {
                        const originalIndex = event.gallery?.findIndex((g) => g === imgSrc) ?? 0
                        const isLoaded = imagesLoaded.has(originalIndex)
                        return (
                          <div
                            key={imgSrc}
                            className={`
                              relative overflow-hidden rounded-md sm:rounded-lg 
                              shadow-md hover:shadow-xl transition-all duration-300 
                              group cursor-pointer bg-gray-100 dark:bg-gray-800
                              transform hover:-translate-y-1
                            `}
                            onClick={() => openLightbox(originalIndex)}
                          >
                            <div className="relative aspect-auto">
                              {!isLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center min-h-[200px]">
                                  <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                              )}
                              <img
                                src={imgSrc || "/placeholder.svg"}
                                alt={`Gallery image ${originalIndex + 1} for ${event.title}`}
                                className={`
                                  w-full h-auto block
                                  transition-all duration-500 ease-out
                                  group-hover:scale-105 group-hover:brightness-105
                                  ${isLoaded ? 'opacity-100' : 'opacity-0'}
                                `}
                                onLoad={() => handleImageLoad(originalIndex)}
                                loading="lazy"
                              />
                              <div className="
                                absolute inset-0 
                                bg-gradient-to-t from-black/20 to-transparent 
                                opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300
                                pointer-events-none
                              " />
                              <div className="
                                absolute bottom-2 right-2
                                bg-white/90 dark:bg-black/90 
                                backdrop-blur-sm
                                rounded-full p-2
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-300
                                pointer-events-none
                              ">
                                <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="
                  bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 
                  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                  rounded-2xl overflow-hidden
                  border border-gray-200 dark:border-gray-700
                  shadow-inner
                ">
                  <div className="
                    relative 
                    min-h-[300px] sm:min-h-[400px] md:min-h-[500px]
                    flex flex-col items-center justify-center
                    px-6 py-12
                  ">
                    {/* Decorative background pattern */}
                    <div className="absolute inset-0 opacity-5 dark:opacity-10 overflow-hidden">
                      <div className="absolute inset-0 transform translate-x-0 animate-slide-diagonal" style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            currentColor 10px,
                            currentColor 20px
                          )
                        `,
                        width: '200%',
                        height: '200%',
                      }} />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center max-w-md mx-auto">
                      <div className="
                        w-20 h-20 sm:w-24 sm:h-24 
                        mx-auto mb-6
                        rounded-2xl
                        bg-gradient-to-br from-gray-200 to-gray-300
                        dark:from-gray-700 dark:to-gray-600
                        flex items-center justify-center
                        shadow-lg
                        transition-all duration-300
                        hover:shadow-xl hover:scale-105
                      ">
                        <svg 
                          className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                          />
                        </svg>
                      </div>
                      
                      <h3 className="
                        text-xl sm:text-2xl font-semibold 
                        text-gray-700 dark:text-gray-300 
                        mb-3
                      ">
                        Gallery Coming Soon
                      </h3>
                      
                      <p className="
                        text-sm sm:text-base 
                        text-gray-500 dark:text-gray-400 
                        leading-relaxed
                        mb-6
                      ">
                        We're currently gathering photos from this amazing event. 
                        Check back soon to see highlights and memories captured during the day.
                      </p>
                      
                      <div className="
                        inline-flex items-center gap-2
                        text-xs sm:text-sm
                        text-gray-400 dark:text-gray-500
                        bg-gray-100 dark:bg-gray-800
                        px-4 py-2 rounded-full
                      ">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Photos typically available within 48 hours</span>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/10 blur-2xl animate-pulse" />
                    <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
      {lightboxOpen && event.gallery && (
        <Lightbox
          images={event.gallery}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onPrev={goToPrevious}
          onNext={goToNext}
        />
      )}
    </div>
  )
}

// Registration Form Component (Unchanged)
function RegistrationForm({
  event,
  onClose,
}: {
  event: any
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teamName: "",
    additionalInfo: "",
    agreeToTerms: false,
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration submitted:", formData)
    onClose()
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      })
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
                <CardDescription>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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

  // Conditionally render the recap page for past ART events
  if (event.type === "art" && event.status === "past") {
    return <ArtEventRecapPage event={event} />
  }

  // Original page for all other events
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
                <div className="lg:col-span-2 space-y-6">
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
                            <p className="font-medium text-foreground">
                              {event.time} {event.endTime && `- ${event.endTime}`}
                            </p>
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
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Spots Available</span>
                          <span className="text-sm text-muted-foreground">
                            {event.spotsAvailable} of {event.spots}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${
                              spotsPercentage > 50
                                ? "from-green-500 to-emerald-500"
                                : spotsPercentage > 20
                                  ? "from-yellow-500 to-orange-500"
                                  : "from-red-500 to-pink-500"
                            } transition-all duration-500`}
                            style={{ width: `${spotsPercentage}%` }}
                          />
                        </div>
                        {spotsPercentage < 20 && (
                          <p className="text-sm text-red-600 dark:text-red-400 mt-1">Limited spots remaining!</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
                          {event.fullDescription.split("\n\n").map((paragraph, index) => (
                            <p key={index} className="text-muted-foreground mb-4 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
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
                                {organizer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className="text-sm font-medium">{organizer}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                <div className="space-y-6">
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
                            <span className={`font-medium ${eventStatus.isPast ? "text-red-600" : "text-green-600"}`}>
                              {eventStatus.isPast ? "Past Event" : "Registration Open"}
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
                            {eventStatus.isPast
                              ? "Event Passed"
                              : event.spotsAvailable === 0
                                ? "Sold Out"
                                : "Register Now"}
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
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
                  {event.tags && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">Event Tags</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
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
        {showRegistration && <RegistrationForm event={event} onClose={() => setShowRegistration(false)} />}
      </div>
      <Footer />
    </div>
  )
}
