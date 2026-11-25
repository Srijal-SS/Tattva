"use client";

import { Suspense } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { ThemeIcon } from "@/components/ui/theme-icon";
import { cn } from "@/lib/utils";

function ExploreContent() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isLessonCompleted, lessons, scenarios } = useDemo();
  const reduce = useReducedMotion();

  // The URL is the single source of truth for the filter, so links like ?category=values work and stay in sync.
  const active = categories.some((c) => c.slug === params.get("category")) ? params.get("category")! : "all";
  const theme = categories.find((c) => c.slug === active);
  const setFilter = (slug: string) =>
    router.replace(slug === "all" ? pathname : `${pathname}?category=${slug}`, { scroll: false });

  const list = lessons.filter((l) => l.published && (!theme || l.categoryId === theme.id));
  const doneInTheme = list.filter((l) => isLessonCompleted(l.id)).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-4xl font-semibold">Explore</h1>
      <p className="mt-2 max-w-[56ch] text-lg text-text-secondary">
        Every situation so far, across the four themes. Pick any one; there&apos;s no fixed order.
      </p>

      <div role="group" aria-label="Filter by theme" className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {[{ slug: "all", name: "All", icon: undefined as string | undefined, color: "" }, ...categories].map((c) => {
          const on = active === c.slug;
          return (
            <button
              key={c.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c.slug)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors",
                on ? "text-paper" : "bg-surface text-text-secondary hover:text-ink"
              )}
            >
              {/* The dark pill slides to the active filter. */}
              {on && (
                <motion.span
                  layoutId="explore-filter"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative inline-flex items-center gap-2">
                {c.icon && <ThemeIcon name={c.icon} className="h-4 w-4" style={on ? undefined : { color: c.color }} />}
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      {theme && (
        <div className="mt-8 rounded-3xl p-6 sm:p-8" style={{ backgroundColor: `${theme.color}14` }}>
          <h2 className="flex items-center gap-2.5 text-2xl font-semibold" style={{ color: theme.color }}>
            <ThemeIcon name={theme.icon} className="h-6 w-6" />
            {theme.name}
          </h2>
          <p className="mt-2 max-w-[60ch] text-lg">{theme.description}</p>
          {list.length > 0 && (
            <p className="mt-3 text-sm font-semibold text-text-secondary">
              {doneInTheme} of {list.length} done
            </p>
          )}
        </div>
      )}

      {list.length > 0 ? (
        <motion.ul layout={!reduce} className="mt-8 space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
          {list.map((l, i) => {
            const c = categories.find((x) => x.id === l.categoryId);
            const done = isLessonCompleted(l.id);
            return (
              <motion.li
                key={l.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : Math.min(i, 8) * 0.04 }}
              >
                <Link
                  href={`/lesson/${l.id}`} transitionTypes={["nav-forward"]}
                  className="group flex items-center gap-4 rounded-2xl bg-surface p-4 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-card-hover sm:p-5"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${c?.color}1A`, color: c?.color }}
                  >
                    <ThemeIcon name={c?.icon} className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-semibold leading-snug">{l.title}</span>
                    <span className="mt-0.5 block text-text-secondary">{l.description}</span>
                    <span className="mt-1.5 block text-sm font-semibold" style={{ color: c?.color }}>
                      {c?.name} · {l.durationMinutes} min{scenarios[l.id] ? " · scenario" : ""}
                    </span>
                  </span>
                  {done ? (
                    <span className="flex shrink-0 items-center gap-1 text-sm font-bold text-accent-green">
                      <CheckCircle2 className="h-5 w-5" aria-hidden /> <span className="hidden sm:inline">Done</span>
                    </span>
                  ) : (
                    <ChevronRight className="h-5 w-5 shrink-0 text-text-tertiary transition-transform group-hover:translate-x-1" aria-hidden />
                  )}
                </Link>
              </motion.li>
            );
          })}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-8 rounded-3xl bg-surface p-8">
          <p className="font-display text-2xl font-semibold">Nothing here yet</p>
          <p className="mt-2 max-w-[56ch] text-text-secondary">
            Culture lessons are being written carefully, with every claim labelled and sourced. Try another theme for
            now.
          </p>
          <button type="button" onClick={() => setFilter("all")} className="mt-4 font-semibold text-primary underline underline-offset-4">
            Show all lessons
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-12 text-text-secondary">Loading lessons…</div>}>
      <ExploreContent />
    </Suspense>
  );
}
