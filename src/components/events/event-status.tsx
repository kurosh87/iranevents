import type { EventStatus } from '@/types'
import { Badge } from '@/components/ui/badge'

interface EventStatusBadgeProps {
  status: EventStatus
}

const statusConfig: Record<
  EventStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  upcoming: { label: 'Upcoming', variant: 'default' },
  ongoing: { label: 'Happening Now', variant: 'default' },
  completed: { label: 'Completed', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
}

export function EventStatusBadge({ status }: EventStatusBadgeProps) {
  const config = statusConfig[status]

  return <Badge variant={config.variant}>{config.label}</Badge>
}
