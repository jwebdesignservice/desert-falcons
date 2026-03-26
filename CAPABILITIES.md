# CAPABILITIES.md — What We Can Do
*Last updated: 2026-03-23*

Read this when context is thin or a new session starts. This is the system handbook.

---

## 🤖 George — Main Agent

**Core capabilities:**
- Write, edit, debug code (JS/TS, Next.js, Tailwind, HTML/CSS, Python, shell, SQL)
- Run shell commands, manage files, read/write any local file
- Deploy to Vercel (jwebdesignservice account, team: jack-wilsons-projects-79c1513c)
- Manage GitHub repos (commit, push, branch, PR, gh CLI)
- Control pm2 processes (start, stop, restart, logs)
- Schedule and manage OpenClaw cron jobs
- Send/read Discord messages, create/edit channels
- Web fetch (public URLs)
- Analyse images and PDFs
- Manage OpenClaw config and restart
- Create and manage Paperclip tasks (via API at port 3100)

**Memory system:**
- `MEMORY.md` — hard facts (people, credentials, decisions, IDs)
- `memory/YYYY-MM-DD.md` — daily logs
- `CURRENT.md` — live project state
- `CAPABILITIES.md` — this file
- `BUILD-SHEET.md` — project registry (code layer)

**Must-reads on startup:** CURRENT.md → memory/today.md → AGENTS.md → AGENT-ROSTER.md

---

## 🔮 Oracle — Strategy & Research (#oracle channel)

- Research, competitive analysis, strategy docs
- Breaks work into tasks, writes structured task lists for George
- Creates briefs for Paperclip agents via George (Oracle cannot reach localhost APIs)
- Model: Claude Sonnet (anthropic/claude-sonnet-4-6)
- CANNOT: exec shell, call localhost APIs directly, deploy, modify config, run cron

→ **Full agent details, channel IDs, and capabilities: see `AGENT-ROSTER.md`**

---

## 🛠️ Paperclip Agents (task-specialists — NOT per-project)

All 11 agents run Claude Sonnet via `claude_local` adapter with `dangerouslySkipPermissions: true`.
Triggered by heartbeat scheduler (every 30 min) when inbox has work.
Output goes to: `paperclip-output/[project]/`
Paperclip UI: http://127.0.0.1:3100
Company ID: c5c50fe7-618c-453f-923b-fcfa7baf6f64

→ **Full agent roster, IDs, API keys, and task types: see `AGENT-ROSTER.md`**

---

## 🌙 Nightly Agents

**Policy:** All nightly work on `nightly/YYYY-MM-DD` branch. Nothing merges to main without explicit operator approval. See Merge SOP in AGENTS.md.

**Iteration loop (autoresearch):** make changes → build → pass=commit, fail=revert+different approach → max 5 iterations, 45min budget.

→ **Full nightly agent schedule, cron IDs, and channel IDs: see `AGENT-ROSTER.md`**

---

## 🧰 Skills (custom — C:\Users\Jack\.openclaw\skills\)

| Skill | Triggers on |
|---|---|
| george-craft | "write code", coding standards, stack preferences |
| deploy | "deploy", "ship this", Vercel + Railway workflow |
| morning-report | "gm", "good morning" |
| project-dev-primrose | "work on primrose", Primrose dev context |
| project-dev-desert-falcons | "work on desert falcons", Desert Falcons dev context |
| github (built-in) | PR status, CI runs, issues, gh CLI |
| skill-creator (built-in) | "create a skill", "improve this skill" |

---

## 🏗️ Running Infrastructure

| Service | Port | Process | Status |
|---|---|---|---|
| Paperclip API | 3100 | pm2 (paperclip) | ✅ online |
| OpenClaw Gateway | 18789 | daemon | ✅ online |
| PostgreSQL (Paperclip) | 54329 | embedded | ✅ online |

**pm2 startup:** VBS in Windows startup folder → `pm2 resurrect` on login
**pm2 state:** `C:\Users\Jack\.pm2\dump.pm2`

---

## 🚀 Live Projects

### Primrose Ever Care (https://primrose-ever-care.vercel.app)
- What it is: Domiciliary home care website for Aminah Carew, serving Medway/North Kent
- Stack: Next.js (App Router), Tailwind CSS, Vercel
- Repo: github.com/jwebdesignservice/Primrose-evercare (branch: main)
- Local: C:\Users\Jack\Desktop\AI Website\htdocs\Websites\primrose-ever-care
- Nightly: ✅ Contact form email integration (tonight)
- Status: All pages live. Only remaining task: Resend email integration (JWE-2)

### Desert Falcons (TBC)
- What it is: Multi-page static site — designers, engineers, investors, founders audience
- Stack: Vanilla HTML/CSS/JS, Supabase
- Repo: github.com/jwebdesignservice/desert-falcons (branch: main)
- Local: C:\Users\Jack\Desktop\AI Website\htdocs\Websites\desert-falcons
- Nightly: ✅ Full site audit (tonight)
- Status: Built. Brand/tone pending operator sign-off before copy work.

---

## 🗓️ Active Crons

| Name | Schedule | What it does | ID |
|---|---|---|---|
| Review watcher | Every 2 min | Checks in_review tasks, posts alerts, processes approve/reject | 24aabe70 |
| **Failsafe** | — | #🔴〡errors (1485697827324825611) — all cron failures post here | — |
| Heartbeat scheduler | Every 30 min | Checks agent inboxes, triggers Claude Code heartbeats | f6bb708a |
| Primrose nightly | 2:00am GMT | Builds features on nightly branch (autoresearch loop) | 379c10e8 |
| Desert Falcons nightly | 2:30am GMT | Audits/fixes on nightly branch | 0a760b2a |
| Synthesis handover | 4:00am GMT | Reads nightly reports, updates CURRENT/AGENT-BRIEF, posts handover | 4bfaf407 |
| Daily git commit | 11:00pm GMT | Auto-commits workspace to craft.git | 33a5f89a |

---

## 👥 Operators

- **wils** (Jack Wilson) — Discord: jackwilson7 | ID: 809133430315024384 | GitHub: jwebdesignservice | Vercel: jwebdesignservice
- **JMoon** — Discord: jmoon_174 | ID: 1370781720563024089

Both have full trust and equal authority.
