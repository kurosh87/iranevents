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
        'relative -mx-4 -mt-6 overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0">
        <img
          src="/hero-banner.jpg"
          alt="Iran Revolution"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-block rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 md:px-12 md:py-8 shadow-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base text-white/90 md:text-lg lg:text-xl drop-shadow-md">
                {subtitle}
              </p>
            )}
          </div>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
