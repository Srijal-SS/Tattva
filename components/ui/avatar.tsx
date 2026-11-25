import { Compass, Feather, Flower2, Rocket, Star, Sun, TreePine, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Drawn avatar marks for the AVATARS ids in types; replaces the emoji.
const MARKS = {
  explorer: Compass,
  star: Star,
  rocket: Rocket,
  flower: Flower2,
  lightning: Zap,
  sun: Sun,
  tree: TreePine,
  butterfly: Feather,
} as const;

export function Avatar({ id, className, label }: { id?: string; className?: string; label?: string }) {
  const Mark = MARKS[id as keyof typeof MARKS] ?? Compass;
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-dark", className)}
    >
      <Mark className="h-[55%] w-[55%]" strokeWidth={1.75} />
    </span>
  );
}
