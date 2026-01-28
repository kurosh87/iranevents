import type { HistoryEvent } from '@/types'
import { TimelineEvent } from './timeline-event'
import { ContentGrid } from '@/components/layout/content-grid'

interface TimelineGridProps {
  events: HistoryEvent[]
  selectedId?: string
  onSelect: (event: HistoryEvent) => void
}

export function TimelineGrid({ events, selectedId, onSelect }: TimelineGridProps) {
  if (events.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No events found for this era.
      </div>
    )
  }

  return (
    <ContentGrid columns={3}>
      {events.map((event) => (
        <TimelineEvent
          key={event.id}
          event={event}
          onClick={() => onSelect(event)}
          isSelected={event.id === selectedId}
        />
      ))}
    </ContentGrid>
  )
}
