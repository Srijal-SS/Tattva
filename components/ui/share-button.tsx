"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

/** Shares text through the phone's share sheet, or copies it where that isn't available. */
export function ShareButton({ text, label = "Share", describedAs }: { text: string; label?: string; describedAs?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return; // the person closed the sheet
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: nothing sensible left to do.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label={describedAs ? `${label}: ${describedAs}` : undefined}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary-50"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
