"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { sounds } from "@/lib/audio";
import { lessons } from "@/lib/data/seed-lessons";
import { categories } from "@/lib/data/seed-categories";
import { scenarios } from "@/lib/data/seed-scenarios";
import { ScenarioPlayer } from "@/components/lesson/scenario-player";
import { LessonComplete } from "@/components/lesson/lesson-complete";
import { Question, POINTS } from "@/types";

// ============================================================
// Lesson Phases
// ============================================================
type LessonPhase = "scenario" | "learn" | "question" | "feedback" | "complete" | "challenge";

// ============================================================
// Component
// ============================================================
export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const {
    isLessonCompleted,
    completeLesson,
    completeChallenge,
    isChallengeCompleted,
    checkAndAwardBadges,
    getLessonProgress,
    state,
  } = useDemo();

  const lesson = useMemo(
    () => lessons.find((l) => l.id === lessonId),
    [lessonId]
  );
  const category = useMemo(
    () => (lesson ? categories.find((c) => c.id === lesson.categoryId) : null),
    [lesson]
  );

  const alreadyCompleted = isLessonCompleted(lessonId);
  const challengeDone = isChallengeCompleted(lessonId);

  // Next unfinished lesson after this one, wrapping to the start.
  const nextLesson = useMemo(() => {
    const i = lessons.findIndex((l) => l.id === lessonId);
    const order = [...lessons.slice(i + 1), ...lessons.slice(0, i)];
    return order.find((l) => l.published && !isLessonCompleted(l.id));
  }, [lessonId, isLessonCompleted]);

  const scenario = scenarios[lessonId];
  const startPhase: LessonPhase = scenario ? "scenario" : "learn";
  const [phase, setPhase] = useState<LessonPhase>(
    alreadyCompleted ? "complete" : startPhase
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [justFinished, setJustFinished] = useState(false);
  const [earnedBadgeId, setEarnedBadgeId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-3">
          Lesson not found
        </h1>
        <p className="text-text-secondary mb-6">
          We couldn&apos;t find this lesson. It may have been removed.
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  const questions = lesson.questions ?? [];
  const earnedBadge = state.earnedBadges.find((b) => b.badgeId === earnedBadgeId)?.badge;
  const currentQuestion: Question | undefined = questions[currentQuestionIndex];

  // ============================================================
  // Handlers
  // ============================================================

  const toggleReadAloud = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown hashes and bullets
    const cleanText = `${lesson.title}. ${lesson.description}. ${lesson.content
      .replace(/[#*`_]/g, "")
      .replace(/\n+/g, " ")}`;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95; // child-friendly clear pace
    utterance.pitch = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleStartQuestions = () => {
    if (isSpeaking && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    sounds.playClick();
    if (questions.length > 0) {
      setPhase("question");
    } else {
      handleLessonComplete(0);
    }
  };

  const handleSelectAnswer = (optionId: string) => {
    if (selectedAnswer) return; // Already answered
    setSelectedAnswer(optionId);

    const isCorrect =
      currentQuestion?.options.find((o) => o.id === optionId)?.isCorrect ?? false;
    setAnsweredCorrectly(isCorrect);

    if (isCorrect) {
      sounds.playCorrect();
      setTotalScore((prev) => prev + POINTS.CORRECT_ANSWER);
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnsweredCorrectly(false);
    } else {
      handleLessonComplete(totalScore);
    }
  };

  const handleLessonComplete = (score: number) => {
    sounds.playCelebration();
    if (!alreadyCompleted) {
      completeLesson(lessonId, score);
      setJustFinished(true);

      // Check for badge
      setTimeout(() => {
        const newBadge = checkAndAwardBadges();
        if (newBadge) setEarnedBadgeId(newBadge);
      }, 500);
    }
    setPhase("complete");
  };

  const handleCompleteChallenge = () => {
    if (!challengeDone) {
      sounds.playCelebration();
      completeChallenge(lessonId);
    }
  };

  const handleRetakeLesson = () => {
    sounds.playClick();
    setPhase(startPhase);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnsweredCorrectly(false);
    setTotalScore(0);
  };

  // ============================================================
  // Render Content
  // ============================================================

  // Format lesson content with simple markdown
  const formatContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;

      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="text-lg font-bold text-text-primary mt-6 mb-2"
          >
            {trimmed.slice(4)}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-xl font-bold text-text-primary mt-6 mb-3"
          >
            {trimmed.slice(3)}
          </h2>
        );
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li key={i} className="text-sm text-text-secondary ml-4 mb-1">
            {renderBold(trimmed.slice(2))}
          </li>
        );
      }

      return (
        <p key={i} className="text-sm text-text-secondary leading-relaxed mb-2">
          {renderBold(trimmed)}
        </p>
      );
    });
  };

  const renderBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-text-primary">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative">

      {/* ==================== BACK BUTTON ==================== */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* ==================== LESSON HEADER ==================== */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `${category?.color}15`,
              color: category?.color,
            }}
          >
            {category?.icon} {category?.name}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-tertiary">
            <Clock className="w-3 h-3" />
            {lesson.durationMinutes} min
          </span>
          {alreadyCompleted && (
            <span className="flex items-center gap-1 text-xs text-accent-green font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
          {lesson.title}
        </h1>
      </div>

      {/* ==================== PROGRESS INDICATOR ==================== */}
      {phase !== "complete" && phase !== "scenario" && (
        <div className="flex items-center gap-2 mb-6">
          {["learn", ...(questions.length > 0 ? ["questions"] : []), "challenge"].map(
            (step) => {
              const isDone =
                (step === "learn" && phase !== "learn") ||
                (step === "questions" && phase === "challenge");
              const isActive =
                (step === "learn" && phase === "learn") ||
                (step === "questions" &&
                  (phase === "question" || phase === "feedback")) ||
                (step === "challenge" && phase === "challenge");

              return (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div
                    className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${
                      isDone
                        ? "bg-accent-green"
                        : isActive
                        ? "bg-primary"
                        : "bg-border"
                    }`}
                  />
                </div>
              );
            }
          )}
        </div>
      )}

      {/* ==================== PHASE: SCENARIO ==================== */}
      {phase === "scenario" && scenario && (
        <ScenarioPlayer
          scenario={scenario}
          fullNote={formatContent(lesson.content)}
          onFinish={(wrote) => {
            // Reflection bonus; also feeds the "+N points" shown on the completion screen.
            const bonus = wrote ? POINTS.CORRECT_ANSWER : 0;
            setTotalScore(bonus);
            handleLessonComplete(bonus);
          }}
        />
      )}

      {/* ==================== PHASE: LEARN ==================== */}
      <AnimatePresence mode="wait">
        {phase === "learn" && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-border mb-6">
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-border-light">
                <p className="text-sm sm:text-base text-text-secondary italic flex-1">
                  {lesson.description}
                </p>
                <button
                  onClick={toggleReadAloud}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
                    isSpeaking
                      ? "bg-accent-pink text-white animate-pulse"
                      : "bg-surface-secondary text-primary hover:bg-primary/10 border border-primary/20"
                  }`}
                  title="Listen to lesson narration"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Read Aloud</span>
                    </>
                  )}
                </button>
              </div>
              <div className="pt-2">
                {formatContent(lesson.content)}
              </div>
            </div>

            <button
              onClick={handleStartQuestions}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-white font-semibold text-lg hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {questions.length > 0
                ? "Test Your Knowledge"
                : "Complete Lesson"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* ==================== PHASE: QUESTION ==================== */}
        {(phase === "question" || phase === "feedback") && currentQuestion && (
          <motion.div
            key={`question-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-border mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6">
                🤔 {currentQuestion.questionText}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrect = option.isCorrect;
                  const showResult = selectedAnswer !== null;
                  const labels = ["A", "B", "C", "D"];

                  let classes =
                    "border-border hover:border-primary/40 hover:bg-primary/5 cursor-pointer";

                  if (showResult) {
                    if (isCorrect) {
                      classes =
                        "border-accent-green bg-accent-green-light/30 cursor-default";
                    } else if (isSelected && !isCorrect) {
                      classes =
                        "border-accent-red bg-accent-red-light cursor-default";
                    } else {
                      classes = "border-border opacity-60 cursor-default";
                    }
                  }

                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleSelectAnswer(option.id)}
                      disabled={selectedAnswer !== null}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${classes}`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          showResult && isCorrect
                            ? "bg-accent-green text-white"
                            : showResult && isSelected && !isCorrect
                            ? "bg-accent-red text-white"
                            : "bg-surface-tertiary text-text-tertiary"
                        }`}
                      >
                        {showResult && isCorrect ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : showResult && isSelected && !isCorrect ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          labels[i]
                        )}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          showResult && isCorrect
                            ? "text-accent-green-dark"
                            : showResult && isSelected && !isCorrect
                            ? "text-accent-red"
                            : "text-text-primary"
                        }`}
                      >
                        {option.optionText}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-5"
                  >
                    <div
                      className={`rounded-xl p-4 border ${
                        answeredCorrectly
                          ? "bg-accent-green-light/30 border-accent-green/20"
                          : "bg-accent-yellow-light/30 border-accent-yellow/20"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium mb-1 ${
                          answeredCorrectly
                            ? "text-accent-green-dark"
                            : "text-accent-yellow-dark"
                        }`}
                      >
                        {answeredCorrectly
                          ? "🌱 That's a great choice!"
                          : "💡 Not quite! Let's think about it."}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {currentQuestion.explanation}
                      </p>
                      {answeredCorrectly && (
                        <motion.p
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-xs font-bold text-accent-green mt-2"
                        >
                          +{POINTS.CORRECT_ANSWER} points ⭐
                        </motion.p>
                      )}
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Next Question"
                        : "Complete Lesson"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ==================== PHASE: COMPLETE ==================== */}
        {phase === "complete" && (
          <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <LessonComplete
              earned={
                justFinished
                  ? {
                      base: lesson.points,
                      bonus: totalScore,
                      bonusLabel: scenario ? "for reflecting" : "for right answers",
                    }
                  : null
              }
              completedAt={getLessonProgress(lessonId)?.completedAt}
              bigIdea={scenario?.principle.title}
              badge={earnedBadge}
              challenge={lesson.challenge}
              challengeDone={challengeDone}
              onChallengeDone={handleCompleteChallenge}
              nextLesson={nextLesson}
              onReview={handleRetakeLesson}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
