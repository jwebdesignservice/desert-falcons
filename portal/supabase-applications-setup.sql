-- ============================================================
-- Desert Falcons Collective — Join Applications Table
-- Run this in Supabase SQL Editor BEFORE launching the join form
-- ============================================================

-- --------------------------------------------------------
-- COLLECTIVE APPLICATIONS TABLE
-- Receives submissions from the public join.html form.
-- The form uses the anon key (unauthenticated), so the INSERT
-- policy must allow the anon role.
-- --------------------------------------------------------

create table if not exists collective_applications (
  id                uuid        primary key default gen_random_uuid(),
  full_name         text,
  email             text        not null,
  phone             text,
  interest          text,       -- engineer | designer | investor | advisor | general
  specialization    text,
  experience        text,
  design_discipline text,
  portfolio_url     text,
  investment_range  text,
  investor_type     text,
  hear_about        text,
  terms_agreed      boolean     default false,
  status            text        default 'pending',  -- pending | approved | rejected
  notes             text,       -- admin review notes
  reviewed_by       uuid        references auth.users(id) on delete set null,
  reviewed_at       timestamptz,
  created_at        timestamptz default now()
);

-- --------------------------------------------------------
-- ROW LEVEL SECURITY
-- --------------------------------------------------------

alter table collective_applications enable row level security;

-- Public (anon) can INSERT — the join form is not behind auth
create policy "applications_insert_anon" on collective_applications
  for insert to anon with check (true);

-- Authenticated members can also insert (edge case: logged-in user fills form)
create policy "applications_insert_auth" on collective_applications
  for insert to authenticated with check (true);

-- Only core_board / admin can read applications
create policy "applications_select_admin" on collective_applications
  for select to authenticated using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- Only core_board / admin can update status / notes
create policy "applications_update_admin" on collective_applications
  for update to authenticated using (
    exists (
      select 1 from members
      where id = auth.uid()
      and role in ('core_board', 'admin')
    )
  );

-- --------------------------------------------------------
-- INDEXES
-- --------------------------------------------------------

create index if not exists applications_status_idx  on collective_applications(status);
create index if not exists applications_email_idx   on collective_applications(email);
create index if not exists applications_created_idx on collective_applications(created_at desc);

-- ============================================================
-- DONE
-- The join form (join.html + join-form.js) now has a valid table.
-- Review submissions at: portal/applications.html (admin-only)
-- ============================================================
