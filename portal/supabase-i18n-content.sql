-- ─────────────────────────────────────────────────────────────────────────────
-- DFC Portal — Bilingual Content Migration (English + Arabic)
-- Run this ONCE against your Supabase project to add _ar columns.
-- DO NOT modify DFC-MASTER-SETUP.sql or supabase-setup.sql.
-- ─────────────────────────────────────────────────────────────────────────────

-- announcements
ALTER TABLE announcements
  ADD COLUMN IF NOT EXISTS title_ar TEXT,
  ADD COLUMN IF NOT EXISTS body_ar  TEXT;

-- events
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS title_ar       TEXT,
  ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- resources
ALTER TABLE resources
  ADD COLUMN IF NOT EXISTS title_ar TEXT;

-- founders_updates
ALTER TABLE founders_updates
  ADD COLUMN IF NOT EXISTS title_ar   TEXT,
  ADD COLUMN IF NOT EXISTS content_ar TEXT;

-- project_updates
ALTER TABLE project_updates
  ADD COLUMN IF NOT EXISTS title_ar   TEXT,
  ADD COLUMN IF NOT EXISTS content_ar TEXT;

-- discussion_threads
ALTER TABLE discussion_threads
  ADD COLUMN IF NOT EXISTS title_ar TEXT,
  ADD COLUMN IF NOT EXISTS body_ar  TEXT;
