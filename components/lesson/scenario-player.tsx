"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Lock, MapPin, Volume2, VolumeX } from "lucide-react";
import { sounds } from "@/lib/audio";
import { cn } from "@/lib/utils";
import type { Scenario } from "@/types";

const STEPS = ["The situation", "What happened", "Other views", "The big idea", "Your turn"] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  scenario: Scenario;
  /** The lesson's long-form note, shown on demand under the big idea. */
  fullNote: ReactNode | null;
  onFinish: (wroteReflection: boolean) => void;
}

export function ScenarioPlayer({ scenario, fullNote, onFinish }: Props) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [showOthers, setShowOthers] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [showNote, setShowNote] = useState(false);
  const storageKey = `tattva-reflection-${scenario.lessonId}`;
  // Safe as a lazy initializer: the textarea only renders on the last step, after hydration.
  const [reflection, setReflection] = useState(() => {
    try {
      return localStorage.getItem(storageKey) ?? "";
    } catch {
      return "";
    }
  });
  const [speaking, setSpeaking] = useState(false);

  const choice = scenario.choices.find((c) => c.id === choiceId);

  useEffect(() => () => stopSpeaking(), []);

  // After a step change, move focus to the new step so keyboard and screen-reader users keep their place.
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    panelRef.current?.focus({ preventScroll: true });
  }, [step]);

  const changeStep = (next: number) => {
    stopSpeaking();
    setSpeaking(false);
    setStep(next);
  };

  const go = (next: number) => {
    sounds.playClick();
    changeStep(next);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  // The chosen card holds for a beat (the others step back) before the consequence plays, so the decision lands.
  const choose = (id: string) => {
    if (picked) return;
    sounds.playClick();
    setPicked(id);
    setChoiceId(id);
    setShowOthers(false);
    setTimeout(() => {
      setPicked(null);
      changeStep(1);
    }, reduce ? 0 : 420);
  };

  const narrationFor = (): string => {
    switch (step) {
      case 0:
        return [...scenario.setup, scenario.prompt, ...scenario.choices.map((c) => c.text)].join(" ");
      case 1:
        return choice ? `${choice.outcome} ${choice.ripples.map((r) => `${r.who}: ${r.effect}.`).join(" ")}` : "";
      case 2:
        return scenario.perspectives.map((p) => `${p.who} says: ${p.view}`).join(" ");
      case 3:
        return `${scenario.principle.title} ${scenario.principle.body}`;
      default:
        return scenario.reflection;
    }
  };

  const toggleSpeak = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(narrationFor().replace(/[\u{1F300}-\u{1FAFF}]/gu, ""));
    u.lang = "en-IN";
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  const finish = (save: boolean) => {
    const text = reflection.trim();
    if (save && text) {
      try {
        localStorage.setItem(storageKey, text);
      } catch {}
    }
    onFinish(save && text.length > 0);
  };

  const enter = {
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -8 },
    transition: { duration: 0.32, ease: EASE },
  };
  // Text reveal: staggered blurred rise for the opening lines.
  const reveal = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12, filter: "blur(3px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.5, ease: EASE, delay: 0.1 + i * 0.16 },
  });
  const beat = (i: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.32, ease: EASE, delay: reduce ? 0 : 0.18 + i * 0.14 },
  });

  return (
    <section aria-label="Scenario" className="mb-8">
      {/* Step rail */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <ol className="flex items-center gap-1.5" aria-label="Lesson steps">
          {STEPS.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/45" : "w-4 bg-border"
              )}
            >
              <span className="sr-only">{label}</span>
            </li>
          ))}
        </ol>
        <div className="flex items-center gap-3">
          <span className="hidden whitespace-nowrap text-sm text-text-secondary sm:inline">{STEPS[step]}</span>
          <button
            type="button"
            onClick={toggleSpeak}
            aria-pressed={speaking}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
              speaking
                ? "border-primary bg-primary text-text-inverse"
                : "border-border bg-surface text-primary hover:border-primary/40"
            )}
          >
            {speaking ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
            {speaking ? "Stop" : "Read aloud"}
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
      <div ref={panelRef} tabIndex={-1} className="outline-none">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="situation" {...enter}>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary mb-4">
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              {scenario.setting}
            </p>
            <div className="space-y-4 font-display text-[1.3rem] leading-[1.55] text-text-primary max-w-[62ch]">
              {scenario.setup.map((p, i) => (
                <motion.p key={p} {...reveal(i)}>
                  {p}
                </motion.p>
              ))}
            </div>
            <motion.h2 {...reveal(scenario.setup.length)} className="mt-8 mb-4 text-2xl font-semibold">
              {scenario.prompt}
            </motion.h2>
            <div className="grid gap-3" role="group" aria-label="Choices">
              {scenario.choices.map((c, i) => {
                const isPicked = picked === c.id;
                return (
                <motion.button
                  key={c.id}
                  type="button"
                  onClick={() => choose(c.id)}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={
                    picked
                      ? isPicked
                        ? { opacity: 1, y: 0, scale: reduce ? 1 : 1.015 }
                        : { opacity: 0.35, y: 0, scale: reduce ? 1 : 0.98 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  transition={
                    picked
                      ? { type: "spring", stiffness: 420, damping: 26 }
                      : { duration: 0.4, ease: EASE, delay: 0.25 + (scenario.setup.length + 1 + i) * 0.09 }
                  }
                  whileTap={reduce ? undefined : { scale: 0.985 }}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-2xl border bg-surface px-5 py-4 text-left text-lg shadow-card transition-[border-color,box-shadow,background-color] duration-200",
                    isPicked ? "border-primary bg-primary-50 shadow-card-hover" : "border-border hover:border-primary/50 hover:shadow-card-hover"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 font-display text-base font-semibold transition-colors group-hover:bg-primary group-hover:text-text-inverse",
                      isPicked ? "bg-primary text-text-inverse" : "text-primary"
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="leading-snug">{c.text}</span>
                </motion.button>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              There’s no score here. Pick what you’d honestly do.
            </p>
          </motion.div>
        )}

        {step === 1 && choice && (
          <motion.div key="outcome" {...enter}>
            <p className="text-sm font-semibold text-text-secondary">You chose</p>
            <p className="mt-1 mb-6 font-display text-xl italic text-text-secondary">“{choice.text}”</p>

            <motion.p {...beat(0)} className="font-display text-[1.3rem] leading-[1.55] max-w-[62ch]">
              {choice.outcome}
            </motion.p>

            <h3 className="mt-8 mb-3 font-sans text-sm font-bold tracking-wide text-text-secondary">
              Who this touched
            </h3>
            <ul className="divide-y divide-border-light border-y border-border-light">
              {choice.ripples.map((r, i) => (
                <motion.li key={r.who} {...beat(i + 1)} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <span className="font-semibold text-primary">{r.who}</span>
                  <span className="text-text-primary">{r.effect}</span>
                </motion.li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setShowOthers((v) => !v)}
              aria-expanded={showOthers}
              className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              What would the other choices lead to?
              <ChevronDown className={cn("h-4 w-4 transition-transform", showOthers && "rotate-180")} aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {showOthers && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4 rounded-2xl bg-surface-tertiary/60 p-5">
                    {scenario.choices
                      .filter((c) => c.id !== choice.id)
                      .map((c) => (
                        <div key={c.id}>
                          <p className="font-semibold">“{c.text}”</p>
                          <p className="mt-1 text-text-secondary">{c.outcome}</p>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => go(0)}
                      className="text-sm font-semibold text-primary underline underline-offset-4"
                    >
                      Try a different choice
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <NextButton onClick={() => go(2)}>See how others saw it</NextButton>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="perspectives" {...enter}>
            <h2 className="mb-2 text-2xl font-semibold">Same moment, different eyes</h2>
            <p className="mb-6 text-text-secondary">Everyone in a situation has their own reasons.</p>
            <ul className="space-y-6">
              {scenario.perspectives.map((p, i) => (
                <motion.li key={p.who} {...beat(i)} className="border-l-[3px] border-primary/30 pl-5">
                  <blockquote className="font-display text-xl leading-relaxed">{p.view}</blockquote>
                  <p className="mt-1.5 text-sm font-semibold text-primary">{p.who}</p>
                </motion.li>
              ))}
            </ul>
            <NextButton onClick={() => go(3)}>So what’s the big idea?</NextButton>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="principle" {...enter}>
            <div className="rounded-3xl bg-primary-50 px-6 py-8 sm:px-10 sm:py-10">
              {/* The big idea resolves word by word through a soft blur: the lesson's one emphasis moment. */}
              <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-primary-dark" aria-label={scenario.principle.title}>
                {scenario.principle.title.split(" ").map((w, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="inline-block whitespace-pre"
                    initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    {w}{" "}
                  </motion.span>
                ))}
              </h2>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.3 + scenario.principle.title.split(" ").length * 0.06 }}
                className="mt-4 text-lg leading-relaxed max-w-[60ch]"
              >
                {scenario.principle.body}
              </motion.p>
            </div>
            {scenario.claims && (
              <ul className="mt-6 space-y-3" aria-label="What we know, and how we know it">
                {scenario.claims.map((c) => (
                  <li key={c.text} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="w-32 shrink-0 text-sm font-bold capitalize text-primary-dark">{c.kind}</span>
                    <span className="text-lg leading-relaxed">{c.text}</span>
                  </li>
                ))}
              </ul>
            )}
            {scenario.sources && (
              <p className="mt-6 text-sm text-text-secondary">
                Sources:{" "}
                {scenario.sources.map((src, i) => (
                  <span key={src.url}>
                    {i > 0 && " · "}
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                      {src.name}
                    </a>
                  </span>
                ))}
              </p>
            )}
            {fullNote && (
            <button
              type="button"
              onClick={() => setShowNote((v) => !v)}
              aria-expanded={showNote}
              className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              {showNote ? "Hide the full note" : "Read the full note"}
              <ChevronDown className={cn("h-4 w-4 transition-transform", showNote && "rotate-180")} aria-hidden />
            </button>
            )}
            {showNote && <div className="mt-4 border-t border-border-light pt-4">{fullNote}</div>}
            <NextButton onClick={() => go(4)}>Your turn</NextButton>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="reflect" {...enter}>
            <label htmlFor="reflection" className="block font-display text-2xl font-semibold leading-snug max-w-[40ch]">
              {scenario.reflection}
            </label>
            <textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              rows={5}
              maxLength={1000}
              placeholder="Write as much or as little as you like…"
              className="mt-5 w-full resize-y rounded-2xl border border-border bg-surface px-5 py-4 text-lg leading-relaxed shadow-card outline-none transition-colors focus:border-primary"
            />
            <p className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
              <Lock className="h-3.5 w-3.5" aria-hidden />
              Only you can see this. It stays on this device.
            </p>
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => finish(false)}
                className="text-base font-semibold text-text-secondary underline underline-offset-4 hover:text-text-primary"
              >
                Skip for now
              </button>
              <button
                type="button"
                onClick={() => finish(true)}
                disabled={!reflection.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-4 text-lg font-semibold text-text-inverse shadow-card transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-45"
              >
                Save and finish
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}

function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

function NextButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-text-inverse shadow-card transition-colors hover:bg-primary-dark sm:w-auto sm:px-8"
    >
      {children}
      <ArrowRight className="h-5 w-5" aria-hidden />
    </button>
  );
}
