import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { cities } from '@/lib/cities-data'
import { PageContainer } from '@/components/layout/page-container'
import { HeroSection } from '@/components/layout/hero-section'
import { SectionHeader } from '@/components/layout/section-header'
import { ContentGrid } from '@/components/layout/content-grid'
import { WorldMap } from '@/components/map/world-map'
import { CityGrid } from '@/components/cities/city-grid'
import { NewsCard } from '@/components/news/news-card'
import { ArticleCard } from '@/components/articles/article-card'
import { TimelineEvent } from '@/components/history/timeline-event'
import { getFeaturedNews } from '@/lib/data/news-data'
import { getFeaturedArticles } from '@/lib/data/articles-data'
import { historyEvents } from '@/lib/data/history-data'
import { Button } from '@/components/ui/button'
import type { City } from '@/types'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate()
  const featuredNews = getFeaturedNews().slice(0, 3)
  const featuredArticles = getFeaturedArticles(3)
  const recentHistory = historyEvents.slice(-3).reverse()

  const handleCityClick = (city: City) => {
    navigate({ to: '/cities/$cityId', params: { cityId: city.id } })
  }

  return (
    <>
      <HeroSection
        title="Connecting Iranians Worldwide"
        subtitle="Join weekly meetups, stay informed about Iran, and learn about the rich history and culture of the Persian people."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/cities">
            <Button size="lg">Find Events Near You</Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </HeroSection>

      <PageContainer>
        <div className="space-y-16">
          {/* Latest News */}
          <section>
            <SectionHeader
              title="Latest News"
              subtitle="Stay informed about Iran and the diaspora"
              action={
                <Link to="/news">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              }
            />
            <ContentGrid columns={3}>
              {featuredNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </ContentGrid>
          </section>

          {/* Featured Articles */}
          <section>
            <SectionHeader
              title="Educational Articles"
              subtitle="Learn about Iranian history, culture, and society"
              action={
                <Link to="/articles">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              }
            />
            <ContentGrid columns={3}>
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </ContentGrid>
          </section>

          {/* History Highlights */}
          <section>
            <SectionHeader
              title="From the Timeline"
              subtitle="Key moments in Iranian history"
              action={
                <Link to="/history">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Explore History <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              }
            />
            <ContentGrid columns={3}>
              {recentHistory.map((event) => (
                <TimelineEvent key={event.id} event={event} />
              ))}
            </ContentGrid>
          </section>

          {/* World Map */}
          <section>
            <SectionHeader
              title="Find Events Near You"
              subtitle="Weekly meetups in 63+ cities worldwide"
            />
            <WorldMap cities={cities} onCityClick={handleCityClick} />
          </section>

          {/* Cities Grid */}
          <section>
            <SectionHeader
              title="All Cities"
              subtitle="Browse events by region"
            />
            <CityGrid cities={cities} groupByRegion />
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 rounded-lg bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <h2 className="text-3xl font-bold tracking-tight">
              زن، زندگی، آزادی
            </h2>
            <p className="mt-2 text-xl text-muted-foreground">
              Woman, Life, Freedom
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Standing in solidarity with the people of Iran in their struggle
              for freedom, dignity, and human rights.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/history">
                <Button variant="outline">Learn the History</Button>
              </Link>
              <Link to="/articles/$slug" params={{ slug: 'how-to-support-iran' }}>
                <Button>How to Help</Button>
              </Link>
            </div>
          </section>
        </div>
      </PageContainer>
    </>
  )
}
