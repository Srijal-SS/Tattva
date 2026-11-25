"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { AVATARS } from "@/types";
import { categories } from "@/lib/data/seed-categories";
import { sounds } from "@/lib/audio";
import { Avatar } from "@/components/ui/avatar";
import { ThemeIcon } from "@/components/ui/theme-icon";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEPS = ["About you", "Your picture", "Your themes"];

export default function OnboardingPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { state, updateProfile } = useDemo();

  const [step, setStep] = useState(0);
  const [name, setName] = useState(state.profile.name || "");
  const [age, setAge] = useState(state.profile.age || 11);
  const [avatar, setAvatar] = useState(state.profile.avatar || "explorer");
  const [interests, setInterests] = useState<string[]>(
    state.profile.interests.length ? state.profile.interests : categories.map((c) => c.slug)
  );
  const [finishing, setFinishing] = useState(false);

  const canGo = step === 0 ? name.trim().length > 0 : step === 2 ? interests.length > 0 : true;

  const toggle = (slug: string) => {
    sounds.playClick();
    setInterests((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const next = () => {
    if (!canGo) return;
    sounds.playClick();
    if (step < 2) return setStep(step + 1);
    sounds.playCelebration();
    setFinishing(true);
    updateProfile({
      name: name.trim(),
      age,
      avatar,
      interests,
      // The welcome bonus is given once, not every time the steps are revisited from Profile.
      points: state.profile.points + (state.profile.onboardingComplete ? 0 : 25),
      onboardingComplete: true,
    });
    setTimeout(() => router.push("/learn"), 900);
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10 sm:py-16">
      <Image src="/logo.png" alt="Tattva" width={48} height={48} />

      <ol className="mt-8 flex gap-2" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className="flex items-center gap-2 text-sm font-semibold">
            <span className={cn("h-1.5 w-10 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-line")} />
            <span className={cn("hidden sm:inline", i === step ? "text-ink" : "text-text-tertiary")}>{s}</span>
          </li>
        ))}
      </ol>

      <form
        className="mt-8 w-full max-w-xl rounded-3xl bg-surface p-6 shadow-card sm:p-10"
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -24 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {step === 0 && (
              <>
                <h1 className="text-3xl font-semibold">What should we call you?</h1>
                <p className="mt-2 text-text-secondary">Your first name is enough. It stays on this device.</p>
                <label htmlFor="name" className="mt-7 block font-semibold">
                  First name
                </label>
                <input
                  id="name"
                  autoFocus
                  autoComplete="given-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border-2 border-line bg-paper px-4 py-3 text-lg focus:border-primary focus:outline-none"
                />
                <label htmlFor="age" className="mt-7 flex items-baseline justify-between font-semibold">
                  How old are you? <span className="font-display text-3xl font-light tabular-nums">{age}</span>
                </label>
                <input
                  id="age"
                  type="range"
                  min={10}
                  max={14}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="mt-3 w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-sm text-text-tertiary" aria-hidden>
                  <span>10</span>
                  <span>14</span>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="text-3xl font-semibold">Pick a picture</h1>
                <p className="mt-2 text-text-secondary">It shows next to your name. You can change it later.</p>
                <div role="radiogroup" aria-label="Picture" className="mt-7 grid grid-cols-4 gap-3">
                  {AVATARS.map((a) => {
                    const on = avatar === a.id;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => {
                          sounds.playClick();
                          setAvatar(a.id);
                        }}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-2xl border-2 p-3 text-sm font-semibold transition-colors",
                          on ? "border-primary bg-primary-50" : "border-transparent hover:bg-paper-deep"
                        )}
                      >
                        <Avatar id={a.id} className="h-14 w-14" />
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-3xl font-semibold">What do you want to explore?</h1>
                <p className="mt-2 text-text-secondary">Pick one or more. Every theme stays open to you either way.</p>
                <div className="mt-7 grid gap-3">
                  {categories.map((c) => {
                    const on = interests.includes(c.slug);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(c.slug)}
                        className="flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors"
                        style={{ borderColor: on ? c.color : "var(--color-line)", backgroundColor: on ? `${c.color}12` : undefined }}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${c.color}1A`, color: c.color }}>
                          <ThemeIcon name={c.icon} className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold">{c.name}</span>
                          <span className="block text-sm text-text-secondary">{c.description}</span>
                        </span>
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2"
                          style={{ borderColor: on ? c.color : "var(--color-line)", backgroundColor: on ? c.color : undefined }}
                        >
                          {on && <Check className="h-4 w-4 text-text-inverse" strokeWidth={3} aria-hidden />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-9 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 font-semibold text-text-secondary hover:text-ink">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={!canGo || finishing}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-lg font-semibold text-text-inverse transition-colors hover:bg-primary-dark disabled:opacity-40"
          >
            {finishing ? "One moment…" : step < 2 ? "Next" : "Start learning"}
            {!finishing && <ArrowRight className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </form>
    </div>
  );
}
