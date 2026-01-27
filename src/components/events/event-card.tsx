import { Link } from '@tanstack/react-router'
import type { Event } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { EventStatusBadge } from './event-status'
import { Calendar, Clock } from 'lucide-react'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      to="/cities/$cityId/events/$eventId"
      params={{ cityId: event.cityId, eventId: event.id }}
    >
      <Card className="transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{event.title}</CardTitle>
              {event.description && (
                <CardDescription className="mt-1 line-clamp-2">
                  {event.description}
                </CardDescription>
              )}
            </div>
            <EventStatusBadge status={event.status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            {event.time && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
