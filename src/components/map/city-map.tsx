import { lazy, Suspense } from 'react'
import type { Coordinates } from '@/types'
import { Card } from '@/components/ui/card'

const LeafletCityMap = lazy(() =>
  import('./leaflet-client').then((mod) => ({ default: mod.CityMapClient }))
)

interface CityMapProps {
  coordinates: Coordinates
  name: string
  address?: string
  className?: string
}

export function CityMap({ coordinates, name, address, className }: CityMapProps) {
  return (
    <Card className={`h-[300px] overflow-hidden p-0 ${className ?? ''}`}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <div className="text-muted-foreground">Loading map...</div>
          </div>
        }
      >
        <LeafletCityMap coordinates={coordinates} name={name} address={address} />
      </Suspense>
    </Card>
  )
}
