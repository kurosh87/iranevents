import type { HistoryEvent } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { categoryInfo, formatHistoryDate } from '@/lib/data/history-data'
import { cn } from '@/lib/utils'

interface TimelineEventProps {
  event: HistoryEvent
  onClick?: () => void
  isSelected?: boolean
}

export function TimelineEvent({ event, onClick, isSelected }: TimelineEventProps) {
  const info = categoryInfo[event.category]
  const stars = Array(event.significance).fill('★').join('')

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg hover:ring-2 hover:ring-primary/20',
        isSelected && 'ring-2 ring-primary'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={cn(info.color, 'text-white')}>{info.label}</Badge>
          <span className="text-xs text-amber-500">{stars}</span>
        </div>
        <div className="text-sm font-medium text-primary">
          {formatHistoryDate(event)}
        </div>
        <CardTitle className="text-lg">{event.title}</CardTitle>
        {event.titleFa && (
          <p className="text-sm text-muted-foreground font-medium" dir="rtl">
            {event.titleFa}
          </p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {event.summary}
        </p>
      </CardContent>
    </Card>
  )
}
