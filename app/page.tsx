"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroTicket } from "@/components/landing/hero-ticket";
import { MomentsRow } from "@/components/landing/moments-row";
import { lessons } from "@/lib/data/seed-lessons";
import { scenarios } from "@/lib/data/seed-scenarios";
import credits from "@/public/world/credits.json";

const EASE = [0.22, 1, 0.36, 1] as const;

// The lesson menu, grouped into the four themes (PRODUCT.md). Seed categories fold into them here.
const menu: { theme: string; ids: string[] }[] = [
  { theme: "Civic Sense", ids: ["lesson-1", "lesson-2", "lesson-6"] },
  { theme: "Values", ids: ["lesson-7", "lesson-9", "lesson-10"] },
  { theme: "Life Skills", ids: ["lesson-8", "lesson-5", "lesson-3"] },
];

const facts = [
  { big: "10 to 14", note: "Old enough to argue, young enough to change their mind" },
  { big: "5 minutes", note: "One situation, start to finish, between homework and dinner" },
  { big: "4 themes", note: "Values, culture, civic sense and life skills" },
  { big: "No ads", note: "And no leaderboards ranking children against each other" },
];

// Scalloped edges for the paper pieces, cut with masks so no outline is needed.
const scallopTopBottom = {
  maskImage:
    "radial-gradient(circle at 50% 0, transparent 9px, #000 9.5px), radial-gradient(circle at 50% 100%, transparent 9px, #000 9.5px)", // taste-skill-ignore: mask, not a fill
  maskSize: "24px 51%",
  maskPosition: "top, bottom",
  maskRepeat: "repeat-x",
} as const;
const scallopBottom = {
  maskImage: "radial-gradient(circle at 50% 100%, transparent 9px, #000 9.5px), linear-gradient(#000, #000)", // taste-skill-ignore: mask, not a fill
  maskSize: "24px 20px, 100% calc(100% - 19px)",
  maskPosition: "bottom, top",
  maskRepeat: "repeat-x, no-repeat",
} as const;
const scallopTop = {
  maskImage: "radial-gradient(circle at 50% 0, transparent 26px, #000 26.5px), linear-gradient(#000, #000)", // taste-skill-ignore: mask, not a fill
  maskSize: "84px 30px, 100% calc(100% - 29px)",
  maskPosition: "top, bottom",
  maskRepeat: "repeat-x, no-repeat",
} as const;

export default function LandingPage() {
  return (
    <div className="bg-chakra-deep">
      <main className="bg-paper">
        {/* ============ HERO: the ticket on the field ============ */}
        <section className="bg-chakra pb-0 text-chakra-ink">
          <header className="mx-auto flex max-w-[80rem] items-center justify-between gap-6 px-6 py-6 sm:px-10">
            <Link href="/" className="flex items-center gap-3 font-display text-2xl font-semibold text-paper">
              <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10" priority />
              Tattva
            </Link>
            <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] font-semibold md:flex">
              <a href="#how" className="hover:text-paper">How it works</a>
              <a href="#lessons" className="hover:text-paper">Lessons</a>
              <a href="#parents" className="hover:text-paper">For parents</a>
            </nav>
            <div className="flex items-center gap-5">
              <Link href="/login" className="hidden text-[15px] font-semibold hover:text-paper sm:block">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-sm bg-primary px-5 py-2.5 text-[15px] font-bold text-text-inverse transition-colors hover:bg-primary-light"
              >
                Start free
              </Link>
            </div>
          </header>
          <div className="relative z-10 mx-auto max-w-[80rem] px-3 pt-16 sm:px-10 sm:pt-24 -mb-56">
            <HeroTicket />
          </div>
        </section>

        {/* ============ INTRO: the gap ============ */}
        <section aria-labelledby="gap-heading" className="bg-paper-deep pb-24 pt-80 lg:pb-24">
          <div className="mx-auto max-w-[80rem] px-6 sm:px-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <Rise className="lg:col-span-6">
                <h2 id="gap-heading" className="font-display text-[clamp(2.75rem,5vw,4.75rem)] font-light leading-[0.98]">
                  The missing lesson
                </h2>
              </Rise>
              <Rise delay={0.08} className="lg:col-span-5 lg:col-start-8">
                <p className="text-lg leading-relaxed">
                  Schools have a syllabus for fractions and photosynthesis. There isn&apos;t one for what to do when
                  someone cuts the line, a friend forwards a cruel photo, or the money runs out before the month does.
                </p>
              </Rise>
            </div>

            <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-32 lg:flex lg:justify-between">
              {facts.map((f, i) => (
                <Rise key={f.big} delay={0.06 * i} className="lg:max-w-[15rem]">
                  <dt className="font-display text-[clamp(1.6rem,3vw,2.75rem)] font-light leading-none">{f.big}</dt>
                  <dd className="mt-3 text-base leading-snug text-text-secondary">{f.note}</dd>
                </Rise>
              ))}
            </dl>

            <div className="mt-24 grid gap-8 lg:mt-32 lg:grid-cols-12 lg:items-center">
              <Rise className="lg:col-span-5">
                <p className="font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-snug">
                  Queues, shared photos, pocket money. Not extra-curricular. Just Tuesday.
                </p>
                <p className="mt-5 text-lg leading-relaxed">
                  Children pick these things up from family, from school assemblies, from whatever the internet serves
                  them. Tattva makes it deliberate, the way maths already is.
                </p>
              </Rise>
              <Rise delay={0.1} className="lg:col-span-6 lg:col-start-7">
                <figure>
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src="/world/kharghar-station-platform.webp"
                      alt="A suburban railway platform in Kharghar, Navi Mumbai, with a train waiting"
                      width={1600}
                      height={1200}
                      className="h-full w-full object-cover motion-safe:animate-[drift_24s_ease-in-out_infinite_alternate]"
                    />
                  </div>
                  <figcaption className="mt-3 text-base text-text-secondary">
                    Kharghar station, Navi Mumbai. Where queues get tested every morning.
                  </figcaption>
                </figure>
              </Rise>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS: six moments ============ */}
        <section id="how" aria-label="How a lesson works" className="overflow-hidden bg-paper py-24">
          <div className="mx-auto max-w-[80rem] px-6 sm:px-10">
            <Rise>
              <MomentsRow />
            </Rise>
          </div>
        </section>

        {/* ============ LESSONS: the term's menu ============ */}
        <section id="lessons" aria-labelledby="lessons-heading" className="bg-civic py-24 text-paper">
          <div className="mx-auto grid max-w-[80rem] gap-14 px-3 sm:px-10 lg:grid-cols-12 lg:gap-8">
            <Rise className="lg:col-span-6 lg:col-start-1">
              <div style={scallopTopBottom} className="bg-surface px-5 py-14 text-text-primary sm:px-12">
                <h2 id="lessons-heading" className="text-center font-display text-[clamp(2.25rem,3.6vw,3.25rem)] font-semibold leading-tight">
                  This term&apos;s lessons
                </h2>
                {menu.map((group) => (
                  <div key={group.theme} className="mt-11">
                    <h3 className="font-sans text-xl font-bold">{group.theme}</h3>
                    <ul className="mt-3 space-y-[18px]">
                      {group.ids.map((id) => {
                        const l = lessons.find((x) => x.id === id)!;
                        return (
                          <li key={id}>
                            <Link href={`/lesson/${id}`} className="group flex items-baseline gap-3">
                              <span className="text-[19px] font-semibold group-hover:text-primary">{l.title}</span>
                              <span aria-hidden className="min-w-6 flex-1 border-b-4 border-dotted border-line" />
                              <span className="whitespace-nowrap text-[15px] font-semibold text-text-secondary">
                                {scenarios[id] ? "scenario" : `${l.durationMinutes} min`}
                              </span>
                            </Link>
                            <p className="mt-0.5 max-w-[40ch] text-base text-text-secondary">{l.description}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
                <div className="mt-11">
                  <h3 className="font-sans text-xl font-bold">Culture</h3>
                  <p className="mt-3 flex items-baseline gap-3">
                    <span className="text-[19px] font-semibold">Festivals, stories and places</span>
                    <span aria-hidden className="min-w-6 flex-1 border-b-4 border-dotted border-line" />
                    <span className="whitespace-nowrap text-[15px] font-semibold text-text-secondary">in the works</span>
                  </p>
                  <p className="mt-0.5 max-w-[40ch] text-base text-text-secondary">
                    Every claim labelled as fact, interpretation, tradition or belief, with its region and its source.
                  </p>
                </div>
              </div>
            </Rise>

            <div className="flex flex-col gap-12 px-3 sm:px-0 lg:col-span-5 lg:col-start-8 lg:pt-24">
              <Rise delay={0.1}>
                <p className="font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-snug">
                  Culture is the theme we&apos;re building most slowly, on purpose.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-chakra-ink">
                  India is too varied for one version of it. A tradition from one region shouldn&apos;t be taught as
                  everyone&apos;s, and where historians disagree, children should see the disagreement.
                </p>
              </Rise>
              <Rise delay={0.15}>
                <Plate
                  src="/world/johari-bazaar-jaipur.webp"
                  alt="An old postcard of Johari Bazaar, Jaipur, with pink buildings and a busy street"
                  caption="Johari Bazaar, Jaipur, on an old postcard"
                  className="-rotate-2"
                />
              </Rise>
              <Rise delay={0.2} className="sm:ml-auto sm:w-3/4">
                <Plate
                  src="/world/diya-set-in-a-rangoli.webp"
                  alt="Clay lamps lit around a rangoli pattern on a floor"
                  caption="Diyas set around a rangoli"
                  className="rotate-2"
                />
              </Rise>
            </div>
          </div>
        </section>

        {/* ============ PARENTS: the letter ============ */}
        <section id="parents" aria-labelledby="parents-heading" className="bg-paper-deep px-3 py-24 sm:px-10">
          <Rise className="mx-auto max-w-[40rem]">
            <article>
              <div style={scallopBottom} className="bg-surface px-6 pb-16 pt-12 sm:px-[60px]">
                <Image src="/logo.png" alt="" width={44} height={44} className="h-11 w-11" />
                <h2 id="parents-heading" className="mt-7 font-display text-[2rem] font-semibold">
                  Dear parent,
                </h2>
                <div className="mt-5 space-y-5 text-[17px] leading-[1.6]">
                  <p>
                    School measures what your child knows. Almost nothing measures how they decide. We&apos;re building
                    Tattva for that second part.
                  </p>
                  <p>
                    <mark className="bg-life-tint px-1 text-inherit">We won&apos;t tell your child what to believe.</mark>{" "}
                    Each lesson shows a real situation, lets them choose, and shows what happens and to whom. Where
                    thoughtful people disagree, we show the disagreement.
                  </p>
                  <p>
                    You&apos;ll see which skills your child practised and get a question or two for the dinner table.
                    You won&apos;t see their private reflections. Those are theirs.
                  </p>
                  <p>
                    There are no ads, no chat with strangers, and no leaderboards. We&apos;d rather your child came back
                    because a lesson was worth it than because a streak nagged them.
                  </p>
                </div>
                <p className="mt-9 font-display text-[22px] italic">The Tattva team</p>
                <p className="text-base text-text-secondary">Made in India, for children aged 10 to 14</p>
              </div>
              <div aria-hidden className="mx-4 border-t-[6px] border-dotted border-line" />
              <div className="flex flex-col items-center justify-between gap-4 bg-surface px-6 py-5 sm:flex-row sm:px-[60px]">
                <p className="font-semibold">See exactly what you&apos;d see</p>
                <Link
                  href="/parents"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-5 py-3 font-bold text-paper transition-colors hover:bg-primary sm:w-auto"
                >
                  Open the parent view
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          </Rise>
        </section>

        {/* ============ CTA: the reply card ============ */}
        <section aria-labelledby="cta-heading" className="bg-chakra">
          <div className="mx-auto grid min-h-[80svh] max-w-[80rem] items-end gap-12 px-6 pt-24 sm:px-10 lg:grid-cols-12">
            <Rise className="lg:col-span-4 lg:pb-16">
              <Plate
                src="/world/jaipurstreet20080213-1.webp"
                alt="A street in Jaipur lined with pink buildings"
                caption="A street in Jaipur, any weekday"
                className="mb-10 max-w-[22rem] -rotate-2"
              />
              <p className="font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-chakra-ink">
                Ten minutes after school. One situation. Maybe a conversation at dinner.
              </p>
            </Rise>
            <Rise delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <div className="-mb-16 rotate-[-1deg] bg-surface px-6 py-12 text-center sm:rotate-2 sm:px-12">
                <h2 id="cta-heading" className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold">
                  Try a lesson now
                </h2>
                <p className="mx-auto mt-3 max-w-[34ch] text-[17px] leading-relaxed">
                  No sign-up for the demo. Start with the canteen queue and see where your choice leads.
                </p>
                <Link
                  href="/lesson/lesson-1"
                  className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-sm bg-ink text-lg font-bold text-paper transition-colors hover:bg-primary"
                >
                  Play the queue lesson
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <Link href="/signup" className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">
                  Or create a free account
                </Link>
              </div>
            </Rise>
          </div>
        </section>
      </main>

      {/* ============ FOOTER: the back of the card ============ */}
      <footer className="bg-chakra-deep px-3 pb-8 pt-28 sm:px-10">
        <div style={scallopTop} className="mx-auto max-w-[70rem] bg-surface px-6 pb-8 pt-16 sm:px-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-[2rem] font-semibold">See you outside.</h2>
              <p className="mt-3 max-w-[38ch] text-[17px] leading-relaxed">
                Tattva is a student project growing into a learning layer for life beyond marks. Try it, break it, tell
                us what your child thought.
              </p>
            </div>
            <div className="flex items-start justify-between gap-6">
              <ul className="space-y-3 text-lg font-semibold">
                <li><Link href="/explore" className="hover:text-primary">Explore lessons</Link></li>
                <li><Link href="/challenges" className="hover:text-primary">Challenges</Link></li>
                <li><Link href="/parents" className="hover:text-primary">For parents</Link></li>
                <li><Link href="/login" className="hover:text-primary">Log in</Link></li>
              </ul>
              <figure className="w-16 shrink-0 rotate-3 bg-white p-1.5 sm:w-[88px]">
                <Image
                  src="/world/jaipurstreet20080213-1.webp"
                  alt="A street in Jaipur"
                  width={176}
                  height={234}
                  className="aspect-[3/4] w-full object-cover"
                />
              </figure>
            </div>
          </div>
          <p className="mt-12 text-[13px] leading-relaxed text-text-secondary">
            Pictures:{" "}
            {credits.map((c, i) => (
              <span key={c.page}>
                <a href={c.page} className="underline underline-offset-2 hover:text-text-primary">{c.title}</a>
                {" "}by {c.creator}, {c.license}
                {i < credits.length - 1 ? "; " : "."}
              </span>
            ))}
          </p>
          <p className="mt-4 text-center text-[13px] text-text-secondary">© 2026 Tattva</p>
        </div>
      </footer>
    </div>
  );
}

/** Entrance for a section's parts: rises once as it enters, never hidden without script. */
function Rise({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...props}
    />
  );
}

function Plate({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <figure className={`bg-paper p-2 transition-transform duration-300 hover:rotate-0 ${className}`}>
      <Image src={src} alt={alt} width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
      <figcaption className="px-1 pb-1 pt-2 text-base text-text-secondary">{caption}</figcaption>
    </figure>
  );
}
