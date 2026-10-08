"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  Search,
  Filter,
  Check,
  X,
  Sparkles,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { lessons as initialLessons } from "@/lib/data/seed-lessons";
import { categories } from "@/lib/data/seed-categories";
import { Lesson } from "@/types";
import { sounds } from "@/lib/audio";

export default function AdminPage() {
  const [lessonList, setLessonList] = useState<Lesson[]>(initialLessons);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Lesson form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0].id);
  const [newDescription, setNewDescription] = useState("");
  const [newDuration, setNewDuration] = useState(5);
  const [newChallenge, setNewChallenge] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);

  const togglePublish = (id: string) => {
    sounds.playClick();
    setLessonList((prev) =>
      prev.map((l) => (l.id === id ? { ...l, published: !l.published } : l))
    );
    showToast("Lesson publish status updated");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playCelebration();

    const createdLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      categoryId: newCategory,
      title: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: newDescription.trim(),
      ageMin: 8,
      ageMax: 14,
      durationMinutes: newDuration,
      mediaType: "text",
      content: newContent.trim() || "### Key Concept\nAlways remember to apply this in daily life.",
      challenge: newChallenge.trim() || "Practice this skill once this week with family.",
      points: 10,
      published: true,
      sortOrder: lessonList.length + 1,
      questions: newQuestionText.trim()
        ? [
            {
              id: `q-${Date.now()}`,
              lessonId: `lesson-${Date.now()}`,
              questionText: newQuestionText.trim(),
              explanation: "Great job understanding the core life skill!",
              sortOrder: 1,
              options: [
                {
                  id: `opt-1`,
                  questionId: `q-${Date.now()}`,
                  optionText: option1.trim() || "Correct respectful choice",
                  isCorrect: correctOptionIndex === 0,
                  sortOrder: 1,
                },
                {
                  id: `opt-2`,
                  questionId: `q-${Date.now()}`,
                  optionText: option2.trim() || "Incorrect disrespectful choice",
                  isCorrect: correctOptionIndex === 1,
                  sortOrder: 2,
                },
              ],
            },
          ]
        : [],
    };

    setLessonList((prev) => [createdLesson, ...prev]);
    setIsModalOpen(false);
    showToast(`Created new lesson: "${createdLesson.title}"`);

    // Reset fields
    setNewTitle("");
    setNewDescription("");
    setNewChallenge("");
    setNewContent("");
    setNewQuestionText("");
    setOption1("");
    setOption2("");
  };

  const filteredLessons = lessonList.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === "all" || l.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const publishedCount = lessonList.filter((l) => l.published).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-lg border border-slate-700 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-accent-green" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Curriculum & Content Management
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Author and publish age-appropriate life skills lessons and real-world challenges.
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Lesson</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-text-secondary font-medium">Total Lessons</div>
          <div className="text-2xl font-bold text-text-primary mt-1">
            {lessonList.length}
          </div>
          <div className="text-[11px] text-accent-green font-medium mt-1">
            {publishedCount} published live
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-text-secondary font-medium">Skill Categories</div>
          <div className="text-2xl font-bold text-text-primary mt-1">
            {categories.length}
          </div>
          <div className="text-[11px] text-text-tertiary mt-1">Core life pillars</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-text-secondary font-medium">Avg Completion</div>
          <div className="text-2xl font-bold text-text-primary mt-1">89%</div>
          <div className="text-[11px] text-accent-green font-medium mt-1">
            High interactive retention
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="text-xs text-text-secondary font-medium">Active Learners</div>
          <div className="text-2xl font-bold text-text-primary mt-1">420</div>
          <div className="text-[11px] text-text-tertiary mt-1">Beta cohort</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-border shadow-sm mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search lessons..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white"
                : "bg-surface-secondary text-text-secondary hover:text-text-primary"
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === c.id
                  ? "bg-slate-900 text-white"
                  : "bg-surface-secondary text-text-secondary hover:text-text-primary"
              }`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Catalog Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary text-text-secondary border-b border-border">
              <tr>
                <th className="px-5 py-3 font-semibold">Lesson Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">Questions</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredLessons.map((lesson) => {
                const category = categories.find((c) => c.id === lesson.categoryId);
                return (
                  <tr key={lesson.id} className="hover:bg-surface-secondary/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-text-primary max-w-xs">
                      <div className="font-bold">{lesson.title}</div>
                      <div className="text-[11px] text-text-tertiary truncate">
                        {lesson.description}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-text-secondary">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-secondary border border-border text-[11px]">
                        <span>{category?.icon}</span>
                        <span>{category?.name}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-text-secondary">
                      {lesson.durationMinutes} mins
                    </td>
                    <td className="px-4 py-3.5 text-text-secondary">
                      {lesson.questions?.length ?? 0}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                          lesson.published
                            ? "bg-accent-green-light/40 text-accent-green-dark"
                            : "bg-surface-tertiary text-text-tertiary"
                        }`}
                      >
                        {lesson.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => togglePublish(lesson.id)}
                        className="px-2.5 py-1 rounded-lg border border-border hover:bg-surface-secondary text-[11px] font-semibold text-text-secondary transition-colors"
                      >
                        {lesson.published ? "Unpublish" : "Publish"}
                      </button>
                      <Link
                        href={`/lesson/${lesson.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-[11px] font-semibold text-primary transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE LESSON MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-border"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">
                    Create New Life Skills Lesson
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Add content, interactive quiz, and a real-world habit challenge.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateLesson} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">
                    Lesson Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Respecting Boundaries & Personal Space"
                    className="w-full px-3 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-text-primary mb-1">
                      Category *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.icon} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-text-primary mb-1">
                      Estimated Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={newDuration}
                      onChange={(e) => setNewDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-text-primary mb-1">
                    Short Hook / Summary *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="e.g. Learn why giving others physical space makes everyone comfortable."
                    className="w-full px-3 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-primary mb-1">
                    Lesson Body (Markdown supported)
                  </label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="### What is Personal Space?&#10;Imagine you are in an invisible bubble...&#10;&#10;### Why it matters&#10;When someone is too close, it can feel overwhelming."
                    className="w-full px-3 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-primary mb-1">
                    Real-World Challenge (Actionable habit) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newChallenge}
                    onChange={(e) => setNewChallenge(e.target.value)}
                    placeholder="e.g. Notice arm's length distance when talking with school friends tomorrow."
                    className="w-full px-3 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-secondary border border-border space-y-3">
                  <span className="font-bold text-text-primary block">
                    Interactive Question
                  </span>

                  <div>
                    <label className="block font-semibold text-text-secondary mb-1">
                      Question Prompt
                    </label>
                    <input
                      type="text"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="e.g. If a friend takes a step back while speaking with you, what should you do?"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-semibold text-text-secondary">Option A</label>
                        <button
                          type="button"
                          onClick={() => setCorrectOptionIndex(0)}
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            correctOptionIndex === 0
                              ? "bg-accent-green text-white"
                              : "bg-surface-tertiary text-text-tertiary"
                          }`}
                        >
                          {correctOptionIndex === 0 ? "Correct ✓" : "Set Correct"}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                        placeholder="Give them space and respect their comfort"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-white"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-semibold text-text-secondary">Option B</label>
                        <button
                          type="button"
                          onClick={() => setCorrectOptionIndex(1)}
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            correctOptionIndex === 1
                              ? "bg-accent-green text-white"
                              : "bg-surface-tertiary text-text-tertiary"
                          }`}
                        >
                          {correctOptionIndex === 1 ? "Correct ✓" : "Set Correct"}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                        placeholder="Step closer so they can hear better"
                        className="w-full px-3 py-2 rounded-xl border border-border bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-border font-semibold text-text-secondary hover:text-text-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-all shadow-sm"
                  >
                    Publish Lesson
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
