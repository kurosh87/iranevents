import { cn } from '@/lib/utils'

interface ContentGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function ContentGrid({ children, columns = 3, className }: ContentGridProps) {
  const colsClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-6', colsClass[columns], className)}>
      {children}
    </div>
  )
}
