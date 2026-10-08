// ============================================================
// TATTVA — Core Types
// ============================================================

// --- Categories ---

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sortOrder: number;
}

// --- Lessons ---

export type MediaType = "video" | "image" | "text";

export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  ageMin: number;
  ageMax: number;
  durationMinutes: number;
  thumbnailUrl?: string;
  mediaType: MediaType;
  mediaUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
  content: string;
  challenge: string;
  points: number;
  badgeId?: string;
  published: boolean;
  sortOrder: number;
  // Joined data
  category?: Category;
  questions?: Question[];
}

// --- Questions ---

export interface QuestionOption {
  id: string;
  questionId: string;
  optionText: string;
  isCorrect: boolean;
  sortOrder: number;
}

export interface Question {
  id: string;
  lessonId: string;
  questionText: string;
  explanation: string;
  sortOrder: number;
  options: QuestionOption[];
}

// --- User Profile ---

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  age: number;
  avatar: string;
  points: number;
  streak: number;
  lastActiveDate: string | null;
  onboardingComplete: boolean;
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

// --- Progress ---

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt: string | null;
}

export interface ChallengeProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt: string | null;
}

// --- Badges ---

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  categorySlug: string;
  requirement: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
  badge?: Badge;
}

// --- Daily Activity ---

export interface DailyActivity {
  id: string;
  userId: string;
  activityDate: string;
  pointsEarned: number;
  lessonsCompleted: number;
}

// --- Gamification Constants ---

export const POINTS = {
  LESSON_COMPLETE: 10,
  CORRECT_ANSWER: 5,
  CHALLENGE_COMPLETE: 10,
  DAILY_LEARNING: 5,
} as const;

// --- Onboarding ---

export interface OnboardingData {
  name: string;
  age: number;
  avatar: string;
  interests: string[];
}

// --- Demo State ---

export interface DemoState {
  profile: UserProfile;
  lessonProgress: Record<string, LessonProgress>;
  challengeProgress: Record<string, ChallengeProgress>;
  earnedBadges: UserBadge[];
  dailyActivity: DailyActivity[];
}

// --- Admin ---

export interface LessonFormData {
  title: string;
  slug: string;
  categoryId: string;
  description: string;
  ageMin: number;
  ageMax: number;
  durationMinutes: number;
  thumbnailUrl: string;
  mediaType: MediaType;
  mediaUrl: string;
  sourceName: string;
  sourceUrl: string;
  content: string;
  challenge: string;
  points: number;
  badgeId: string;
  published: boolean;
  questions: QuestionFormData[];
}

export interface QuestionFormData {
  questionText: string;
  explanation: string;
  options: QuestionOptionFormData[];
}

export interface QuestionOptionFormData {
  optionText: string;
  isCorrect: boolean;
}

// --- Avatars ---

export const AVATARS = [
  { id: "explorer", label: "Explorer", emoji: "🧭" },
  { id: "star", label: "Star", emoji: "⭐" },
  { id: "rocket", label: "Rocket", emoji: "🚀" },
  { id: "flower", label: "Flower", emoji: "🌸" },
  { id: "lightning", label: "Lightning", emoji: "⚡" },
  { id: "sun", label: "Sunshine", emoji: "☀️" },
  { id: "tree", label: "Tree", emoji: "🌳" },
  { id: "butterfly", label: "Butterfly", emoji: "🦋" },
] as const;

export type AvatarId = (typeof AVATARS)[number]["id"];
