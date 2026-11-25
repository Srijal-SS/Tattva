# Tattva — Skills, tools & content rules

Living file. Record which tool or library was used for what and why, so we don't add three ways to do one thing.

## Claude skills (when to reach for each)
| Skill | Use for |
|---|---|
| `impeccable` | Shaping and critiquing each screen, polish passes, a11y and hardening, keeping DESIGN.md in sync |
| `design-taste-frontend` | Art direction and the anti-slop check on landing and marketing pages |
| `frontend-design` | Distinctive choices when building new components |
| `transitions-dev` / `transitions-polish` | Concrete UI transitions and motion-token tuning |
| `web-design-guidelines` | Final accessibility and UX review per screen |
| `mobbin:search` / `redesign-screen` | Reference patterns from real kids and education apps (onboarding, progress, parent views) |
| `verification-before-completion` | Run build and lint and check in the browser before calling anything done |

## Libraries
| Library | Status | Use for | Rule |
|---|---|---|---|
| framer-motion | installed | layout and state transitions, consequence reveal | default motion tool |
| lucide-react | installed | fallback icons | restyle to house stroke |
| anime.js | to add | SVG path drawing on the journey map | only if framer can't do it cleanly |
| three.js | maybe | one landing-hero moment | needs a static fallback; skip if it costs over 150 KB |
| Kokonut UI / motion.dev | reference | copy patterns, not whole kits | adapt to our tokens, never ship their default look |
| Dribbble | reference | inspiration only | never copy a shot one to one |

## Pictures
- Found pictures come from open collections via the design-taste skill's `assets.mjs`. They're converted to webp in `public/world/`, and each one is listed in `public/world/credits.json`, which the footer renders. Remove an entry when its picture goes.
- Avoid identifiable children in found photos, and avoid religious symbols used as decoration (one Diwali photo was dropped for this).

## Content sourcing rules
**Good:** Kids Pharmer — age-appropriate, clear, well produced.
**Poor:** School Cinema (`youtube.com/@SchoolCinema`) — moralising, preachy, low production. Avoid.

Every video or claim must pass:
1. **Age fit** for 10–14.
2. **Educational value:** supports the lesson's principle, not just entertainment.
3. **Credibility:** a known creator or institution, with the source visible in the UI.
4. **No preaching:** shows reasoning, doesn't just tell kids what's right.
5. **Culture only:** each claim labelled fact / interpretation / tradition / belief, with region noted; where scholars disagree, show the disagreement.

## Changelog
- 2026-11-25 — created.

## Writing a scenario
- Three choices, none labelled right or wrong; each outcome names who it touches (ripples).
- Three perspectives, including someone the child wouldn't think of (the sweeper, the van worker, the stall owner).
- Set it in a named Indian place, and vary the cities.
- Safety lessons (lost, roads) may show real risk in outcomes, but never graphic harm.
- Culture: every claim gets a kind and the lesson gets sources. If a claim can't be sourced, cut it.
