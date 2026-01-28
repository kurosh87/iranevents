export interface Coordinates {
  lat: number
  lng: number
}

export interface MeetupLocation {
  name: string
  address: string
  coordinates: Coordinates
}

export type Region = 'europe' | 'north-america' | 'oceania'

export interface City {
  id: string
  name: string
  country: string
  region: Region
  coordinates: Coordinates
  timezone?: string
  posterUrl?: string
  meetupLocation?: MeetupLocation
}

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export interface Event {
  id: string
  cityId: string
  title: string
  date: string
  time?: string
  description?: string
  status: EventStatus
  createdAt: string
}

export interface EventImage {
  id: string
  eventId: string
  url: string
  userId: string
  caption?: string
  uploadedAt: string
}

export interface ChatMessage {
  id: string
  eventId: string
  userId: string
  userName?: string
  userImageUrl?: string
  content: string
  createdAt: string
}

export type NewsCategory = 'news' | 'human-rights' | 'culture' | 'diaspora' | 'protest'

export interface NewsArticle {
  id: string
  title: string
  slug: string
  summary: string
  content: Record<string, unknown>
  sourceUrl?: string
  sourceName?: string
  imageUrl?: string
  category: NewsCategory
  tags: string[]
  publishedAt: string
  isFeatured: boolean
}

export type ArticleCategory = 'culture' | 'history' | 'society' | 'politics' | 'diaspora' | 'guide'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: Record<string, unknown>
  authorName?: string
  coverImage?: string
  category: ArticleCategory
  tags: string[]
  readTimeMinutes?: number
  publishedAt?: string
  isDraft: boolean
}

export type HistoryCategory = 'ancient' | 'medieval' | 'qajar' | 'pahlavi' | 'revolution' | 'islamic-republic' | 'protest'

export interface HistoryEvent {
  id: string
  year: number
  month?: number
  day?: number
  title: string
  titleFa?: string
  summary: string
  detailedContent?: Record<string, unknown>
  category: HistoryCategory
  significance: 1 | 2 | 3 | 4 | 5
  images: string[]
  sources: string[]
}
