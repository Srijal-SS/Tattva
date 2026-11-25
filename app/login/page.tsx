"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-context";
import { sounds } from "@/lib/audio";

const field = "mt-2 w-full rounded-2xl border-2 border-line bg-paper px-4 py-3 text-lg focus:border-primary focus:outline-none";

export default function LoginPage() {
  const router = useRouter();
  const { updateProfile } = useDemo();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const go = () => {
    sounds.playClick();
    setBusy(true);
    router.push("/learn");
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-12 sm:py-20">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/logo.png" alt="" width={44} height={44} />
        <span className="font-display text-2xl font-semibold">Tattva</span>
      </Link>

      <form
        className="mt-10 w-full max-w-md rounded-3xl bg-surface p-6 shadow-card sm:p-9"
        onSubmit={(e) => {
          e.preventDefault();
          // shortcut: demo has no accounts; the email's first part becomes the name until Supabase auth is wired.
          const local = email.split("@")[0]?.trim();
          if (local) updateProfile({ name: local.charAt(0).toUpperCase() + local.slice(1) });
          go();
        }}
      >
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-text-secondary">Pick up where you left off.</p>

        <label htmlFor="email" className="mt-7 block font-semibold">
          Email
        </label>
        <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />

        <label htmlFor="password" className="mt-5 block font-semibold">
          Password
        </label>
        <input id="password" type="password" autoComplete="current-password" className={field} />

        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full rounded-2xl bg-primary px-6 py-3.5 text-lg font-semibold text-text-inverse transition-colors hover:bg-primary-dark disabled:opacity-50"
        >
          {busy ? "Opening…" : "Log in"}
        </button>

        <p className="mt-6 text-center text-text-secondary">
          Just looking?{" "}
          <button type="button" onClick={go} className="font-semibold text-primary underline underline-offset-4">
            Try the demo as Aarav
          </button>
        </p>
      </form>

      <p className="mt-8 text-text-secondary">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-primary underline underline-offset-4">
          Make an account
        </Link>
      </p>
      <p className="mt-3 max-w-sm text-center text-sm text-text-tertiary">This is a demo. Nothing you type leaves this browser.</p>
    </div>
  );
}
