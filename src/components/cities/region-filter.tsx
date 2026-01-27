import type { Region } from '@/types'
import { regionLabels } from '@/lib/cities-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface RegionFilterProps {
  value: Region | 'all'
  onChange: (value: Region | 'all') => void
}

export function RegionFilter({ value, onChange }: RegionFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by region" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Regions</SelectItem>
        {(Object.entries(regionLabels) as [Region, string][]).map(
          ([region, label]) => (
            <SelectItem key={region} value={region}>
              {label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  )
}
