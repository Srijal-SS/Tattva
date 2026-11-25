"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, Award, Check, RotateCcw } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** Null when revisiting a lesson finished earlier: nothing new was earned. */
  earned: { base: number; bonus: number; bonusLabel: string } | null;
  completedAt?: string | null;
  bigIdea?: string;
  badge?: { name: string; description: string };
  challenge?: string;
  challengeDone: boolean;
  onChallengeDone: () => void;
  nextLesson?: { id: string; title: string };
  onReview: () => void;
}

export function LessonComplete({
  earned,
  completedAt,
  bigIdea,
  badge,
  challenge,
  challengeDone,
  onChallengeDone,
  nextLesson,
  onReview,
}: Props) {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section aria-labelledby="complete-heading" className="pb-6">
      <div className="flex flex-col items-center text-center">
        <Stamp fresh={!!earned} />

        <motion.h2 id="complete-heading" {...rise(0.35)} className="mt-6 text-3xl sm:text-4xl font-semibold">
          Lesson complete
        </motion.h2>

        {earned ? (
          <motion.div {...rise(0.45)} className="mt-3">
            <p className="font-display text-5xl font-semibold text-primary tabular-nums">
              +<CountUp to={earned.base + earned.bonus} />
              <span className="ml-2 font-sans text-lg font-bold text-text-secondary">points</span>
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {earned.base} for finishing
              {earned.bonus > 0 && ` · ${earned.bonus} ${earned.bonusLabel}`}
            </p>
          </motion.div>
        ) : (
          completedAt && (
            <motion.p {...rise(0.45)} className="mt-2 text-text-secondary">
              You finished this on{" "}
              {new Date(completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}.
            </motion.p>
          )
        )}
      </div>

      {bigIdea && (
        <motion.figure {...rise(0.6)} className="mx-auto mt-10 max-w-[34rem] border-y border-border py-6 text-center">
          <blockquote className="font-display text-2xl leading-snug text-text-primary">{bigIdea}</blockquote>
          <figcaption className="mt-3 text-sm text-text-secondary">The big idea to keep</figcaption>
        </motion.figure>
      )}

      {badge && (
        <motion.div {...rise(0.75)} className="mx-auto mt-8 flex max-w-[34rem] items-center gap-4 rounded-2xl bg-life-tint px-5 py-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-life text-text-inverse">
            <Award className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="font-bold">New badge: {badge.name}</p>
            <p className="text-sm text-text-secondary">{badge.description}</p>
          </div>
        </motion.div>
      )}

      {challenge && (
        <motion.div {...rise(0.85)} className="mx-auto mt-8 max-w-[34rem]">
          <ChallengeTicket text={challenge} done={challengeDone} onDone={onChallengeDone} />
        </motion.div>
      )}

      <motion.div {...rise(0.95)} className="mx-auto mt-10 flex max-w-[34rem] flex-col gap-4">
        {nextLesson ? (
          <Link
            href={`/lesson/${nextLesson.id}`}
            className="group flex items-center justify-between gap-4 rounded-2xl bg-primary px-6 py-4 text-text-inverse shadow-card transition-colors hover:bg-primary-dark"
          >
            <span>
              <span className="block text-sm font-semibold opacity-80">Up next</span>
              <span className="block font-display text-xl font-semibold leading-snug">{nextLesson.title}</span>
            </span>
            <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        ) : (
          <Link
            href="/learn"
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-text-inverse shadow-card transition-colors hover:bg-primary-dark"
          >
            Back to all lessons
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        )}
        <button
          type="button"
          onClick={onReview}
          className="inline-flex items-center justify-center gap-2 self-center text-base font-semibold text-text-secondary underline underline-offset-4 hover:text-text-primary"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Go through it again
        </button>
      </motion.div>
    </section>
  );
}

/** The one celebratory moment per lesson: the Tattva seal pressed onto the page. */
function Stamp({ fresh }: { fresh: boolean }) {
  const reduce = useReducedMotion();
  const animateIn = fresh && !reduce;
  const ring = "Lesson complete · Tattva · Lesson complete · Tattva · ";

  return (
    <motion.div
      className="relative h-44 w-44"
      initial={animateIn ? { opacity: 0, scale: 1.35, rotate: -18 } : { opacity: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: -6 }}
      transition={{ duration: 0.45, ease: EASE }}
      aria-hidden
    >
      <svg viewBox="0 0 176 176" className="absolute inset-0 h-full w-full text-primary">
        <defs>
          <path id="seal-ring" d="M88,88 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
        </defs>
        <motion.circle
          cx="88"
          cy="88"
          r="85"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={animateIn ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        />
        <circle cx="88" cy="88" r="56" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
        {/* textLength = ring circumference (2π·70), so the phrase meets itself exactly. */}
        <text className="fill-current font-sans text-[11px] font-extrabold uppercase">
          <textPath href="#seal-ring" textLength="439.8" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <Image
        src="/logo.png"
        alt=""
        width={96}
        height={96}
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        priority
      />
    </motion.div>
  );
}

function CountUp({ to }: { to: number }) {
  const reduce = useReducedMotion();
  const value = useMotionValue(reduce ? to : 0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) return;
    const controls = animate(value, to, { duration: 0.9, ease: EASE, delay: 0.5 });
    return () => controls.stop();
  }, [to, reduce, value]);

  return <motion.span>{rounded}</motion.span>;
}

/** A tear-off ticket: the challenge leaves the screen and goes into real life. */
function ChallengeTicket({ text, done, onDone }: { text: string; done: boolean; onDone: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const reduce = useReducedMotion();
  const notch = "radial-gradient(circle 11px at 0 58px, transparent 10.5px, #000 11px)";
  const notchR = "radial-gradient(circle 11px at 100% 58px, transparent 10.5px, #000 11px)";

  return (
    <div className="drop-shadow-[0_6px_14px_rgba(60,36,16,0.12)]">
      <div
        className="relative rounded-2xl bg-surface"
        style={{
          maskImage: `${notch}, ${notchR}`,
          WebkitMaskImage: `${notch}, ${notchR}`,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <div className="flex h-[58px] items-center justify-between px-6">
          <h3 className="font-sans text-base font-extrabold text-civic">Your real-world challenge</h3>
          <span className="text-sm text-text-secondary">This week</span>
        </div>
        <div className="mx-4 border-t-2 border-dashed border-border" />
        <div className="relative px-6 pb-6 pt-5">
          <p className="font-display text-xl leading-snug">{text}</p>

          {done ? (
            <div className="mt-5 flex items-center gap-3">
              <motion.span
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.6, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-accent-green px-3 py-1 text-sm font-extrabold uppercase tracking-wider text-accent-green"
              >
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                Done
              </motion.span>
              <p className="text-text-secondary">You took it off the screen and into real life.</p>
            </div>
          ) : (
            <>
              {accepted && (
                <p className="mt-4 text-text-secondary" role="status">
                  Saved in{" "}
                  <Link href="/challenges" className="font-semibold text-primary underline underline-offset-4">
                    Challenges
                  </Link>
                  . Come back and tick it off once you&apos;ve done it.
                </p>
              )}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onDone}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-civic px-5 py-3 font-semibold text-text-inverse transition-opacity hover:opacity-90"
                >
                  <Check className="h-4 w-4" aria-hidden />
                  I did it
                </button>
                {!accepted && (
                  <button
                    type="button"
                    onClick={() => setAccepted(true)}
                    className="flex-1 rounded-xl border border-border px-5 py-3 font-semibold text-text-primary transition-colors hover:border-civic/50 hover:bg-civic-tint"
                  >
                    I&apos;ll try it this week
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
