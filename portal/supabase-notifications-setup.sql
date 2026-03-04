-- ============================================================
-- Desert Falcons Collective — Email Notifications Setup
-- Run this in Supabase SQL Editor AFTER running supabase-portal-setup.sql
-- ============================================================

-- --------------------------------------------------------
-- NOTIFICATION PREFERENCES
-- --------------------------------------------------------

create table if not exists notification_preferences (
  member_id          uuid primary key references auth.users(id) on delete cascade,
  new_threads        boolean default true,
  new_replies        boolean default true,
  new_announcements  boolean default true,
  updated_at         timestamptz default now()
);

-- RLS: members can only read/write their own prefs
alter table notification_preferences enable row level security;

create policy "np_select_own" on notification_preferences
  for select to authenticated using (auth.uid() = member_id);

create policy "np_insert_own" on notification_preferences
  for insert to authenticated with check (auth.uid() = member_id);

create policy "np_update_own" on notification_preferences
  for update to authenticated using (auth.uid() = member_id);

-- --------------------------------------------------------
-- THREAD SUBSCRIPTIONS
-- Members are auto-subscribed to threads they create or reply to.
-- This lets the edge function know who to notify on new replies.
-- --------------------------------------------------------

create table if not exists thread_subscriptions (
  id        uuid primary key default gen_random_uuid(),
  thread_id uuid references discussion_threads(id) on delete cascade,
  member_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(thread_id, member_id)
);

alter table thread_subscriptions enable row level security;

create policy "ts_select" on thread_subscriptions for select to authenticated using (true);
create policy "ts_insert" on thread_subscriptions for insert to authenticated with check (auth.uid() = member_id);

-- Auto-subscribe thread author when thread is created
create or replace function auto_subscribe_thread_author()
returns trigger language plpgsql security definer as $$
begin
  insert into thread_subscriptions (thread_id, member_id)
  values (new.id, new.author_id)
  on conflict do nothing;
  return new;
end;
$$;

create or replace trigger trg_subscribe_thread_author
  after insert on discussion_threads
  for each row execute function auto_subscribe_thread_author();

-- Auto-subscribe reply author when they post a reply
create or replace function auto_subscribe_reply_author()
returns trigger language plpgsql security definer as $$
begin
  insert into thread_subscriptions (thread_id, member_id)
  values (new.thread_id, new.author_id)
  on conflict do nothing;
  return new;
end;
$$;

create or replace trigger trg_subscribe_reply_author
  after insert on discussion_replies
  for each row execute function auto_subscribe_reply_author();

-- --------------------------------------------------------
-- SEED: Create default notification preferences for all existing members
-- --------------------------------------------------------

insert into notification_preferences (member_id)
select id from members
on conflict do nothing;

-- Also create prefs for new members automatically
create or replace function auto_create_notification_prefs()
returns trigger language plpgsql security definer as $$
begin
  insert into notification_preferences (member_id)
  values (new.id)
  on conflict do nothing;
  return new;
end;
$$;

create or replace trigger trg_create_notification_prefs
  after insert on members
  for each row execute function auto_create_notification_prefs();

-- ============================================================
-- NEXT STEPS — Supabase Dashboard Setup:
--
-- 1. Deploy the Edge Function:
--    supabase functions deploy notify-members
--
-- 2. Set Edge Function secrets:
--    supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
--    supabase secrets set FROM_EMAIL=portal@desertfalconscollective.com
--    supabase secrets set PORTAL_URL=https://your-domain.com/portal
--
-- 3. Add Database Webhooks in Supabase Dashboard → Database → Webhooks:
--    Webhook 1: new_thread_notification
--      Table: discussion_threads | Event: INSERT
--      URL: https://<project-ref>.supabase.co/functions/v1/notify-members
--      Headers: Authorization: Bearer <anon-key>
--
--    Webhook 2: new_reply_notification
--      Table: discussion_replies | Event: INSERT
--      URL: https://<project-ref>.supabase.co/functions/v1/notify-members
--      Headers: Authorization: Bearer <anon-key>
--
--    Webhook 3: new_announcement_notification
--      Table: announcements | Event: INSERT
--      URL: https://<project-ref>.supabase.co/functions/v1/notify-members
--      Headers: Authorization: Bearer <anon-key>
--
-- ============================================================
