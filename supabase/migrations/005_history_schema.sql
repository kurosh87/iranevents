-- History timeline schema for Iran Events platform
CREATE TABLE IF NOT EXISTS history_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  month INTEGER CHECK (month IS NULL OR (month >= 1 AND month <= 12)),
  day INTEGER CHECK (day IS NULL OR (day >= 1 AND day <= 31)),
  title TEXT NOT NULL,
  title_fa TEXT,
  summary TEXT NOT NULL,
  detailed_content JSONB DEFAULT '{}',
  category TEXT CHECK (category IN ('ancient', 'medieval', 'qajar', 'pahlavi', 'revolution', 'islamic-republic', 'protest')),
  significance INTEGER CHECK (significance BETWEEN 1 AND 5) DEFAULT 3,
  images JSONB DEFAULT '[]',
  sources TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_history_events_year ON history_events(year);
CREATE INDEX IF NOT EXISTS idx_history_events_category ON history_events(category);
CREATE INDEX IF NOT EXISTS idx_history_events_significance ON history_events(significance DESC);

-- Enable RLS
ALTER TABLE history_events ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "History events are viewable by everyone"
  ON history_events FOR SELECT
  USING (true);
