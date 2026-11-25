"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { scenarios } from "@/lib/data/seed-scenarios";

const EASE = [0.22, 1, 0.36, 1] as const;
const scenario = scenarios["lesson-1"];

// Four cut corners, like a ticket punched from a sheet. A mask, not a fill. taste-skill-ignore
const corners = ["0 0", "100% 0", "0 100%", "100% 100%"]
  .map((at) => `radial-gradient(circle 22px at ${at}, transparent 21.5px, #000 22px)`) // taste-skill-ignore
  .join(", ");

/** The hero object: a Tattva ticket with a live situation printed on it. */
export function HeroTicket() {
  const reduce = useReducedMotion();
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const choice = scenario.choices.find((c) => c.id === choiceId);

  return (
    <div
      className="relative mx-auto w-full max-w-[54rem] bg-surface text-text-primary"
      style={{ maskImage: corners, WebkitMaskImage: corners, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
    >
      {/* Face of the ticket */}
      <div className="px-6 pb-10 pt-12 text-center sm:px-14 sm:pt-14">
        <Image src="/logo.png" alt="" width={64} height={64} priority className="mx-auto h-16 w-16" />
        <h1 className="mx-auto mt-6 font-display text-[clamp(1.9rem,8vw,4.25rem)] font-medium italic leading-[0.98] tracking-[-0.03em] sm:max-w-none">
          <span className="block sm:-translate-x-[6%]">Learn what to do,</span>
          <span className="block sm:translate-x-[6%]">not just what to know</span>
        </h1>
        <p className="mx-auto mt-8 max-w-[36rem] text-lg leading-relaxed">
          Tattva gives children aged 10 to 14 real situations to think through: values, culture, civic sense and life
          skills, five minutes at a time.
        </p>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[15px] font-semibold text-text-secondary">
          <span>Ages 10 to 14</span>
          <Diamond />
          <span>Five-minute scenarios</span>
          <Diamond />
          <span>No ads, ever</span>
        </p>
      </div>

      {/* Perforation: round 6px dots, the tear line */}
      <div aria-hidden className="mx-8 border-t-[6px] border-dotted border-line" />

      {/* The stub: the live situation */}
      <section aria-labelledby="try-heading" className="px-6 pb-12 pt-10 sm:px-14">
        <div className="flex items-start gap-5">
          <div className="min-w-0 flex-1">
            <h2 id="try-heading" className="font-display text-[1.75rem] font-semibold leading-tight">
              Try one: the samosa line
            </h2>
            <p className="mt-2 text-[15px] font-semibold text-text-secondary">{scenario.setting}</p>
          </div>
          <figure className="w-24 shrink-0 rotate-3 bg-white p-1.5 sm:w-40">
            <Image
              src="/world/samosas-before-being-fried.webp"
              alt="A tray of samosas waiting to be fried"
              width={224}
              height={280}
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
        </div>

        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed">{scenario.setup[1]}</p>

        <AnimatePresence mode="wait" initial={false}>
          {!choice ? (
            <motion.div
              key="choices"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mt-6 font-bold">{scenario.prompt}</p>
              <div role="group" aria-label="Choices" className="mt-3 grid gap-2.5">
                {scenario.choices.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setChoiceId(c.id)}
                    className="group flex w-full items-center gap-4 rounded-sm bg-paper-deep px-4 py-3.5 text-left text-[17px] transition-[background-color,transform] duration-200 hover:bg-primary-100 active:scale-[0.99]"
                  >
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface font-display text-lg font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-text-inverse"
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {c.text}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              aria-live="polite"
              className="mt-6"
            >
              <p className="font-display text-xl italic text-text-secondary">You chose: {choice.text}</p>
              <p className="mt-3 font-display text-[1.35rem] leading-[1.5]">{choice.outcome}</p>
              <dl className="mt-5 grid gap-2 sm:grid-cols-2">
                {choice.ripples.map((r, i) => (
                  <motion.div
                    key={r.who}
                    initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : 0.2 + i * 0.12 }}
                    className="rounded-sm bg-paper-deep px-4 py-3"
                  >
                    <dt className="font-bold text-primary">{r.who}</dt>
                    <dd className="text-[15px]">{r.effect}</dd>
                  </motion.div>
                ))}
              </dl>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setChoiceId(null)}
                  className="inline-flex items-center gap-2 font-semibold text-text-secondary underline underline-offset-4 hover:text-text-primary"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Choose differently
                </button>
                <Link
                  href="/lesson/lesson-1"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 font-semibold text-text-inverse transition-colors hover:bg-primary-dark"
                >
                  See how others saw it
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function Diamond() {
  return <span aria-hidden className="inline-block h-2.5 w-2.5 rotate-45 bg-primary" />;
}
