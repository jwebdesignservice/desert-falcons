# Desert Falcons Collective — Supabase Setup Guide

Run these SQL files in Supabase SQL Editor **in order**.

---

## Step 1 — Core Schema (REQUIRED)

Run this first. Creates all core tables + RLS + seed data.

```
supabase-portal-setup.sql
```

---

## Step 2 — Schema Patches (REQUIRED)

Adds missing columns (`uploaded_by`, `meeting_link`, `created_by`, `author_id`).

```
supabase-schema-patches.sql
```

---

## Step 3 — Join Applications Table (REQUIRED)

Creates the `collective_applications` table. Without this the join form silently fails.

```
supabase-applications-setup.sql
```

---

## Step 4 — Admin Write Policies (REQUIRED)

Allows core_board / admin to create, edit, and delete announcements and project updates.

```
supabase-admin-rls.sql
```

---

## Step 5 — Admin Policies for Events / Resources / Founders Updates (REQUIRED)

```
supabase-edit-policies.sql
```

---

## Step 6 — Admin Moderation: Discussions (REQUIRED)

Allows admins to delete any thread or reply.

```
supabase-discussions-admin.sql
```

---

## Step 7 — Analytics (RECOMMENDED)

Creates the `analytics_events` table used by the dashboard analytics widget.

```
supabase-analytics-setup.sql
```

---

## Step 8 — Email Notifications (RECOMMENDED)

Creates `notification_preferences` + `thread_subscriptions` tables + triggers.

```
supabase-notifications-setup.sql
```

---

## Step 9 — Notifiable Members RPC (RECOMMENDED)

Creates the `get_notifiable_members(pref_field)` stored procedure used by the Edge Function.

```
supabase-rpc-notifiable-members.sql
```

---

## Step 10 — Avatar Storage (OPTIONAL)

Adds `avatar_url` column to members. Then manually create the `avatars` storage bucket in Supabase Dashboard.

```
supabase-avatars-setup.sql
```

Then in Supabase Dashboard → Storage:
- Create bucket: `avatars` (public)

---

## Step 11 — Resource File Storage (OPTIONAL)

Adds RLS policies for file uploads. Then manually create the `resources` storage bucket.

```
supabase-resources-storage.sql
```

Then in Supabase Dashboard → Storage:
- Create bucket: `resources` (public)

---

## Step 12 — Email Edge Function (OPTIONAL)

Deploy the notification edge function via Supabase CLI:

```bash
supabase functions deploy notify-members
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
supabase secrets set FROM_EMAIL=portal@desertfalconscollective.com
supabase secrets set PORTAL_URL=https://your-domain.com/portal
```

Then in Supabase Dashboard → Database → Webhooks, create 3 webhooks:

| Name                        | Table                | Event  | URL                                                         |
|-----------------------------|----------------------|--------|-------------------------------------------------------------|
| new_thread_notification     | discussion_threads   | INSERT | https://[ref].supabase.co/functions/v1/notify-members       |
| new_reply_notification      | discussion_replies   | INSERT | https://[ref].supabase.co/functions/v1/notify-members       |
| new_announcement_notification | announcements      | INSERT | https://[ref].supabase.co/functions/v1/notify-members       |

Headers for each: `Authorization: Bearer <anon-key>`

---

## First Member Setup

After running Steps 1–6:

1. In Supabase Dashboard → Authentication → Users → **Invite user**
2. The invited user signs in, triggering an auth record
3. In SQL Editor, insert their profile:

```sql
insert into members (id, full_name, role)
values ('<uuid-from-auth>', 'Khalaf Althobaiti', 'core_board');
```

Replace `<uuid-from-auth>` with the UUID shown in Authentication → Users.

---

## Summary

| Step | File | Required? |
|------|------|-----------|
| 1 | supabase-portal-setup.sql | ✅ Yes |
| 2 | supabase-schema-patches.sql | ✅ Yes |
| 3 | supabase-applications-setup.sql | ✅ Yes |
| 4 | supabase-admin-rls.sql | ✅ Yes |
| 5 | supabase-edit-policies.sql | ✅ Yes |
| 6 | supabase-discussions-admin.sql | ✅ Yes |
| 7 | supabase-analytics-setup.sql | ⭐ Recommended |
| 8 | supabase-notifications-setup.sql | ⭐ Recommended |
| 9 | supabase-rpc-notifiable-members.sql | ⭐ Recommended |
| 10 | supabase-avatars-setup.sql | Optional |
| 11 | supabase-resources-storage.sql | Optional |
| 12 | Edge Function + Webhooks | Optional |
