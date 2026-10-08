"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, BookOpen, ChevronRight } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { lessons } from "@/lib/data/seed-lessons";
import { categories } from "@/lib/data/seed-categories";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const { isLessonCompleted, getCategoryProgress } = useDemo();

  const filteredLessons = useMemo(() => {
    const published = lessons.filter((l) => l.published);
    if (activeFilter === "all") return published;
    const category = categories.find((c) => c.slug === activeFilter);
    if (!category) return published;
    return published.filter((l) => l.categoryId === category.id);
  }, [activeFilter]);

  const filters = [
    { slug: "all", label: "All", icon: "📚" },
    ...categories.map((c) => ({ slug: c.slug, label: c.name, icon: c.icon })),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Explore Skills
        </h1>
        <p className="text-text-secondary mb-6">
          Browse lessons across all categories and start learning.
        </p>
      </motion.div>

      {/* ==================== CATEGORY CARDS ==================== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8"
      >
        {categories.map((cat) => {
          const progress = getCategoryProgress(cat.slug);
          return (
            <button
              key={cat.id}
              onClick={() =>
                setActiveFilter(activeFilter === cat.slug ? "all" : cat.slug)
              }
              className={`text-left rounded-2xl p-4 border transition-all duration-200 ${
                activeFilter === cat.slug
                  ? "border-primary bg-primary/5 shadow-card-hover"
                  : "border-border bg-white hover:border-primary/30 hover:shadow-card"
              }`}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <h3 className="text-sm font-bold text-text-primary">{cat.name}</h3>
              <p className="text-xs text-text-tertiary mt-1 line-clamp-2">
                {cat.description}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
                <span className="text-[10px] text-text-tertiary font-medium">
                  {progress.completed}/{progress.total}
                </span>
              </div>
            </button>
          );
        })}
      </motion.div>

      {/* ==================== FILTER PILLS ==================== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.slug}
            onClick={() => setActiveFilter(f.slug)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeFilter === f.slug
                ? "bg-primary text-white shadow-sm"
                : "bg-white border border-border text-text-secondary hover:border-primary/30"
            }`}
          >
            <span className="text-sm">{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* ==================== LESSON LIST ==================== */}
      <div className="space-y-3">
        {filteredLessons.map((lesson, i) => {
          const cat = categories.find((c) => c.id === lesson.categoryId);
          const completed = isLessonCompleted(lesson.id);

          return (
            <motion.div
              key={lesson.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i + 2}
            >
              <Link href={`/lesson/${lesson.id}`} className="block">
                <div
                  className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 ${
                    completed
                      ? "border-accent-green/20"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl ${
                        completed
                          ? "bg-accent-green-light/50"
                          : "bg-surface-tertiary"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-6 h-6 text-accent-green" />
                      ) : (
                        cat?.icon ?? "📖"
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider"
                          style={{ color: cat?.color }}
                        >
                          {cat?.name}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-text-tertiary">
                          <Clock className="w-3 h-3" />
                          {lesson.durationMinutes} min
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-text-primary mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-text-tertiary line-clamp-1">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-text-tertiary flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {lesson.questions?.length ?? 0} questions
                        </span>
                        <span className="text-xs text-accent-yellow-dark font-medium">
                          +{lesson.points} pts
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-tertiary flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-bold text-text-primary mb-2">
            No lessons yet
          </h3>
          <p className="text-text-secondary text-sm">
            More lessons coming soon in this category!
          </p>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse text-text-secondary">
          Loading lessons...
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
