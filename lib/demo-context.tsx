"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  DemoState,
  UserProfile,
  LessonProgress,
  ChallengeProgress,
  UserBadge,
  POINTS,
} from "@/types";
import { lessons } from "@/lib/data/seed-lessons";
import { badges } from "@/lib/data/seed-badges";
import { categories } from "@/lib/data/seed-categories";

// ============================================================
// Default demo profile (Aarav)
// ============================================================

const DEFAULT_PROFILE: UserProfile = {
  id: "demo-profile",
  userId: "demo-user",
  name: "Aarav",
  age: 12,
  avatar: "explorer",
  points: 120,
  streak: 4,
  lastActiveDate: new Date().toISOString().split("T")[0],
  onboardingComplete: true,
  interests: [
    "civic-sense",
    "environment",
    "safety",
    "digital-life",
    "money",
    "social-skills",
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Pre-completed lessons for demo
const DEFAULT_PROGRESS: Record<string, LessonProgress> = {
  "lesson-2": {
    id: "lp-2",
    userId: "demo-user",
    lessonId: "lesson-2",
    completed: true,
    score: 10,
    completedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  "lesson-3": {
    id: "lp-3",
    userId: "demo-user",
    lessonId: "lesson-3",
    completed: true,
    score: 15,
    completedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  "lesson-4": {
    id: "lp-4",
    userId: "demo-user",
    lessonId: "lesson-4",
    completed: true,
    score: 10,
    completedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  "lesson-5": {
    id: "lp-5",
    userId: "demo-user",
    lessonId: "lesson-5",
    completed: true,
    score: 15,
    completedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  "lesson-9": {
    id: "lp-9",
    userId: "demo-user",
    lessonId: "lesson-9",
    completed: true,
    score: 10,
    completedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
};

const DEFAULT_CHALLENGE_PROGRESS: Record<string, ChallengeProgress> = {
  "lesson-2": {
    id: "cp-2",
    userId: "demo-user",
    lessonId: "lesson-2",
    completed: true,
    completedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  "lesson-3": {
    id: "cp-3",
    userId: "demo-user",
    lessonId: "lesson-3",
    completed: true,
    completedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
};

const DEFAULT_BADGES: UserBadge[] = [
  {
    id: "ub-1",
    userId: "demo-user",
    badgeId: "badge-eco",
    earnedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    badge: badges.find((b) => b.id === "badge-eco"),
  },
  {
    id: "ub-2",
    userId: "demo-user",
    badgeId: "badge-safety",
    earnedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    badge: badges.find((b) => b.id === "badge-safety"),
  },
  {
    id: "ub-3",
    userId: "demo-user",
    badgeId: "badge-social",
    earnedAt: new Date().toISOString(),
    badge: badges.find((b) => b.id === "badge-social"),
  },
];

const STORAGE_KEY = "tattva-demo-state";

// ============================================================
// Context Types
// ============================================================

interface DemoContextType {
  isDemo: boolean;
  state: DemoState;

  // Profile
  updateProfile: (data: Partial<UserProfile>) => void;

  // Lesson progress
  completeLesson: (lessonId: string, score: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;

  // Challenge progress
  completeChallenge: (lessonId: string) => void;
  isChallengeCompleted: (lessonId: string) => boolean;

  // Badges
  earnBadge: (badgeId: string) => void;
  hasBadge: (badgeId: string) => boolean;
  checkAndAwardBadges: () => string | null;

  // Stats
  getCompletedLessonCount: () => number;
  getCompletedChallengeCount: () => number;
  getCategoryProgress: (categorySlug: string) => {
    completed: number;
    total: number;
    percentage: number;
  };

  // Data
  lessons: typeof lessons;
  categories: typeof categories;
  badges: typeof badges;

  // Reset
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

// ============================================================
// Provider
// ============================================================

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>({
    profile: DEFAULT_PROFILE,
    lessonProgress: DEFAULT_PROGRESS,
    challengeProgress: DEFAULT_CHALLENGE_PROGRESS,
    earnedBadges: DEFAULT_BADGES,
    dailyActivity: [],
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as DemoState;
        setState(parsed);
      }
    } catch {
      // Use defaults
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage full or unavailable
    }
  }, [state]);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...data, updatedAt: new Date().toISOString() },
    }));
  }, []);

  const completeLesson = useCallback((lessonId: string, score: number) => {
    setState((prev) => {
      if (prev.lessonProgress[lessonId]?.completed) return prev;

      const lesson = lessons.find((l) => l.id === lessonId);
      const pointsEarned = (lesson?.points ?? POINTS.LESSON_COMPLETE) + score;

      return {
        ...prev,
        profile: {
          ...prev.profile,
          points: prev.profile.points + pointsEarned,
          updatedAt: new Date().toISOString(),
        },
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: {
            id: `lp-${Date.now()}`,
            userId: prev.profile.userId,
            lessonId,
            completed: true,
            score,
            completedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => state.lessonProgress[lessonId]?.completed ?? false,
    [state.lessonProgress]
  );

  const getLessonProgress = useCallback(
    (lessonId: string) => state.lessonProgress[lessonId],
    [state.lessonProgress]
  );

  const completeChallenge = useCallback((lessonId: string) => {
    setState((prev) => {
      if (prev.challengeProgress[lessonId]?.completed) return prev;

      return {
        ...prev,
        profile: {
          ...prev.profile,
          points: prev.profile.points + POINTS.CHALLENGE_COMPLETE,
          updatedAt: new Date().toISOString(),
        },
        challengeProgress: {
          ...prev.challengeProgress,
          [lessonId]: {
            id: `cp-${Date.now()}`,
            userId: prev.profile.userId,
            lessonId,
            completed: true,
            completedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const isChallengeCompleted = useCallback(
    (lessonId: string) => state.challengeProgress[lessonId]?.completed ?? false,
    [state.challengeProgress]
  );

  const earnBadge = useCallback(
    (badgeId: string) => {
      setState((prev) => {
        if (prev.earnedBadges.some((b) => b.badgeId === badgeId)) return prev;

        const badge = badges.find((b) => b.id === badgeId);
        return {
          ...prev,
          earnedBadges: [
            ...prev.earnedBadges,
            {
              id: `ub-${Date.now()}`,
              userId: prev.profile.userId,
              badgeId,
              earnedAt: new Date().toISOString(),
              badge,
            },
          ],
        };
      });
    },
    []
  );

  const hasBadge = useCallback(
    (badgeId: string) => state.earnedBadges.some((b) => b.badgeId === badgeId),
    [state.earnedBadges]
  );

  const checkAndAwardBadges = useCallback((): string | null => {
    // Check each category for badge eligibility
    for (const badge of badges) {
      if (state.earnedBadges.some((b) => b.badgeId === badge.id)) continue;

      const category = categories.find((c) => c.slug === badge.categorySlug);
      if (!category) continue;

      const categoryLessons = lessons.filter(
        (l) => l.categoryId === category.id && l.published
      );
      const completedCount = categoryLessons.filter(
        (l) => state.lessonProgress[l.id]?.completed
      ).length;

      if (completedCount >= 2) {
        earnBadge(badge.id);
        return badge.id;
      }
    }
    return null;
  }, [state.lessonProgress, state.earnedBadges, earnBadge]);

  const getCompletedLessonCount = useCallback(
    () => Object.values(state.lessonProgress).filter((p) => p.completed).length,
    [state.lessonProgress]
  );

  const getCompletedChallengeCount = useCallback(
    () =>
      Object.values(state.challengeProgress).filter((p) => p.completed).length,
    [state.challengeProgress]
  );

  const getCategoryProgress = useCallback(
    (categorySlug: string) => {
      const category = categories.find((c) => c.slug === categorySlug);
      if (!category) return { completed: 0, total: 0, percentage: 0 };

      const categoryLessons = lessons.filter(
        (l) => l.categoryId === category.id && l.published
      );
      const completedCount = categoryLessons.filter(
        (l) => state.lessonProgress[l.id]?.completed
      ).length;
      const total = categoryLessons.length;

      return {
        completed: completedCount,
        total,
        percentage: total > 0 ? Math.round((completedCount / total) * 100) : 0,
      };
    },
    [state.lessonProgress]
  );

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      profile: DEFAULT_PROFILE,
      lessonProgress: DEFAULT_PROGRESS,
      challengeProgress: DEFAULT_CHALLENGE_PROGRESS,
      earnedBadges: DEFAULT_BADGES,
      dailyActivity: [],
    });
  }, []);

  return (
    <DemoContext.Provider
      value={{
        isDemo: true,
        state,
        updateProfile,
        completeLesson,
        isLessonCompleted,
        getLessonProgress,
        completeChallenge,
        isChallengeCompleted,
        earnBadge,
        hasBadge,
        checkAndAwardBadges,
        getCompletedLessonCount,
        getCompletedChallengeCount,
        getCategoryProgress,
        lessons,
        categories,
        badges,
        resetDemo,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

// ============================================================
// Hook
// ============================================================

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
