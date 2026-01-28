import { createFileRoute, Link } from '@tanstack/react-router'
import { PageContainer } from '@/components/layout/page-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getArticleBySlug } from '@/lib/data/articles-data'
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react'

export const Route = createFileRoute('/articles/$slug')({
  component: ArticleDetailPage,
})

const categoryLabels: Record<string, string> = {
  culture: 'Culture',
  history: 'History',
  society: 'Society',
  politics: 'Politics',
  diaspora: 'Diaspora',
  guide: 'Guide',
}

function ArticleDetailPage() {
  const { slug } = Route.useParams()
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <PageContainer>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/articles">
            <Button className="mt-4">Back to Articles</Button>
          </Link>
        </div>
      </PageContainer>
    )
  }

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <PageContainer>
      <article className="mx-auto max-w-3xl">
        <Link to="/articles" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        <Badge variant="secondary" className="mb-4">
          {categoryLabels[article.category]}
        </Badge>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {article.authorName && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.authorName}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          )}
          {article.readTimeMinutes && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTimeMinutes} min read</span>
            </div>
          )}
        </div>

        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="mt-8 w-full rounded-lg object-cover"
          />
        )}

        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground italic">
            {article.excerpt}
          </p>
          <div className="mt-8">
            <p className="text-muted-foreground">
              Full article content would be rendered here from the content field.
            </p>
          </div>
        </div>

        {article.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t flex flex-wrap gap-2">
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
