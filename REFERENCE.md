# REFERENCE.md — SOPs & Extended Procedures

Read this when you need the full detail on a specific operation. Not auto-injected — load on demand.

---

## Project Execution Flow

1. Operators brief Oracle directly in #oracle
2. Oracle breaks brief into tasks, sends structured task list to George
3. George creates tasks in Paperclip (`paperclipai issue create`) and assigns to correct agent
4. Heartbeat scheduler triggers agents with inbox items
5. Agents execute → output in `paperclip-output/[project]/` → mark task `in_review`
6. Review watcher fires → operators approve/reject in #george
7. On approval → George executes Merge SOP

**George's role:** create Paperclip tasks, execute merges. Not strategic planning, not building code outside merge flow.

**Create task command:**
```
paperclipai issue create \
  --company-id c5c50fe7-618c-453f-923b-fcfa7baf6f64 \
  --project-id [id] \
  --title "[title]" \
  --description "[full brief]" \
  --priority [high|medium|low] \
  --assignee-agent-id [agentId] \
  --status todo
```

**George → Oracle handoff:**
Oracle ignores bot messages. To brief Oracle:
1. Write brief to `oracle-workspace/[BRIEF-NAME].md`
2. Tell operator to message Oracle: "Read [BRIEF-NAME].md"

---

## Merge SOP

Trigger: operator types `merge nightly/YYYY-MM-DD` (or with `[project]`). No action without this command.

1. Identify project (if ambiguous, ask one question)
2. Verify branch exists: `git fetch origin && git log origin/nightly/YYYY-MM-DD --oneline -5`
3. Build on nightly branch: `git checkout nightly/YYYY-MM-DD && npm run build` — if fails, stop and report
4. Merge: `git checkout main && git pull origin main && git merge nightly/YYYY-MM-DD --no-ff -m "merge: nightly/YYYY-MM-DD — [description]"` — conflict? report exact files, do NOT auto-resolve, stop
5. Build on main: `npm run build` — if fails: `git reset --hard HEAD~1`, report
6. Push: `git push origin main`
7. Deploy: `vercel --prod --token $env:VERCEL_TOKEN` — report live URL
8. Update Paperclip: mark relevant issues `done`
9. Post to #george: `✅ Merged nightly/YYYY-MM-DD → main | Live: [url] | Issues closed: [list]`

**Hard rules:**
- NEVER merge without explicit operator command
- NEVER deploy without passing post-merge build
- NEVER auto-resolve conflicts

---

## Reject SOP

Trigger: `reject nightly/YYYY-MM-DD [reason]`

1. `git push origin --delete nightly/YYYY-MM-DD`
2. Post to #george: `🗑 nightly/YYYY-MM-DD rejected — [reason]. Issue sent back to todo.`
3. Reset Paperclip issue to `todo` with rejection reason as comment

---

## Nightly Agent Policy

Applies to every nightly agent, every project, every shift.

**Isolation:**
- Work ONLY on `nightly/YYYY-MM-DD` branch from latest `main`
- NEVER commit to `main`. NEVER merge. NEVER deploy.

**Iteration loop:**
1. Make changes
2. `npm run build`
3. Pass → commit to nightly branch, report, stop
4. Fail → `git checkout .`, analyse, try different approach
5. Max 5 iterations / 45 min budget
6. No passing build after 5 → document in `GOTCHAS.md`, report failure, do NOT commit broken code

**Morning merge gate:**
- Synthesis reads nightly output at 4am, posts summary to #george
- Operators approve (`merge nightly/YYYY-MM-DD`) or reject (`reject nightly/YYYY-MM-DD [reason]`)
- Nothing reaches main without explicit operator approval

---

## Code & Structural Changes

Read → Understand → Propose → Approval → Execute.

1. Read relevant files first
2. Check source of truth (actual code, not docs)
3. State what you found and what you plan — wait for approval
4. Never create new folder structures without confirming nothing already handles it
