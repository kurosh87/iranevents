import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getCityById } from '@/lib/cities-data'
import { getEventById } from '@/lib/events-data'
import { PageContainer } from '@/components/layout/page-container'
import { CityMap } from '@/components/map/city-map'
import { ChatBox } from '@/components/chat/chat-box'
import { PhotoGallery } from '@/components/events/photo-gallery'
import { ImageUpload } from '@/components/events/image-upload'
import { EventStatusBadge } from '@/components/events/event-status'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  MessageSquare,
  ExternalLink,
  Facebook,
  Instagram,
  Send,
  Ticket,
} from 'lucide-react'
import type { EventImage, ChatMessage } from '@/types'

const mockImages: EventImage[] = []

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    eventId: '1',
    userId: 'user-1',
    userName: 'Maryam',
    content: 'Looking forward to this event! Anyone coming from North London?',
    createdAt: '2026-01-25T14:30:00Z',
  },
  {
    id: '2',
    eventId: '1',
    userId: 'user-2',
    userName: 'Ali',
    content: 'Yes! I will be there. First time joining.',
    createdAt: '2026-01-25T15:00:00Z',
  },
]

export const Route = createFileRoute('/cities/$cityId/events/$eventId')({
  component: EventDetailPage,
  loader: ({ params }) => {
    const city = getCityById(params.cityId)
    if (!city) {
      throw notFound()
    }

    const event = getEventById(params.eventId)
    if (!event) {
      throw notFound()
    }

    return {
      city,
      event,
      images: mockImages,
      messages: mockMessages.filter((m) => m.eventId === params.eventId),
    }
  },
})

function EventDetailPage() {
  const { city, event, images, messages } = Route.useLoaderData()

  return (
    <div>
      <div className="relative w-full overflow-hidden bg-black">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-6 py-6 px-4">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={event.posterImage}
              alt={`${event.title} poster`}
              className="max-h-[500px] w-auto rounded-lg shadow-2xl object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 text-white space-y-4">
            <Link
              to="/cities/$cityId"
              params={{ cityId: city.id }}
              className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {city.name}
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{city.name}</Badge>
              <Badge variant="secondary">{city.country}</Badge>
              <EventStatusBadge status={event.status} />
            </div>
            <div className="space-y-3 text-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-white/70" />
                <span>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-white/70" />
                <span>
                  {event.startTime}
                  {event.endTime && ` - ${event.endTime}`}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white/70" />
                <span>{event.venue}</span>
              </div>
            </div>
            {event.organizer && (
              <p className="text-white/70 text-sm">
                Organized by: {event.organizer}
              </p>
            )}
          </div>
        </div>
      </div>

      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {event.startTime}
                        {event.endTime && ` - ${event.endTime}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Venue</p>
                      <p className="font-medium">{event.venue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{event.address}</p>
                    </div>
                  </div>
                  {event.theme && (
                    <div>
                      <p className="text-sm text-muted-foreground">Theme</p>
                      <p className="font-medium">{event.theme}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Photos</h2>
                <Badge variant="secondary">{images.length}</Badge>
              </div>

              <div className="space-y-4">
                {event.status === 'completed' && (
                  <ImageUpload eventId={event.id} />
                )}
                <PhotoGallery images={images} />
                {event.status !== 'completed' && images.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Photo uploads will be available after the event.
                  </p>
                )}
              </div>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Discussion</h2>
                <Badge variant="secondary">{messages.length}</Badge>
              </div>
              <ChatBox eventId={event.id} initialMessages={messages} />
            </section>
          </div>

          <aside className="space-y-6">
            {(event.rsvpUrl || event.facebookGroupUrl || event.eventUrl || event.instagramUrl || event.telegramUrl) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Join This Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {event.rsvpUrl && (
                    <Button asChild className="w-full">
                      <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer">
                        <Ticket className="mr-2 h-4 w-4" />
                        RSVP Now
                      </a>
                    </Button>
                  )}
                  {event.facebookGroupUrl && (
                    <Button variant="outline" asChild className="w-full">
                      <a href={event.facebookGroupUrl} target="_blank" rel="noopener noreferrer">
                        <Facebook className="mr-2 h-4 w-4" />
                        Facebook Group
                      </a>
                    </Button>
                  )}
                  {event.eventUrl && (
                    <Button variant="outline" asChild className="w-full">
                      <a href={event.eventUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Event Page
                      </a>
                    </Button>
                  )}
                  <div className="flex gap-2">
                    {event.instagramUrl && (
                      <Button variant="ghost" size="icon" asChild className="flex-1">
                        <a href={event.instagramUrl} target="_blank" rel="noopener noreferrer" title="Instagram">
                          <Instagram className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {event.telegramUrl && (
                      <Button variant="ghost" size="icon" asChild className="flex-1">
                        <a href={event.telegramUrl} target="_blank" rel="noopener noreferrer" title="Telegram">
                          <Send className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CityMap
                  coordinates={event.coordinates}
                  name={event.venue}
                  address={event.address}
                />
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.address}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Event Poster</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={event.posterImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={event.posterImage}
                    alt={`${event.title} poster`}
                    className="w-full rounded-lg hover:opacity-90 transition-opacity"
                  />
                </a>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Click to view full size
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">City Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">City</span>
                  <Link
                    to="/cities/$cityId"
                    params={{ cityId: city.id }}
                    className="font-medium hover:underline"
                  >
                    {city.name}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-medium">{city.country}</span>
                </div>
                {city.timezone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timezone</span>
                    <span className="font-medium">{city.timezone}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </PageContainer>
    </div>
  )
}
