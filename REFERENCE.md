# REFERENCE.md — On-Demand Reference

Not auto-injected. Read when needed. Hard rules, verification protocols, system gotchas.

---

## Hard Rules

- **DON'T TRUST, VERIFY** — Never assume. Check files, test commands, verify processes.
- **NO "DONE" WITHOUT VERIFICATION** — Show results. Confirm deploys visually. Don't just say it worked.
- **ASK BEFORE ASSUMING** — Ambiguous requirement? Ask one sharp question. Don't guess and silently pivot.
- **EXPLICIT APPROVAL FIRST** — No structural or code changes without operator approval.
- No push, deploy, npm install without explicit permission.
- No silent pivots — if the plan changes, say so before acting.
- Build before commit. Always. (`npm run build` must pass clean before any commit.)
- Never commit to main — always a named branch.

---

## Verification Protocols

**Frontend/deploy changes:**
1. Deploy → wait for build complete
2. Check the specific thing that was changed — don't just confirm "it's up"
3. Screenshot or curl the live URL if possible

**DB changes:**
1. Run the migration
2. Query to confirm the data is there
3. Test the API endpoint that uses it

**Code changes (local):**
1. `npm run build` — must pass cleanly with no errors or warnings
2. If running locally: check affected route in browser
3. Commit only after build passes

---

## Platform Gotchas

**Vercel:**
- Env vars added after a deploy don't apply until next deploy. Re-add + fresh deploy.
- Don't use Vercel logs CLI — it hangs. Use try/catch + error responses in code instead.
- `@libsql/client` default import fails on Vercel — use `@libsql/client/node`
- RESEND_API_KEY must be added to Vercel env vars before email integration goes live

**GitHub:**
- Never push directly to main — always branch + PR or branch + operator-approved merge
- Build must pass locally before push
- Remote is `origin` — confirm with `git remote -v` before pushing

**Next.js (App Router):**
- App Router pages go in `src/app/` (not root `app/`) for this project
- Both `Navbar.tsx` AND `Footer.tsx` have separate link arrays — update both when adding routes
- `npm run build` is the source of truth — warnings can cause issues, fix them

**pm2:**
- `pm2 resurrect` restores saved processes on startup
- `pm2 save` must be run after any process changes to persist them
- State file: `C:\Users\Jack\.pm2\dump.pm2`

**Paperclip:**
- API: http://127.0.0.1:3100/api (canonical port — alert if moved to 3101)
- Issue update endpoint: `PATCH /api/issues/{id}` (not `/api/companies/{companyId}/issues/{id}`)
- Wakeup endpoint: `POST /api/agents/{id}/wakeup`
- CLI context must point to 3100: `paperclipai context set --api-base http://127.0.0.1:3100/api`

**OpenClaw:**
- Gateway token: `OPENCLAW_TOKEN` env var (persistent user env, set 2026-03-23)
- Gateway port: 18789
- Config: `C:\Users\Jack\.openclaw\openclaw.json`
- Workspace: `C:\Users\Jack\Desktop\AI Website\htdocs\Websites\Project Manager`

---

## Incidents Log

**2026-03-23** — Oracle session corrupted (broken tool_use chain from Kimi K2 era). Fixed by operator `/reset` in #oracle. Oracle now runs claude-sonnet-4-6.

**2026-03-23** — Paperclip port drift: `paperclipai run` started on 3101 instead of 3100 due to port conflict. Two instances ran simultaneously. Fixed by killing 3101 orphan and standardising on 3100 via pm2.

**2026-03-23** — MEMORY.md had API keys appended — confirmed not tracked in git (gitignored). No leak.
