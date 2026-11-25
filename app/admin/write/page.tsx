"use client";

import { Suspense, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Circle, Plus, X } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { checkDraft, draftFrom, emptyDraft, toAuthored, type ClaimKind, type Draft } from "@/lib/studio";
import { cn } from "@/lib/utils";

const input =
  "w-full rounded-xl border-2 border-line bg-paper px-3.5 py-2.5 text-base focus:border-primary focus:outline-none";
const KINDS: ClaimKind[] = ["fact", "interpretation", "tradition", "belief"];

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block font-semibold">{label}</span>
      {hint && <span className="mt-0.5 block text-sm text-text-secondary">{hint}</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Section({ n, title, hint, children }: { n: number; title: string; hint?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`s${n}`} className="rounded-3xl bg-surface p-5 sm:p-7">
      <h2 id={`s${n}`} className="flex items-baseline gap-3 text-2xl font-semibold">
        <span className="font-display text-lg font-light text-text-tertiary tabular-nums">{n}</span>
        {title}
      </h2>
      {hint && <p className="mt-1 text-text-secondary">{hint}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-tertiary hover:bg-accent-red-light hover:text-accent-red"
    >
      <X className="h-4 w-4" aria-hidden />
    </button>
  );
}

function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
      <Plus className="h-4 w-4" aria-hidden /> {children}
    </button>
  );
}

function Editor({ initial }: { initial: Draft }) {
  const router = useRouter();
  const { saveAuthored } = useDemo();
  const [d, setD] = useState<Draft>(initial);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));
  const at = <T,>(list: T[], i: number, v: T) => list.map((x, j) => (j === i ? v : x));

  const theme = categories.find((c) => c.id === d.categoryId);
  const isCulture = theme?.slug === "culture";
  const checks = checkDraft(d, isCulture);
  const passing = checks.filter((c) => c.ok).length;
  const ready = passing === checks.length;

  const save = (publish: boolean, preview = false) => {
    if (!d.title.trim()) return;
    const id = d.id ?? `studio-${Date.now().toString(36)}`;
    saveAuthored(toAuthored(d, id, publish));
    setD((p) => ({ ...p, id }));
    if (preview) router.push(`/lesson/${id}`);
    else router.push(`/admin?saved=${encodeURIComponent(d.title.trim())}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-4xl font-semibold">{initial.id ? "Edit lesson" : "Write a lesson"}</h1>
      <p className="mt-2 max-w-[62ch] text-lg text-text-secondary">
        A real situation, three honest choices, and what each one does to the people around it. No choice is the right
        answer; the big idea comes after.
      </p>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_20rem]">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Section n={1} title="The basics">
            <Field label="Title">
              <input className={input} value={d.title} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
              <Field label="Theme">
                <select className={input} value={d.categoryId} onChange={(e) => set("categoryId", e.target.value)}>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Minutes">
                <input
                  className={input}
                  type="number"
                  min={2}
                  max={15}
                  value={d.minutes}
                  onChange={(e) => set("minutes", Number(e.target.value) || 5)}
                />
              </Field>
            </div>
            <Field label="One-line description" hint="Shown in lesson lists.">
              <input className={input} value={d.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
          </Section>

          <Section n={2} title="The situation" hint="Write it as it happens to the child, in the present tense.">
            <Field label="Where and when" hint="For example: Lunch break · school canteen, Pune">
              <input className={input} value={d.setting} onChange={(e) => set("setting", e.target.value)} />
            </Field>
            {d.setup.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <Field label={`Paragraph ${i + 1}`}>
                    <textarea className={input} rows={3} value={p} onChange={(e) => set("setup", at(d.setup, i, e.target.value))} />
                  </Field>
                </div>
                {d.setup.length > 1 && (
                  <div className="pt-8">
                    <RemoveButton label={`Remove paragraph ${i + 1}`} onClick={() => set("setup", d.setup.filter((_, j) => j !== i))} />
                  </div>
                )}
              </div>
            ))}
            {d.setup.length < 4 && <AddButton onClick={() => set("setup", [...d.setup, ""])}>Add a paragraph</AddButton>}
            <Field label="The question">
              <input className={input} value={d.prompt} onChange={(e) => set("prompt", e.target.value)} />
            </Field>
          </Section>

          <Section n={3} title="Three choices" hint="Write each one as something a real 12-year-old might do. Don't hint which is best.">
            {d.choices.map((c, i) => (
              <fieldset key={i} className="rounded-2xl border-2 border-line p-4">
                <legend className="px-1 font-display text-lg font-semibold">{"ABC"[i]}</legend>
                <div className="space-y-4">
                  <Field label="The choice">
                    <input className={input} value={c.text} onChange={(e) => set("choices", at(d.choices, i, { ...c, text: e.target.value }))} />
                  </Field>
                  <Field label="What happens">
                    <textarea
                      className={input}
                      rows={3}
                      value={c.outcome}
                      onChange={(e) => set("choices", at(d.choices, i, { ...c, outcome: e.target.value }))}
                    />
                  </Field>
                  <div>
                    <p className="font-semibold">Who it touches</p>
                    <div className="mt-2 space-y-2">
                      {c.ripples.map((r, ri) => (
                        <div key={ri} className="flex items-center gap-2">
                          <input
                            aria-label={`Choice ${"ABC"[i]}, person ${ri + 1}`}
                            placeholder="Who"
                            className={cn(input, "w-36 shrink-0")}
                            value={r.who}
                            onChange={(e) => set("choices", at(d.choices, i, { ...c, ripples: at(c.ripples, ri, { ...r, who: e.target.value }) }))}
                          />
                          <input
                            aria-label={`Choice ${"ABC"[i]}, effect on person ${ri + 1}`}
                            placeholder="How it affects them"
                            className={input}
                            value={r.effect}
                            onChange={(e) => set("choices", at(d.choices, i, { ...c, ripples: at(c.ripples, ri, { ...r, effect: e.target.value }) }))}
                          />
                          {c.ripples.length > 1 && (
                            <RemoveButton
                              label={`Remove person ${ri + 1} from choice ${"ABC"[i]}`}
                              onClick={() => set("choices", at(d.choices, i, { ...c, ripples: c.ripples.filter((_, j) => j !== ri) }))}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    {c.ripples.length < 3 && (
                      <div className="mt-2">
                        <AddButton onClick={() => set("choices", at(d.choices, i, { ...c, ripples: [...c.ripples, { who: "", effect: "" }] }))}>
                          Add a person
                        </AddButton>
                      </div>
                    )}
                  </div>
                </div>
              </fieldset>
            ))}
          </Section>

          <Section n={4} title="Other points of view" hint="Include someone the child wouldn't think of: the sweeper, the shopkeeper, the younger kid.">
            {d.perspectives.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="grid flex-1 gap-2 sm:grid-cols-[10rem_1fr]">
                  <input
                    aria-label={`View ${i + 1}: who`}
                    placeholder="Who"
                    className={input}
                    value={p.who}
                    onChange={(e) => set("perspectives", at(d.perspectives, i, { ...p, who: e.target.value }))}
                  />
                  <textarea
                    aria-label={`View ${i + 1}: what they say`}
                    placeholder="What they'd say, in their words"
                    rows={2}
                    className={input}
                    value={p.view}
                    onChange={(e) => set("perspectives", at(d.perspectives, i, { ...p, view: e.target.value }))}
                  />
                </div>
                {d.perspectives.length > 2 && (
                  <RemoveButton label={`Remove view ${i + 1}`} onClick={() => set("perspectives", d.perspectives.filter((_, j) => j !== i))} />
                )}
              </div>
            ))}
            {d.perspectives.length < 4 && (
              <AddButton onClick={() => set("perspectives", [...d.perspectives, { who: "", view: "" }])}>Add a view</AddButton>
            )}
          </Section>

          <Section n={5} title="The big idea">
            <Field label="In one sentence" hint={`${d.principleTitle.length} of 90 characters`}>
              <input className={input} value={d.principleTitle} onChange={(e) => set("principleTitle", e.target.value)} />
            </Field>
            <Field label="Why it matters" hint="Two or three sentences. Teach how to think about it, not what to believe.">
              <textarea className={input} rows={3} value={d.principleBody} onChange={(e) => set("principleBody", e.target.value)} />
            </Field>
            <Field label="Reflection question" hint="The child answers this privately. Parents see the question, never the answer.">
              <input className={input} value={d.reflection} onChange={(e) => set("reflection", e.target.value)} />
            </Field>
            <Field label="Real-world challenge" hint="One small thing to try this week.">
              <textarea className={input} rows={2} value={d.challenge} onChange={(e) => set("challenge", e.target.value)} />
            </Field>
          </Section>

          <Section
            n={6}
            title="Claims and sources"
            hint={isCulture ? "Required for Culture: label every claim and say where it comes from." : "Optional for this theme. Add them when the lesson states facts."}
          >
            {d.claims.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <select
                  aria-label={`Claim ${i + 1} kind`}
                  className={cn(input, "w-40 shrink-0 capitalize")}
                  value={c.kind}
                  onChange={(e) => set("claims", at(d.claims, i, { ...c, kind: e.target.value as ClaimKind }))}
                >
                  {KINDS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
                <textarea
                  aria-label={`Claim ${i + 1}`}
                  rows={2}
                  className={input}
                  value={c.text}
                  onChange={(e) => set("claims", at(d.claims, i, { ...c, text: e.target.value }))}
                />
                <RemoveButton label={`Remove claim ${i + 1}`} onClick={() => set("claims", d.claims.filter((_, j) => j !== i))} />
              </div>
            ))}
            <AddButton onClick={() => set("claims", [...d.claims, { kind: "fact", text: "" }])}>Add a claim</AddButton>

            {d.sources.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  aria-label={`Source ${i + 1} name`}
                  placeholder="Name"
                  className={input}
                  value={s.name}
                  onChange={(e) => set("sources", at(d.sources, i, { ...s, name: e.target.value }))}
                />
                <input
                  aria-label={`Source ${i + 1} link`}
                  placeholder="https://"
                  type="url"
                  className={input}
                  value={s.url}
                  onChange={(e) => set("sources", at(d.sources, i, { ...s, url: e.target.value }))}
                />
                <RemoveButton label={`Remove source ${i + 1}`} onClick={() => set("sources", d.sources.filter((_, j) => j !== i))} />
              </div>
            ))}
            <AddButton onClick={() => set("sources", [...d.sources, { name: "", url: "" }])}>Add a source</AddButton>
          </Section>
        </form>

        <aside aria-labelledby="checks-heading" className="rounded-3xl bg-surface p-5 lg:sticky lg:top-24">
          <h2 id="checks-heading" className="font-sans text-lg font-bold">
            Before it goes live
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {passing} of {checks.length} checks pass
          </p>
          <ul className="mt-4 space-y-2.5">
            {checks.map((c) => (
              <li key={c.label} className={cn("flex gap-2.5 text-[15px]", c.ok ? "text-ink" : "text-text-secondary")}>
                {c.ok ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-green" strokeWidth={3} aria-hidden />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary" aria-hidden />
                )}
                <span>
                  <span className="sr-only">{c.ok ? "Done: " : "To do: "}</span>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={() => save(true)}
              disabled={!ready}
              className="w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-text-inverse hover:bg-primary-dark disabled:opacity-40"
            >
              Publish
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => save(false)}
                disabled={!d.title.trim()}
                className="rounded-2xl border-2 border-line px-4 py-2.5 font-semibold hover:border-primary/50 disabled:opacity-40"
              >
                Save draft
              </button>
              <button
                type="button"
                onClick={() => save(false, true)}
                disabled={!d.title.trim()}
                className="rounded-2xl border-2 border-line px-4 py-2.5 font-semibold hover:border-primary/50 disabled:opacity-40"
              >
                Preview
              </button>
            </div>
            {!ready && <p className="text-sm text-text-secondary">Drafts can be saved and previewed any time. Publishing needs every check.</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}

function EditorLoader() {
  const { ready, state } = useDemo();
  const id = useSearchParams().get("id");
  if (!ready) return <p className="mx-auto max-w-6xl px-4 py-12 text-text-secondary">Opening the Studio…</p>;
  const existing = id ? (state.authored ?? []).find((a) => a.lesson.id === id) : undefined;
  if (id && !existing) return <p className="mx-auto max-w-6xl px-4 py-12 text-text-secondary">That lesson isn&apos;t in this browser.</p>;
  return <Editor key={id ?? "new"} initial={existing ? draftFrom(existing) : emptyDraft(categories[0].id)} />;
}

export default function WritePage() {
  return (
    <Suspense fallback={null}>
      <EditorLoader />
    </Suspense>
  );
}
