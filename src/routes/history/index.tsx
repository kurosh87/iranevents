import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageContainer } from '@/components/layout/page-container'
import { HeroSection } from '@/components/layout/hero-section'
import { SectionHeader } from '@/components/layout/section-header'
import { TimelineControls } from '@/components/history/timeline-controls'
import { TimelineGrid } from '@/components/history/timeline-grid'
import { TimelineDetail } from '@/components/history/timeline-detail'
import { getHistoryEventsByCategory, historyEvents } from '@/lib/data/history-data'
import type { HistoryCategory, HistoryEvent } from '@/types'

export const Route = createFileRoute('/history/')({
  component: HistoryPage,
})

function HistoryPage() {
  const [category, setCategory] = useState<HistoryCategory | 'all'>('all')
  const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null)

  const events =
    category === 'all' ? historyEvents : getHistoryEventsByCategory(category)

  return (
    <>
      <HeroSection
        title="History of Iran"
        subtitle="From the world's first empire to the ongoing struggle for freedom - explore 2,500 years of Persian history."
      />
      <PageContainer>
        <div className="space-y-8">
          <div>
            <SectionHeader title="Filter by Era" />
            <TimelineControls selected={category} onSelect={setCategory} />
          </div>

          {selectedEvent && (
            <TimelineDetail
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}

          <div>
            <SectionHeader
              title="Timeline Events"
              subtitle={`${events.length} events`}
            />
            <TimelineGrid
              events={events}
              selectedId={selectedEvent?.id}
              onSelect={setSelectedEvent}
            />
          </div>
        </div>
      </PageContainer>
    </>
  )
}
