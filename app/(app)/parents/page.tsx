"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Award,
  Sparkles,
  MessageCircle,
  Clock,
  CheckCircle2,
  Printer,
  ChevronRight,
  TrendingUp,
  ThumbsUp,
  BookOpen,
} from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { categories } from "@/lib/data/seed-categories";
import { lessons } from "@/lib/data/seed-lessons";
import { sounds } from "@/lib/audio";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export default function ParentsPage() {
  const { state, getCategoryProgress, getCompletedChallengeCount } = useDemo();
  const [showCertificate, setShowCertificate] = useState(false);
  const [approvedChallenges, setApprovedChallenges] = useState<Record<string, boolean>>({
    "lesson-2": true,
    "lesson-3": true,
  });

  const profile = state.profile;
  const completedChallenges = getCompletedChallengeCount();

  const handleApprove = (lessonId: string) => {
    sounds.playCelebration();
    setApprovedChallenges((prev) => ({ ...prev, [lessonId]: true }));
  };

  const handlePrintCertificate = () => {
    sounds.playClick();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* ==================== HEADER ==================== */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Parent Transparency & Insights</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {profile.name}&apos;s Life Skills Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Track values learned, real-world habits practiced, and conversation starters for your family.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setShowCertificate(!showCertificate);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-border hover:border-primary text-text-primary text-xs font-semibold transition-all shadow-sm"
          >
            <Award className="w-4 h-4 text-accent-yellow-dark" />
            <span>{showCertificate ? "Close Certificate" : "View Official Certificate"}</span>
          </button>
        </div>
      </motion.div>

      {/* ==================== CERTIFICATE MODAL / PREVIEW ==================== */}
      {showCertificate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-6 sm:p-8 bg-gradient-to-br from-accent-yellow/15 via-surface to-accent-orange/10 rounded-3xl border-2 border-amber-300/80 shadow-md text-center relative overflow-hidden"
        >
          <div className="absolute top-3 right-3">
            <button
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Certificate
            </button>
          </div>

          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full overflow-hidden p-1 bg-white shadow-xs border border-amber-200">
              <Image
                src="/logo.png"
                alt="Tattva Seal"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-xs font-bold tracking-widest text-amber-800 uppercase">
            Tattva Certificate of Life Skills
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 mt-1 mb-2">
            Junior Citizen of Excellence
          </h2>
          <p className="text-sm text-amber-900/80 max-w-lg mx-auto">
            This certifies that <span className="font-bold text-amber-950 underline">{profile.name}</span> has
            demonstrated exceptional character, civic responsibility, and positive habits in everyday life.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-6 pt-4 border-t border-amber-200">
            <div>
              <div className="text-xl font-bold text-amber-950">{profile.points}</div>
              <div className="text-[11px] text-amber-800 font-medium">Points Earned</div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-950">{state.earnedBadges.length}</div>
              <div className="text-[11px] text-amber-800 font-medium">Badges Unlocked</div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-950">{completedChallenges}</div>
              <div className="text-[11px] text-amber-800 font-medium">Real-Life Deeds</div>
            </div>
          </div>

          <p className="text-[11px] text-amber-800/70 italic">
            &ldquo;Learning beyond the classroom • Building character for tomorrow&rdquo;
          </p>
        </motion.div>
      )}

      {/* ==================== SUMMARY STATS ==================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Screen Time Today</span>
          </div>
          <div className="text-xl font-bold text-text-primary">12 mins</div>
          <div className="text-[11px] text-accent-green font-medium mt-0.5">Healthy micro-learning</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-accent-green" />
            <span>Learning Streak</span>
          </div>
          <div className="text-xl font-bold text-text-primary">{profile.streak} Days</div>
          <div className="text-[11px] text-text-tertiary mt-0.5">Consistent learner</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
            <Award className="w-3.5 h-3.5 text-accent-orange" />
            <span>Real-World Actions</span>
          </div>
          <div className="text-xl font-bold text-text-primary">{completedChallenges} Deeds</div>
          <div className="text-[11px] text-accent-orange font-medium mt-0.5">Applied in home & school</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
            <Shield className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>Child Safety</span>
          </div>
          <div className="text-xl font-bold text-text-primary">100% Safe</div>
          <div className="text-[11px] text-accent-green font-medium mt-0.5">No ads • No social feed</div>
        </div>
      </div>

      {/* ==================== VALUES & CHARACTER PROGRESS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-border shadow-sm">
          <h2 className="text-base font-bold text-text-primary mb-1 flex items-center gap-2">
            <Heart className="w-4 h-4 text-accent-pink" />
            <span>Character & Skill Development</span>
          </h2>
          <p className="text-xs text-text-secondary mb-5">
            Progress measured by interactive understanding and real actions.
          </p>

          <div className="space-y-4">
            {categories.map((c) => {
              const prog = getCategoryProgress(c.slug);
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                    </span>
                    <span className="text-text-secondary">
                      {prog.completed}/{prog.total} lessons ({prog.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-surface-tertiary h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(prog.percentage, 10)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== DINNER CONVERSATION STARTERS ==================== */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-border shadow-sm">
          <h2 className="text-base font-bold text-text-primary mb-1 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span>Family Dinner Conversation Starters</span>
          </h2>
          <p className="text-xs text-text-secondary mb-4">
            Topics inspired directly by lessons {profile.name} studied this week:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-primary-50/50 border border-primary/20">
              <span className="text-xs font-bold text-primary block mb-1">
                🗣️ On Civic Sense & Patience
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                &ldquo;Ask {profile.name}: Why do you think people rush instead of waiting in line? What happens when everyone cooperates?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-accent-green-light/40 border border-accent-green/30">
              <span className="text-xs font-bold text-accent-green-dark block mb-1">
                🌱 On Waste & Water Saving
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                &ldquo;Can you show our family one small change we can make in our kitchen today to save water or plastic?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-accent-yellow-light/30 border border-accent-yellow/30">
              <span className="text-xs font-bold text-accent-yellow-dark block mb-1">
                💰 On Needs vs Wants
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                &ldquo;Let&apos;s pick 3 items in our shopping cart: is this a necessity, or a nice-to-have want?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== PARENT VERIFICATION OF CHALLENGES ==================== */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-accent-orange" />
              <span>Parent Sign-off on Real-World Deeds</span>
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Acknowledge and verify your child&apos;s positive actions in the household and school.
            </p>
          </div>
        </div>

        <div className="divide-y divide-border-light">
          {lessons
            .filter((l) => Boolean(l.challenge))
            .slice(0, 4)
            .map((lesson) => {
              const isApproved = approvedChallenges[lesson.id];
              return (
                <div key={lesson.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-text-primary mb-0.5">
                      {lesson.challenge}
                    </p>
                    <p className="text-[11px] text-text-tertiary">
                      From lesson: &quot;{lesson.title}&quot;
                    </p>
                  </div>

                  <div>
                    {isApproved ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-green-light/40 text-accent-green-dark text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified by Parent
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprove(lesson.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-all shadow-sm"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Sign Off</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
