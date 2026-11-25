"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Lessons" },
  { href: "/admin/write", label: "Write a lesson" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5 font-display text-xl font-semibold">
              <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" priority />
              Studio
            </Link>
            <nav aria-label="Studio" className="flex h-16 items-stretch gap-1">
              {links.map((l) => {
                const on = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "relative flex items-center px-3 text-[15px] font-semibold",
                      on ? "text-ink" : "text-text-secondary hover:text-ink"
                    )}
                  >
                    {l.label}
                    {on && <span aria-hidden className="absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-primary" />}
                  </Link>
                );
              })}
            </nav>
          </div>
          <Link href="/learn" className="hidden items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-ink sm:inline-flex">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to the app
          </Link>
        </div>
      </header>
      <main className="flex-1 pb-16">{children}</main>
    </div>
  );
}
