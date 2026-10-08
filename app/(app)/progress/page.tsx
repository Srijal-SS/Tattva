"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Flame,
  Star,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { badges } from "@/lib/data/seed-badges";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function ProgressPage() {
  const {
    state,
    getCompletedLessonCount,
    getCompletedChallengeCount,
    getCategoryProgress,
    hasBadge,
  } = useDemo();

  const totalLessonsCompleted = getCompletedLessonCount();
  const totalChallengesCompleted = getCompletedChallengeCount();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Your Progress
        </h1>
        <p className="text-text-secondary mb-8">
          Track your learning journey and achievements.
        </p>
      </motion.div>

      {/* ==================== STATS ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
      >
        <div className="bg-white rounded-2xl p-5 border border-border text-center">
          <Star className="w-6 h-6 text-accent-yellow-dark mx-auto mb-2" />
          <p className="text-2xl font-bold text-text-primary">
            {state.profile.points}
          </p>
          <p className="text-xs text-text-tertiary font-medium mt-1">
            Tattva Points
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border text-center">
          <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-text-primary">
            {totalLessonsCompleted}
          </p>
          <p className="text-xs text-text-tertiary font-medium mt-1">
            Lessons Done
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border text-center">
          <Target className="w-6 h-6 text-accent-green mx-auto mb-2" />
          <p className="text-2xl font-bold text-text-primary">
            {totalChallengesCompleted}
          </p>
          <p className="text-xs text-text-tertiary font-medium mt-1">
            Challenges
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border text-center">
          <Flame className="w-6 h-6 text-accent-orange mx-auto mb-2" />
          <p className="text-2xl font-bold text-text-primary">
            {state.profile.streak}
          </p>
          <p className="text-xs text-text-tertiary font-medium mt-1">
            Day Streak 🔥
          </p>
        </div>
      </motion.div>

      {/* ==================== CATEGORY PROGRESS ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
        className="bg-white rounded-2xl p-5 sm:p-6 border border-border mb-8"
      >
        <h2 className="text-lg font-bold text-text-primary mb-5 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Category Progress
        </h2>
        <div className="space-y-4">
          {categories.map((cat) => {
            const progress = getCategoryProgress(cat.slug);
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-text-primary flex items-center gap-2">
                    <span>{cat.icon}</span>
                    {cat.name}
                  </span>
                  <span className="text-xs text-text-tertiary font-medium">
                    {progress.completed}/{progress.total} ({progress.percentage}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-surface-tertiary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ==================== BADGES ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
      >
        <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent-yellow-dark" />
          Badge Collection
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges.map((badge) => {
            const earned = hasBadge(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-5 border text-center transition-all ${
                  earned
                    ? "bg-white border-accent-yellow/30 shadow-card"
                    : "bg-surface-tertiary border-border opacity-50"
                }`}
              >
                <div
                  className={`text-3xl mb-2 ${earned ? "" : "grayscale opacity-40"}`}
                >
                  {badge.icon}
                </div>
                <h3
                  className={`text-sm font-bold mb-1 ${
                    earned ? "text-text-primary" : "text-text-tertiary"
                  }`}
                >
                  {badge.name}
                </h3>
                <p className="text-xs text-text-tertiary">{badge.description}</p>
                {earned && (
                  <span className="inline-block mt-2 text-xs text-accent-green font-semibold">
                    ✓ Earned
                  </span>
                )}
                {!earned && (
                  <span className="inline-block mt-2 text-xs text-text-tertiary">
                    🔒 Locked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
