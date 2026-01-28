import { Link } from '@tanstack/react-router'
import type { NewsArticle } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ExternalLink } from 'lucide-react'

interface NewsCardProps {
  article: NewsArticle
}

const categoryLabels: Record<string, string> = {
  news: 'News',
  'human-rights': 'Human Rights',
  culture: 'Culture',
  diaspora: 'Diaspora',
  protest: 'Protest',
}

export function NewsCard({ article }: NewsCardProps) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link to="/news/$slug" params={{ slug: article.slug }}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:ring-2 hover:ring-primary/20 cursor-pointer h-full flex flex-col">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        )}
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{categoryLabels[article.category]}</Badge>
            {article.isFeatured && <Badge variant="default">Featured</Badge>}
          </div>
          <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {article.summary}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
            {article.sourceName && (
              <div className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                <span>{article.sourceName}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
