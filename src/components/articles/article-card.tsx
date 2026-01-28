import { Link } from '@tanstack/react-router'
import type { Article } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User } from 'lucide-react'

interface ArticleCardProps {
  article: Article
}

const categoryLabels: Record<string, string> = {
  culture: 'Culture',
  history: 'History',
  society: 'Society',
  politics: 'Politics',
  diaspora: 'Diaspora',
  guide: 'Guide',
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to="/articles/$slug" params={{ slug: article.slug }}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:ring-2 hover:ring-primary/20 cursor-pointer h-full flex flex-col">
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        )}
        <CardHeader className="pb-2">
          <Badge variant="secondary" className="w-fit mb-2">
            {categoryLabels[article.category]}
          </Badge>
          <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            {article.authorName && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{article.authorName}</span>
              </div>
            )}
            {article.readTimeMinutes && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTimeMinutes} min read</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
