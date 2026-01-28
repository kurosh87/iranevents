import type { NewsArticle } from '@/types'
import { NewsCard } from './news-card'
import { ContentGrid } from '@/components/layout/content-grid'

interface NewsGridProps {
  articles: NewsArticle[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No articles found.
      </div>
    )
  }

  return (
    <ContentGrid columns={3}>
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </ContentGrid>
  )
}
