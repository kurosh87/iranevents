import { createFileRoute } from '@tanstack/react-router'
import { PageContainer } from '@/components/layout/page-container'
import { HeroSection } from '@/components/layout/hero-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Users, BookOpen, Heart } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const values = [
  {
    icon: Globe,
    title: 'Global Community',
    description:
      'Connecting Iranians and allies across 63+ cities worldwide, building bridges between diaspora communities.',
  },
  {
    icon: Users,
    title: 'Solidarity',
    description:
      'Supporting the ongoing struggle for freedom in Iran by amplifying voices and keeping the world informed.',
  },
  {
    icon: BookOpen,
    title: 'Education',
    description:
      'Helping non-Iranians understand the rich history, vibrant culture, and current situation in Iran.',
  },
  {
    icon: Heart,
    title: 'Cultural Preservation',
    description:
      'Celebrating and preserving Persian traditions, language, and heritage for future generations.',
  },
]

function AboutPage() {
  return (
    <>
      <HeroSection
        title="About Iran Events"
        subtitle="A platform connecting the Iranian diaspora and educating the world about Iran."
      />
      <PageContainer>
        <div className="space-y-12 max-w-4xl mx-auto">
          <section className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>Our Mission</h2>
            <p>
              Iran Events was created to serve two interconnected purposes: to
              help the Iranian diaspora stay connected with each other and their
              heritage, and to help non-Iranians understand the truth about Iran
              - its magnificent history, rich culture, and the ongoing struggle
              of its people for freedom and human rights.
            </p>
            <p>
              Since September 2022, the world has witnessed the courage of
              Iranian people standing up for their fundamental rights under the
              banner of "Woman, Life, Freedom" (Zan, Zendegi, Azadi). This
              platform aims to keep that story alive, provide context through
              history, and help supporters around the world find ways to show
              solidarity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Our Values
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <value.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>What You'll Find Here</h2>
            <ul>
              <li>
                <strong>Events:</strong> Weekly meetups in cities around the
                world where Iranians and supporters gather.
              </li>
              <li>
                <strong>News:</strong> Curated updates about Iran, human rights
                developments, and diaspora community news.
              </li>
              <li>
                <strong>Articles:</strong> Educational content about Iranian
                culture, history, and how to support the movement.
              </li>
              <li>
                <strong>History:</strong> An interactive timeline spanning 2,500
                years of Persian civilization.
              </li>
            </ul>
          </section>

          <section className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>Get Involved</h2>
            <p>
              Whether you're part of the Iranian diaspora looking to connect
              with your community, or someone who wants to learn more and show
              support, there are many ways to get involved:
            </p>
            <ul>
              <li>Find and attend a meetup in your city</li>
              <li>Share news and articles to raise awareness</li>
              <li>Learn about Iranian history and culture</li>
              <li>Reach out to organize events in your area</li>
            </ul>
          </section>

          <section className="text-center py-8 rounded-lg bg-muted/50">
            <p className="text-2xl font-semibold text-primary mb-2">
              زن، زندگی، آزادی
            </p>
            <p className="text-lg text-muted-foreground">
              Woman, Life, Freedom
            </p>
          </section>
        </div>
      </PageContainer>
    </>
  )
}
