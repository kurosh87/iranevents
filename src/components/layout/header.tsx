import { Link } from '@tanstack/react-router'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/tanstack-start'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar } from 'lucide-react'

const clerkEnabled = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function AuthSection() {
  if (!clerkEnabled) {
    return (
      <Button variant="outline" size="sm" disabled>
        Sign In (Configure Clerk)
      </Button>
    )
  }

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="default" size="sm">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-8 w-8',
            },
          }}
        />
      </SignedIn>
    </>
  )
}

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Iran Events</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
            >
              <MapPin className="h-4 w-4" />
              Cities
            </Link>
            <Link
              to="/cities"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
            >
              <Calendar className="h-4 w-4" />
              All Events
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <AuthSection />
        </div>
      </div>
    </header>
  )
}
