import { useState } from 'react'
import type { City, Region } from '@/types'
import { regionLabels } from '@/lib/cities-data'
import { CityCard } from './city-card'
import { RegionFilter } from './region-filter'

interface CityGridProps {
  cities: City[]
  groupByRegion?: boolean
}

export function CityGrid({ cities, groupByRegion = true }: CityGridProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all')

  const filteredCities =
    selectedRegion === 'all'
      ? cities
      : cities.filter((city) => city.region === selectedRegion)

  const groupedCities = groupByRegion
    ? (Object.keys(regionLabels) as Region[]).reduce(
        (acc, region) => {
          const regionCities = filteredCities.filter(
            (city) => city.region === region
          )
          if (regionCities.length > 0) {
            acc[region] = regionCities
          }
          return acc
        },
        {} as Record<Region, City[]>
      )
    : null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {filteredCities.length} Cities
        </h2>
        <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
      </div>

      {groupByRegion && groupedCities ? (
        Object.entries(groupedCities).map(([region, regionCities]) => (
          <section key={region}>
            <h3 className="mb-4 text-lg font-medium text-muted-foreground">
              {regionLabels[region as Region]}
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {regionCities.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      )}
    </div>
  )
}
