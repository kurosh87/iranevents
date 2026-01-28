-- News articles schema for Iran Events platform
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  source_url TEXT,
  source_name TEXT,
  image_url TEXT,
  category TEXT CHECK (category IN ('news', 'human-rights', 'culture', 'diaspora', 'protest')),
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_news_articles_slug ON news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_articles_published_at ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_featured ON news_articles(is_featured) WHERE is_featured = true;

-- Enable RLS
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "News articles are viewable by everyone"
  ON news_articles FOR SELECT
  USING (true);
