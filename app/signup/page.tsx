"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-context";
import { sounds } from "@/lib/audio";

const field = "mt-2 w-full rounded-2xl border-2 border-line bg-paper px-4 py-3 text-lg focus:border-primary focus:outline-none";

export default function SignupPage() {
  const router = useRouter();
  const { updateProfile } = useDemo();
  const [childName, setChildName] = useState("");
  const [busy, setBusy] = useState(false);

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
          sounds.playClick();
          setBusy(true);
          if (childName.trim()) updateProfile({ name: childName.trim() });
          router.push("/onboarding");
        }}
      >
        <h1 className="text-3xl font-semibold">Start with one situation</h1>
        <p className="mt-2 text-text-secondary">
          A grown-up sets this up. It&apos;s free, with no ads and no feed.
        </p>

        <label htmlFor="parent-email" className="mt-7 block font-semibold">
          Parent&apos;s email
        </label>
        <input id="parent-email" type="email" required autoComplete="email" className={field} />
        <p className="mt-1.5 text-sm text-text-tertiary">For the weekly note on what your child practised.</p>

        <label htmlFor="password" className="mt-5 block font-semibold">
          Password
        </label>
        <input id="password" type="password" autoComplete="new-password" minLength={6} className={field} />

        <label htmlFor="child" className="mt-5 block font-semibold">
          Child&apos;s first name
        </label>
        <input id="child" required value={childName} onChange={(e) => setChildName(e.target.value)} className={field} />

        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full rounded-2xl bg-primary px-6 py-3.5 text-lg font-semibold text-text-inverse transition-colors hover:bg-primary-dark disabled:opacity-50"
        >
          {busy ? "One moment…" : "Make the account"}
        </button>
      </form>

      <p className="mt-8 text-text-secondary">
        Already have one?{" "}
        <Link href="/login" className="font-semibold text-primary underline underline-offset-4">
          Log in
        </Link>
      </p>
      <p className="mt-3 max-w-sm text-center text-sm text-text-tertiary">This is a demo. Nothing you type leaves this browser.</p>
    </div>
  );
}
