-- ============================================================
-- Desert Falcons Collective — Portal Database Setup
-- Run this in Supabase SQL Editor
-- ============================================================

-- --------------------------------------------------------
-- TABLES
-- --------------------------------------------------------

-- Member profiles (extends Supabase auth.users)
create table if not exists members (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'general',   -- core_board | working_group | advisor | investor | general
  location text,
  bio text,
  first_login boolean default true,
  created_at timestamptz default now()
);

-- Announcements
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  author_id uuid references auth.users(id) on delete set null,
  pinned boolean default false,
  created_at timestamptz default now()
);

-- Project updates
create table if not exists project_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  category text,   -- Design | Engineering | Partnerships | Fundraising
  status text default 'in_progress',  -- complete | in_progress | pending
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- Discussion threads
create table if not exists discussion_threads (
  id uuid primary key default gen_random_uuid(),
  category text not null,   -- general | engineering | design | investment-strategy | introductions
  title text not null,
  body text,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- Thread replies
create table if not exists discussion_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references discussion_threads(id) on delete cascade,
  body text not null,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- Resources
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,    -- design_briefs | engineering_specs | investor_materials | meeting_notes | brand_assets
  file_type text,   -- PDF | Excel | PPT | Image | CAD
  file_url text,
  created_at timestamptz default now()
);

-- Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_type text,   -- design_review | engineering_workshop | investor_briefing | team_call
  event_date timestamptz,
  description text,
  created_at timestamptz default now()
);

-- Event RSVPs
create table if not exists event_rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  member_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(event_id, member_id)
);

-- Activity feed
create table if not exists activity_feed (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references auth.users(id) on delete set null,
  action_type text,   -- posted | shared | commented | joined
  description text,
  link_url text,
  created_at timestamptz default now()
);

-- Founder's updates
create table if not exists founders_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  update_type text default 'written',  -- video | audio | written
  thumbnail_url text,
  content_url text,
  body text,
  created_at timestamptz default now()
);

-- --------------------------------------------------------
-- ROW LEVEL SECURITY
-- --------------------------------------------------------

alter table members enable row level security;
alter table announcements enable row level security;
alter table project_updates enable row level security;
alter table discussion_threads enable row level security;
alter table discussion_replies enable row level security;
alter table resources enable row level security;
alter table events enable row level security;
alter table event_rsvps enable row level security;
alter table activity_feed enable row level security;
alter table founders_updates enable row level security;

-- Members: read all, update/insert own
create policy "members_select" on members for select to authenticated using (true);
create policy "members_insert" on members for insert to authenticated with check (auth.uid() = id);
create policy "members_update" on members for update to authenticated using (auth.uid() = id);

-- All content: read by any authenticated user
create policy "read_announcements" on announcements for select to authenticated using (true);
create policy "read_project_updates" on project_updates for select to authenticated using (true);
create policy "read_threads" on discussion_threads for select to authenticated using (true);
create policy "read_replies" on discussion_replies for select to authenticated using (true);
create policy "read_resources" on resources for select to authenticated using (true);
create policy "read_events" on events for select to authenticated using (true);
create policy "read_rsvps" on event_rsvps for select to authenticated using (true);
create policy "read_activity" on activity_feed for select to authenticated using (true);
create policy "read_founders_updates" on founders_updates for select to authenticated using (true);

-- Members can insert their own discussions, replies, rsvps, activity
create policy "insert_threads" on discussion_threads for insert to authenticated with check (auth.uid() = author_id);
create policy "insert_replies" on discussion_replies for insert to authenticated with check (auth.uid() = author_id);
create policy "insert_rsvps" on event_rsvps for insert to authenticated with check (auth.uid() = member_id);
create policy "insert_activity" on activity_feed for insert to authenticated with check (auth.uid() = member_id);

-- Enable realtime on activity_feed
alter publication supabase_realtime add table activity_feed;

-- --------------------------------------------------------
-- SEED DATA
-- --------------------------------------------------------

insert into announcements (title, body, pinned) values
  ('Design Review Call – March 15',
   'We will be reviewing the initial SAIF exterior design concepts. All members are encouraged to attend. Zoom link will be shared 24 hours before the call. This is our first major collective review session — come prepared with questions.',
   true),
  ('New Investor Joins DFC',
   'We are pleased to welcome a new strategic investor to the collective. A full introduction and briefing will follow in the next investor briefing session.',
   false),
  ('SAIF Concept Gallery Launched',
   'The first internal concept gallery is now live in the Resources section. Designers, please share your feedback and impressions in the Design forum.',
   false);

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
   'Fundraising', 'in_progress');

insert into events (title, event_type, event_date, description) values
  ('Design Review Call',
   'design_review',
   now() + interval '11 days',
   'Review of SAIF exterior concept designs with the founding team. All members welcome.'),
  ('Engineering Workshop – Powertrain',
   'engineering_workshop',
   now() + interval '18 days',
   'Technical deep-dive session on powertrain requirements and thermal management strategies. Engineers only.'),
  ('Investor Briefing – Q2 Outlook',
   'investor_briefing',
   now() + interval '32 days',
   'Quarterly update for investor members on project progress, financial position, and roadmap to 2027.');

insert into resources (title, category, file_type) values
  ('SAIF Design Brief v2', 'design_briefs', 'PDF'),
  ('Battery Pack Specifications', 'engineering_specs', 'Excel'),
  ('Investor Deck – Q1 2026', 'investor_materials', 'PPT'),
  ('March 2026 Working Group Notes', 'meeting_notes', 'PDF'),
  ('DFC Brand Guidelines', 'brand_assets', 'PDF');

insert into founders_updates (title, update_type, body) values
  ('March 2026 – The Road Ahead',
   'written',
   'We have come further in six months than I dared to dream. The collective is growing, the designs are taking shape, and the belief is real. Here is where we stand, and where we are going next. The sword is in our hands. The palm shades our journey.'),
  ('Reflecting on Reema''s Wisdom',
   'audio',
   'A personal reflection on the conversation that changed everything, and why her words still drive me every morning. Some lessons you carry for a lifetime.');

insert into discussion_threads (category, title, body) values
  ('introductions',
   'Introduce yourself — who are you and why SAIF?',
   'Welcome to the collective. Tell us who you are, what you bring, and what drew you to this project. Let''s get to know each other.'),
  ('engineering',
   'Thoughts on 800V vs 400V architecture?',
   'With the target performance envelope for SAIF, I want to open a discussion on electrical architecture. 800V gives us faster charging and reduced current, but adds complexity. What are the group''s thoughts?'),
  ('design',
   'Reference cars and design language — what should SAIF feel like?',
   'I''ve been thinking about the cultural touchpoints we want the exterior to communicate. The brief talks about Saudi identity — how do we express that through form without it feeling literal or decorative?');

insert into activity_feed (action_type, description) values
  ('joined', 'A new engineer joined the collective'),
  ('posted', 'New thread opened in Engineering: 800V vs 400V architecture'),
  ('shared', 'SAIF Design Brief v2 added to Resources'),
  ('posted', 'New thread opened in Design: Reference cars and design language');

-- --------------------------------------------------------
-- DONE
-- --------------------------------------------------------
-- Next step: In Supabase Auth settings, enable email/password sign-in.
-- Then create your first member via Supabase Auth > Users > Invite user.
-- After they sign in, manually insert their profile:
--   insert into members (id, full_name, role) values ('<uuid>', 'Member Name', 'core_board');
-- ============================================================
