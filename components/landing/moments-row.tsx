"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, MapPin } from "lucide-react";
import { scenarios } from "@/lib/data/seed-scenarios";

const s = scenarios["lesson-7"];
const picked = s.choices[2];

// Each moment pairs a plain description with the real piece of the lesson player it describes.
const moments: { title: string; body: string; gap: string; ui: ReactNode }[] = [
  {
    title: "Something happens",
    body: "A situation a 12-year-old actually meets: a class WhatsApp group, a canteen line, Diwali money.",
    gap: "h-20",
    ui: (
      <Frag>
        <p className="flex items-center gap-1 text-[13px] font-semibold text-text-secondary">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden /> {s.setting}
        </p>
        <p className="mt-3 font-display text-[17px] leading-snug">{s.setup[0]}</p>
      </Frag>
    ),
  },
  {
    title: "You decide",
    body: "Before anyone explains anything. No right answer is marked, so kids pick what they would really do.",
    gap: "h-32",
    ui: (
      <Frag>
        <p className="font-display text-lg font-semibold">{s.prompt}</p>
        {s.choices.map((c, i) => (
          <p key={c.id} className={`mt-2 flex gap-2 rounded-sm px-2.5 py-2 text-[13px] leading-snug ${i === 2 ? "bg-primary text-text-inverse" : "bg-paper-deep"}`}>
            <span className="font-bold">{String.fromCharCode(65 + i)}</span>
            {c.text}
          </p>
        ))}
      </Frag>
    ),
  },
  {
    title: "It plays out",
    body: "The choice has consequences, shown as who it touched. Then the other choices, so kids can compare.",
    gap: "h-14",
    ui: (
      <Frag>
        <p className="font-display text-[15px] leading-snug">{picked.outcome}</p>
        {picked.ripples.map((r) => (
          <div key={r.who} className="mt-2.5 rounded-sm bg-paper-deep px-2.5 py-2">
            <p className="text-[13px] font-bold text-primary">{r.who}</p>
            <p className="text-[13px] leading-snug">{r.effect}</p>
          </div>
        ))}
      </Frag>
    ),
  },
  {
    title: "Others weigh in",
    body: "The same moment through other eyes: the classmate, the teacher, the person it happened to.",
    gap: "h-28",
    ui: (
      <Frag>
        {s.perspectives.slice(0, 2).map((p) => (
          <div key={p.who} className="mb-4">
            <p className="font-display text-[16px] leading-snug">{p.view}</p>
            <p className="mt-1 text-[13px] font-bold text-primary">{p.who}</p>
          </div>
        ))}
      </Frag>
    ),
  },
  {
    title: "The idea behind it",
    body: "Only now is the principle named, in one sentence a child can carry around.",
    gap: "h-16",
    ui: (
      <div data-ui className="flex aspect-[4/5] w-full flex-col justify-center bg-primary-50 p-6">
        <p className="font-display text-[1.375rem] font-semibold leading-tight text-primary-dark">{s.principle.title}</p>
      </div>
    ),
  },
  {
    title: "You take it outside",
    body: "A private reflection, then a real-world challenge for the week. Learning that leaves the screen.",
    gap: "h-36",
    ui: (
      <Frag>
        <p className="text-[13px] font-extrabold text-civic">Your real-world challenge</p>
        <div aria-hidden className="my-3 border-t-[5px] border-dotted border-line" />
        <p className="font-display text-[16px] leading-snug">
          Before you forward anything this week, ask: would they be okay with everyone seeing this?
        </p>
        <p className="mt-4 inline-flex -rotate-6 items-center gap-1 rounded-sm border-2 border-accent-green px-2 py-0.5 text-[13px] font-extrabold uppercase text-accent-green">
          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> Done
        </p>
      </Frag>
    ),
  },
];

export function MomentsRow() {
  const rail = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  };
  const nudge = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * 312, behavior: "smooth" });

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold leading-tight">
          One lesson, six moments
        </h2>
        <div className="hidden gap-2 sm:flex">
          <RailButton label="Previous moment" onClick={() => nudge(-1)}>
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </RailButton>
          <RailButton label="Next moment" onClick={() => nudge(1)}>
            <ArrowRight className="h-5 w-5" aria-hidden />
          </RailButton>
        </div>
      </div>
      <div aria-hidden className="mt-5 h-1.5 w-full bg-line">
        <div className="h-full bg-ink transition-[width] duration-150" style={{ width: `${18 + progress * 82}%` }} />
      </div>
      <ol
        ref={rail}
        onScroll={onScroll}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:gap-8"
      >
        {moments.map((m) => (
          <li key={m.title} className="flex w-[72vw] shrink-0 snap-start flex-col sm:w-[280px]">
            <h3 className="font-sans text-lg font-bold">{m.title}</h3>
            <p className="mt-2 text-base leading-relaxed">{m.body}</p>
            <div aria-hidden className={`${m.gap} shrink-0 max-sm:h-10`} />
            <div className="mt-auto">{m.ui}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Frag({ children }: { children: ReactNode }) {
  return (
    <div data-ui className="aspect-[4/5] w-full overflow-hidden bg-surface p-5">
      {children}
    </div>
  );
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-sm bg-ink text-paper transition-[background-color,transform] hover:bg-primary active:scale-95"
    >
      {children}
    </button>
  );
}
