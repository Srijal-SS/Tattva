@AGENTS.md

# Tattva — working notes for Claude

Living file. Update it when a convention, command or architectural fact changes.
Companion docs: [DESIGN.md](DESIGN.md) (look & motion), [FEATURES.md](FEATURES.md) (scope & status), [SKILLS.md](SKILLS.md) (which tool/skill/library for what, content rules).

## What Tattva is
A learning layer beyond academics for Indian children aged **10–14**: ethical reasoning, civic sense, culture and life skills.
**Scenario-first:** a child meets a real situation, chooses, sees consequences, compares perspectives, then learns the principle. Curated video supports a lesson; it never *is* the lesson.
Child = user. Parent = (hypothesised) paying customer. We teach *how to reason*, never *what to believe*.

## Stack
- Next.js 16.3 (App Router) — read `node_modules/next/dist/docs/` before using any Next API; it differs from older versions.
- React 19, TypeScript, Tailwind v4 (tokens in `app/globals.css` via `@theme`), framer-motion, lucide-react.
- Supabase packages are installed but **not wired**. All state lives in `lib/demo-context.tsx` (React context persisted to `localStorage`).

## Layout
- `app/page.tsx` landing · `app/login`, `app/signup`, `app/onboarding`
- `app/(app)/` signed-in shell: `learn`, `explore`, `lesson/[id]`, `challenges`, `progress`, `profile`, `parents`
- `app/admin/` Studio: lesson list; `app/admin/write` scenario editor (rules in `lib/studio.ts`)
- `lib/data/seed-*.ts` seed content · `types/index.ts` all shared types · `lib/audio.ts` UI sounds · `lib/utils.ts` `cn`, ids, slugs

## Commands
```bash
npm run dev
```
```bash
npm run build
```
```bash
npm run lint
```

## Rules
- Colours, fonts, radii and motion values come from tokens in `globals.css`. No hex values inside components.
- No emoji as icons in the UI. Use the house SVG icon set (see DESIGN.md).
- Every lesson must cite its sources; culture content labels each claim (fact / interpretation / tradition / belief).
- Respect `prefers-reduced-motion` and keyboard access on every interactive piece.
- Don't add a dependency for something a few lines can do; check SKILLS.md before adding a library.
- Keep demo mode working. Supabase comes later behind the same context API.
- Read lessons and scenarios from `useDemo()` (seed + Studio-written), not straight from `lib/data/seed-*`. Only the landing page uses the seed files directly.
