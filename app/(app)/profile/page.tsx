"use client";

import Link from "next/link";
import { ChevronRight, LogOut, RotateCcw } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { badges } from "@/lib/data/seed-badges";
import { Avatar } from "@/components/ui/avatar";
import { ThemeIcon } from "@/components/ui/theme-icon";

export default function ProfilePage() {
  const { state, getCompletedLessonCount, resetDemo, getStreak } = useDemo();
  const profile = state.profile;
  const interests = categories.filter((c) => profile.interests.includes(c.slug));
  const earned = badges.filter((b) => state.earnedBadges.some((ub) => ub.badgeId === b.id));

  const reset = () => {
    if (window.confirm("Start the demo over? Your progress, points and notes in this browser will be cleared.")) resetDemo();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex items-center gap-5">
        <Avatar id={profile.avatar} className="h-20 w-20" />
        <div>
          <h1 className="text-4xl font-semibold">{profile.name}</h1>
          <p className="mt-1 text-text-secondary">
            Age {profile.age} · {profile.points} points · {getCompletedLessonCount()} lessons · {getStreak()}-day streak
          </p>
        </div>
      </div>

      <section aria-labelledby="interests-heading" className="mt-12">
        <h2 id="interests-heading" className="text-2xl font-semibold">
          What you&apos;re into
        </h2>
        {interests.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {interests.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/explore?category=${c.slug}`}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold"
                  style={{ backgroundColor: `${c.color}1A`, color: c.color }}
                >
                  <ThemeIcon name={c.icon} className="h-4 w-4" />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-text-secondary">No themes picked yet.</p>
        )}
      </section>

      <section aria-labelledby="badges-heading" className="mt-12">
        <h2 id="badges-heading" className="text-2xl font-semibold">
          Badges
        </h2>
        {earned.length ? (
          <ul className="mt-4 flex flex-wrap gap-3">
            {earned.map((b) => {
              const c = categories.find((x) => x.slug === b.categorySlug);
              return (
                <li key={b.id} className="inline-flex items-center gap-2.5 rounded-full bg-surface py-1.5 pl-1.5 pr-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-paper" style={{ backgroundColor: c?.color }}>
                    <ThemeIcon name={b.icon} className="h-4 w-4" />
                  </span>
                  <span className="font-semibold">{b.name}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-text-secondary">None yet. Finish two lessons in a theme to earn its badge.</p>
        )}
        <Link href="/progress" className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">
          See all badges
        </Link>
      </section>

      <section aria-label="Settings" className="mt-12 divide-y divide-line overflow-hidden rounded-3xl bg-surface">
        <Link href="/parents" className="group flex items-center gap-4 px-5 py-4 hover:bg-paper-deep">
          <span className="flex-1">
            <span className="block font-semibold">For your parents</span>
            <span className="block text-sm text-text-secondary">What you&apos;ve practised, and things to talk about at home</span>
          </span>
          <ChevronRight className="h-5 w-5 text-text-tertiary" aria-hidden />
        </Link>
        <Link href="/onboarding" className="group flex items-center gap-4 px-5 py-4 hover:bg-paper-deep">
          <span className="flex-1">
            <span className="block font-semibold">Change your picture, age or themes</span>
            <span className="block text-sm text-text-secondary">Goes back through the welcome steps</span>
          </span>
          <ChevronRight className="h-5 w-5 text-text-tertiary" aria-hidden />
        </Link>
        <button type="button" onClick={reset} className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-paper-deep">
          <RotateCcw className="h-5 w-5 text-text-tertiary" aria-hidden />
          <span className="flex-1">
            <span className="block font-semibold">Start the demo over</span>
            <span className="block text-sm text-text-secondary">Progress is kept only in this browser</span>
          </span>
        </button>
        <Link href="/login" className="flex items-center gap-4 px-5 py-4 font-semibold text-accent-red hover:bg-paper-deep">
          <LogOut className="h-5 w-5" aria-hidden />
          Log out
        </Link>
      </section>
    </div>
  );
}
