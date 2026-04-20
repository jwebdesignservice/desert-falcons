-- ============================================================
-- Desert Falcons Collective — Analytics Setup
-- Run this in Supabase SQL Editor AFTER running supabase-portal-setup.sql
-- ============================================================

-- --------------------------------------------------------
-- ANALYTICS EVENTS TABLE
-- --------------------------------------------------------

create table if not exists analytics_events (
  id          uuid primary key default gen_random_uuid(),
  member_id   uuid references auth.users(id) on delete set null,
  event_type  text not null,  -- page_view | resource_download | thread_created | event_rsvp | login
  page        text,           -- e.g. 'dashboard.html', 'discussions.html'
  metadata    jsonb default '{}',
  created_at  timestamptz default now()
);

-- Index for common query patterns
create index if not exists analytics_member_idx    on analytics_events(member_id);
create index if not exists analytics_type_idx      on analytics_events(event_type);
create index if not exists analytics_created_idx   on analytics_events(created_at desc);
create index if not exists analytics_page_idx      on analytics_events(page);

-- RLS
alter table analytics_events enable row level security;

-- Members can insert their own events
create policy "analytics_insert_own" on analytics_events
  for insert to authenticated with check (auth.uid() = member_id);

-- Members can read their own events; core_board/admin can read all
create policy "analytics_select" on analytics_events
  for select to authenticated using (
    auth.uid() = member_id
    or exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- --------------------------------------------------------
-- CONVENIENCE VIEWS (for admin analytics dashboard)
-- --------------------------------------------------------

-- Weekly active members (last 7 days)
create or replace view analytics_weekly_active as
  select count(distinct member_id) as count
  from analytics_events
  where created_at >= now() - interval '7 days';

-- Page view counts by page (last 30 days)
create or replace view analytics_page_views as
  select page, count(*) as views
  from analytics_events
  where event_type = 'page_view'
    and created_at >= now() - interval '30 days'
    and page is not null
  group by page
  order by views desc;

-- Top downloaded resources (last 30 days)
create or replace view analytics_top_resources as
  select
    metadata->>'title' as title,
    count(*) as downloads
  from analytics_events
  where event_type = 'resource_download'
    and created_at >= now() - interval '30 days'
  group by metadata->>'title'
  order by downloads desc
  limit 5;

-- ============================================================
-- NOTE: Views above use security definer for admin reads.
-- For the analytics widget in dashboard.html, queries run
-- through the Supabase JS client as the authenticated user,
-- so the RLS policy above handles access control automatically.
-- ============================================================
