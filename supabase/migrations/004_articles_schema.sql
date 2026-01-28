-- Articles/blog schema for educational content
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  author_name TEXT,
  cover_image TEXT,
  category TEXT CHECK (category IN ('culture', 'history', 'society', 'politics', 'diaspora', 'guide')),
  tags TEXT[] DEFAULT '{}',
  read_time_minutes INTEGER,
  published_at TIMESTAMPTZ,
  is_draft BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_draft ON articles(is_draft);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public read access for published articles
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (is_draft = false);
