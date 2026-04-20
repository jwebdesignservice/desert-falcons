-- ============================================================
-- Desert Falcons Collective — Admin Moderation: Discussions
-- Run this in Supabase SQL Editor
-- Allows core_board / admin to delete threads and replies
-- ============================================================

-- Admin can delete any discussion thread (cascades to replies via FK)
create policy "admin_delete_threads" on discussion_threads
  for delete to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Admin can delete any discussion reply
create policy "admin_delete_replies" on discussion_replies
  for delete to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- ============================================================
-- NOTE: Run once in Supabase SQL Editor.
-- After running, admins (role = core_board or admin) will see
-- a "Delete Thread" button on threads and "Delete" on replies
-- in portal/discussions.html.
-- ============================================================
