import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageContainer } from '@/components/layout/page-container'
import { HeroSection } from '@/components/layout/hero-section'
import { SectionHeader } from '@/components/layout/section-header'
import { NewsGrid } from '@/components/news/news-grid'
import { NewsCategoryFilter } from '@/components/news/news-category-filter'
import { getNewsByCategory } from '@/lib/data/news-data'

export const Route = createFileRoute('/news/')({
  component: NewsPage,
})

function NewsPage() {
  const [category, setCategory] = useState('all')
  const articles = getNewsByCategory(category)

  return (
    <>
      <HeroSection
        title="News & Updates"
        subtitle="Stay informed about Iran, the diaspora community, and the ongoing movement for change."
      />
      <PageContainer>
        <div className="space-y-8">
          <div>
            <SectionHeader title="Filter by Category" />
            <NewsCategoryFilter selected={category} onSelect={setCategory} />
          </div>
          <NewsGrid articles={articles} />
        </div>
      </PageContainer>
    </>
  )
}
