import { Button } from '@/components/ui/button'

interface NewsCategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'news', label: 'News' },
  { value: 'human-rights', label: 'Human Rights' },
  { value: 'culture', label: 'Culture' },
  { value: 'diaspora', label: 'Diaspora' },
  { value: 'protest', label: 'Protest' },
]

export function NewsCategoryFilter({ selected, onSelect }: NewsCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat.value}
          variant={selected === cat.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(cat.value)}
        >
          {cat.label}
        </Button>
      ))}
    </div>
  )
}
