# AGENT-BRIEF — Desert Falcons

## What This Project Is
A static HTML/CSS/JS website for Desert Falcons. Multi-page site targeting designers, engineers, investors, and founders. Supabase integration present.

## Current Priority
Full site audit — review every page, check for broken links, inconsistencies, missing content, UX issues. Produce a prioritised fix list in DEV-IN-PROGRESS.md.

## Context
- No framework — vanilla HTML/CSS/JS only
- Pages: index, designers, engineers, investors, founders-story, vision, join, legal, privacy-policy, terms-of-use
- Brand/tone not yet confirmed by operators — do NOT write new copy
- Supabase present — do not modify DB schema

## Nightly Agent Rules (hard policy — no exceptions)

- Always create a fresh `nightly/YYYY-MM-DD` branch from latest `main` before touching anything
- NEVER commit to main. NEVER merge to main. NEVER deploy.
- Use the iteration loop: make changes → validate (check files, no broken HTML/JS) → pass = commit, fail = revert + try different approach
- Max 5 iterations, 45-minute budget. If nothing ships, document in GOTCHAS.md and report failure.
- Branch stays isolated until operators approve in the morning via synthesis handover.

## Off-Limits
- Do not modify supabase-setup.sql
- Do not write new marketing copy (brand not confirmed)
- Do not commit to main without operator review
- Do not add npm/node dependencies

## Tech Stack
- Framework: None (vanilla)
- Database: Supabase
- Deploy: TBC
- Languages: HTML, CSS, JavaScript

## Read Before Starting
- GOTCHAS.md ← always
- DEV-IN-PROGRESS.md (if exists)
