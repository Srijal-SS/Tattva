"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Trophy,
  BookOpen,
  Clock,
  ChevronRight,
  CheckCircle2,
  Target,
} from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { getGreeting } from "@/lib/utils";
import { AVATARS } from "@/types";
import { categories } from "@/lib/data/seed-categories";
import { lessons } from "@/lib/data/seed-lessons";

// ============================================================
// Animation variants
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ============================================================
// Category color map
// ============================================================
const categoryColors: Record<string, string> = {
  "cat-civic": "from-primary/20 to-primary/5 border-primary/20",
  "cat-environment": "from-accent-green/20 to-accent-green/5 border-accent-green/20",
  "cat-safety": "from-accent-orange/20 to-accent-orange/5 border-accent-orange/20",
  "cat-digital": "from-[#0EA5E9]/20 to-[#0EA5E9]/5 border-[#0EA5E9]/20",
  "cat-money": "from-accent-yellow/20 to-accent-yellow/5 border-accent-yellow/20",
  "cat-social": "from-accent-pink/20 to-accent-pink/5 border-accent-pink/20",
};

// ============================================================
// Component
// ============================================================
export default function LearnPage() {
  const {
    state,
    isLessonCompleted,
    getCompletedLessonCount,
    getCompletedChallengeCount,
    getCategoryProgress,
  } = useDemo();

  const profile = state.profile;
  const avatar = AVATARS.find((a) => a.id === profile.avatar);

  // Find today's suggested lesson (first uncompleted published lesson)
  const todayLesson = lessons.find(
    (l) => l.published && !isLessonCompleted(l.id)
  ) ?? lessons[0];

  const todayCategory = categories.find((c) => c.id === todayLesson.categoryId);

  // Recently completed lessons
  const completedLessons = Object.entries(state.lessonProgress)
    .filter(([, p]) => p.completed)
    .sort(
      (a, b) =>
        new Date(b[1].completedAt ?? 0).getTime() -
        new Date(a[1].completedAt ?? 0).getTime()
    )
    .slice(0, 3)
    .map(([lessonId]) => lessons.find((l) => l.id === lessonId))
    .filter(Boolean);

  const totalLessons = lessons.filter((l) => l.published).length;
  const completedCount = getCompletedLessonCount();
  const overallProgress =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* ==================== GREETING ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
            {avatar?.emoji ?? "🧒"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {getGreeting()}, {profile.name} 👋
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              Ready for today&apos;s Tattva?
            </p>
          </div>
        </div>
      </motion.div>

      {/* ==================== STATS BAR ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
      >
        <div className="bg-white rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-accent-orange" />
            <span className="text-xs text-text-tertiary font-medium">Streak</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {profile.streak} <span className="text-sm text-text-tertiary">days</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">⭐</span>
            <span className="text-xs text-text-tertiary font-medium">Points</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{profile.points}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs text-text-tertiary font-medium">Lessons</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {completedCount}
            <span className="text-sm text-text-tertiary">/{totalLessons}</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-accent-yellow-dark" />
            <span className="text-xs text-text-tertiary font-medium">Badges</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {state.earnedBadges.length}
          </p>
        </div>
      </motion.div>

      {/* ==================== TODAY'S TATTVA ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
        className="mb-8"
      >
        <Link href={`/lesson/${todayLesson.id}`} className="block group">
          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-white/30 rounded-full text-xs font-semibold backdrop-blur-sm">
                  TODAY&apos;S TATTVA
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                {todayLesson.title}
              </h2>
              <div className="flex items-center gap-3 text-white/70 text-sm mb-4">
                <span className="flex items-center gap-1">
                  {todayCategory?.icon} {todayCategory?.name}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {todayLesson.durationMinutes} min
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                Start Learning
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* ==================== PROGRESS BAR ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
        className="mb-8"
      >
        <div className="bg-white rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">
              Your Tattva Journey
            </h3>
            <span className="text-xs font-bold text-emerald-600">{overallProgress}%</span>
          </div>
          <div className="w-full h-3 bg-surface-tertiary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
            />
          </div>
          <p className="text-xs text-text-tertiary mt-2">
            {completedCount} of {totalLessons} lessons completed. You&apos;re doing great!
          </p>
        </div>
      </motion.div>

      {/* ==================== ACTIVE CHALLENGE SPOTLIGHT ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3.5}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-accent-orange/10 via-amber-50 to-accent-yellow/10 rounded-2xl p-5 border border-accent-orange/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-accent-orange/20 flex items-center justify-center text-accent-orange flex-shrink-0 mt-0.5">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-accent-orange uppercase tracking-wider">
                  Real-World Mission
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-accent-yellow/20 text-accent-yellow-dark rounded-full">
                  +10 pts
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-text-primary">
                {todayLesson.challenge || "Practice queue discipline patiently today."}
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Practice this in real life and mark it done to build strong habits!
              </p>
            </div>
          </div>
          <Link
            href="/challenges"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent-orange hover:bg-accent-orange/90 text-white text-xs font-semibold whitespace-nowrap shadow-sm transition-all flex-shrink-0"
          >
            <span>View Challenges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* ==================== EXPLORE SKILLS ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={4}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary">Explore Skills</h2>
          <Link
            href="/explore"
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
          >
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {categories.map((cat, i) => {
            const progress = getCategoryProgress(cat.slug);
            return (
              <motion.div key={cat.id} variants={fadeUp} custom={i}>
                <Link href={`/explore?category=${cat.slug}`} className="block">
                  <div
                    className={`bg-gradient-to-br ${
                      categoryColors[cat.id] ?? ""
                    } rounded-2xl p-4 border transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5`}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <h3 className="text-sm font-bold text-text-primary mb-1">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-current rounded-full opacity-60"
                          style={{
                            width: `${progress.percentage}%`,
                            color: cat.color,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-text-tertiary font-medium">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ==================== RECENT LEARNING ==================== */}
      {completedLessons.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={5}
        >
          <h2 className="text-lg font-bold text-text-primary mb-4">
            Continue Learning
          </h2>
          <div className="space-y-3">
            {completedLessons.map((lesson) => {
              if (!lesson) return null;
              const cat = categories.find((c) => c.id === lesson.categoryId);
              return (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`} className="block">
                  <div className="bg-white rounded-2xl p-4 border border-border flex items-center gap-4 hover:border-primary/30 hover:shadow-card-hover transition-all duration-200">
                    <div className="w-10 h-10 rounded-xl bg-accent-green-light/50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-accent-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-text-primary truncate">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-text-tertiary flex items-center gap-1 mt-0.5">
                        {cat?.icon} {cat?.name}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
