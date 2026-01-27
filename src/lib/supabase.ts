import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      cities: {
        Row: {
          id: string
          name: string
          country: string
          region: string
          coordinates: { lat: number; lng: number }
          timezone: string | null
          poster_url: string | null
          meetup_location: {
            name: string
            address: string
            coordinates: { lat: number; lng: number }
          } | null
        }
        Insert: Omit<Database['public']['Tables']['cities']['Row'], 'id'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['cities']['Row']>
      }
      events: {
        Row: {
          id: string
          city_id: string
          title: string
          date: string
          time: string | null
          description: string | null
          status: string
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['events']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<Database['public']['Tables']['events']['Row']>
      }
      event_images: {
        Row: {
          id: string
          event_id: string
          url: string
          user_id: string
          caption: string | null
          uploaded_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['event_images']['Row'],
          'id' | 'uploaded_at'
        >
        Update: Partial<Database['public']['Tables']['event_images']['Row']>
      }
      chat_messages: {
        Row: {
          id: string
          event_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['chat_messages']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<Database['public']['Tables']['chat_messages']['Row']>
      }
    }
  }
}
