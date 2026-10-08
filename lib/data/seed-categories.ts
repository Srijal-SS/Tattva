import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-civic",
    name: "Civic Sense",
    slug: "civic-sense",
    description:
      "Learn how to be a responsible member of your community. From queues to public spaces, discover what it means to be a good citizen.",
    icon: "🏙️",
    color: "#0284C7",
    sortOrder: 1,
  },
  {
    id: "cat-environment",
    name: "Environment",
    slug: "environment",
    description:
      "Small actions can make a big difference. Learn how to protect our planet and make sustainable choices every day.",
    icon: "🌱",
    color: "#16A34A",
    sortOrder: 2,
  },
  {
    id: "cat-safety",
    name: "Personal Safety",
    slug: "safety",
    description:
      "Stay safe in the real world and online. Learn to recognize danger, seek help, and make smart choices.",
    icon: "🛡️",
    color: "#F97316",
    sortOrder: 3,
  },
  {
    id: "cat-digital",
    name: "Digital Citizenship",
    slug: "digital-life",
    description:
      "Navigate the digital world responsibly. Learn about online safety, respect, and smart sharing.",
    icon: "💻",
    color: "#0EA5E9",
    sortOrder: 4,
  },
  {
    id: "cat-money",
    name: "Financial Basics",
    slug: "money",
    description:
      "Understand the basics of money, saving, and spending wisely. Build smart financial habits early.",
    icon: "💰",
    color: "#EAB308",
    sortOrder: 5,
  },
  {
    id: "cat-social",
    name: "Social & Emotional Skills",
    slug: "social-skills",
    description:
      "Build stronger relationships and understand emotions better. Learn empathy, communication, and kindness.",
    icon: "❤️",
    color: "#EC4899",
    sortOrder: 6,
  },
];
