"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { badges } from "@/lib/data/seed-badges";
import { ThemeIcon } from "@/components/ui/theme-icon";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProgressPage() {
  const reduce = useReducedMotion();
  const { state, getCompletedLessonCount, getCompletedChallengeCount, getCategoryProgress, hasBadge } = useDemo();

  const figures = [
    { n: getCompletedLessonCount(), label: "lessons finished" },
    { n: getCompletedChallengeCount(), label: "challenges done in real life" },
    { n: state.profile.streak, label: "days in a row" },
    { n: state.profile.points, label: "points" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-4xl font-semibold">Progress</h1>
      <p className="mt-2 max-w-[56ch] text-lg text-text-secondary">
        What you&apos;ve thought through so far. Not a race: there&apos;s no one to beat here.
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl bg-surface p-6 sm:grid-cols-4 sm:p-8">
        {figures.map((f) => (
          <div key={f.label}>
            <dt className="sr-only">{f.label}</dt>
            <dd>
              <span className="block font-display text-5xl font-light tabular-nums">{f.n}</span>
              <span className="mt-1 block text-text-secondary">{f.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="themes-heading" className="mt-14">
        <h2 id="themes-heading" className="text-2xl font-semibold">
          By theme
        </h2>
        <ul className="mt-6 space-y-5">
          {categories.map((c, i) => {
            const p = getCategoryProgress(c.slug);
            return (
              <li key={c.id} className="grid grid-cols-[2.5rem_1fr] items-center gap-x-4">
                <span className="row-span-2 flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${c.color}1A`, color: c.color }}>
                  <ThemeIcon name={c.icon} className="h-5 w-5" />
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold">{c.name}</span>
                  <span className="text-sm text-text-secondary">
                    {p.total ? `${p.completed} of ${p.total}` : "coming soon"}
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-paper-deep">
                  <motion.div
                    className="h-full origin-left rounded-full"
                    style={{ backgroundColor: c.color }}
                    initial={{ scaleX: reduce ? p.percentage / 100 : 0 }}
                    animate={{ scaleX: p.percentage / 100 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.08 }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="badges-heading" className="mt-14">
        <h2 id="badges-heading" className="text-2xl font-semibold">
          Badges
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {badges.map((b) => {
            const earned = hasBadge(b.id);
            const c = categories.find((x) => x.slug === b.categorySlug);
            return (
              <li key={b.id} className="flex flex-col items-center text-center">
                <span
                  className="flex h-24 w-24 items-center justify-center rounded-full border-[3px]"
                  style={
                    earned
                      ? { backgroundColor: c?.color, borderColor: c?.color, color: "var(--color-paper)" }
                      : { borderColor: "var(--color-line)", borderStyle: "dashed", color: "var(--color-text-tertiary)" }
                  }
                >
                  <ThemeIcon name={b.icon} className="h-10 w-10" strokeWidth={1.5} />
                </span>
                <span className="mt-3 font-bold">{b.name}</span>
                <span className="mt-0.5 text-sm text-text-secondary">{earned ? b.description : b.requirement}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
