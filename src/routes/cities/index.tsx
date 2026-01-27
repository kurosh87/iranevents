import { createFileRoute } from '@tanstack/react-router'
import { cities } from '@/lib/cities-data'
import { PageContainer } from '@/components/layout/page-container'
import { CityGrid } from '@/components/cities/city-grid'

export const Route = createFileRoute('/cities/')({
  component: CitiesPage,
})

function CitiesPage() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <section>
          <h1 className="text-3xl font-bold tracking-tight">All Cities</h1>
          <p className="mt-2 text-muted-foreground">
            Browse all cities hosting Iranian diaspora meetups.
          </p>
        </section>

        <CityGrid cities={cities} groupByRegion />
      </div>
    </PageContainer>
  )
}
