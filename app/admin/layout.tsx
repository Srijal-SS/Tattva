"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      {/* ==================== FLOATING GLASS ADMIN NAV ==================== */}
      <div className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
        <header className="max-w-6xl mx-auto pointer-events-auto bg-[#FFF4E8]/50 backdrop-blur-2xl backdrop-saturate-150 border border-[#E5D3BF]/90 shadow-[0_8px_32px_0_rgba(249,115,22,0.06),0_2px_8px_0_rgba(0,0,0,0.04)] rounded-full px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between transition-all">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-3 group">
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
                Tattva CMS
              </span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-[11px] font-semibold text-white shadow-xs">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border hover:bg-surface text-xs font-semibold text-text-secondary hover:text-primary transition-all shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to App</span>
            </Link>
          </div>
        </header>
      </div>

      <main className="flex-1 pt-20 md:pt-24 pb-12">{children}</main>
    </div>
  );
}
