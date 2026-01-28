import type { Article } from '@/types'
import { ArticleCard } from './article-card'
import { ContentGrid } from '@/components/layout/content-grid'

interface ArticleGridProps {
  articles: Article[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
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
        <ArticleCard key={article.id} article={article} />
      ))}
    </ContentGrid>
  )
}
