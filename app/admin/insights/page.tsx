"use client";

import { Download } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { summarise } from "@/lib/insights";
import { cn } from "@/lib/utils";

export default function InsightsPage() {
  const { ready, state, lessons, scenarios, clearEvents } = useDemo();
  if (!ready) return <p className="mx-auto max-w-6xl px-4 py-12 text-text-secondary">Opening Insights…</p>;

  const events = state.events ?? [];
  const s = summarise(events, lessons);

  const download = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "tattva-events.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const questions = [
    {
      q: "Do children finish a lesson once they start?",
      big: `${s.finishRate}%`,
      a: `${s.finished} of the ${s.started} lessons opened have been finished.`,
    },
    {
      q: "Do they come back?",
      big: String(s.activeDays),
      a: s.activeDays > 1 ? `Active on ${s.activeDays} different days, so ${s.activeDays - 1} return visits.` : "Only one day so far.",
    },
    {
      q: "Do they try it in real life?",
      big: `${s.tryRate}%`,
      a: `${s.challenges} real-world challenges done, after ${s.finished} finished lessons.`,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold">Insights</h1>
          <p className="mt-2 max-w-[62ch] text-lg text-text-secondary">
            How Tattva is being used in this browser. Reflections are never recorded, only whether one was written.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-line px-4 py-2.5 font-semibold hover:border-primary/50"
          >
            <Download className="h-4 w-4" aria-hidden /> Download events
          </button>
          <button
            type="button"
            onClick={() => window.confirm("Clear all recorded events? Progress and lessons stay.") && clearEvents()}
            className="rounded-2xl px-4 py-2.5 font-semibold text-text-secondary hover:bg-accent-red-light hover:text-accent-red"
          >
            Clear
          </button>
        </div>
      </div>

      <section aria-labelledby="q-heading" className="mt-10">
        <h2 id="q-heading" className="sr-only">
          The three questions
        </h2>
        <ol className="divide-y divide-line overflow-hidden rounded-3xl bg-surface">
          {questions.map((x, i) => (
            <li key={x.q} className="grid items-center gap-x-6 gap-y-1 p-5 sm:grid-cols-[1fr_8rem] sm:p-7">
              <div>
                <h3 className="font-sans text-lg font-bold">
                  <span className="mr-2 font-display font-light text-text-tertiary">{i + 1}</span>
                  {x.q}
                </h3>
                <p className="mt-1 text-text-secondary">{x.a}</p>
              </div>
              <p className="font-display text-5xl font-light tabular-nums sm:text-right">{x.big}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="days-heading" className="mt-12">
        <h2 id="days-heading" className="text-2xl font-semibold">
          The last two weeks
        </h2>
        <ol className="mt-5 grid grid-cols-7 gap-2 sm:grid-cols-14">
          {s.last14.map((d) => (
            <li key={d.key} className="flex flex-col items-center gap-1.5">
              <span
                title={d.long}
                className={cn(
                  "flex aspect-square w-full max-w-12 items-center justify-center rounded-xl text-sm font-bold tabular-nums",
                  d.finished > 0 ? "bg-primary text-text-inverse" : d.visited ? "bg-primary-100 text-primary-dark" : "border-2 border-dashed border-line text-transparent"
                )}
              >
                {d.finished > 0 ? d.finished : ""}
                <span className="sr-only">
                  {d.long}: {d.finished > 0 ? `${d.finished} lessons finished` : d.visited ? "opened, nothing finished" : "not opened"}
                </span>
              </span>
              <span aria-hidden className="text-xs text-text-tertiary">
                {d.label}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-primary" /> lessons finished (number)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-primary-100" /> opened only
          </span>
        </p>
      </section>

      <section aria-labelledby="choices-heading" className="mt-12">
        <h2 id="choices-heading" className="text-2xl font-semibold">
          What children choose
        </h2>
        <p className="mt-1 max-w-[62ch] text-text-secondary">
          First picks and retries both count. None of these is the right answer; a lean towards one tells you what to talk
          about.
        </p>
        {s.perLesson.length === 0 ? (
          <p className="mt-4 text-text-secondary">Nothing played yet.</p>
        ) : (
          <ul className="mt-5 space-y-4">
            {s.perLesson.map(({ lesson, opened, finished, reflections, choices }) => {
              const theme = categories.find((c) => c.id === lesson.categoryId);
              const sc = scenarios[lesson.id];
              const total = Object.values(choices).reduce((a, b) => a + b, 0);
              return (
                <li key={lesson.id} className="rounded-2xl bg-surface p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-sans text-lg font-bold">{lesson.title}</h3>
                    <p className="text-sm text-text-secondary">
                      opened {opened} · finished {finished} · {reflections} reflections written
                    </p>
                  </div>
                  {sc && total > 0 ? (
                    <>
                      <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-paper-deep" aria-hidden>
                        {sc.choices.map((c, i) => (
                          <span
                            key={c.id}
                            style={{ width: `${((choices[c.id] ?? 0) / total) * 100}%`, backgroundColor: theme?.color, opacity: [1, 0.6, 0.3][i] }}
                          />
                        ))}
                      </div>
                      <ul className="mt-3 space-y-1">
                        {sc.choices.map((c, i) => (
                          <li key={c.id} className="flex gap-3 text-[15px]">
                            <span className="w-12 shrink-0 font-bold tabular-nums" style={{ color: theme?.color }}>
                              {Math.round(((choices[c.id] ?? 0) / total) * 100)}%
                            </span>
                            <span>
                              <span className="font-semibold">{"ABC"[i]}.</span> {c.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-text-secondary">No choices recorded for this lesson yet.</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
