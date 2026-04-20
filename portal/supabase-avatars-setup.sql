-- ============================================================
-- Desert Falcons Collective — Avatar Storage Setup
-- Run this in Supabase SQL Editor
-- Then create the storage bucket manually (see NOTE below)
-- ============================================================

-- Add avatar_url column to members table
alter table members
  add column if not exists avatar_url text;

-- ============================================================
-- STORAGE BUCKET SETUP (do this in Supabase Dashboard UI):
--
-- 1. Go to Storage > New Bucket
-- 2. Name: avatars
-- 3. Public bucket: YES (tick "Public bucket")
-- 4. Click Create
--
-- Then add these RLS policies on the bucket via SQL:
-- ============================================================

-- Allow authenticated users to upload their own avatar
create policy "avatar_upload_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to update (upsert) their own avatar
create policy "avatar_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow public read on all avatars (bucket is public)
create policy "avatar_read_public"
  on storage.objects for select
  to public
  using (bucket_id = 'avatars');

-- ============================================================
-- NOTE: Run this SQL file first, then create the bucket in
-- the Supabase Dashboard (Storage > New Bucket > avatars).
-- The portal/settings.html avatar upload will work after both
-- steps are complete.
-- ============================================================
