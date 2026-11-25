"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Compass, Home, Menu, Shield, Star, Target, User, Volume2, VolumeX, X } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { sounds } from "@/lib/audio";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const points = (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-life-tint px-3 py-1.5 text-sm font-bold tabular-nums text-ink">
      <Star className="h-4 w-4 fill-accent-yellow text-life" aria-hidden />
      {state.profile.points}
      <span className="sr-only">points</span>
    </span>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link href="/learn" className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" priority />
            Tattva
          </Link>

          <nav aria-label="App" className="hidden h-full items-stretch gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-2 px-3 text-[15px] font-semibold transition-colors",
                  isActive(item.href) ? "text-ink" : "text-text-secondary hover:text-ink"
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={isActive(item.href) ? 2.25 : 1.75} aria-hidden />
                {item.label}
                {isActive(item.href) && <span aria-hidden className="absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-primary" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {points}
            <button
              type="button"
              onClick={() => setMuted(!sounds.toggleMute())}
              aria-label={muted ? "Turn sounds on" : "Turn sounds off"}
              className="hidden h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-paper-deep hover:text-ink sm:flex"
            >
              {muted ? <VolumeX className="h-[18px] w-[18px]" aria-hidden /> : <Volume2 className="h-[18px] w-[18px]" aria-hidden />}
            </button>
            <Link href="/profile" aria-label={`Profile: ${state.profile.name}`} className="hidden lg:block">
              <Avatar id={state.profile.avatar} className="h-9 w-9" />
            </Link>
            <Link href="/admin" className="hidden text-sm font-semibold text-text-secondary hover:text-ink xl:block">
              Studio
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-paper-deep lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="bg-surface px-4 pb-4 shadow-elevated lg:hidden">
            <div className="flex items-center gap-3 rounded-xl bg-paper-deep px-4 py-3">
              <Avatar id={state.profile.avatar} className="h-10 w-10" />
              <div>
                <p className="font-bold">{state.profile.name}</p>
                <p className="text-sm text-text-secondary">{state.profile.streak}-day streak</p>
              </div>
            </div>
            <div className="mt-3 flex gap-4 text-sm font-semibold">
              <button type="button" onClick={() => setMuted(!sounds.toggleMute())} className="text-text-secondary">
                {muted ? "Turn sounds on" : "Turn sounds off"}
              </button>
              <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-text-secondary">
                Studio
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pb-24 lg:pb-10">{children}</main>

      <nav aria-label="App" className="fixed inset-x-0 bottom-0 z-40 bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_-8px_rgba(60,36,16,0.18)] lg:hidden">
        <div className="grid grid-cols-6">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold", active ? "text-primary" : "text-text-secondary")}
              >
                {active && <span aria-hidden className="absolute inset-x-4 top-0 h-[3px] rounded-b bg-primary" />}
                <item.icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
