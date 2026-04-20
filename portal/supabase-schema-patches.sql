-- ============================================================
-- Desert Falcons Collective — Schema Patches
-- Run this in Supabase SQL Editor to add missing columns
-- ============================================================

-- --------------------------------------------------------
-- PATCH 1: resources — add uploaded_by column
-- resources.html inserts `uploaded_by: session.user.id`
-- but the original schema omitted this column.
-- --------------------------------------------------------

alter table resources
  add column if not exists uploaded_by uuid references auth.users(id) on delete set null;

-- --------------------------------------------------------
-- PATCH 2: events — add meeting_link and created_by columns
-- events.html inserts meeting_link and created_by fields
-- but the original schema omitted both.
-- --------------------------------------------------------

alter table events
  add column if not exists meeting_link text;

alter table events
  add column if not exists created_by uuid references auth.users(id) on delete set null;

-- --------------------------------------------------------
-- PATCH 3: founders_updates — add author_id column
-- founders-updates.html inserts author_id but original
-- schema did not include this column.
-- --------------------------------------------------------

alter table founders_updates
  add column if not exists author_id uuid references auth.users(id) on delete set null;

-- ============================================================
-- DONE — all missing columns added safely (IF NOT EXISTS).
-- ============================================================
