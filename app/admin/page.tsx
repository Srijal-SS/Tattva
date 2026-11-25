"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, PenLine, Plus, Trash2 } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { ThemeIcon } from "@/components/ui/theme-icon";

function LessonsList() {
  const { lessons, scenarios, state, deleteAuthored } = useDemo();
  const saved = useSearchParams().get("saved");
  const authoredIds = new Set((state.authored ?? []).map((a) => a.lesson.id));

  const remove = (id: string, title: string) => {
    if (window.confirm(`Delete “${title}”? This can’t be undone.`)) deleteAuthored(id);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold">Lessons</h1>
          <p className="mt-2 text-lg text-text-secondary">
            {lessons.length} lessons, {authoredIds.size} written here. Everything is saved in this browser.
          </p>
        </div>
        <Link
          href="/admin/write"
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-text-inverse hover:bg-primary-dark"
        >
          <Plus className="h-5 w-5" aria-hidden /> Write a lesson
        </Link>
      </div>

      {saved && (
        <p role="status" className="mt-6 rounded-2xl bg-civic-tint px-4 py-3 font-semibold text-civic">
          Saved “{saved}”.
        </p>
      )}

      {categories.map((c) => {
        const list = lessons.filter((l) => l.categoryId === c.id);
        return (
          <section key={c.id} aria-labelledby={`theme-${c.id}`} className="mt-10">
            <h2 id={`theme-${c.id}`} className="flex items-center gap-2 font-sans text-lg font-bold" style={{ color: c.color }}>
              <ThemeIcon name={c.icon} className="h-5 w-5" />
              {c.name}
              <span className="font-semibold text-text-tertiary">· {list.length}</span>
            </h2>
            {list.length === 0 ? (
              <p className="mt-2 text-text-secondary">No lessons yet.</p>
            ) : (
              <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
                {list.map((l) => {
                  const mine = authoredIds.has(l.id);
                  return (
                    <li key={l.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 sm:flex-nowrap">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{l.title}</p>
                        <p className="truncate text-sm text-text-secondary">{l.description}</p>
                      </div>
                      <span className="shrink-0 text-sm text-text-secondary">
                        {mine ? (l.published ? "Yours · published" : "Yours · draft") : "Built in"}
                        {scenarios[l.id] ? "" : " · old format"}
                      </span>
                      <div className="flex shrink-0 items-center gap-1">
                        <Link
                          href={`/lesson/${l.id}`}
                          aria-label={`Preview ${l.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-paper-deep hover:text-ink"
                        >
                          <Eye className="h-[18px] w-[18px]" aria-hidden />
                        </Link>
                        {mine && (
                          <>
                            <Link
                              href={`/admin/write?id=${l.id}`}
                              aria-label={`Edit ${l.title}`}
                              className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-paper-deep hover:text-ink"
                            >
                              <PenLine className="h-[18px] w-[18px]" aria-hidden />
                            </Link>
                            <button
                              type="button"
                              onClick={() => remove(l.id, l.title)}
                              aria-label={`Delete ${l.title}`}
                              className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-accent-red-light hover:text-accent-red"
                            >
                              <Trash2 className="h-[18px] w-[18px]" aria-hidden />
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <LessonsList />
    </Suspense>
  );
}
