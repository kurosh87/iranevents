import { Link } from '@tanstack/react-router'
import type { City } from '@/types'
import { ProgressiveBlur } from '@/components/ui/progressive-blur-card'
import { MapPin, Calendar, ArrowRight, CalendarX } from 'lucide-react'

interface CityCardProps {
  city: City
  nextEventDate?: string
}

export function CityCard({ city, nextEventDate }: CityCardProps) {
  const hasImage = !!city.posterUrl

  if (!hasImage) {
    return (
      <Link to="/cities/$cityId" params={{ cityId: city.id }}>
        <div className="relative aspect-[3/4] w-full rounded-2xl border border-border bg-muted/30 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
            <CalendarX className="h-12 w-12 mb-3" />
            <span className="text-sm font-medium">No events scheduled</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
            <h3 className="text-lg font-semibold">{city.name}</h3>
            <p className="text-sm text-muted-foreground">{city.country}</p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to="/cities/$cityId" params={{ cityId: city.id }}>
      <div className="relative aspect-[3/4] w-full rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group">
        <img
          src={city.posterUrl}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <ProgressiveBlur
          className="pointer-events-none absolute bottom-0 left-0 h-[45%] w-full"
          blurIntensity={8}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-end justify-between p-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-white">{city.name}</h3>
              <p className="text-sm text-white/90">{city.country}</p>
              {nextEventDate && (
                <div className="flex items-center gap-1.5 mt-2 text-white/80 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{nextEventDate}</span>
                </div>
              )}
              {city.meetupLocation && (
                <div className="flex items-center gap-1.5 mt-1 text-white/80 text-xs">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[180px]">
                    {city.meetupLocation.name}
                  </span>
                </div>
              )}
            </div>
            <button className="h-9 w-9 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 group/btn">
              <ArrowRight className="w-4 h-4 text-gray-800 transition-all duration-300 group-hover/btn:text-primary group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
