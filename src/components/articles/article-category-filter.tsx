import { Button } from '@/components/ui/button'

interface ArticleCategoryFilterProps {
  selected: string
  onSelect: (category: string) => void
}

const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'culture', label: 'Culture' },
  { value: 'history', label: 'History' },
  { value: 'society', label: 'Society' },
  { value: 'politics', label: 'Politics' },
  { value: 'diaspora', label: 'Diaspora' },
  { value: 'guide', label: 'Guides' },
]

export function ArticleCategoryFilter({ selected, onSelect }: ArticleCategoryFilterProps) {
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
