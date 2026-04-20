-- ============================================================
-- Desert Falcons Collective — get_notifiable_members RPC
-- Called by the notify-members Edge Function to fetch
-- member emails filtered by a notification preference field.
--
-- Run this in Supabase SQL Editor.
-- ============================================================

create or replace function get_notifiable_members(pref_field text)
returns table (
  id         uuid,
  full_name  text,
  email      text
)
language plpgsql
security definer  -- runs as superuser so it can access auth.users
as $$
begin
  return query
    select
      m.id,
      m.full_name,
      u.email
    from members m
    join auth.users u on u.id = m.id
    -- Left join so members with no prefs row default to opted-in (true)
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

-- Grant execute to authenticated and service roles (Edge Function uses service role)
grant execute on function get_notifiable_members(text) to authenticated;
grant execute on function get_notifiable_members(text) to service_role;

-- ============================================================
-- DONE — the notify-members edge function can now call:
--   supabase.rpc('get_notifiable_members', { pref_field: 'new_threads' })
-- and receive a list of { id, full_name, email }.
-- ============================================================
