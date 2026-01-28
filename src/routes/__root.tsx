import type { ReactNode } from 'react'
import {
  HeadContent,
  Scripts,
  Outlet,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ClerkProvider } from '@clerk/tanstack-react-start'
import { Analytics } from '@vercel/analytics/react'
import { Header } from '@/components/layout/header'

import appCss from '../styles.css?url'
import leafletCss from 'leaflet/dist/leaflet.css?url'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Iran Revolution - Protests Worldwide',
      },
      {
        name: 'description',
        content:
          'Join protests worldwide in solidarity with Iran. Find events in 40+ cities standing with the people of Iran.',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: leafletCss,
      },
    ],
  }),
  component: RootComponent,
})

function ClerkWrapper({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey) {
    return <>{children}</>
  }
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {children}
    </ClerkProvider>
  )
}

function RootComponent() {
  return (
    <ClerkWrapper>
      <RootDocument>
        <Header />
        <Outlet />
      </RootDocument>
    </ClerkWrapper>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
