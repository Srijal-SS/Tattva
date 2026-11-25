"use client";

import Link from "next/link";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { lessons } from "@/lib/data/seed-lessons";
import { categories } from "@/lib/data/seed-categories";
import { sounds } from "@/lib/audio";
import { ChallengeTicket } from "@/components/lesson/lesson-complete";
import { ThemeIcon } from "@/components/ui/theme-icon";

export default function ChallengesPage() {
  const { completeChallenge, isChallengeCompleted, isLessonCompleted } = useDemo();
  const reduce = useReducedMotion();
  // A ticket marked done travels from "Ready to try" down into "Done" (shared layoutId).
  const move = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 30 };
  const all = lessons.filter((l) => l.published && l.challenge);

  const ready = all.filter((l) => isLessonCompleted(l.id) && !isChallengeCompleted(l.id));
  const done = all.filter((l) => isChallengeCompleted(l.id));
  const later = all.filter((l) => !isLessonCompleted(l.id) && !isChallengeCompleted(l.id));

  const markDone = (id: string) => {
    sounds.playCelebration();
    completeChallenge(id);
  };
  const themeOf = (categoryId: string) => categories.find((c) => c.id === categoryId);

  return (
    <LayoutGroup>
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-4xl font-semibold">Challenges</h1>
      <p className="mt-2 max-w-[56ch] text-lg text-text-secondary">
        Small things to try in real life, one for each lesson. {done.length} of {all.length} done so far.
      </p>

      <section aria-labelledby="ready-heading" className="mt-12">
        <h2 id="ready-heading" className="text-2xl font-semibold">
          Ready to try
        </h2>
        {ready.length ? (
          <ul className="mt-5 space-y-6">
            {ready.map((l) => (
              <motion.li key={l.id} layoutId={`ticket-${l.id}`} transition={move}>
                <ChallengeTicket heading={l.title} tag={themeOf(l.categoryId)?.name} text={l.challenge} done={false} onDone={() => markDone(l.id)} allowLater={false} />
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-text-secondary">
            Nothing waiting. Finish a lesson and its challenge shows up here.
          </p>
        )}
      </section>

      {later.length > 0 && (
        <section aria-labelledby="later-heading" className="mt-14">
          <h2 id="later-heading" className="text-2xl font-semibold">
            After the lesson
          </h2>
          <p className="mt-1 text-text-secondary">These open up once you&apos;ve played the lesson they belong to.</p>
          <ul className="mt-5 space-y-2">
            {later.map((l) => {
              const t = themeOf(l.categoryId);
              return (
                <li key={l.id}>
                  <Link href={`/lesson/${l.id}`} transitionTypes={["nav-forward"]} className="group flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 hover:shadow-card">
                    <ThemeIcon name={t?.icon} className="h-5 w-5 shrink-0" style={{ color: t?.color }} />
                    <span className="flex-1 font-semibold">{l.title}</span>
                    <span className="hidden text-sm font-semibold text-primary sm:inline">Play the lesson</span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {done.length > 0 && (
        <section aria-labelledby="done-heading" className="mt-14">
          <h2 id="done-heading" className="text-2xl font-semibold">
            Done
          </h2>
          <ul className="mt-5 space-y-6">
            {done.map((l) => (
              <motion.li key={l.id} layoutId={`ticket-${l.id}`} transition={move}>
                <ChallengeTicket heading={l.title} tag={themeOf(l.categoryId)?.name} text={l.challenge} done onDone={() => {}} />
              </motion.li>
            ))}
          </ul>
        </section>
      )}
    </div>
    </LayoutGroup>
  );
}
