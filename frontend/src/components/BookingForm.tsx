import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, FileText, DollarSign } from "lucide-react"

interface BookingFormProps {
  selectedDate: Date
  selectedTime: string
  onSubmit: (formData: BookingFormData) => void
  isPennFusion?: boolean
}

export interface BookingFormData {
  name: string
  email: string
  phone: string
  sport: string
  currentLevel: string
  focusArea: string
  specificQuestions: string
  isPennFusion: boolean
  paymentMethod: string
}

export function BookingForm({ selectedDate, selectedTime, onSubmit, isPennFusion = false }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    sport: "",
    currentLevel: "",
    focusArea: "",
    specificQuestions: "",
    isPennFusion: isPennFusion,
    paymentMethod: "card"
  })

  const focusAreas = [
    "College Recruitment",
    "College Commitment",
    "Transferring",
    "Youth Club Playing Time",
    "Switching Youth Teams",
    "Leadership",
    "Technique",
    "Fitting In",
    "Standing Out",
    "Physicality",
    "Speed of Play",
    "Other"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const sessionPrice = isPennFusion ? 60 : 75

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardTitle>Complete Your Booking</CardTitle>
        <CardDescription>
          {formatDate(selectedDate)} at {selectedTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-green-500" />
              Personal Information
            </h3>
            
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

          {/* Athletic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Athletic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Sport *</label>
                <input
                  type="text"
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Soccer, Basketball"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Current Level *</label>
                <select
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select your level</option>
                  <option value="youth">Youth/Recreation</option>
                  <option value="highschool">High School</option>
                  <option value="college">College</option>
                  <option value="professional">Professional</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Primary Focus Area *</label>
              <select
                name="focusArea"
                value={formData.focusArea}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a focus area</option>
                {focusAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Specific Questions or Topics (Optional)
              </label>
              <textarea
                name="specificQuestions"
                value={formData.specificQuestions}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="What would you like to discuss during your session? Any specific challenges or goals?"
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Payment Information
            </h3>
            
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Session Price:</span>
                <span className="text-xl font-bold">${sessionPrice}</span>
              </div>
              {isPennFusion && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Penn Fusion discount applied! (Regular price: $75)
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="text-green-500"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                    className="text-green-500"
                  />
                  <span>PayPal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="venmo"
                    checked={formData.paymentMethod === "venmo"}
                    onChange={handleChange}
                    className="text-green-500"
                  />
                  <span>Venmo</span>
                </label>
              </div>
            </div>
          </div>

          {/* Penn Fusion Option */}
          {!isPennFusion && (
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="pennFusion"
                checked={formData.isPennFusion}
                onChange={(e) => setFormData({ ...formData, isPennFusion: e.target.checked })}
                className="mt-1"
              />
              <label htmlFor="pennFusion" className="text-sm text-muted-foreground cursor-pointer">
                I am a Penn Fusion academy member (discount will be applied)
              </label>
            </div>
          )}

          {/* Terms and Submit */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the terms and conditions and understand that sessions are non-refundable 
                if cancelled less than 24 hours in advance.
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              size="lg"
            >
              Complete Booking
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
