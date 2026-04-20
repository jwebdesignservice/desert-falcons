-- ============================================================
-- Desert Falcons Collective — Admin RLS Policies
-- Run this in Supabase SQL Editor to allow core_board/admin
-- to post and manage announcements and project updates
-- ============================================================

-- Allow core_board / admin to INSERT announcements
create policy "admin_insert_announcements" on announcements
  for insert to authenticated
  with check (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Allow core_board / admin to UPDATE announcements (pin/unpin)
create policy "admin_update_announcements" on announcements
  for update to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Allow core_board / admin to DELETE announcements
create policy "admin_delete_announcements" on announcements
  for delete to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Allow core_board / admin to INSERT project updates
create policy "admin_insert_project_updates" on project_updates
  for insert to authenticated
  with check (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Allow core_board / admin to UPDATE project updates (e.g. status change)
create policy "admin_update_project_updates" on project_updates
  for update to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Allow core_board / admin to DELETE project updates
create policy "admin_delete_project_updates" on project_updates
  for delete to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- ============================================================
-- NOTE: Run this once in Supabase SQL Editor.
-- These policies enable the admin posting UI in:
--   portal/announcements.html  (+ New Announcement button)
--   portal/updates.html        (+ Post Update button)
-- Only members with role = 'core_board' or 'admin' can write.
-- ============================================================
