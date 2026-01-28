import type { NewsArticle } from '@/types'

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Iranian Diaspora Marks Anniversary of Woman, Life, Freedom Movement',
    slug: 'diaspora-marks-wlf-anniversary',
    summary: 'Communities around the world gather to commemorate the ongoing struggle for freedom in Iran, honoring those who have sacrificed for change.',
    content: { type: 'markdown', body: '' },
    sourceUrl: 'https://example.com',
    sourceName: 'Iran International',
    imageUrl: 'https://picsum.photos/seed/news1/800/450',
    category: 'protest',
    tags: ['woman-life-freedom', 'diaspora', 'anniversary'],
    publishedAt: '2024-09-16T10:00:00Z',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'UN Human Rights Council Addresses Ongoing Concerns in Iran',
    slug: 'un-human-rights-iran',
    summary: 'The council discusses recent developments and calls for accountability regarding human rights violations.',
    content: { type: 'markdown', body: '' },
    sourceUrl: 'https://example.com',
    sourceName: 'Reuters',
    imageUrl: 'https://picsum.photos/seed/news2/800/450',
    category: 'human-rights',
    tags: ['un', 'human-rights', 'international'],
    publishedAt: '2024-09-14T14:30:00Z',
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Persian New Year Celebrations Unite Iranians Globally',
    slug: 'nowruz-celebrations-2024',
    summary: 'Nowruz festivities bring together Iranian communities worldwide, celebrating 3,000 years of tradition.',
    content: { type: 'markdown', body: '' },
    sourceName: 'Community Report',
    imageUrl: 'https://picsum.photos/seed/news3/800/450',
    category: 'culture',
    tags: ['nowruz', 'culture', 'celebration'],
    publishedAt: '2024-03-20T08:00:00Z',
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Iranian Artists Showcase Work at International Exhibition',
    slug: 'iranian-artists-exhibition',
    summary: 'Contemporary Iranian artists gain international recognition at major European art exhibition.',
    content: { type: 'markdown', body: '' },
    sourceName: 'Art News',
    imageUrl: 'https://picsum.photos/seed/news4/800/450',
    category: 'culture',
    tags: ['art', 'exhibition', 'diaspora'],
    publishedAt: '2024-08-25T12:00:00Z',
    isFeatured: false,
  },
  {
    id: '5',
    title: 'New Iranian Community Center Opens in Toronto',
    slug: 'toronto-community-center',
    summary: 'The new center will serve as a hub for cultural events, language classes, and community gatherings.',
    content: { type: 'markdown', body: '' },
    sourceName: 'Local News',
    imageUrl: 'https://picsum.photos/seed/news5/800/450',
    category: 'diaspora',
    tags: ['canada', 'community', 'toronto'],
    publishedAt: '2024-09-10T16:00:00Z',
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Political Prisoners Face Harsh Conditions, Reports Say',
    slug: 'political-prisoners-report',
    summary: 'Human rights organizations document concerning conditions faced by those detained for peaceful protest.',
    content: { type: 'markdown', body: '' },
    sourceName: 'Amnesty International',
    imageUrl: 'https://picsum.photos/seed/news6/800/450',
    category: 'human-rights',
    tags: ['political-prisoners', 'human-rights'],
    publishedAt: '2024-09-12T09:00:00Z',
    isFeatured: false,
  },
]

export function getNewsByCategory(category?: string): NewsArticle[] {
  if (!category || category === 'all') return newsArticles
  return newsArticles.filter((n) => n.category === category)
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((n) => n.slug === slug)
}

export function getFeaturedNews(): NewsArticle[] {
  return newsArticles.filter((n) => n.isFeatured)
}
