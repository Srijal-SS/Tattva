import { Award, Landmark, Lamp, Scale, Sprout, type LucideProps } from "lucide-react";

// Drawn icons for the four themes; replaces the old emoji category icons.
const ICONS = { values: Scale, culture: Lamp, civic: Landmark, life: Sprout } as const;

export function ThemeIcon({ name, ...props }: { name?: string } & LucideProps) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Award;
  return <Icon strokeWidth={1.75} aria-hidden {...props} />;
}
