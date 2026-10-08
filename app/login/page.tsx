"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Lock, Mail } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { sounds } from "@/lib/audio";

export default function LoginPage() {
  const router = useRouter();
  const { updateProfile } = useDemo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    sounds.playClick();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/learn");
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setIsLoading(true);
    // In demo mode, sign in with demo profile or new name if email provided
    setTimeout(() => {
      if (email.includes("@")) {
        const namePart = email.split("@")[0];
        const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        updateProfile({ name: capitalized });
      }
      router.push("/learn");
    }, 500);
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
          Welcome back, Learner!
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Ready to continue your life skills journey today?
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-6 shadow-sm border border-border rounded-3xl sm:px-10"
        >
          {/* Quick Demo Access banner for judges/evaluators */}
          <div className="mb-6 p-4 rounded-2xl bg-primary-50/60 border border-primary/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Instant Demo Access
            </div>
            <p className="text-xs text-text-secondary mb-3">
              Explore with pre-seeded progress, badges, and points as Aarav (Age 12).
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all shadow-sm"
            >
              {isLoading ? "Signing in..." : "Enter as Demo Student"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-text-tertiary font-medium">
                Or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Email Address or Parent ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-tertiary">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-tertiary">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-text-secondary">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-border text-primary focus:ring-primary"
                />
                Remember me
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("For testing, simply click 'Enter as Demo Student'!");
                }}
                className="font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-tertiary hover:bg-border text-text-primary text-sm font-semibold transition-all border border-border active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-text-secondary">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Create child account
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-border-light flex items-center justify-center gap-2 text-[11px] text-text-tertiary">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-green" />
            <span>Child-Safe • Privacy Protected • No Ads</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
