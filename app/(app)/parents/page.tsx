"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle, Printer } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { lessons } from "@/lib/data/seed-lessons";
import { scenarios } from "@/lib/data/seed-scenarios";
import { ThemeIcon } from "@/components/ui/theme-icon";
import { ShareButton } from "@/components/ui/share-button";

const question = (title: string, reflection?: string) =>
  reflection ?? `What would you do differently after “${title}”?`;

export default function ParentsPage() {
  const { state, isLessonCompleted, isChallengeCompleted, getCompletedLessonCount, getCompletedChallengeCount, getStreak } = useDemo();
  const profile = state.profile;
  const published = lessons.filter((l) => l.published);
  const finished = published.filter((l) => isLessonCompleted(l.id));
  const tried = published.filter((l) => l.challenge && isChallengeCompleted(l.id));
  const themeOf = (id: string) => categories.find((c) => c.id === id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-4xl font-semibold">For {profile.name}&apos;s parents</h1>
      <p className="mt-3 max-w-[60ch] text-lg text-text-secondary">
        What {profile.name} has practised, and something to ask about each one. Their written reflections stay private
        to them: you see the situations, never their answers.
      </p>
      <p className="mt-4 font-semibold">
        {getCompletedLessonCount()} lessons · {getCompletedChallengeCount()} tried in real life · {getStreak()}-day streak
      </p>

      <section aria-labelledby="practised-heading" className="mt-12">
        <h2 id="practised-heading" className="text-2xl font-semibold">
          What they&apos;ve thought through
        </h2>
        {finished.length ? (
          <ul className="mt-5 space-y-4">
            {finished.map((l) => {
              const t = themeOf(l.categoryId);
              const s = scenarios[l.id];
              return (
                <li key={l.id} className="rounded-3xl bg-surface p-5 sm:p-6">
                  <p className="flex items-center gap-2 text-sm font-bold" style={{ color: t?.color }}>
                    <ThemeIcon name={t?.icon} className="h-4 w-4" />
                    {t?.name}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{l.title}</h3>
                  <p className="mt-1 text-text-secondary">{s ? s.principle.title : l.description}</p>
                  <div className="mt-4 flex flex-wrap items-start gap-x-2.5 gap-y-2 rounded-2xl bg-paper-deep p-4">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <p className="min-w-0 flex-1 basis-56">
                      <span className="font-semibold">Ask at dinner: </span>
                      {question(l.title, s?.reflection)}
                    </p>
                    <ShareButton describedAs={`the dinner question for ${l.title}`} text={`A question for dinner, from ${profile.name}'s Tattva lesson "${l.title}": ${question(l.title, s?.reflection)}`} />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-text-secondary">
            Nothing yet. Once {profile.name} finishes a lesson, it shows up here with a question to talk about together.
          </p>
        )}
      </section>

      <section aria-labelledby="tried-heading" className="mt-12">
        <h2 id="tried-heading" className="text-2xl font-semibold">
          Tried in real life
        </h2>
        {tried.length ? (
          <ul className="mt-5 space-y-3">
            {tried.map((l) => (
              <li key={l.id} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-green text-text-inverse">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                </span>
                <span>
                  {l.challenge} <span className="text-text-secondary">({l.title})</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-text-secondary">
            Each lesson ends with a small thing to try that week. When {profile.name} marks one done, it appears here.{" "}
            <Link href="/challenges" className="font-semibold text-primary underline underline-offset-4">
              See the challenges
            </Link>
          </p>
        )}
      </section>

      <section aria-labelledby="cert-heading" className="mt-14">
        <div className="rounded-3xl border-2 border-line bg-surface p-8 text-center print:border-ink sm:p-12">
          <Image src="/logo.png" alt="Tattva" width={56} height={56} className="mx-auto" />
          <h2 id="cert-heading" className="mt-4 text-3xl font-semibold">
            {profile.name}
          </h2>
          <p className="mx-auto mt-2 max-w-[44ch] text-lg text-text-secondary">
            has thought through {getCompletedLessonCount()} real situations on Tattva and tried {getCompletedChallengeCount()} of them
            out in the world.
          </p>
          <p className="mt-6 font-display text-xl italic">{profile.points} points</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-text-inverse hover:bg-primary-dark print:hidden"
        >
          <Printer className="h-5 w-5" aria-hidden /> Print this certificate
        </button>
      </section>
    </div>
  );
}
