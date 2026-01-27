import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getCityById, regionLabels } from '@/lib/cities-data'
import { getEventsByCityId } from '@/lib/events-data'
import { PageContainer } from '@/components/layout/page-container'
import { CityMap } from '@/components/map/city-map'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MapPin, Calendar, Clock, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/cities/$cityId/')({
  component: CityDetailPage,
  loader: ({ params }) => {
    const city = getCityById(params.cityId)
    if (!city) {
      throw notFound()
    }
    const cityEvents = getEventsByCityId(params.cityId)
    return { city, cityEvents }
  },
})

function CityDetailPage() {
  const { city, cityEvents } = Route.useLoaderData()

  const posterUrl =
    city.posterUrl ??
    `https://source.unsplash.com/1200x400/?${encodeURIComponent(city.name + ' city skyline')}`

  return (
    <div>
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={posterUrl}
          alt={city.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Link
              to="/"
              className="mb-2 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all cities
            </Link>
            <h1 className="text-4xl font-bold text-white">{city.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary">{city.country}</Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                {regionLabels[city.region]}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold">Upcoming Events</h2>
              {cityEvents.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-lg font-medium">No upcoming events</p>
                    <p className="text-muted-foreground">
                      Check back soon for new events.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {cityEvents.map((event) => (
                    <Link
                      key={event.id}
                      to="/cities/$cityId/events/$eventId"
                      params={{ cityId: city.id, eventId: event.id }}
                    >
                      <Card className="transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{event.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {event.venue}
                              </CardDescription>
                            </div>
                            <Badge
                              variant={
                                event.status === 'upcoming'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {event.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(event.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              <span>
                                {event.startTime}
                                {event.endTime && ` - ${event.endTime}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              <span>{event.address}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section>
              <h3 className="mb-3 text-lg font-semibold">Meetup Location</h3>
              {city.meetupLocation ? (
                <>
                  <CityMap
                    coordinates={city.meetupLocation.coordinates}
                    name={city.meetupLocation.name}
                    address={city.meetupLocation.address}
                  />
                  <div className="mt-3 flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium">{city.meetupLocation.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {city.meetupLocation.address}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="py-6 text-center text-muted-foreground">
                    Location to be announced
                  </CardContent>
                </Card>
              )}
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold">City Info</h3>
              <Card>
                <CardContent className="space-y-3 pt-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country</span>
                    <span className="font-medium">{city.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region</span>
                    <span className="font-medium">
                      {regionLabels[city.region]}
                    </span>
                  </div>
                  {city.timezone && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timezone</span>
                      <span className="font-medium">{city.timezone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </aside>
        </div>
      </PageContainer>
    </div>
  )
}
