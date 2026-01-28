import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { cities } from '@/lib/cities-data'
import { PageContainer } from '@/components/layout/page-container'
import { HeroSection } from '@/components/layout/hero-section'
import { SectionHeader } from '@/components/layout/section-header'
import { WorldMap } from '@/components/map/world-map'
import { CityGrid } from '@/components/cities/city-grid'
import { Button } from '@/components/ui/button'
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
    <>
      <HeroSection
        title="Iran Revolution"
        subtitle="Find solidarity events and rallies worldwide."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() =>
              document
                .getElementById('events')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Find Events
          </Button>
        </div>
      </HeroSection>

      <PageContainer>
        <div className="space-y-16">
          <section id="events">
            <SectionHeader
              title="Events Worldwide"
              subtitle="Rallies and meetups in 40+ cities"
            />
            <WorldMap cities={cities} onCityClick={handleCityClick} />
          </section>

          <section>
            <SectionHeader
              title="Browse by City"
              subtitle="Find events in your area"
            />
            <CityGrid cities={cities} groupByRegion />
          </section>
        </div>
      </PageContainer>
    </>
  )
}
