"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from "react";
import {
  DemoState,
  UserProfile,
  LessonProgress,
  ChallengeProgress,
  UserBadge,
  POINTS,
  AuthoredLesson,
  AnalyticsEvent,
  AnalyticsEventType,
  Lesson,
  Scenario,
} from "@/types";
import { lessons as seedLessons } from "@/lib/data/seed-lessons";
import { scenarios as seedScenarios } from "@/lib/data/seed-scenarios";
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
  interests: ["values", "culture", "civic-sense", "life-skills"],
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
    badgeId: "badge-civic",
    earnedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    badge: badges.find((b) => b.id === "badge-civic"),
  },
];

// The seeded demo history, as events, so Insights has the same story as Progress.
// Also used to backfill state saved before events existed.
function eventsFromProgress(lp: Record<string, LessonProgress>, cp: Record<string, ChallengeProgress>): AnalyticsEvent[] {
  const done = <T extends { completed: boolean; completedAt: string | null }>(p: T) => p.completed && !!p.completedAt;
  const lessonEvents = Object.values(lp).filter(done).flatMap((p) => [
    { type: "visit" as const, at: p.completedAt! },
    { type: "lesson_start" as const, at: p.completedAt!, lessonId: p.lessonId },
    { type: "lesson_finish" as const, at: p.completedAt!, lessonId: p.lessonId },
  ]);
  const challengeEvents = Object.values(cp).filter(done).map((p) => ({ type: "challenge_done" as const, at: p.completedAt!, lessonId: p.lessonId }));
  return [...lessonEvents, ...challengeEvents].sort((a, b) => a.at.localeCompare(b.at));
}
const DEFAULT_EVENTS: AnalyticsEvent[] = eventsFromProgress(DEFAULT_PROGRESS, DEFAULT_CHALLENGE_PROGRESS);
// Adds derived events for progress the log doesn't cover yet (state saved before events existed).
function backfill(st: DemoState): AnalyticsEvent[] {
  const log = st.events ?? [];
  const has = (type: string, id?: string) => log.some((e) => e.type === type && e.lessonId === id);
  const missing = eventsFromProgress(st.lessonProgress, st.challengeProgress).filter((e) =>
    e.type === "challenge_done" ? !has("challenge_done", e.lessonId) : e.type === "visit" ? false : !has("lesson_finish", e.lessonId)
  );
  const visits = missing.filter((e) => e.type === "lesson_finish").map((e) => ({ type: "visit" as const, at: e.at }));
  return [...log, ...missing, ...visits].sort((a, b) => a.at.localeCompare(b.at));
}
const MAX_EVENTS = 2000;
const withEvent = (prev: DemoState, e: Omit<AnalyticsEvent, "at">): DemoState => ({
  ...prev,
  events: [...(prev.events ?? []), { ...e, at: new Date().toISOString() }].slice(-MAX_EVENTS),
});
const isToday = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();

// v2: categories were remapped to the four themes; older saved demo state is ignored.
const STORAGE_KEY = "tattva-demo-state-v2";

// ============================================================
// Context Types
// ============================================================

interface DemoContextType {
  isDemo: boolean;
  ready: boolean;
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
  checkAndAwardBadges: (justCompletedId?: string) => string | null;

  // Stats
  getCompletedLessonCount: () => number;
  getCompletedChallengeCount: () => number;
  /** Days in a row, ending today or yesterday, on which a lesson or real-life challenge was finished. */
  getStreak: () => number;
  getCategoryProgress: (categorySlug: string) => {
    completed: number;
    total: number;
    percentage: number;
  };

  // Data: built-in lessons plus the ones written in the Studio
  lessons: Lesson[];
  scenarios: Record<string, Scenario>;

  // Insights: log a usage event (no personal text)
  track: (type: AnalyticsEventType, data?: { lessonId?: string; choiceId?: string }) => void;
  clearEvents: () => void;

  // Studio
  saveAuthored: (item: AuthoredLesson) => void;
  deleteAuthored: (lessonId: string) => void;
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
    authored: [],
    events: DEFAULT_EVENTS,
  });

  // True once saved state has been read; until then Studio-written lessons don't exist yet.
  const [ready, setReady] = useState(false);

  const lessons = useMemo(() => [...seedLessons, ...(state.authored ?? []).map((a) => a.lesson)], [state.authored]);
  const scenarios = useMemo(
    () => ({ ...seedScenarios, ...Object.fromEntries((state.authored ?? []).map((a) => [a.lesson.id, a.scenario])) }),
    [state.authored]
  );

  const saveAuthored = useCallback((item: AuthoredLesson) => {
    setState((prev) => {
      const list = prev.authored ?? [];
      const exists = list.some((a) => a.lesson.id === item.lesson.id);
      return { ...prev, authored: exists ? list.map((a) => (a.lesson.id === item.lesson.id ? item : a)) : [...list, item] };
    });
  }, []);

  const track = useCallback((type: AnalyticsEventType, data?: { lessonId?: string; choiceId?: string }) => {
    setState((prev) => withEvent(prev, { type, ...data }));
  }, []);

  const clearEvents = useCallback(() => setState((prev) => ({ ...prev, events: [] })), []);

  const deleteAuthored = useCallback((lessonId: string) => {
    setState((prev) => ({ ...prev, authored: (prev.authored ?? []).filter((a) => a.lesson.id !== lessonId) }));
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as DemoState;
        // Hydrating from localStorage after mount is the one sanctioned use: the server render can't see storage.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({ ...parsed, events: backfill(parsed) });
      }
    } catch {
      // Use defaults
    }
    // One visit per day, counted when the app first opens that day.
    setState((prev) => ((prev.events ?? []).some((e) => e.type === "visit" && isToday(e.at)) ? prev : withEvent(prev, { type: "visit" })));
    setReady(true);
  }, []);

  // Save to localStorage on change. Skip the first run: it holds the defaults, and
  // writing them would clobber saved progress before the load above is applied.
  const skippedFirstSave = useRef(false);
  useEffect(() => {
    if (!skippedFirstSave.current) {
      skippedFirstSave.current = true;
      return;
    }
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

      const lesson = [...seedLessons, ...(prev.authored ?? []).map((a) => a.lesson)].find((l) => l.id === lessonId);
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
        ...withEvent(prev, { type: "challenge_done", lessonId }),
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

  // justCompletedId counts as done even if its setState hasn't landed yet, so the badge unlocks on the lesson that earns it.
  const checkAndAwardBadges = useCallback((justCompletedId?: string): string | null => {
    // Check each category for badge eligibility
    for (const badge of badges) {
      if (state.earnedBadges.some((b) => b.badgeId === badge.id)) continue;

      const category = categories.find((c) => c.slug === badge.categorySlug);
      if (!category) continue;

      const categoryLessons = lessons.filter(
        (l) => l.categoryId === category.id && l.published
      );
      const completedCount = categoryLessons.filter(
        (l) => l.id === justCompletedId || state.lessonProgress[l.id]?.completed
      ).length;

      if (completedCount >= 2) {
        earnBadge(badge.id);
        return badge.id;
      }
    }
    return null;
  }, [state.lessonProgress, state.earnedBadges, earnBadge, lessons]);

  const getCompletedLessonCount = useCallback(
    () => Object.values(state.lessonProgress).filter((p) => p.completed).length,
    [state.lessonProgress]
  );

  const getCompletedChallengeCount = useCallback(
    () =>
      Object.values(state.challengeProgress).filter((p) => p.completed).length,
    [state.challengeProgress]
  );

  const getStreak = useCallback(() => {
    const day = (d: Date) => d.toLocaleDateString("en-CA");
    const days = new Set(
      [...Object.values(state.lessonProgress), ...Object.values(state.challengeProgress)]
        .filter((p) => p.completed && p.completedAt)
        .map((p) => day(new Date(p.completedAt!)))
    );
    const d = new Date();
    if (!days.has(day(d))) d.setDate(d.getDate() - 1); // today isn't over yet, so a streak can still end yesterday
    let n = 0;
    while (days.has(day(d))) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }, [state.lessonProgress, state.challengeProgress]);

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
    [state.lessonProgress, lessons]
  );

  // Starting over clears the child's progress, not the lessons written in the Studio.
  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState((prev) => ({
      profile: DEFAULT_PROFILE,
      lessonProgress: DEFAULT_PROGRESS,
      challengeProgress: DEFAULT_CHALLENGE_PROGRESS,
      earnedBadges: DEFAULT_BADGES,
      dailyActivity: [],
      authored: prev.authored,
      events: DEFAULT_EVENTS,
    }));
  }, []);

  return (
    <DemoContext.Provider
      value={{
        isDemo: true,
        ready,
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
        getStreak,
        getCategoryProgress,
        lessons,
        scenarios,
        saveAuthored,
        track,
        clearEvents,
        deleteAuthored,
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
