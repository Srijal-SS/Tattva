import type { AuthoredLesson, Scenario } from "@/types";

export type ClaimKind = "fact" | "interpretation" | "tradition" | "belief";

/** The editor's working copy of a lesson. Everything is a string until it is saved. */
export interface Draft {
  id: string | null;
  title: string;
  categoryId: string;
  description: string;
  minutes: number;
  setting: string;
  setup: string[];
  prompt: string;
  choices: { text: string; outcome: string; ripples: { who: string; effect: string }[] }[];
  perspectives: { who: string; view: string }[];
  principleTitle: string;
  principleBody: string;
  reflection: string;
  challenge: string;
  claims: { kind: ClaimKind; text: string }[];
  sources: { name: string; url: string }[];
}

export const emptyDraft = (categoryId: string): Draft => ({
  id: null,
  title: "",
  categoryId,
  description: "",
  minutes: 5,
  setting: "",
  setup: ["", ""],
  prompt: "What do you do?",
  choices: [0, 1, 2].map(() => ({ text: "", outcome: "", ripples: [{ who: "", effect: "" }, { who: "", effect: "" }] })),
  perspectives: [0, 1, 2].map(() => ({ who: "", view: "" })),
  principleTitle: "",
  principleBody: "",
  reflection: "",
  challenge: "",
  claims: [],
  sources: [],
});

export const draftFrom = ({ lesson, scenario }: AuthoredLesson): Draft => ({
  id: lesson.id,
  title: lesson.title,
  categoryId: lesson.categoryId,
  description: lesson.description,
  minutes: lesson.durationMinutes,
  setting: scenario.setting,
  setup: scenario.setup,
  prompt: scenario.prompt,
  choices: scenario.choices.map((c) => ({ text: c.text, outcome: c.outcome, ripples: c.ripples })),
  perspectives: scenario.perspectives,
  principleTitle: scenario.principle.title,
  principleBody: scenario.principle.body,
  reflection: scenario.reflection,
  challenge: lesson.challenge,
  claims: scenario.claims ?? [],
  sources: scenario.sources ?? [],
});

const filled = (s: string) => s.trim().length > 0;
const LABELLED = /\b(correct|right answer|wrong answer|best choice|good choice|bad choice)\b/i;

export interface Check {
  label: string;
  ok: boolean;
}

/** The content rules from SKILLS.md, as checks the editor shows live. Publishing needs all of them to pass. */
export function checkDraft(d: Draft, isCulture: boolean): Check[] {
  const choices = d.choices.filter((c) => filled(c.text));
  const checks: Check[] = [
    { label: "Has a title and a one-line description", ok: filled(d.title) && filled(d.description) },
    { label: "Set in a named place", ok: filled(d.setting) },
    { label: "The situation is described", ok: d.setup.some(filled) && filled(d.prompt) },
    { label: "Three choices, each with what happens", ok: choices.length === 3 && choices.every((c) => filled(c.outcome)) },
    { label: "Every outcome says who it touches", ok: choices.length > 0 && choices.every((c) => c.ripples.some((r) => filled(r.who) && filled(r.effect))) },
    { label: "No choice is labelled right or wrong", ok: !d.choices.some((c) => LABELLED.test(`${c.text} ${c.outcome}`)) },
    { label: "At least two other points of view", ok: d.perspectives.filter((p) => filled(p.who) && filled(p.view)).length >= 2 },
    { label: "The big idea fits in one sentence", ok: filled(d.principleTitle) && d.principleTitle.length <= 90 && filled(d.principleBody) },
    { label: "Reflection is a question", ok: d.reflection.trim().endsWith("?") },
    { label: "Has a real-world challenge", ok: filled(d.challenge) },
    { label: "Every source has a name and a web link", ok: d.sources.every((s) => filled(s.name) && /^https?:\/\/\S+\.\S+/.test(s.url.trim())) },
  ];
  if (isCulture) {
    checks.push(
      { label: "Culture: every claim is labelled", ok: d.claims.length > 0 && d.claims.every((c) => filled(c.text)) },
      { label: "Culture: at least one source", ok: d.sources.length > 0 }
    );
  }
  return checks;
}

export function toAuthored(d: Draft, id: string, published: boolean): AuthoredLesson {
  const trim = (s: string) => s.trim();
  const scenario: Scenario = {
    lessonId: id,
    setting: trim(d.setting),
    setup: d.setup.map(trim).filter(Boolean),
    prompt: trim(d.prompt),
    choices: d.choices
      .filter((c) => filled(c.text))
      .map((c, i) => ({
        id: "abc"[i] ?? String(i),
        text: trim(c.text),
        outcome: trim(c.outcome),
        ripples: c.ripples.filter((r) => filled(r.who) && filled(r.effect)).map((r) => ({ who: trim(r.who), effect: trim(r.effect) })),
      })),
    perspectives: d.perspectives.filter((p) => filled(p.who) && filled(p.view)).map((p) => ({ who: trim(p.who), view: trim(p.view) })),
    principle: { title: trim(d.principleTitle), body: trim(d.principleBody) },
    reflection: trim(d.reflection),
    ...(d.claims.some((c) => filled(c.text)) && { claims: d.claims.filter((c) => filled(c.text)).map((c) => ({ kind: c.kind, text: trim(c.text) })) }),
    ...(d.sources.length > 0 && { sources: d.sources.map((s) => ({ name: trim(s.name), url: trim(s.url) })) }),
  };
  return {
    scenario,
    lesson: {
      id,
      categoryId: d.categoryId,
      title: trim(d.title),
      slug: trim(d.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      description: trim(d.description),
      ageMin: 10,
      ageMax: 14,
      durationMinutes: d.minutes,
      mediaType: "text",
      content: "",
      challenge: trim(d.challenge),
      points: 10,
      published,
      sortOrder: 100,
      ...(scenario.sources?.[0] && { sourceName: scenario.sources[0].name, sourceUrl: scenario.sources[0].url }),
    },
  };
}
