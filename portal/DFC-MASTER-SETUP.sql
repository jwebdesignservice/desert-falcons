-- ============================================================
-- DESERT FALCONS COLLECTIVE — MASTER DATABASE SETUP
-- Run this entire file once in Supabase SQL Editor
-- ============================================================


-- ============================================================
-- SECTION 1: CORE TABLES
-- ============================================================

create table if not exists members (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        text default 'general',
  location    text,
  bio         text,
  avatar_url  text,
  first_login boolean default true,
  created_at  timestamptz default now()
);

create table if not exists announcements (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text,
  author_id  uuid references auth.users(id) on delete set null,
  pinned     boolean default false,
  created_at timestamptz default now()
);

create table if not exists project_updates (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text,
  category   text,
  status     text default 'in_progress',
  author_id  uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists discussion_threads (
  id         uuid primary key default gen_random_uuid(),
  category   text not null,
  title      text not null,
  body       text,
  author_id  uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists discussion_replies (
  id         uuid primary key default gen_random_uuid(),
  thread_id  uuid references discussion_threads(id) on delete cascade,
  body       text not null,
  author_id  uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists resources (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text,
  file_type   text,
  file_url    text,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at  timestamptz default now()
);

create table if not exists events (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  event_type   text,
  event_date   timestamptz,
  description  text,
  meeting_link text,
  created_by   uuid references auth.users(id) on delete set null,
  created_at   timestamptz default now()
);

create table if not exists event_rsvps (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid references events(id) on delete cascade,
  member_id  uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(event_id, member_id)
);

create table if not exists activity_feed (
  id          uuid primary key default gen_random_uuid(),
  member_id   uuid references auth.users(id) on delete set null,
  action_type text,
  description text,
  link_url    text,
  created_at  timestamptz default now()
);

create table if not exists founders_updates (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  update_type   text default 'written',
  thumbnail_url text,
  content_url   text,
  body          text,
  author_id     uuid references auth.users(id) on delete set null,
  created_at    timestamptz default now()
);


-- ============================================================
-- SECTION 2: SCHEMA PATCHES (safe to re-run)
-- ============================================================

alter table members          add column if not exists avatar_url   text;
alter table resources        add column if not exists uploaded_by  uuid references auth.users(id) on delete set null;
alter table events           add column if not exists meeting_link text;
alter table events           add column if not exists created_by   uuid references auth.users(id) on delete set null;
alter table founders_updates add column if not exists author_id    uuid references auth.users(id) on delete set null;


-- ============================================================
-- SECTION 3: ROW LEVEL SECURITY — ENABLE
-- ============================================================

alter table members            enable row level security;
alter table announcements      enable row level security;
alter table project_updates    enable row level security;
alter table discussion_threads enable row level security;
alter table discussion_replies enable row level security;
alter table resources          enable row level security;
alter table events             enable row level security;
alter table event_rsvps        enable row level security;
alter table activity_feed      enable row level security;
alter table founders_updates   enable row level security;


-- ============================================================
-- SECTION 4: RLS POLICIES — MEMBERS
-- ============================================================

drop policy if exists "members_select" on members;
drop policy if exists "members_insert" on members;
drop policy if exists "members_update" on members;

create policy "members_select" on members for select to authenticated using (true);
create policy "members_insert" on members for insert to authenticated with check (auth.uid() = id);
create policy "members_update" on members for update to authenticated using (auth.uid() = id);


-- ============================================================
-- SECTION 5: RLS POLICIES — READ ALL CONTENT
-- ============================================================

drop policy if exists "read_announcements"    on announcements;
drop policy if exists "read_project_updates"  on project_updates;
drop policy if exists "read_threads"          on discussion_threads;
drop policy if exists "read_replies"          on discussion_replies;
drop policy if exists "read_resources"        on resources;
drop policy if exists "read_events"           on events;
drop policy if exists "read_rsvps"            on event_rsvps;
drop policy if exists "read_activity"         on activity_feed;
drop policy if exists "read_founders_updates" on founders_updates;

create policy "read_announcements"    on announcements     for select to authenticated using (true);
create policy "read_project_updates"  on project_updates   for select to authenticated using (true);
create policy "read_threads"          on discussion_threads for select to authenticated using (true);
create policy "read_replies"          on discussion_replies for select to authenticated using (true);
create policy "read_resources"        on resources         for select to authenticated using (true);
create policy "read_events"           on events            for select to authenticated using (true);
create policy "read_rsvps"            on event_rsvps       for select to authenticated using (true);
create policy "read_activity"         on activity_feed     for select to authenticated using (true);
create policy "read_founders_updates" on founders_updates  for select to authenticated using (true);


-- ============================================================
-- SECTION 6: RLS POLICIES — MEMBER WRITES
-- ============================================================

drop policy if exists "insert_threads"  on discussion_threads;
drop policy if exists "insert_replies"  on discussion_replies;
drop policy if exists "insert_rsvps"    on event_rsvps;
drop policy if exists "insert_activity" on activity_feed;

create policy "insert_threads"  on discussion_threads for insert to authenticated with check (auth.uid() = author_id);
create policy "insert_replies"  on discussion_replies for insert to authenticated with check (auth.uid() = author_id);
create policy "insert_rsvps"    on event_rsvps        for insert to authenticated with check (auth.uid() = member_id);
create policy "insert_activity" on activity_feed      for insert to authenticated with check (auth.uid() = member_id);

-- Realtime on activity feed
alter publication supabase_realtime add table activity_feed;


-- ============================================================
-- SECTION 7: ADMIN WRITE POLICIES — ANNOUNCEMENTS & UPDATES
-- ============================================================

drop policy if exists "admin_insert_announcements"   on announcements;
drop policy if exists "admin_update_announcements"   on announcements;
drop policy if exists "admin_delete_announcements"   on announcements;
drop policy if exists "admin_insert_project_updates" on project_updates;
drop policy if exists "admin_update_project_updates" on project_updates;
drop policy if exists "admin_delete_project_updates" on project_updates;

create policy "admin_insert_announcements" on announcements
  for insert to authenticated
  with check (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_update_announcements" on announcements
  for update to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_delete_announcements" on announcements
  for delete to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_insert_project_updates" on project_updates
  for insert to authenticated
  with check (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_update_project_updates" on project_updates
  for update to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_delete_project_updates" on project_updates
  for delete to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));


-- ============================================================
-- SECTION 8: ADMIN WRITE POLICIES — EVENTS, RESOURCES, FOUNDERS
-- ============================================================

drop policy if exists "admin_insert_events"           on events;
drop policy if exists "admin_update_events"           on events;
drop policy if exists "admin_delete_events"           on events;
drop policy if exists "admin_insert_resources"        on resources;
drop policy if exists "admin_update_resources"        on resources;
drop policy if exists "admin_delete_resources"        on resources;
drop policy if exists "admin_insert_founders_updates" on founders_updates;
drop policy if exists "admin_update_founders_updates" on founders_updates;
drop policy if exists "admin_delete_founders_updates" on founders_updates;

create policy "admin_insert_events" on events
  for insert to authenticated
  with check (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_update_events" on events
  for update to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_delete_events" on events
  for delete to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_insert_resources" on resources
  for insert to authenticated
  with check (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_update_resources" on resources
  for update to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_delete_resources" on resources
  for delete to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_insert_founders_updates" on founders_updates
  for insert to authenticated
  with check (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_update_founders_updates" on founders_updates
  for update to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_delete_founders_updates" on founders_updates
  for delete to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));


-- ============================================================
-- SECTION 9: ADMIN DISCUSSION MODERATION
-- ============================================================

drop policy if exists "admin_delete_threads" on discussion_threads;
drop policy if exists "admin_delete_replies" on discussion_replies;

create policy "admin_delete_threads" on discussion_threads
  for delete to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "admin_delete_replies" on discussion_replies
  for delete to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));


-- ============================================================
-- SECTION 10: JOIN APPLICATIONS TABLE
-- ============================================================

create table if not exists collective_applications (
  id                uuid        primary key default gen_random_uuid(),
  full_name         text,
  email             text        not null,
  phone             text,
  interest          text,
  specialization    text,
  experience        text,
  design_discipline text,
  portfolio_url     text,
  investment_range  text,
  investor_type     text,
  hear_about        text,
  terms_agreed      boolean     default false,
  status            text        default 'pending',
  notes             text,
  reviewed_by       uuid        references auth.users(id) on delete set null,
  reviewed_at       timestamptz,
  created_at        timestamptz default now()
);

alter table collective_applications enable row level security;

drop policy if exists "applications_insert_anon"   on collective_applications;
drop policy if exists "applications_insert_auth"   on collective_applications;
drop policy if exists "applications_select_admin"  on collective_applications;
drop policy if exists "applications_update_admin"  on collective_applications;

create policy "applications_insert_anon" on collective_applications
  for insert to anon with check (true);

create policy "applications_insert_auth" on collective_applications
  for insert to authenticated with check (true);

create policy "applications_select_admin" on collective_applications
  for select to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create policy "applications_update_admin" on collective_applications
  for update to authenticated
  using (exists (select 1 from members where id = auth.uid() and role in ('core_board','admin')));

create index if not exists applications_status_idx  on collective_applications(status);
create index if not exists applications_email_idx   on collective_applications(email);
create index if not exists applications_created_idx on collective_applications(created_at desc);


-- ============================================================
-- SECTION 11: ANALYTICS EVENTS
-- ============================================================

create table if not exists analytics_events (
  id         uuid primary key default gen_random_uuid(),
  member_id  uuid references auth.users(id) on delete set null,
  event_type text not null,
  page       text,
  metadata   jsonb default '{}',
  created_at timestamptz default now()
);

create index if not exists analytics_member_idx  on analytics_events(member_id);
create index if not exists analytics_type_idx    on analytics_events(event_type);
create index if not exists analytics_created_idx on analytics_events(created_at desc);
create index if not exists analytics_page_idx    on analytics_events(page);

alter table analytics_events enable row level security;

drop policy if exists "analytics_insert_own" on analytics_events;
drop policy if exists "analytics_select"     on analytics_events;

create policy "analytics_insert_own" on analytics_events
  for insert to authenticated with check (auth.uid() = member_id);

create policy "analytics_select" on analytics_events
  for select to authenticated using (
    auth.uid() = member_id
    or exists (select 1 from members where id = auth.uid() and role in ('core_board','admin'))
  );


-- ============================================================
-- SECTION 12: NOTIFICATION PREFERENCES + THREAD SUBSCRIPTIONS
-- ============================================================

create table if not exists notification_preferences (
  member_id         uuid primary key references auth.users(id) on delete cascade,
  new_threads       boolean default true,
  new_replies       boolean default true,
  new_announcements boolean default true,
  updated_at        timestamptz default now()
);

alter table notification_preferences enable row level security;

drop policy if exists "np_select_own" on notification_preferences;
drop policy if exists "np_insert_own" on notification_preferences;
drop policy if exists "np_update_own" on notification_preferences;

create policy "np_select_own" on notification_preferences
  for select to authenticated using (auth.uid() = member_id);
create policy "np_insert_own" on notification_preferences
  for insert to authenticated with check (auth.uid() = member_id);
create policy "np_update_own" on notification_preferences
  for update to authenticated using (auth.uid() = member_id);

create table if not exists thread_subscriptions (
  id         uuid primary key default gen_random_uuid(),
  thread_id  uuid references discussion_threads(id) on delete cascade,
  member_id  uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(thread_id, member_id)
);

alter table thread_subscriptions enable row level security;

drop policy if exists "ts_select" on thread_subscriptions;
drop policy if exists "ts_insert" on thread_subscriptions;

create policy "ts_select" on thread_subscriptions for select to authenticated using (true);
create policy "ts_insert" on thread_subscriptions for insert to authenticated with check (auth.uid() = member_id);

-- Auto-subscribe thread author
create or replace function auto_subscribe_thread_author()
returns trigger language plpgsql security definer as $$
begin
  insert into thread_subscriptions (thread_id, member_id)
  values (new.id, new.author_id)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists trg_subscribe_thread_author on discussion_threads;
create trigger trg_subscribe_thread_author
  after insert on discussion_threads
  for each row execute function auto_subscribe_thread_author();

-- Auto-subscribe reply author
create or replace function auto_subscribe_reply_author()
returns trigger language plpgsql security definer as $$
begin
  insert into thread_subscriptions (thread_id, member_id)
  values (new.thread_id, new.author_id)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists trg_subscribe_reply_author on discussion_replies;
create trigger trg_subscribe_reply_author
  after insert on discussion_replies
  for each row execute function auto_subscribe_reply_author();

-- Auto-create notification prefs for new members
create or replace function auto_create_notification_prefs()
returns trigger language plpgsql security definer as $$
begin
  insert into notification_preferences (member_id)
  values (new.id)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists trg_create_notification_prefs on members;
create trigger trg_create_notification_prefs
  after insert on members
  for each row execute function auto_create_notification_prefs();

-- Seed prefs for any existing members
insert into notification_preferences (member_id)
select id from members
on conflict do nothing;


-- ============================================================
-- SECTION 13: get_notifiable_members() RPC
-- ============================================================

create or replace function get_notifiable_members(pref_field text)
returns table (
  id        uuid,
  full_name text,
  email     text
)
language plpgsql
security definer
as $$
begin
  return query
    select
      m.id,
      m.full_name,
      u.email
    from members m
    join auth.users u on u.id = m.id
    left join notification_preferences np on np.member_id = m.id
    where
      case pref_field
        when 'new_threads'       then coalesce(np.new_threads,       true)
        when 'new_replies'       then coalesce(np.new_replies,       true)
        when 'new_announcements' then coalesce(np.new_announcements, true)
        else true
      end = true
    order by m.full_name;
end;
$$;

grant execute on function get_notifiable_members(text) to authenticated;
grant execute on function get_notifiable_members(text) to service_role;


-- ============================================================
-- SECTION 14: SEED DATA
-- ============================================================

insert into announcements (title, body, pinned) values
  ('Design Review Call – March 15',
   'We will be reviewing the initial SAIF exterior design concepts. All members are encouraged to attend. Zoom link will be shared 24 hours before the call. This is our first major collective review session — come prepared with questions.',
   true),
  ('New Investor Joins DFC',
   'We are pleased to welcome a new strategic investor to the collective. A full introduction and briefing will follow in the next investor briefing session.',
   false),
  ('SAIF Concept Gallery Launched',
   'The first internal concept gallery is now live in the Resources section. Designers, please share your feedback and impressions in the Design forum.',
   false)
on conflict do nothing;

insert into project_updates (title, body, category, status) values
  ('Design Phase 1 Complete',
   'Initial exterior design sketches have been completed and reviewed by the founding team. The proportions, stance, and surfacing direction have been approved. Phase 2 will focus on interior concepts.',
   'Design', 'complete'),
  ('Engineering Working Group Formed',
   'Six engineers across powertrain, chassis, and software systems have formally committed to the working group. First technical session scheduled for March 22.',
   'Engineering', 'in_progress'),
  ('Ceer Discussion Initiated',
   'Preliminary outreach to Ceer has begun to explore potential collaboration and knowledge-sharing opportunities. Early stage — no commitments made.',
   'Partnerships', 'pending'),
  ('Seed Round Preparation Underway',
   'The investment materials package is being prepared including financial model, term sheet template, and investor deck. Target close Q3 2026.',
   'Fundraising', 'in_progress')
on conflict do nothing;

insert into events (title, event_type, event_date, description) values
  ('Design Review Call',      'design_review',        now() + interval '11 days', 'Review of SAIF exterior concept designs with the founding team. All members welcome.'),
  ('Engineering Workshop – Powertrain', 'engineering_workshop', now() + interval '18 days', 'Technical deep-dive on powertrain requirements and thermal management. Engineers only.'),
  ('Investor Briefing – Q2 Outlook',   'investor_briefing',    now() + interval '32 days', 'Quarterly update for investor members on project progress, financial position, and roadmap to 2027.')
on conflict do nothing;

insert into resources (title, category, file_type) values
  ('SAIF Design Brief v2',           'design_briefs',      'PDF'),
  ('Battery Pack Specifications',    'engineering_specs',  'Excel'),
  ('Investor Deck – Q1 2026',        'investor_materials', 'PPT'),
  ('March 2026 Working Group Notes', 'meeting_notes',      'PDF'),
  ('DFC Brand Guidelines',           'brand_assets',       'PDF')
on conflict do nothing;

insert into founders_updates (title, update_type, body) values
  ('March 2026 – The Road Ahead', 'written',
   'We have come further in six months than I dared to dream. The collective is growing, the designs are taking shape, and the belief is real. Here is where we stand, and where we are going next. The sword is in our hands. The palm shades our journey.'),
  ('Reflecting on Reema''s Wisdom', 'audio',
   'A personal reflection on the conversation that changed everything, and why her words still drive me every morning. Some lessons you carry for a lifetime.')
on conflict do nothing;

insert into discussion_threads (category, title, body) values
  ('introductions', 'Introduce yourself — who are you and why SAIF?',
   'Welcome to the collective. Tell us who you are, what you bring, and what drew you to this project. Let''s get to know each other.'),
  ('engineering', 'Thoughts on 800V vs 400V architecture?',
   'With the target performance envelope for SAIF, I want to open a discussion on electrical architecture. 800V gives us faster charging and reduced current, but adds complexity. What are the group''s thoughts?'),
  ('design', 'Reference cars and design language — what should SAIF feel like?',
   'I''ve been thinking about the cultural touchpoints we want the exterior to communicate. The brief talks about Saudi identity — how do we express that through form without it feeling literal or decorative?')
on conflict do nothing;

insert into activity_feed (action_type, description) values
  ('joined', 'A new engineer joined the collective'),
  ('posted', 'New thread opened in Engineering: 800V vs 400V architecture'),
  ('shared', 'SAIF Design Brief v2 added to Resources'),
  ('posted', 'New thread opened in Design: Reference cars and design language')
on conflict do nothing;


-- ============================================================
-- ALL DONE
-- ============================================================
-- After running:
--
-- 1. Supabase Dashboard → Authentication → Settings
--    Enable Email/Password sign-in
--
-- 2. Authentication → Users → Invite user (Khalaf's email)
--    After he signs in, run this to give him admin access:
--
--    insert into members (id, full_name, role)
--    values ('<uuid-from-auth-users>', 'Khalaf Althobaiti', 'core_board');
--
-- 3. (Optional) Storage → New Bucket:
--    - avatars   (public)
--    - resources (public)
--    Then run supabase-avatars-setup.sql + supabase-resources-storage.sql
-- ============================================================
