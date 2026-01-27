import type { Event } from '@/types'
import { EventCard } from './event-card'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

interface EventListProps {
  events: Event[]
  emptyMessage?: string
}

export function EventList({
  events,
  emptyMessage = 'No events found',
}: EventListProps) {
  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium">{emptyMessage}</p>
          <p className="text-muted-foreground">Check back soon for new events.</p>
        </CardContent>
      </Card>
    )
  }

  const groupedByDate = events.reduce(
    (acc, event) => {
      const dateKey = event.date
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(event)
      return acc
    },
    {} as Record<string, Event[]>
  )

  const sortedDates = Object.keys(groupedByDate).sort()

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <section key={date}>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          <div className="space-y-3">
            {groupedByDate[date].map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
