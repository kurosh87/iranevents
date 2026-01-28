import { cn } from '@/lib/utils'

interface HeroSectionProps {
  title: string
  subtitle?: string
  className?: string
  children?: React.ReactNode
}

export function HeroSection({ title, subtitle, className, children }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative -mx-4 -mt-6 px-4 py-16 md:py-24 lg:py-32',
        'bg-gradient-to-br from-primary/10 via-background to-accent/10',
        className
      )}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
