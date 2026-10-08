"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  BookOpen,
  Trophy,
  Flame,
  Settings,
  LogOut,
  RotateCcw,
} from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { AVATARS } from "@/types";
import { categories } from "@/lib/data/seed-categories";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4 },
  }),
};

export default function ProfilePage() {
  const { state, getCompletedLessonCount, resetDemo } = useDemo();
  const profile = state.profile;
  const avatar = AVATARS.find((a) => a.id === profile.avatar);

  const interestCategories = categories.filter((c) =>
    profile.interests.includes(c.slug)
  );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* ==================== PROFILE HEADER ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-border text-center mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-4xl">
          {avatar?.emoji ?? "🧒"}
        </div>
        <h1 className="text-2xl font-bold text-text-primary">{profile.name}</h1>
        <p className="text-sm text-text-secondary mt-1">
          Age {profile.age} · Tattva Learner
        </p>

        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-accent-yellow-dark">
              <Star className="w-4 h-4" />
              <span className="text-lg font-bold">{profile.points}</span>
            </div>
            <p className="text-[10px] text-text-tertiary font-medium mt-0.5">
              Points
            </p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-primary">
              <BookOpen className="w-4 h-4" />
              <span className="text-lg font-bold">
                {getCompletedLessonCount()}
              </span>
            </div>
            <p className="text-[10px] text-text-tertiary font-medium mt-0.5">
              Lessons
            </p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-accent-yellow-dark">
              <Trophy className="w-4 h-4" />
              <span className="text-lg font-bold">
                {state.earnedBadges.length}
              </span>
            </div>
            <p className="text-[10px] text-text-tertiary font-medium mt-0.5">
              Badges
            </p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-accent-orange">
              <Flame className="w-4 h-4" />
              <span className="text-lg font-bold">{profile.streak}</span>
            </div>
            <p className="text-[10px] text-text-tertiary font-medium mt-0.5">
              Streak
            </p>
          </div>
        </div>
      </motion.div>

      {/* ==================== EARNED BADGES ==================== */}
      {state.earnedBadges.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="bg-white rounded-2xl p-5 border border-border mb-6"
        >
          <h2 className="text-sm font-bold text-text-primary mb-3">
            Earned Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            {state.earnedBadges.map((ub) => (
              <div
                key={ub.id}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent-yellow/5 border border-accent-yellow/20"
              >
                <span className="text-lg">{ub.badge?.icon ?? "🏆"}</span>
                <span className="text-xs font-semibold text-text-primary">
                  {ub.badge?.name ?? "Badge"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ==================== INTERESTS ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
        className="bg-white rounded-2xl p-5 border border-border mb-6"
      >
        <h2 className="text-sm font-bold text-text-primary mb-3">
          Learning Interests
        </h2>
        <div className="flex flex-wrap gap-2">
          {interestCategories.map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-tertiary text-sm font-medium text-text-secondary"
            >
              {cat.icon} {cat.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ==================== ACTIONS ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <Link
          href="/parents"
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-tertiary transition-colors border-b border-border"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🛡️</span>
            <div>
              <span className="text-sm font-semibold text-text-primary block">
                Parent Portal & Insights
              </span>
              <span className="text-xs text-text-tertiary">
                View values matrix, print certificate, sign off deeds
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-primary">Open →</span>
        </Link>
        <Link
          href="/onboarding"
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-tertiary transition-colors border-b border-border"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">✨</span>
            <div>
              <span className="text-sm font-semibold text-text-primary block">
                Re-personalize Profile
              </span>
              <span className="text-xs text-text-tertiary">
                Change avatar companion, age, or interests
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-text-secondary">Edit →</span>
        </Link>
        <button
          onClick={resetDemo}
          className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-tertiary transition-colors border-b border-border"
        >
          <RotateCcw className="w-5 h-5 text-text-tertiary" />
          <div>
            <span className="text-sm font-medium text-text-primary block">
              Reset Demo Data
            </span>
            <span className="text-xs text-text-tertiary">
              Restore initial seed progress for fresh evaluation
            </span>
          </div>
        </button>
        <Link
          href="/login"
          className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-accent-red-light/30 transition-colors"
        >
          <LogOut className="w-5 h-5 text-accent-red" />
          <span className="text-sm font-medium text-accent-red">Log Out</span>
        </Link>
      </motion.div>

      {/* Demo indicator */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={4}
        className="mt-6 text-center"
      >
        <p className="text-xs text-text-tertiary">
          🧪 Demo mode — data is stored locally in your browser
        </p>
      </motion.div>
    </div>
  );
}
