"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Target,
  BarChart3,
  Shield,
  User,
  Menu,
  X,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useDemo } from "@/lib/demo-context";
import { AVATARS } from "@/types";
import { sounds } from "@/lib/audio";

const navItems = [
  { href: "/learn", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/challenges", label: "Challenges", icon: Target },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/parents", label: "Parents", icon: Shield },
  { href: "/profile", label: "Profile", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const isNowEnabled = sounds.toggleMute();
    setIsMuted(!isNowEnabled);
  };

  const avatar = AVATARS.find((a) => a.id === state.profile.avatar);

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      {/* ==================== DESKTOP FLOATING GLASS NAV ==================== */}
      <div className="hidden md:block fixed top-3 sm:top-4 inset-x-0 z-50 px-6 pointer-events-none">
        <header className="max-w-6xl mx-auto pointer-events-auto bg-[#FFF4E8]/50 backdrop-blur-2xl backdrop-saturate-150 border border-[#E5D3BF]/90 shadow-[0_8px_32px_0_rgba(249,115,22,0.06),0_2px_8px_0_rgba(0,0,0,0.04)] rounded-full px-6 h-16 flex items-center justify-between transition-all">
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
            <span className="text-xl font-extrabold text-text-primary tracking-tight">
              Tattva
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl border border-border hover:bg-surface-secondary text-text-secondary transition-colors"
              title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-accent-pink" />
              ) : (
                <Volume2 className="w-4 h-4 text-primary" />
              )}
            </button>

            <Link
              href="/admin"
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
            >
              <span>CMS</span>
            </Link>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-yellow/10 rounded-full">
              <span className="text-sm">⭐</span>
              <span className="text-xs font-bold text-accent-yellow-dark">
                {state.profile.points}
              </span>
            </div>

            <Link
              href="/profile"
              className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-lg hover:ring-2 hover:ring-primary/30 transition-all"
            >
              {avatar?.emoji ?? "🧒"}
            </Link>
          </div>
        </header>
      </div>

      {/* ==================== MOBILE FLOATING GLASS BAR ==================== */}
      <div className="md:hidden fixed top-2.5 inset-x-0 z-50 px-3 pointer-events-none">
        <header className="pointer-events-auto bg-[#FFF4E8]/30 backdrop-blur-2xl backdrop-saturate-150 border border-[#E5D3BF]/90 shadow-[0_4px_20px_0_rgba(249,115,22,0.04)] rounded-2xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 shadow-xs bg-[#FFF6EC]">
              <Image
                src="/logo.png"
                alt="Tattva Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold text-text-primary">Tattva</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-accent-yellow/10 rounded-full">
              <span className="text-xs">⭐</span>
              <span className="text-xs font-bold text-accent-yellow-dark">
                {state.profile.points}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-text-secondary" />
              ) : (
                <Menu className="w-5 h-5 text-text-secondary" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto mt-2 bg-[#FFF4E8]/80 backdrop-blur-2xl border border-[#E5D3BF] rounded-2xl shadow-xl px-4 py-3 animate-slide-down">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-text-secondary hover:bg-surface-tertiary"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 pt-20 md:pt-24 pb-20 md:pb-8">{children}</main>

      {/* ==================== MOBILE BOTTOM NAV ==================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFF4E8]/80 backdrop-blur-lg border-t border-[#E5D3BF]">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px] ${
                  isActive ? "text-primary" : "text-text-tertiary"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : ""}`}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-0 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
