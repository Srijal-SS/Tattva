"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Shield,
  TreePine,
  Gamepad2,
  Heart,
  Star,
  Zap,
  Target,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// ============================================================
// Animation Variants
// ============================================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

// ============================================================
// Data
// ============================================================

const categoryCards = [
  { icon: "🏙️", name: "Civic Sense", color: "bg-primary/10 text-primary" },
  { icon: "🌱", name: "Environment", color: "bg-accent-green/10 text-accent-green-dark" },
  { icon: "🛡️", name: "Safety", color: "bg-accent-orange/10 text-accent-orange" },
  { icon: "💻", name: "Digital Life", color: "bg-[#0EA5E9]/10 text-[#0EA5E9]" },
  { icon: "💰", name: "Money", color: "bg-accent-yellow/10 text-accent-yellow-dark" },
  { icon: "❤️", name: "Social Skills", color: "bg-accent-pink/10 text-accent-pink" },
];

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Beyond Academics",
    description: "Life skills that textbooks don't teach — from civic sense to financial basics.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Real-World Situations",
    description: "Learn through scenarios children actually encounter in daily life.",
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: "Interactive Learning",
    description: "Questions, challenges, and instant feedback keep children engaged.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Learn by Doing",
    description: "Real-world challenges turn knowledge into action and habit.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safe & Private",
    description: "Designed for children first. No social features, no data collection.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Positive Habits",
    description: "Build character and responsibility through encouraging experiences.",
  },
];

const steps = [
  { num: "01", title: "Learn", desc: "Short, visual lessons on real-world topics", icon: "📖" },
  { num: "02", title: "Play", desc: "Interactive questions with instant feedback", icon: "🎯" },
  { num: "03", title: "Practice", desc: "Real-world challenges to apply what you learned", icon: "🌍" },
  { num: "04", title: "Grow", desc: "Earn points, badges, and track your progress", icon: "🌟" },
];

// ============================================================
// Component
// ============================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* ==================== FLOATING GLASS NAVBAR ==================== */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <nav className="max-w-5xl mx-auto pointer-events-auto bg-[#FFF4E8]/50 backdrop-blur-2xl backdrop-saturate-150 border border-[#E5D3BF]/90 shadow-[0_8px_32px_0_rgba(249,115,22,0.06),0_2px_8px_0_rgba(0,0,0,0.04)] rounded-full px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between transition-all duration-300 hover:bg-[#FFF4E8]/80">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs bg-[#FFF6EC]">
              <Image
                src="/logo.png"
                alt="Tattva Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
              Tattva
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/explore"
              className="hidden sm:inline-flex text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              Explore Skills
            </Link>
            <Link
              href="/challenges"
              className="hidden md:inline-flex text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              Challenges
            </Link>
            <Link
              href="/parents"
              className="hidden md:inline-flex text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              For Parents
            </Link>
            <Link
              href="/login"
              className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors px-2 py-1"
            >
              Demo Login
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden pt-20 sm:pt-24">
        {/* Warm soothing gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-surface to-accent-orange/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-yellow-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 sm:pb-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo Emblem in Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 bg-surface shadow-md border border-border flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Tattva Official Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              A new kind of learning platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]"
            >
              Learning{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                beyond
              </span>{" "}
              the classroom
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
            >
              Helping children build the life skills, values, and civic sense they
              need for the real world — through short, engaging, interactive
              experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white text-lg font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-border text-text-primary text-lg font-semibold hover:border-primary hover:text-primary transition-all duration-200"
              >
                Explore Tattva
              </a>
            </motion.div>

            {/* Category pills */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-14 flex flex-wrap justify-center gap-3"
            >
              {categoryCards.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  variants={scaleIn}
                  custom={i}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cat.color} text-sm font-medium`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== PROBLEM ==================== */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              School teaches us{" "}
              <span className="text-text-tertiary">what</span> to learn.
              <br />
              Tattva helps us learn{" "}
              <span className="bg-gradient-to-r from-primary to-accent-green bg-clip-text text-transparent">
                how to live.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={1}
            className="mt-8 max-w-2xl mx-auto"
          >
            <p className="text-lg text-text-secondary leading-relaxed">
              Children spend years learning for exams. But where do they learn civic sense?
              Digital responsibility? Financial basics? How to handle disagreements?
            </p>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Tattva</strong> turns these
              real-world skills into engaging learning experiences that children
              actually enjoy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-surface-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              How Tattva Works
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Each lesson is a short, interactive journey — not a textbook chapter.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                custom={i}
                className="relative bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                  Step {step.num}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SAMPLE LESSON PREVIEW ==================== */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              See Tattva in Action
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Here&apos;s what a real Tattva lesson looks like.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-50/50 to-surface rounded-3xl border border-primary-100/60 p-6 sm:p-8 shadow-elevated">
              {/* Lesson header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  🏙️ Civic Sense
                </span>
                <span className="text-xs text-text-tertiary">5 min</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                Keeping Public Places Clean
              </h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                Public spaces belong to everyone. When we take care of them, we
                make our communities better for everyone.
              </p>

              {/* Question preview */}
              <div className="bg-white rounded-xl p-5 border border-border mb-4">
                <p className="text-sm font-semibold text-text-primary mb-3">
                  🤔 You&apos;re at a park and notice someone has dropped a plastic
                  bottle. What would you do?
                </p>
                <div className="space-y-2">
                  {[
                    { label: "A", text: "Ignore it", correct: false },
                    { label: "B", text: "Pick it up and put it in the bin", correct: true },
                    { label: "C", text: "Kick it somewhere else", correct: false },
                    { label: "D", text: "Leave the park", correct: false },
                  ].map((opt) => (
                    <div
                      key={opt.label}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                        opt.correct
                          ? "border-accent-green bg-accent-green-light/30 text-accent-green-dark font-medium"
                          : "border-border text-text-secondary"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          opt.correct
                            ? "bg-accent-green text-white"
                            : "bg-surface-tertiary text-text-tertiary"
                        }`}
                      >
                        {opt.correct ? <CheckCircle2 className="w-4 h-4" /> : opt.label}
                      </span>
                      {opt.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-accent-green-light/30 rounded-xl p-4 border border-accent-green/20">
                <p className="text-sm font-medium text-accent-green-dark">
                  🌱 Great choice! Keeping shared spaces clean is everyone&apos;s
                  responsibility.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-20 sm:py-28 bg-surface-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Why Tattva?
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Built for children. Designed for the real world.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 sm:p-12 text-center text-white overflow-hidden"
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Start your Tattva journey
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Give your child the skills that textbooks can&apos;t teach.
                It only takes 5 minutes a day.
              </p>
              <div className="mt-8">
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary text-lg font-semibold hover:bg-white/80 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start Learning — It&apos;s Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-surface border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 shadow-xs bg-[#FFF6EC]">
                <Image
                  src="/logo.png"
                  alt="Tattva Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-bold text-text-primary">Tattva</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-text-secondary">
              <Link href="/learn" className="hover:text-primary transition-colors">
                Learner Dashboard
              </Link>
              <Link href="/explore" className="hover:text-primary transition-colors">
                Explore Skills
              </Link>
              <Link href="/challenges" className="hover:text-primary transition-colors">
                Challenges
              </Link>
              <Link href="/parents" className="hover:text-primary transition-colors">
                Parent Portal
              </Link>
              <Link href="/onboarding" className="hover:text-primary transition-colors">
                Onboarding Demo
              </Link>
              <Link href="/admin" className="hover:text-primary transition-colors">
                Admin CMS
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-tertiary">
              <Heart className="w-4 h-4 text-accent-pink" />
              <span>Built for children, with love</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-text-tertiary">
            <p>© {new Date().getFullYear()} Tattva. Learning beyond the classroom.</p>
            <p className="mt-1">
              Designed for safe, private learning. No unnecessary data collection.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
