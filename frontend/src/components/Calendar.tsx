// src/components/Calendar.tsx
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeSlot {
  time: string
  available: boolean
}

interface BookedSlot {
  date: string
  time: string
}

interface CalendarProps {
  bookedSlots?: BookedSlot[]
  onSelectSlot?: (date: Date, time: string) => void
}

export function Calendar({ bookedSlots = [], onSelectSlot }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Time slots for each day (9 AM to 5 PM)
  const timeSlots: TimeSlot[] = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "12:00 PM", available: true },
    { time: "1:00 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: true },
  ]

  // Get the first day of the month
  const firstDayOfMonth = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  }, [currentDate])

  // Get the last day of the month
  const lastDayOfMonth = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  }, [currentDate])

  // Get the starting day of the week for the first day of the month
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days = []
    const totalDays = lastDayOfMonth.getDate()
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i)
    }
    
    return days
  }, [lastDayOfMonth, startingDayOfWeek])

  // Check if a date has booked slots
  const hasBookedSlots = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return bookedSlots.some(slot => slot.date === dateStr)
  }

  // Get available time slots for a specific date
  const getAvailableSlots = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const bookedTimes = bookedSlots
      .filter(slot => slot.date === dateStr)
      .map(slot => slot.time)
    
    return timeSlots.map(slot => ({
      ...slot,
      available: !bookedTimes.includes(slot.time)
    }))
  }

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  // Handle date selection
  const handleDateClick = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    
    // Don't allow selecting past dates
    if (selected < new Date(new Date().setHours(0, 0, 0, 0))) {
      return
    }
    
    setSelectedDate(selected)
    setSelectedTime(null)
  }

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime && onSelectSlot) {
      onSelectSlot(selectedDate, selectedTime)
      setShowConfirmation(true)
    }
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  // Check if date is in the past
  const isPastDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date < new Date(new Date().setHours(0, 0, 0, 0))
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Calendar */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                <span className="text-sm sm:text-base lg:text-lg">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              </CardTitle>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousMonth}
                  className="h-7 w-7 sm:h-8 sm:w-8"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextMonth}
                  className="h-7 w-7 sm:h-8 sm:w-8"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            {/* Week days header */}
            <div className="grid grid-cols-7 mb-1 sm:mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs sm:text-sm font-medium text-muted-foreground py-1 sm:py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    "aspect-square relative",
                    day && "cursor-pointer"
                  )}
                >
                  {day && (
                    <button
                      onClick={() => handleDateClick(day)}
                      disabled={isPastDate(day)}
                      className={cn(
                        "w-full h-full rounded-md sm:rounded-lg flex flex-col items-center justify-center text-xs sm:text-sm transition-all relative group",
                        isPastDate(day) && "opacity-50 cursor-not-allowed",
                        !isPastDate(day) && "hover:bg-accent",
                        isToday(day) && "ring-1 sm:ring-2 ring-green-500 ring-offset-1 sm:ring-offset-2",
                        selectedDate?.getDate() === day &&
                        selectedDate?.getMonth() === currentDate.getMonth() &&
                        selectedDate?.getFullYear() === currentDate.getFullYear() &&
                        "bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                      )}
                    >
                      <span className="font-medium">{day}</span>
                      {hasBookedSlots(day) && !isPastDate(day) && (
                        <div className="absolute bottom-0.5 sm:bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                          <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-orange-500" />
                        </div>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time slots */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
            <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
              <span className="text-sm sm:text-base lg:text-lg">{selectedDate ? formatDate(selectedDate) : 'Select a Date'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            {selectedDate ? (
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  Available time slots for your session with Aiden
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {getAvailableSlots(selectedDate).map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={cn(
                        "relative text-xs sm:text-sm",
                        !slot.available && "opacity-50 cursor-not-allowed",
                        selectedTime === slot.time && "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                      )}
                    >
                      {slot.time}
                      {!slot.available && (
                        <span className="absolute top-0.5 right-0.5 text-xxs sm:text-xs bg-red-500 text-white px-1 rounded">
                          Booked
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
                {selectedTime && (
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Selected Session:</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {formatDate(selectedDate)} at {selectedTime}
                    </p>
                    <Button
                      onClick={handleConfirmBooking}
                      className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm sm:text-base"
                    >
                      Confirm Booking
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-muted-foreground">
                <CalendarIcon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-20" />
                <p className="text-xs sm:text-sm">Please select a date from the calendar to view available time slots</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedDate && selectedTime && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-sm sm:max-w-md w-full animate-bounce-in">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl">Booking Confirmed!</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmation(false)}
                  className="h-7 w-7 sm:h-8 sm:w-8"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <p className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Your session is scheduled!</p>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                  {formatDate(selectedDate)} at {selectedTime}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  You'll receive a confirmation email with meeting details and a calendar invite.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
