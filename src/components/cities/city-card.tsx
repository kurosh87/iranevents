import { Link } from '@tanstack/react-router'
import type { City } from '@/types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar } from 'lucide-react'

interface CityCardProps {
  city: City
  nextEventDate?: string
}

export function CityCard({ city, nextEventDate }: CityCardProps) {
  const fallbackImage = `https://picsum.photos/seed/${encodeURIComponent(city.id)}/400/300`

  return (
    <Link to="/cities/$cityId" params={{ cityId: city.id }}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:ring-2 hover:ring-primary/20 cursor-pointer">
        <img
          src={city.posterUrl ?? fallbackImage}
          alt={city.name}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{city.name}</CardTitle>
            <Badge variant="secondary" className="shrink-0">
              {city.country}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {city.meetupLocation && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate">{city.meetupLocation.name}</span>
              </div>
            )}
            {nextEventDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>Next: {nextEventDate}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
