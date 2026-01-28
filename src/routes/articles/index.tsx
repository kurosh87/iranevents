import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageContainer } from '@/components/layout/page-container'
import { HeroSection } from '@/components/layout/hero-section'
import { SectionHeader } from '@/components/layout/section-header'
import { ArticleGrid } from '@/components/articles/article-grid'
import { ArticleCategoryFilter } from '@/components/articles/article-category-filter'
import { getArticlesByCategory } from '@/lib/data/articles-data'

export const Route = createFileRoute('/articles/')({
  component: ArticlesPage,
})

function ArticlesPage() {
  const [category, setCategory] = useState('all')
  const articlesList = getArticlesByCategory(category)

  return (
    <>
      <HeroSection
        title="Articles & Guides"
        subtitle="Educational content about Iranian history, culture, society, and how to support the movement."
      />
      <PageContainer>
        <div className="space-y-8">
          <div>
            <SectionHeader title="Browse by Topic" />
            <ArticleCategoryFilter selected={category} onSelect={setCategory} />
          </div>
          <ArticleGrid articles={articlesList} />
        </div>
      </PageContainer>
    </>
  )
}
