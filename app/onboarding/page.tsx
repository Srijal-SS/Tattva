"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Star,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { AVATARS } from "@/types";
import { categories } from "@/lib/data/seed-categories";
import { sounds } from "@/lib/audio";

const steps = [
  { id: 1, title: "Explorer Profile", subtitle: "Tell us a bit about yourself" },
  { id: 2, title: "Choose Companion", subtitle: "Pick your learning avatar" },
  { id: 3, title: "Pick Your Interests", subtitle: "What do you want to learn first?" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { state, updateProfile } = useDemo();

  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState(state.profile.name || "Aarav");
  const [age, setAge] = useState(state.profile.age || 11);
  const [selectedAvatar, setSelectedAvatar] = useState(state.profile.avatar || "explorer");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    state.profile.interests.length > 0
      ? state.profile.interests
      : ["civic-sense", "environment", "safety"]
  );
  const [isFinishing, setIsFinishing] = useState(false);

  const toggleInterest = (slug: string) => {
    sounds.playClick();
    setSelectedInterests((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug]
    );
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    sounds.playClick();
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    sounds.playCelebration();
    setIsFinishing(true);

    // Save personalized profile with welcome bonus points
    updateProfile({
      name: name.trim() || "Explorer",
      age,
      avatar: selectedAvatar,
      interests: selectedInterests,
      points: state.profile.points + 25,
      onboardingComplete: true,
    });

    setTimeout(() => {
      router.push("/learn");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Tattva</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Personalize Your Journey
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Step {currentStep} of 3: {steps[currentStep - 1].subtitle}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between gap-2 mb-8 px-2">
          {steps.map((s) => (
            <div key={s.id} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full h-2 rounded-full transition-all duration-300 ${
                  currentStep >= s.id ? "bg-primary" : "bg-border"
                }`}
              />
              <span
                className={`text-[11px] font-medium mt-1.5 hidden sm:block ${
                  currentStep >= s.id ? "text-primary font-bold" : "text-text-tertiary"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Card Content */}
        <motion.div
          layout
          className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: Name and Age */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    What is your name?
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 rounded-2xl border border-border text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium transition-colors"
                  />
                  <p className="text-xs text-text-tertiary mt-1.5">
                    This is what will appear on your learning dashboard and certificates.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-text-primary">
                      How old are you?
                    </label>
                    <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                      {age} years old
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="14"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-surface-tertiary rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-text-tertiary mt-2">
                    <span>8 yrs (Junior)</span>
                    <span>11 yrs (Standard)</span>
                    <span>14 yrs (Young Teen)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-secondary border border-border-light flex items-center gap-3">
                  <div className="text-2xl">🌱</div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    We adapt lesson challenges and language to be perfectly age-appropriate for{" "}
                    <span className="font-semibold text-text-primary">{age}-year-olds</span>.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Choose Avatar */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">
                    Select your companion avatar
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Choose the buddy that will accompany you on your life skills quests!
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {AVATARS.map((av) => {
                    const isSelected = selectedAvatar === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setSelectedAvatar(av.id);
                        }}
                        className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                          isSelected
                            ? "bg-primary/10 border-primary ring-2 ring-primary/20 scale-[1.02]"
                            : "bg-surface-secondary border-border hover:border-text-tertiary"
                        }`}
                      >
                        <span className="text-3xl">{av.emoji}</span>
                        <span className="text-xs font-bold text-text-primary">
                          {av.label}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Interests */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">
                    What areas do you want to master first?
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Select at least 2 categories. You can learn all of them anytime!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {categories.map((cat) => {
                    const isSelected = selectedInterests.includes(cat.slug);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleInterest(cat.slug)}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? "bg-primary/10 border-primary"
                            : "bg-surface-secondary border-border hover:border-text-tertiary"
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-text-primary truncate">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-text-secondary truncate">
                            {cat.description}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs transition-colors ${
                            isSelected
                              ? "bg-primary border-primary text-white"
                              : "border-border bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Welcome Bonus Notice */}
                <div className="p-3.5 rounded-2xl bg-accent-yellow-light/30 border border-accent-yellow/30 flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-xs font-bold text-accent-yellow-dark">
                      +25 Welcome Bonus Points
                    </p>
                    <p className="text-[11px] text-text-secondary">
                      Awarded immediately upon completing personalization!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="mt-8 pt-5 border-t border-border-light flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isFinishing || (currentStep === 1 && !name.trim())}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              {isFinishing ? (
                "Preparing Dashboard..."
              ) : currentStep === 3 ? (
                <>
                  <span>Start Learning</span>
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
