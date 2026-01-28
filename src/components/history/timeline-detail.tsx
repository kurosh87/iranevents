import type { HistoryEvent } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { categoryInfo, formatHistoryDate } from '@/lib/data/history-data'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface TimelineDetailProps {
  event: HistoryEvent
  onClose: () => void
}

export function TimelineDetail({ event, onClose }: TimelineDetailProps) {
  const info = categoryInfo[event.category]
  const stars = Array(event.significance).fill('★').join('')

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge className={cn(info.color, 'text-white')}>{info.label}</Badge>
          <span className="text-amber-500">{stars}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-lg font-semibold text-primary mb-2">
        {formatHistoryDate(event)}
      </div>

      <h2 className="text-2xl font-bold tracking-tight mb-1">{event.title}</h2>
      {event.titleFa && (
        <p className="text-lg text-muted-foreground mb-4" dir="rtl">
          {event.titleFa}
        </p>
      )}

      {event.images[0] && (
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full rounded-lg object-cover mb-6 max-h-64"
        />
      )}

      <p className="text-muted-foreground leading-relaxed">{event.summary}</p>

      {event.sources.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Sources</h3>
          <div className="flex flex-wrap gap-2">
            {event.sources.map((source, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {source}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
