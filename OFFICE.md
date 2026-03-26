# OFFICE.md — Operations Manual

## Architecture

**Layer 1 — OpenClaw (the engine)**

Two always-on AI sessions in Discord:
- 🦞 **George** in #george — full access: code, shell, deploys, browser, crons, everything. The executor.
- 🔮 **Oracle** in #oracle — strategy only: web search, read/write files, send messages. No shell. No API calls.

Flow: Jack briefs Oracle → Oracle plans → Oracle messages George → George executes.

**Layer 2 — Paperclip (the task queue)**

11 specialist agents — each is a task TYPE, not a project. Triggered by heartbeat scheduler every 30 min.
Company ID: `c5c50fe7-618c-453f-923b-fcfa7baf6f64` | API: `http://127.0.0.1:3100/api`

**Layer 3 — Nightly crons (autonomous overnight)**

Separate from Paperclip — run on their own schedule. Nightly agents push `nightly/YYYY-MM-DD` branches. **Never auto-merge.** Review in the morning.

→ **Full team roster, every agent's channel ID, model, capabilities, cron IDs, and comms rules: see `AGENT-ROSTER.md`**

---

## How Work Flows

### Operational tasks (code, copy, SEO, etc.)
1. Jack briefs Oracle in #oracle
2. Oracle researches + plans → messages George in #george with task list
3. George creates Paperclip tasks, assigns to right specialist agent
4. Agents pick up tasks, do the work, write output to `paperclip-output/[project]/`
5. Issue set to `in_review` → review-flow cron alerts George in #george
6. Jack replies `approve [TASK-ID]` or `reject [TASK-ID] [feedback]`
7. Approved → output filed, agent moves to next task

### Nightly dev work
- Agent reads AGENT-BRIEF.md + GOTCHAS.md → does one focused task → pushes branch
- Morning synthesis agent reads all reports → posts handover to #general
- You review branches in the morning, merge what's good

---

## Where Outputs Go

Everything lands in `paperclip-output/[project]/`:
- Social posts → `social/[platform]/post-NNN/` (caption.txt + image.png + meta.json)
- Copy → `content/`
- Email sequences → `outreach/sequences/`
- Lead lists → `outreach/leads/`
- Strategy docs → `strategy/`

---

## Paperclip API

- Base URL: `http://127.0.0.1:3100/api`
- Company ID: `c5c50fe7-618c-453f-923b-fcfa7baf6f64`

Key endpoints:
- List issues: `GET /api/companies/{companyId}/issues`
- Create issue: `POST /api/companies/{companyId}/issues`
- Checkout (start): `POST /api/issues/{issueId}/checkout` — always use this, never raw-patch to in_progress
- Update: `PATCH /api/issues/{issueId}`
- Statuses: `backlog` → `todo` → `in_progress` → `in_review` → `done` (also: `blocked`, `cancelled`)

---

## Pre-Task Questions

Before starting ANY new piece of work, ask:
1. **Stage** — Concept / MVP / Launched / Growing?
2. **What exists** — Live URL? Social accounts? Email list? Paying users?
3. **Goal** — What specifically are we trying to achieve?
4. **Action** — ONE thing we want someone to do after seeing this?
5. **Constraints** — Anything off-limits? Budget? Timeline?
6. **Done =** — Draft only, or ready to publish/deploy?

---

## Review Flow

- `in_review` task → review watcher posts alert to #george every 2 min
- Reply: `approve [TASK-ID]` → done + filed
- Reply: `reject [TASK-ID] [feedback]` → resets to todo with feedback, agent retries

---

## Golden Rules

1. Jack approves all external actions (deploys, emails, posts, purchases)
2. No silent failures — if something breaks, alert immediately in #george
3. Ask don't assume — if requirements are unclear, ask one sharp question
4. Never delete channels, modify config, or disable crons without explicit approval
5. One task at a time per agent — finish before starting the next
