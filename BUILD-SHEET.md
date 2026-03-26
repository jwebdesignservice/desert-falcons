# BUILD-SHEET.md — Project Registry
*Last updated: 2026-03-23*

Dev layer. Repos, stacks, live URLs, local paths, nightly agent status.
Business/marketing layer → see `paperclip-output/[project]/DOSSIER.md`

---

## Primrose Ever Care

| | |
|---|---|
| **Status** | Live |
| **Live URL** | https://primrose-ever-care.vercel.app |
| **Repo** | github.com/jwebdesignservice/Primrose-evercare |
| **Branch** | main |
| **Local** | C:\Users\Jack\Desktop\AI Website\htdocs\Websites\primrose-ever-care |
| **Stack** | Next.js (App Router), Tailwind CSS, Vercel |
| **DB** | None (static/SSG) |
| **Nightly agent** | ✅ yes — cron `379c10e8` — 2:00am GMT |
| **DOSSIER** | paperclip-output/primrose-ever-care/DOSSIER.md |

**Key commands:**
```powershell
cd "C:\Users\Jack\Desktop\AI Website\htdocs\Websites\primrose-ever-care"
npm run dev          # local dev
npm run build        # build check (must pass before commit)
vercel --prod --token $env:VERCEL_TOKEN  # deploy to production
```

**Pages live on main:**
Homepage, Contact, Services, About, Cookies Policy, Cookie Banner, Areas We Cover, Complaints, Privacy Policy, Safeguarding

**Active blockers:**
- Resend API key not in Vercel env vars — contact form will build but not send emails until added

**Tonight's nightly task:** Contact form email integration (Resend)

---

## Desert Falcons

| | |
|---|---|
| **Status** | Dev (live URL TBC) |
| **Live URL** | TBC |
| **Repo** | github.com/jwebdesignservice/desert-falcons |
| **Branch** | main |
| **Local** | C:\Users\Jack\Desktop\AI Website\htdocs\Websites\desert-falcons |
| **Stack** | Vanilla HTML/CSS/JS, Supabase |
| **DB** | Supabase (see portal/DFC-MASTER-SETUP.sql) |
| **Nightly agent** | ✅ yes — cron `0a760b2a` — 2:30am GMT |
| **DOSSIER** | paperclip-output/desert-falcons/DOSSIER.md |

**Key commands:**
```powershell
cd "C:\Users\Jack\Desktop\AI Website\htdocs\Websites\desert-falcons"
# No build step — vanilla HTML. Open index.html in browser to test.
```

**Active blockers:**
- Brand/tone not confirmed by operators — copy and SEO tasks blocked
- Deployment hosting TBC

**Tonight's nightly task:** Full site audit (public pages + portal)

---

## Parked Projects

| Project | URL | Stack | Repo | Notes |
|---|---|---|---|---|
| Memory Market | — | Next.js, Solana | — | Devnet complete, mainnet TBC |
| KOL Vault | https://kol-vault.vercel.app | — | — | Trading intelligence |
| Buy The Whip | https://buy-the-whip.vercel.app | — | — | Car marketplace |

---

## Cron Schedule (GMT)

| Time | Job | Cron ID |
|---|---|---|
| Every 2 min | Review flow watcher | 24aabe70 |
| Every 30 min | Heartbeat scheduler (Paperclip agents) | f6bb708a |
| 2:00am | Primrose nightly agent | 379c10e8 |
| 2:30am | Desert Falcons nightly agent | 0a760b2a |
| 4:00am | Synthesis + morning handover | 4bfaf407 |
| 11:00pm | Workspace git commit | 33a5f89a |

---

## Paperclip

- Company: JWebDesign Operations (`c5c50fe7-618c-453f-923b-fcfa7baf6f64`)
- API: http://127.0.0.1:3100/api
- UI: http://127.0.0.1:3100
- Process: pm2 (paperclip) — auto-restarts, state saved

### Agent IDs
| Agent | ID |
|---|---|
| George (board) | 874ac1d0-a390-40ff-8c0f-8e4e09622f0a |
| Dev | f93dc400-e141-4130-bac1-21db16803e9d |
| Copywriter | 861e3ef0-65f9-43f2-b0f5-63e73ebb96aa |
| Scriptwriter | 34403575-0491-4750-9bca-065223efbc6f |
| Social | 42dbde88-f0a4-48fd-ae0a-38ecdbea4ae8 |
| SEO | af5632b0-50a3-4c57-9448-74eb900e8f87 |
| Marketing | 4b295d83-bbec-4b42-a08a-a127ddc9bba3 |
| Ads | 39dac44c-8f58-4525-bc98-82105115aee7 |
| Outreach | 750e1aeb-d589-462f-afca-453fa4ca2964 |
| Analytics | d087e120-8162-4fed-bb44-3cd91e25d509 |
| Video | 1ae5bdf9-5884-47c2-b467-64b225d76f4f |
| Visual Director | 35d45b16-ab3d-45ca-b3be-9d9e7f150762 |

### Project IDs
| Project | ID |
|---|---|
| Primrose Ever Care | bff2b0fb-3e19-40d0-9b15-c838ae971f1b |
| Desert Falcons | b388d57f-6207-4f72-8679-938611089ef9 |

---

## Quick Reference — All Active Projects

| Project | URL | Stack | Repo | Nightly |
|---|---|---|---|---|
| Primrose Ever Care | https://primrose-ever-care.vercel.app | Next.js, Vercel | Primrose-evercare | ✅ 2am |
| Desert Falcons | TBC | Vanilla, Supabase | desert-falcons | ✅ 2:30am |
