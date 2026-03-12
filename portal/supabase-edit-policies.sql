-- ============================================================
-- Desert Falcons Collective — Admin INSERT/UPDATE/DELETE Policies
-- for events, resources, and founders_updates
-- Run this in Supabase SQL Editor
-- ============================================================

-- ---- EVENTS ----

create policy "admin_insert_events" on events
  for insert to authenticated
  with check (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

create policy "admin_update_events" on events
  for update to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

create policy "admin_delete_events" on events
  for delete to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- ---- RESOURCES ----

create policy "admin_insert_resources" on resources
  for insert to authenticated
  with check (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

create policy "admin_update_resources" on resources
  for update to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

create policy "admin_delete_resources" on resources
  for delete to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- ---- FOUNDERS UPDATES ----

create policy "admin_insert_founders_updates" on founders_updates
  for insert to authenticated
  with check (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

create policy "admin_update_founders_updates" on founders_updates
  for update to authenticated
  using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

create policy "admin_delete_founders_updates" on founders_updates
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
-- These policies enable INSERT/UPDATE/DELETE for admins on:
--   portal/events.html            (Create/Edit/Delete events)
--   portal/resources.html         (Upload/Edit/Delete resources)
--   portal/founders-updates.html  (Post/Edit/Delete founder updates)
-- Only members with role = 'core_board' or 'admin' can write.
-- ============================================================
