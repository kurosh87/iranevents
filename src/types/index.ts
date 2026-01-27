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
