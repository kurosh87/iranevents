import { createFileRoute, Link } from '@tanstack/react-router'
import { PageContainer } from '@/components/layout/page-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getNewsBySlug } from '@/lib/data/news-data'
import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/news/$slug')({
  component: NewsArticlePage,
})

const categoryLabels: Record<string, string> = {
  news: 'News',
  'human-rights': 'Human Rights',
  culture: 'Culture',
  diaspora: 'Diaspora',
  protest: 'Protest',
}

function NewsArticlePage() {
  const { slug } = Route.useParams()
  const article = getNewsBySlug(slug)

  if (!article) {
    return (
      <PageContainer>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/news">
            <Button className="mt-4">Back to News</Button>
          </Link>
        </div>
      </PageContainer>
    )
  }

  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <PageContainer>
      <article className="mx-auto max-w-3xl">
        <Link to="/news" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{categoryLabels[article.category]}</Badge>
          {article.isFeatured && <Badge variant="default">Featured</Badge>}
        </div>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          {article.sourceName && (
            <div className="flex items-center gap-1">
              <span>Source: {article.sourceName}</span>
            </div>
          )}
        </div>

        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="mt-8 w-full rounded-lg object-cover"
          />
        )}

        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">{article.summary}</p>
          <p className="text-muted-foreground mt-4">
            Full article content would be rendered here from the content field.
          </p>
        </div>

        {article.sourceUrl && (
          <div className="mt-8 pt-8 border-t">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Read original article
            </a>
          </div>
        )}

        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </article>
    </PageContainer>
  )
}
