-- Desert Falcons Collective — Applications Table
-- Run this in Supabase SQL Editor

create table if not exists collective_applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  full_name       text not null,
  email           text not null,
  phone           text,
  interest        text not null,
  specialization  text,
  experience      text,
  design_discipline text,
  portfolio_url   text,
  investment_range text,
  investor_type   text,
  hear_about      text,
  terms_agreed    boolean default false
);

-- Enable Row Level Security
alter table collective_applications enable row level security;

-- Allow anyone (anon) to INSERT (submit the form)
create policy "Allow public inserts"
  on collective_applications
  for insert
  to anon
  with check (true);

-- Only authenticated (admin) users can SELECT / read applications
create policy "Allow authenticated reads"
  on collective_applications
  for select
  to authenticated
  using (true);
