import type { Article } from '@/types'

export const articles: Article[] = [
  {
    id: '1',
    title: 'Understanding the Woman, Life, Freedom Movement',
    slug: 'woman-life-freedom-movement',
    excerpt: 'A comprehensive guide to the historic uprising that began in September 2022 and continues to shape Iran\'s future.',
    content: { type: 'markdown', body: '' },
    authorName: 'Editorial Team',
    coverImage: 'https://picsum.photos/seed/article1/1200/600',
    category: 'society',
    tags: ['woman-life-freedom', 'mahsa-amini', 'protest', 'history'],
    readTimeMinutes: 12,
    publishedAt: '2024-09-01T10:00:00Z',
    isDraft: false,
  },
  {
    id: '2',
    title: 'Nowruz: A 3,000-Year Tradition',
    slug: 'nowruz-tradition',
    excerpt: 'Explore the ancient Persian New Year celebration, its symbolism, traditions, and how Iranians worldwide keep this heritage alive.',
    content: { type: 'markdown', body: '' },
    authorName: 'Cultural Heritage Team',
    coverImage: 'https://picsum.photos/seed/article2/1200/600',
    category: 'culture',
    tags: ['nowruz', 'traditions', 'persian-culture', 'spring'],
    readTimeMinutes: 8,
    publishedAt: '2024-03-15T08:00:00Z',
    isDraft: false,
  },
  {
    id: '3',
    title: 'How to Support the Iranian People',
    slug: 'how-to-support-iran',
    excerpt: 'Practical ways non-Iranians can show solidarity, amplify voices, and contribute to positive change.',
    content: { type: 'markdown', body: '' },
    authorName: 'Community Team',
    coverImage: 'https://picsum.photos/seed/article3/1200/600',
    category: 'guide',
    tags: ['solidarity', 'activism', 'support', 'diaspora'],
    readTimeMinutes: 6,
    publishedAt: '2024-08-20T14:00:00Z',
    isDraft: false,
  },
  {
    id: '4',
    title: 'The Rich History of Persian Poetry',
    slug: 'persian-poetry-history',
    excerpt: 'From Rumi to Hafez to contemporary voices, discover the literary tradition that has shaped Iranian culture.',
    content: { type: 'markdown', body: '' },
    authorName: 'Literature Team',
    coverImage: 'https://picsum.photos/seed/article4/1200/600',
    category: 'culture',
    tags: ['poetry', 'rumi', 'hafez', 'literature'],
    readTimeMinutes: 10,
    publishedAt: '2024-07-10T12:00:00Z',
    isDraft: false,
  },
  {
    id: '5',
    title: 'Iranian Cuisine: A Culinary Journey',
    slug: 'iranian-cuisine-guide',
    excerpt: 'Discover the flavors of Iran through its diverse regional dishes, signature ingredients, and cooking traditions.',
    content: { type: 'markdown', body: '' },
    authorName: 'Food & Culture Team',
    coverImage: 'https://picsum.photos/seed/article5/1200/600',
    category: 'culture',
    tags: ['food', 'cuisine', 'recipes', 'traditions'],
    readTimeMinutes: 9,
    publishedAt: '2024-06-05T10:00:00Z',
    isDraft: false,
  },
  {
    id: '6',
    title: 'The Iranian Diaspora: Building Community Abroad',
    slug: 'iranian-diaspora-community',
    excerpt: 'How millions of Iranians living abroad maintain cultural ties while building new lives in their adopted countries.',
    content: { type: 'markdown', body: '' },
    authorName: 'Community Team',
    coverImage: 'https://picsum.photos/seed/article6/1200/600',
    category: 'diaspora',
    tags: ['diaspora', 'community', 'immigration', 'identity'],
    readTimeMinutes: 7,
    publishedAt: '2024-05-15T16:00:00Z',
    isDraft: false,
  },
]

export function getArticlesByCategory(category?: string): Article[] {
  const published = articles.filter((a) => !a.isDraft)
  if (!category || category === 'all') return published
  return published.filter((a) => a.category === category)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug && !a.isDraft)
}

export function getFeaturedArticles(limit = 3): Article[] {
  return articles.filter((a) => !a.isDraft).slice(0, limit)
}
