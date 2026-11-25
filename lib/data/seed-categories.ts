import { Category } from "@/types";

// The four themes from PRODUCT.md. `icon` is a key for <ThemeIcon>, `color` matches the theme token in globals.css.
export const categories: Category[] = [
  {
    id: "cat-values",
    name: "Values",
    slug: "values",
    description:
      "Fairness, honesty and kindness when it's not easy. Real situations where the right thing isn't obvious, and you get to think it through.",
    icon: "values",
    color: "#B8461C",
    sortOrder: 1,
  },
  {
    id: "cat-culture",
    name: "Culture",
    slug: "culture",
    description:
      "Festivals, stories and places from across India, with every claim labelled as fact, interpretation, tradition or belief.",
    icon: "culture",
    color: "#6E3A8C",
    sortOrder: 2,
  },
  {
    id: "cat-civic",
    name: "Civic Sense",
    slug: "civic-sense",
    description:
      "Queues, roads, parks and shared spaces. What it takes to be someone a community can count on.",
    icon: "civic",
    color: "#0F6B63",
    sortOrder: 3,
  },
  {
    id: "cat-life",
    name: "Life Skills",
    slug: "life-skills",
    description:
      "Money, safety and looking after yourself and your planet. The practical things nobody puts on a timetable.",
    icon: "life",
    color: "#A87708",
    sortOrder: 4,
  },
];
