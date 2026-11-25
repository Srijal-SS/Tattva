import type { AnalyticsEvent, Lesson } from "@/types";

const dayKey = (iso: string) => new Date(iso).toLocaleDateString("en-CA");

export interface LessonStats {
  lesson: Lesson;
  opened: number;
  finished: number;
  reflections: number;
  choices: Record<string, number>;
}

/** Turns the raw event log into the answers the Insights page shows. Pure, so it is easy to check. */
export function summarise(events: AnalyticsEvent[], lessons: Lesson[], now = new Date()) {
  const of = (t: AnalyticsEvent["type"]) => events.filter((e) => e.type === t);
  const started = new Set(of("lesson_start").map((e) => e.lessonId));
  const finished = new Set(of("lesson_finish").map((e) => e.lessonId));
  const challenges = new Set(of("challenge_done").map((e) => e.lessonId));
  const activeDays = [...new Set(events.map((e) => dayKey(e.at)))].sort();

  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (13 - i));
    const key = d.toLocaleDateString("en-CA");
    const todays = events.filter((e) => dayKey(e.at) === key);
    return {
      key,
      label: d.toLocaleDateString("en-IN", { weekday: "narrow" }),
      long: d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
      visited: todays.length > 0,
      finished: todays.filter((e) => e.type === "lesson_finish").length,
    };
  });

  const perLesson: LessonStats[] = lessons
    .map((lesson) => {
      const mine = events.filter((e) => e.lessonId === lesson.id);
      const choices: Record<string, number> = {};
      for (const e of mine) if (e.type === "choice" && e.choiceId) choices[e.choiceId] = (choices[e.choiceId] ?? 0) + 1;
      return {
        lesson,
        opened: mine.filter((e) => e.type === "lesson_start").length,
        finished: mine.filter((e) => e.type === "lesson_finish").length,
        reflections: mine.filter((e) => e.type === "reflection").length,
        choices,
      };
    })
    .filter((s) => s.opened > 0 || s.finished > 0);

  // Lessons finished that were also opened, so a finish without a logged start can't push the rate past 100%.
  const finishedOfStarted = [...started].filter((id) => finished.has(id)).length;
  return {
    started: started.size,
    finished: finished.size,
    finishRate: started.size ? Math.round((finishedOfStarted / started.size) * 100) : 0,
    activeDays: activeDays.length,
    challenges: challenges.size,
    tryRate: finished.size ? Math.round(([...challenges].filter((id) => finished.has(id)).length / finished.size) * 100) : 0,
    last14,
    perLesson,
  };
}
