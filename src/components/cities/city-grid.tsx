import { useState, useMemo } from 'react'
import type { City, Region } from '@/types'
import { regionLabels } from '@/lib/cities-data'
import { getEventsByCityId } from '@/lib/events-data'
import { CityCard } from './city-card'
import { RegionFilter } from './region-filter'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Search, Filter } from 'lucide-react'

interface CityGridProps {
  cities: City[]
  groupByRegion?: boolean
}

function getNextEventDate(cityId: string): string | undefined {
  const cityEvents = getEventsByCityId(cityId)
  const now = new Date()
  const upcomingEvents = cityEvents
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (upcomingEvents.length > 0) {
    return new Date(upcomingEvents[0].date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }
  return undefined
}

function hasUpcomingEvent(cityId: string): boolean {
  const cityEvents = getEventsByCityId(cityId)
  const now = new Date()
  return cityEvents.some((event) => new Date(event.date) >= now)
}

export function CityGrid({ cities, groupByRegion = true }: CityGridProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [showOnlyUpcoming, setShowOnlyUpcoming] = useState(false)

  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(cities.map((city) => city.country))]
    return uniqueCountries.sort()
  }, [cities])

  const filteredCities = useMemo(() => {
    let result = cities

    if (selectedRegion !== 'all') {
      result = result.filter((city) => city.region === selectedRegion)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((city) =>
        city.name.toLowerCase().includes(query)
      )
    }

    if (selectedCountry !== 'all') {
      result = result.filter((city) => city.country === selectedCountry)
    }

    if (showOnlyUpcoming) {
      result = result.filter((city) => hasUpcomingEvent(city.id))
    }

    return result
  }, [cities, selectedRegion, searchQuery, selectedCountry, showOnlyUpcoming])

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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold">
            {filteredCities.length} Cities
          </h2>
          <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
        </div>

        <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" />
            Filters
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Switch
              id="upcoming-filter"
              checked={showOnlyUpcoming}
              onCheckedChange={setShowOnlyUpcoming}
            />
            <Label htmlFor="upcoming-filter" className="text-sm cursor-pointer whitespace-nowrap">
              Has upcoming event
            </Label>
          </div>
        </div>
      </div>

      {filteredCities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-muted-foreground">No cities match your filters</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : groupByRegion && groupedCities ? (
        Object.entries(groupedCities).map(([region, regionCities]) => (
          <section key={region}>
            <h3 className="mb-4 text-lg font-medium text-muted-foreground">
              {regionLabels[region as Region]}
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {regionCities.map((city) => (
                <CityCard
                  key={city.id}
                  city={city}
                  nextEventDate={getNextEventDate(city.id)}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              nextEventDate={getNextEventDate(city.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
