# Tattva — Design

Living file. Update from what actually shipped, not from intentions. Product truth lives in PRODUCT.md.

## Audience
- **Child, 10–14:** curious and allergic to being lectured. Wants agency, story and visible progress. Not a toddler: no baby UI.
- **Parent:** needs to trust it in 10 seconds. Calm, credible, sourced.

## Direction: "illustrated field journal"
Warm, editorial, storybook. It echoes the poster's hand-drawn warmth but stays restrained: paper, ink, a few confident colours, real typography. It should feel like a beautifully made book, not a generic edtech dashboard.

**Avoid:** generic SaaS gradients, glassmorphism, emoji icons, purple-to-blue hero gradients, card grids with the same weight everywhere, confetti on every click, mascots that talk too much.

## Tokens (shipped in `app/globals.css`)
| Token | Value | Use |
|---|---|---|
| paper | `#FBF6EC` | page background |
| paper-deep | `#F2E8D5` | panels, wells |
| ink | `#231A12` | text, line art |
| ink-soft | `#5E4F42` | secondary text |
| line | `#E3D5BE` | borders, rules |
| primary | `#A3401F` (lotus sienna) | brand, buttons, links, focus |
| chakra | `#1C3263` (navy from the logo's wheel) | the field paper sits on: landing hero, CTA, footer |
| values | `#B8461C` (terracotta) | Values theme |
| culture | `#6E3A8C` (plum) | Culture theme |
| civic | `#0F6B63` (teal) | Civic Sense theme |
| life | `#A87708` (turmeric) | Life Skills theme |

Old class names (`bg-surface`, `text-text-primary`, `bg-primary`, accents) are kept and remapped to these values, so every screen picked up the palette at once. Legacy category colours remain until the theme remap.

Each theme colour has a `-tint` token for wells. Dark mode (not built yet): deep ink paper (`#1A1410`) with the same hues lifted by one step.

## Type
- Display: **Fraunces** (SOFT + opsz axes) via `next/font`, `--font-display`. All h1–h3 globally, plus story text in scenarios.
- Body/UI: **Nunito Sans**, `--font-sans`.
- Scale: 14 / 16 / 18 / 22 / 28 / 36 / 52. Body text in scenarios is 18 minimum.

## Shape & texture
- Radius 14 for cards, 999 for chips. Hand-drawn 1.5px ink outlines on key illustrations.
- Paper grain: inline SVG noise on `body::before` (shipped). Shadows: one warm offset family (`shadow-card`, `-hover`, `-elevated`).

## Icons & illustration
- A house SVG icon set drawn in the same ink line. Lucide is the fallback, restyled to 1.75 stroke.
- Spot illustrations per theme. No stock 3D characters.

## Motion
Motion explains, it never decorates.
- **Consequence reveal (shipped):** outcome, then each ripple, staggered 140 ms; 320 ms, `--ease-out-quint`. Steps cross-fade with 14 px rise. Reduced motion drops the travel.
- **Journey path:** the progress path draws itself in (anime.js SVG line drawing) as lessons complete.
- **Completion seal (shipped):** the one celebratory moment per lesson. The Tattva logo sits inside an ink seal that presses down (scale 1.35→1, rotate −18°→−6°, 450 ms) while its outer ring draws in; points count up. Only on a fresh finish, never on revisits. Generic confetti removed.
- **Feedback:** small spring on selection.
- One optional three.js moment at most (landing hero), with a static fallback.
- `prefers-reduced-motion`: fades only, no travel.

## Components
Shipped: `components/lesson/scenario-player.tsx` (step rail, read-aloud, choice buttons with A/B/C marks, ripple list, other-outcomes disclosure, perspective quotes, principle panel, private reflection).
Shipped: `components/lesson/lesson-complete.tsx` (seal with logo, points + breakdown, big-idea pull quote, badge row, tear-off ChallengeTicket with notched mask and a "Done" ink stamp, "Up next" card linking to the next unfinished lesson).
To build: ClaimLabel (fact / interpretation / tradition / belief) · SourceNote · JourneyMap · ParentInsightCard

## Landing page (shipped)
Idea: **the challenge ticket Tattva hands kids becomes the page.** The hero is a paper ticket with cut corners on the chakra-navy field, with the h1 printed on it and a perforated stub that holds a live, playable scenario (lesson 1). Every later section is another piece of the same stationery: the lesson menu as a scallop-edged sheet on teal, the parent letter with a tear-off strip, a tilted reply card, and a footer that is the back of the card.
- Direction: tasteskill "page is the object" (seed 195632540). The dealt curtain-footer move was dropped because it hid the footer heading.
- Landing buttons: square-cornered (`rounded-sm`), one fill each. No shadows at rest; surfaces separate by tone.
- Pictures (`public/world/`, credited in the footer from `credits.json`): Kharghar station, Johari Bazaar postcard, diyas and rangoli, Jaipur street, samosas. These show the children's world, never Tattva's own users.
- Known tension: the inspector flags the cream paper with sienna as an "assistant palette". It's kept because it's the committed brand, and the navy field carries most of the landing page. Revisit if it starts to read generic.

## App screens (shipped)
- Shell: solid sticky header (logo, nav from `lg`, points pill, sound, avatar); fixed bottom nav below `lg`.
- `ThemeIcon` (`components/ui/theme-icon.tsx`): Scale / Lamp / Landmark / Sprout for the four themes, drawn in the theme colour on a `${color}1A` circle. Badges reuse the same marks.
- `Avatar` (`components/ui/avatar.tsx`): lucide marks in a primary-100 circle, mapped from the `AVATARS` ids. The emoji in data are never rendered.
- Page pattern: h1 + one plain sentence, then sections with h2. No stat-card grids; figures are set large in the display face inside one panel, or as a single line.
- Learn: today's situation card (scenario setup quoted) and one journey path per theme; the path fills only through stops done in order.
- Parents: never shows the child's reflections; shows the situation, its principle and a question to ask at dinner.

## Rules learned
- Global h1–h3 display font lives in `@layer base` so `font-sans` on a heading still wins.
- Text on an SVG circle: set `textLength` to the circumference so the phrase meets itself.

## Changelog
- 2026-11-25 — direction proposed.
- 2026-11-25 — tokens, fonts, grain shipped; scenario player shipped. Nav and other pages still use old layouts (and emoji) under the new palette.
- 2026-11-25 — landing page rebuilt as the ticket (0 inspector FAILs at 1440/768/390).
- 2026-11-25 — lesson completion + challenge ticket shipped; separate "challenge accepted" screen removed.
- 2026-11-25 — all app screens moved to the field-journal style; emoji, gradients and eyebrow pills removed from the app.
