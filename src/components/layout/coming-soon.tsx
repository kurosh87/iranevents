import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ComingSoonProps {
  title: string
  description: string
  icon: LucideIcon
}

export function ComingSoon({ title, description, icon: Icon }: ComingSoonProps) {
  return (
    <Card className="text-center py-12 bg-muted/30 border-dashed">
      <CardContent className="space-y-3">
        <Icon className="h-12 w-12 mx-auto text-muted-foreground/50" />
        <h3 className="text-lg font-semibold text-muted-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground/70">{description}</p>
        <p className="text-xs font-medium text-primary/60">Coming Soon</p>
      </CardContent>
    </Card>
  )
}
