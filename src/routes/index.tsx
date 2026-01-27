import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { cities } from '@/lib/cities-data'
import { PageContainer } from '@/components/layout/page-container'
import { WorldMap } from '@/components/map/world-map'
import { CityGrid } from '@/components/cities/city-grid'
import type { City } from '@/types'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate()

  const handleCityClick = (city: City) => {
    navigate({ to: '/cities/$cityId', params: { cityId: city.id } })
  }

  return (
    <PageContainer>
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Iranian Diaspora Meetups
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Weekly events connecting Iranians in cities around the world.
            Find your local community.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Find Events Near You</h2>
          <WorldMap cities={cities} onCityClick={handleCityClick} />
        </section>

        <CityGrid cities={cities} groupByRegion />
      </div>
    </PageContainer>
  )
}
