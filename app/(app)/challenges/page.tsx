"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  Filter,
} from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { lessons } from "@/lib/data/seed-lessons";
import { categories } from "@/lib/data/seed-categories";
import { sounds } from "@/lib/audio";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export default function ChallengesPage() {
  const {
    state,
    completeChallenge,
    isChallengeCompleted,
    isLessonCompleted,
    getCompletedChallengeCount,
  } = useDemo();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [reflectionInput, setReflectionInput] = useState<Record<string, string>>({});
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);

  const completedCount = getCompletedChallengeCount();
  const totalChallenges = lessons.filter((l) => Boolean(l.challenge)).length;
  const completionPercentage =
    totalChallenges > 0 ? Math.round((completedCount / totalChallenges) * 100) : 0;

  const filteredLessons = lessons.filter((l) => {
    if (!l.challenge) return false;
    if (activeCategory === "all") return true;
    const cat = categories.find((c) => c.slug === activeCategory);
    return cat ? l.categoryId === cat.id : true;
  });

  const handleMarkDone = (lessonId: string) => {
    sounds.playCelebration();
    completeChallenge(lessonId);
    setJustCompletedId(lessonId);
    setTimeout(() => {
      setJustCompletedId(null);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* ==================== HEADER ==================== */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-semibold mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Action Beyond the Screen</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Real-World Challenges
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Put what you learn into daily practice with your family, friends, and community.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-border shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-text-secondary font-medium">Challenges Done</div>
              <div className="text-lg font-bold text-text-primary">
                {completedCount} <span className="text-text-tertiary text-xs">/ {totalChallenges}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== PROGRESS BANNER ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="bg-white rounded-2xl p-5 border border-border shadow-sm mb-8"
      >
        <div className="flex items-center justify-between text-xs font-semibold text-text-secondary mb-2">
          <span>Habit Mastery Progress</span>
          <span className="text-primary font-bold">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-surface-tertiary h-2.5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent-orange to-accent-yellow rounded-full"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-text-tertiary mt-2">
          <span>Earn +10 Tattva Points for every completed real-life deed</span>
          <span className="text-accent-yellow-dark font-medium">+{completedCount * 10} pts earned</span>
        </div>
      </motion.div>

      {/* ==================== CATEGORY FILTERS ==================== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveCategory("all");
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === "all"
              ? "bg-primary text-white shadow-sm"
              : "bg-white text-text-secondary border border-border hover:border-text-tertiary"
          }`}
        >
          🌟 All Missions ({lessons.length})
        </button>
        {categories.map((c) => {
          const isActive = activeCategory === c.slug;
          return (
            <button
              key={c.id}
              onClick={() => {
                sounds.playClick();
                setActiveCategory(c.slug);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-text-secondary border border-border hover:border-text-tertiary"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* ==================== CHALLENGES LIST ==================== */}
      <div className="space-y-4">
        {filteredLessons.map((lesson, idx) => {
          const isDone = isChallengeCompleted(lesson.id);
          const isLessonDone = isLessonCompleted(lesson.id);
          const category = categories.find((c) => c.id === lesson.categoryId);
          const isJustCompleted = justCompletedId === lesson.id;

          return (
            <motion.div
              key={lesson.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={idx * 0.5}
              className={`bg-white rounded-2xl p-5 border transition-all ${
                isDone
                  ? "border-accent-green/30 bg-accent-green-light/10"
                  : "border-border hover:border-primary/30 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-surface-secondary text-text-secondary font-medium">
                      {category?.icon} {category?.name}
                    </span>
                    <span className="text-xs text-text-tertiary">•</span>
                    <Link
                      href={`/lesson/${lesson.id}`}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      Lesson: {lesson.title}
                    </Link>
                  </div>

                  <h3 className="text-base font-bold text-text-primary mb-1.5">
                    {lesson.challenge}
                  </h3>

                  <p className="text-xs text-text-secondary">
                    {isDone
                      ? "Great job taking action in the real world!"
                      : "Perform this action today and mark it complete to earn bonus points."}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-xs font-bold text-accent-yellow-dark px-2.5 py-1 bg-accent-yellow/10 rounded-full">
                    +10 pts
                  </span>

                  {isDone ? (
                    <div className="flex items-center gap-1 text-xs font-semibold text-accent-green">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleMarkDone(lesson.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent-orange hover:bg-accent-orange/90 text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Mark Done</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Just Completed banner */}
              <AnimatePresence>
                {isJustCompleted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 rounded-xl bg-accent-green-light/40 border border-accent-green/30 text-center"
                  >
                    <p className="text-xs font-bold text-accent-green-dark flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Awesome! You earned +10 Tattva Points for practicing in real life!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
