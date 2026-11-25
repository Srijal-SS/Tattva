"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Flame, MapPin } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { lessons } from "@/lib/data/seed-lessons";
import { categories } from "@/lib/data/seed-categories";
import { scenarios } from "@/lib/data/seed-scenarios";
import { Avatar } from "@/components/ui/avatar";
import { ThemeIcon } from "@/components/ui/theme-icon";

const EASE = [0.22, 1, 0.36, 1] as const;

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function LearnPage() {
  const reduce = useReducedMotion();
  const { state, isLessonCompleted } = useDemo();
  const profile = state.profile;
  const published = lessons.filter((l) => l.published);

  // Prefer an unfinished scenario lesson for today; fall back to any unfinished lesson.
  const today =
    published.find((l) => scenarios[l.id] && !isLessonCompleted(l.id)) ??
    published.find((l) => !isLessonCompleted(l.id));
  const todayTheme = today && categories.find((c) => c.id === today.categoryId);
  const todayScenario = today && scenarios[today.id];
  const done = published.filter((l) => isLessonCompleted(l.id)).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Greeting */}
      <div className="flex items-center gap-4">
        <Avatar id={profile.avatar} className="h-14 w-14" />
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {greeting()}, {profile.name}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 text-text-secondary">
            <span className="inline-flex items-center gap-1">
              <Flame className="h-4 w-4 text-accent-orange" aria-hidden />
              {profile.streak}-day streak
            </span>
            <span aria-hidden>·</span>
            <span>
              {done} of {published.length} lessons done
            </span>
          </p>
        </div>
      </div>

      {/* Today's situation */}
      {today && todayTheme ? (
        <motion.section
          aria-labelledby="today-heading"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-10 overflow-hidden rounded-3xl bg-surface shadow-card"
        >
          <div className="grid md:grid-cols-[1fr_17rem]">
            <div className="p-6 sm:p-9">
              <p className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: todayTheme.color }}>
                <ThemeIcon name={todayTheme.icon} className="h-4 w-4" />
                Today&apos;s situation · {todayTheme.name}
              </p>
              <h2 id="today-heading" className="mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight">
                {today.title}
              </h2>
              {todayScenario ? (
                <>
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-text-secondary">
                    <MapPin className="h-4 w-4" aria-hidden /> {todayScenario.setting}
                  </p>
                  <p className="mt-4 max-w-[52ch] font-display text-xl leading-relaxed">{todayScenario.setup[0]}</p>
                </>
              ) : (
                <p className="mt-4 max-w-[52ch] text-lg leading-relaxed">{today.description}</p>
              )}
              <Link
                href={`/lesson/${today.id}`}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-lg font-semibold text-text-inverse transition-colors hover:bg-primary-dark"
              >
                {todayScenario ? "What would you do?" : "Start lesson"}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
            <div
              aria-hidden
              className="hidden items-center justify-center md:flex"
              style={{ backgroundColor: `${todayTheme.color}1A`, color: todayTheme.color }}
            >
              <ThemeIcon name={todayTheme.icon} className="h-28 w-28" strokeWidth={1.25} />
            </div>
          </div>
        </motion.section>
      ) : (
        <section className="mt-10 rounded-3xl bg-surface p-9 shadow-card">
          <h2 className="text-3xl font-semibold">You&apos;ve finished every lesson so far</h2>
          <p className="mt-3 text-lg text-text-secondary">New situations are on the way. Check your challenges in the meantime.</p>
          <Link href="/challenges" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4">
            Go to challenges <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      )}

      {/* Journeys, one path per theme */}
      <section aria-labelledby="journeys-heading" className="mt-16">
        <h2 id="journeys-heading" className="text-3xl font-semibold">
          Your journeys
        </h2>
        <div className="mt-8 space-y-6">
          {categories.map((theme, ti) => {
            const stops = published.filter((l) => l.categoryId === theme.id);
            const finished = stops.filter((l) => isLessonCompleted(l.id)).length;
            const nextId = stops.find((l) => !isLessonCompleted(l.id))?.id;
            // The path fills only through stops finished in order from the start.
            const run = stops.findIndex((l) => !isLessonCompleted(l.id));
            const prefix = run === -1 ? stops.length : run;
            const fill = stops.length > 1 && prefix > 0 ? (prefix - 1) / (stops.length - 1) : 0;
            return (
              <div key={theme.id} className="rounded-3xl bg-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="flex items-center gap-2.5 font-sans text-xl font-bold">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${theme.color}1A`, color: theme.color }}
                    >
                      <ThemeIcon name={theme.icon} className="h-5 w-5" />
                    </span>
                    {theme.name}
                  </h3>
                  {stops.length > 0 && (
                    <p className="text-sm font-semibold text-text-secondary">
                      {finished} of {stops.length} stops
                    </p>
                  )}
                </div>

                {stops.length === 0 ? (
                  <p className="mt-4 max-w-[60ch] text-text-secondary">
                    These lessons are being written slowly and carefully. Every claim will show whether it&apos;s a fact,
                    an interpretation, a tradition or a belief, and where it comes from.
                  </p>
                ) : (
                  <ol className="relative mt-7 grid gap-6 sm:grid-flow-col sm:auto-cols-fr sm:gap-4">
                    {/* The path between stops; fills as stops are finished */}
                    <div aria-hidden className="absolute left-[19px] top-5 bottom-5 w-[3px] rounded bg-line sm:inset-x-[calc(50%/var(--n))] sm:bottom-auto sm:h-[3px] sm:w-auto" style={{ ["--n" as string]: stops.length }}>
                      <motion.div
                        className="h-full w-full origin-top rounded sm:origin-left"
                        style={{ backgroundColor: theme.color }}
                        initial={{ scaleX: reduce ? fill : 0, scaleY: reduce ? fill : 0 }}
                        whileInView={{ scaleX: fill, scaleY: fill }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.1 * ti }}
                      />
                    </div>
                    {stops.map((l) => {
                      const isDone = isLessonCompleted(l.id);
                      const isNext = l.id === nextId;
                      return (
                        <li key={l.id} className="relative">
                          <Link href={`/lesson/${l.id}`} className="group flex items-start gap-4 sm:flex-col sm:items-center sm:text-center">
                            <span
                              className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] bg-surface transition-transform group-hover:scale-110"
                              style={{
                                borderColor: isDone || isNext ? theme.color : "var(--color-line)",
                                backgroundColor: isDone ? theme.color : undefined,
                              }}
                            >
                              {isDone && <Check className="h-5 w-5 text-text-inverse" strokeWidth={3} aria-hidden />}
                              {isNext && <span className="h-3 w-3 rounded-full motion-safe:animate-pulse" style={{ backgroundColor: theme.color }} />}
                            </span>
                            <span>
                              <span className="block font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">
                                {l.title}
                              </span>
                              <span className="mt-0.5 block text-sm text-text-secondary">
                                {isDone ? "Done" : isNext ? "Up next" : `${l.durationMinutes} min`}
                                {scenarios[l.id] && " · scenario"}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
