import { lazy, Suspense } from 'react'
import type { City } from '@/types'
import { Card } from '@/components/ui/card'

const LeafletWorldMap = lazy(() =>
  import('./leaflet-client').then((mod) => ({ default: mod.WorldMapClient }))
)

interface WorldMapProps {
  cities: City[]
  onCityClick?: (city: City) => void
}

export function WorldMap({ cities, onCityClick }: WorldMapProps) {
  return (
    <Card className="h-[500px] overflow-hidden p-0">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <div className="text-muted-foreground">Loading map...</div>
          </div>
        }
      >
        <LeafletWorldMap cities={cities} onCityClick={onCityClick} />
      </Suspense>
    </Card>
  )
}
