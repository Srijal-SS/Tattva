# Tattva — Features

Living file. Update the status table every time a feature changes state.
Each feature names the business assumption it helps test. If it tests nothing, question why we're building it.

## MVP goal
Prove two things for 10–14-year-olds in urban India:
1. Children **voluntarily come back** to scenario-based civic and ethical learning.
2. Parents **see value** they'd consider paying for.

North-star metric: **meaningful lesson sessions completed and repeated**, not screen time.

## Themes (aligned with the poster)
Values · Culture · Civic Sense · Life Skills.
Current seed categories (Civic, Environment, Safety, Digital, Money, Social) get mapped into these four as subtopics.

## Lesson anatomy
Situation → Choose → Consequence → Perspectives → Principle → (optional curated video) → Reflect → Real-world challenge

## Status
| # | Feature | Tests assumption | Status |
|---|---|---|---|
| 1 | Landing page (pitch to parent and child) | Parents trust the platform | exists, redesign |
| 2 | Onboarding (name, age, avatar, interests) | Children will engage | exists, redesign |
| 3 | Theme remap to 4 themes | — (consistency) | todo |
| 4 | Scenario lesson player (branching choices + consequences) | Scenario learning improves reasoning | **done** for lessons 1, 7, 8, 9; others fall back to read + quiz |
| 5 | Perspectives strip ("how others see it") | Teaching how, not what | **done** (inside player) |
| 6 | Curated video block with source + age note | Content can be curated responsibly | todo |
| 7 | Culture claim labels + sources | Cultural content curated responsibly | todo |
| 8 | Reflection prompt (free text, private) | Reasoning improves | **done** (localStorage, +5 points) |
| 9 | Real-world challenges | Children will engage | ticket on lesson completion **done**; Challenges page still old |
| 10 | Journey map (learn home) | Children will engage (retention) | exists as list, redesign |
| 11 | Progress, streaks, badges (session-based) | Retention | exists, redesign |
| 12 | Parent view: skills practised + conversation starters | Parents perceive value | exists, redesign |
| 13 | Admin: author scenarios, sources, claim labels | Feasibility | exists, extend |
| 14 | Demo mode (localStorage) | — | exists |
| 15 | Supabase auth + persistence | Digital delivery can scale | later |
| 16 | Light analytics (activation → repeat → challenge done) | All of the above | later |

## Deliberately NOT building (MVP)
Social feed or chat · AI tutor · live classes · every age group · a massive content library · leaderboards against other kids · ads.

## Content seed target
3–4 scenarios per theme (12–16 in total), each reviewed against the rules in SKILLS.md.

## Changelog
- 2026-11-25 — scope set: scenario-first MVP, 4 themes, ages 10–14.
- 2026-11-25 — scenario player + 4 scenarios (`lib/data/seed-scenarios.ts`). Admin can't author scenarios yet.
- 2026-11-25 — completion screen: seal, points breakdown, big idea, challenge ticket, real "Up next" lesson. Fixed demo progress being wiped on reload.
