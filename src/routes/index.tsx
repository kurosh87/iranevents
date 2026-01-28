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
        title="The People of Iran Need You"
        subtitle="Join protests worldwide. Show up. Be counted. The regime is killing civilians."
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
            Find a Protest Near You
          </Button>
        </div>
      </HeroSection>

      <PageContainer>
        <div className="space-y-16">
          <section id="events">
            <SectionHeader
              title="Protests Worldwide"
              subtitle="40+ cities standing with Iran"
            />
            <WorldMap cities={cities} onCityClick={handleCityClick} />
          </section>

          <section>
            <SectionHeader
              title="Take Action"
              subtitle="Find a protest in your city"
            />
            <CityGrid cities={cities} groupByRegion />
          </section>
        </div>
      </PageContainer>
    </>
  )
}
