import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  useUser,
} from '@clerk/tanstack-react-start'
import { PageContainer } from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cities, regionLabels } from '@/lib/cities-data'
import { supabase } from '@/lib/supabase'
import { Upload, CheckCircle, AlertCircle, Lock } from 'lucide-react'

export const Route = createFileRoute('/submit-event')({
  component: SubmitEventPage,
})

const clerkEnabled = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

interface FormData {
  cityId: string
  title: string
  date: string
  startTime: string
  endTime: string
  venue: string
  address: string
  description: string
  organizerName: string
  organizerEmail: string
  facebookUrl: string
  telegramUrl: string
  instagramUrl: string
}

const initialFormData: FormData = {
  cityId: '',
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  venue: '',
  address: '',
  description: '',
  organizerName: '',
  organizerEmail: '',
  facebookUrl: '',
  telegramUrl: '',
  instagramUrl: '',
}

function SubmitEventPage() {
  return (
    <PageContainer className="py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit an Event</h1>
          <p className="text-muted-foreground">
            Organizing a protest or rally? Submit it here to be listed on the site.
          </p>
        </div>

        {clerkEnabled ? (
          <>
            <SignedOut>
              <SignInPrompt />
            </SignedOut>
            <SignedIn>
              <EventSubmissionForm />
            </SignedIn>
          </>
        ) : (
          <EventSubmissionForm />
        )}
      </div>
    </PageContainer>
  )
}

function SignInPrompt() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Lock className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Sign in required</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          To prevent spam and ensure accountability, you need to sign in before
          submitting an event. Your submission will be reviewed before publishing.
        </p>
        <SignInButton mode="modal">
          <Button size="lg">Sign In to Submit</Button>
        </SignInButton>
      </CardContent>
    </Card>
  )
}

function EventSubmissionForm() {
  const { user } = useUser()
  const [formData, setFormData] = useState<FormData>(initialFormData)

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        organizerEmail: user.primaryEmailAddress?.emailAddress || prev.organizerEmail,
        organizerName: user.fullName || prev.organizerName,
      }))
    }
  }, [user])
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [posterPreview, setPosterPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, cityId: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Poster file must be less than 5MB')
        return
      }
      setPosterFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPosterPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      let posterUrl = ''

      if (posterFile) {
        const fileExt = posterFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `event-submissions/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('posters')
          .upload(filePath, posterFile)

        if (uploadError) {
          throw new Error(`Failed to upload poster: ${uploadError.message}`)
        }

        const { data: urlData } = supabase.storage
          .from('posters')
          .getPublicUrl(filePath)

        posterUrl = urlData.publicUrl
      }

      const { error: insertError } = await supabase
        .from('event_submissions')
        .insert({
          city_id: formData.cityId,
          title: formData.title,
          date: formData.date,
          start_time: formData.startTime,
          end_time: formData.endTime || null,
          venue: formData.venue,
          address: formData.address,
          description: formData.description || null,
          organizer_name: formData.organizerName,
          organizer_email: formData.organizerEmail,
          facebook_url: formData.facebookUrl || null,
          telegram_url: formData.telegramUrl || null,
          instagram_url: formData.instagramUrl || null,
          poster_url: posterUrl || null,
          user_id: user?.id || null,
          status: 'pending',
        })

      if (insertError) {
        throw new Error(`Failed to submit event: ${insertError.message}`)
      }

      setSubmitStatus('success')
      setFormData(initialFormData)
      setPosterFile(null)
      setPosterPreview(null)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Event Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your submission. We'll review it and add it to the site
            if it meets our guidelines.
          </p>
          <Button onClick={() => setSubmitStatus('idle')}>
            Submit Another Event
          </Button>
        </CardContent>
      </Card>
    )
  }

  const citiesByRegion = cities.reduce(
    (acc, city) => {
      if (!acc[city.region]) {
        acc[city.region] = []
      }
      acc[city.region].push(city)
      return acc
    },
    {} as Record<string, typeof cities>
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {submitStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Basic information about your event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cityId">City *</Label>
              <Select
                value={formData.cityId}
                onValueChange={handleCityChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(citiesByRegion).map(([region, regionCities]) => (
                    <div key={region}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        {regionLabels[region as keyof typeof regionLabels]}
                      </div>
                      {regionCities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}, {city.country}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Rally for Iran"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue Name *</Label>
              <Input
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="e.g., Central Park"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g., 123 Main St, City, Country"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Additional details about the event..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Poster</CardTitle>
            <CardDescription>
              Upload a poster image (max 5MB, JPG/PNG)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="poster"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                >
                  {posterPreview ? (
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      className="h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                  <input
                    id="poster"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {posterFile && (
                <p className="text-sm text-muted-foreground text-center">
                  Selected: {posterFile.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organizer Info</CardTitle>
            <CardDescription>
              Your contact information (not displayed publicly)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="organizerName">Your Name *</Label>
                <Input
                  id="organizerName"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizerEmail">Your Email *</Label>
                <Input
                  id="organizerEmail"
                  name="organizerEmail"
                  type="email"
                  value={formData.organizerEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>
              Optional links to event pages or groups
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook Group/Event URL</Label>
              <Input
                id="facebookUrl"
                name="facebookUrl"
                type="url"
                value={formData.facebookUrl}
                onChange={handleInputChange}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegramUrl">Telegram Group URL</Label>
              <Input
                id="telegramUrl"
                name="telegramUrl"
                type="url"
                value={formData.telegramUrl}
                onChange={handleInputChange}
                placeholder="https://t.me/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input
                id="instagramUrl"
                name="instagramUrl"
                type="url"
                value={formData.instagramUrl}
                onChange={handleInputChange}
                placeholder="https://instagram.com/..."
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Event for Review'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By submitting, you confirm this is a legitimate event and agree to our
          community guidelines. All submissions are reviewed before publishing.
        </p>
      </div>
    </form>
  )
}
