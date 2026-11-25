import { Badge } from "@/types";

// One badge per theme; `icon` is a <ThemeIcon> key.
export const badges: Badge[] = [
  {
    id: "badge-values",
    name: "Fair Minded",
    description: "Thought through 2 Values situations",
    icon: "values",
    categorySlug: "values",
    requirement: "Complete 2 Values lessons",
  },
  {
    id: "badge-culture",
    name: "Culture Curious",
    description: "Explored 2 Culture lessons",
    icon: "culture",
    categorySlug: "culture",
    requirement: "Complete 2 Culture lessons",
  },
  {
    id: "badge-civic",
    name: "Civic Champion",
    description: "Completed 2 Civic Sense lessons",
    icon: "civic",
    categorySlug: "civic-sense",
    requirement: "Complete 2 Civic Sense lessons",
  },
  {
    id: "badge-life",
    name: "Life Ready",
    description: "Completed 2 Life Skills lessons",
    icon: "life",
    categorySlug: "life-skills",
    requirement: "Complete 2 Life Skills lessons",
  },
];
