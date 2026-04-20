-- ============================================================
-- Desert Falcons Collective — Resources Storage Setup
-- Run this in Supabase SQL Editor
-- Then create the storage bucket manually (see NOTE below)
-- ============================================================

-- ============================================================
-- STORAGE BUCKET SETUP (do this in Supabase Dashboard UI):
--
-- 1. Go to Storage > New Bucket
-- 2. Name: resources
-- 3. Public bucket: YES (tick "Public bucket")
-- 4. Click Create
--
-- Then add these RLS policies on the bucket via SQL:
-- ============================================================

-- Allow core_board / admin to upload resources
create policy "resources_upload_admin"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'resources'
    and exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Allow core_board / admin to update (replace) resources
create policy "resources_update_admin"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'resources'
    and exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Allow core_board / admin to delete resources from storage
create policy "resources_delete_admin"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'resources'
    and exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Allow all authenticated members to read/download resources (bucket is public)
create policy "resources_read_authenticated"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'resources');

-- ============================================================
-- NOTE: Run this SQL file first, then create the bucket in
-- the Supabase Dashboard (Storage > New Bucket > resources).
-- The portal/resources.html file upload will work after both
-- steps are complete.
-- Files are stored at path: {userId}/{timestamp}-{filename}
-- ============================================================
