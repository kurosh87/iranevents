import { Button } from '@/components/ui/button'
import { categoryInfo } from '@/lib/data/history-data'
import type { HistoryCategory } from '@/types'
import { cn } from '@/lib/utils'

interface TimelineControlsProps {
  selected: HistoryCategory | 'all'
  onSelect: (category: HistoryCategory | 'all') => void
}

const categories: { value: HistoryCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Eras' },
  { value: 'ancient', label: 'Ancient' },
  { value: 'medieval', label: 'Medieval' },
  { value: 'qajar', label: 'Qajar' },
  { value: 'pahlavi', label: 'Pahlavi' },
  { value: 'revolution', label: 'Revolution' },
  { value: 'islamic-republic', label: 'Islamic Rep.' },
  { value: 'protest', label: 'Protests' },
]

export function TimelineControls({ selected, onSelect }: TimelineControlsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const info = cat.value !== 'all' ? categoryInfo[cat.value] : null
        return (
          <Button
            key={cat.value}
            variant={selected === cat.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(cat.value)}
            className={cn(
              selected === cat.value && info && info.color,
              selected === cat.value && 'text-white'
            )}
          >
            {cat.label}
          </Button>
        )
      })}
    </div>
  )
}
