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

      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_50%),_0_2px_4px_rgb(0_0_0_/_30%)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg text-white md:text-xl lg:text-2xl font-medium [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  )
}
