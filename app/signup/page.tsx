"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, User, Mail, Lock } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { sounds } from "@/lib/audio";

export default function SignupPage() {
  const router = useRouter();
  const { updateProfile } = useDemo();
  const [childName, setChildName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageGroup, setAgeGroup] = useState("10-12");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setIsLoading(true);

    if (childName.trim()) {
      updateProfile({
        name: childName.trim(),
        age: ageGroup === "8-9" ? 9 : ageGroup === "10-12" ? 11 : 13,
      });
    }

    setTimeout(() => {
      router.push("/onboarding");
    }, 400);
  };

  const handleQuickStart = () => {
    sounds.playClick();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center shadow-xs bg-[#FFF6EC] border border-[#E5D3BF] group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Tattva Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-extrabold text-text-primary tracking-tight">
            Tattva
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          Join Tattva Today
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Empowering children with essential real-world life skills.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-6 shadow-sm border border-border rounded-3xl sm:px-10"
        >
          {/* Quick interactive onboarding banner */}
          <div className="mb-6 p-4 rounded-2xl bg-accent-green-light/40 border border-accent-green/30 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-accent-green-dark uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-accent-green" />
              Interactive Onboarding Demo
            </div>
            <p className="text-xs text-text-secondary mb-3">
              Experience our 3-step child onboarding flow directly without registration.
            </p>
            <button
              type="button"
              onClick={handleQuickStart}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent-green text-white text-sm font-semibold hover:bg-accent-green-dark active:scale-[0.98] transition-all shadow-sm"
            >
              {isLoading ? "Starting..." : "Start Onboarding Flow"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-text-tertiary font-medium">
                Or create account
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="childName"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Child&apos;s First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-tertiary">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="childName"
                  type="text"
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Aarav, Meera, Ananya"
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ageGroup"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Age Group
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "8-9", label: "8-9 yrs" },
                  { id: "10-12", label: "10-12 yrs" },
                  { id: "13-14", label: "13-14 yrs" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAgeGroup(item.id)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      ageGroup === item.id
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-surface-secondary border-border text-text-secondary hover:border-text-tertiary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="parentEmail"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Parent Email (for weekly updates)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-tertiary">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="parentEmail"
                  type="email"
                  required
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Create Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-tertiary">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
            >
              Continue to Personalize
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-border-light flex items-center justify-center gap-2 text-[11px] text-text-tertiary">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-green" />
            <span>Parent Verified • No algorithmic feed • 100% Educational</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
