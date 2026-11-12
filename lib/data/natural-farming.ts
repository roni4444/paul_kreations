// ─────────────────────────────────────────────────────────────────────────────
// Natural Farming — Landing Page Data
// lib/data/natural-farming.ts
//
// Single source of truth for /app/natural-farming content. Every claim must
// match the Privacy Policy at app/natural-farming/privacy/page.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  BellRing,
  BookOpenCheck,
  EyeOff,
  Flame,
  Languages,
  Lock,
  Mail,
  MessagesSquare,
  Settings2,
  ShieldCheck,
  Sprout,
  Trophy,
  WifiOff,
} from "lucide-react";

export const NATURAL_FARMING_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=agri.startup.natural_farming";

// ─── Support ──────────────────────────────────────────────────────────────────
export const NATURAL_FARMING_SUPPORT_EMAIL = "support@paulkreations.com";

// ─── Download stats (mirrors the Google Play listing) ────────────────────────
export const NATURAL_FARMING_DOWNLOADS = "500+";

// ─── SEO ─────────────────────────────────────────────────────────────────────
export const NATURAL_FARMING_META_TITLE =
  "Natural Farming — Learn sustainable, chemical-free farming | Android app";
export const NATURAL_FARMING_META_DESCRIPTION =
  "Natural Farming is a free Android app that teaches the principles and practices of sustainable, chemical-free farming through 37 lessons, daily quizzes, a farming community and 22 languages.";

export const NATURAL_FARMING_PRIMARY_KEYWORDS = [
  "Natural farming app",
  "Learn natural farming",
  "Chemical-free farming",
  "Sustainable agriculture app",
  "Farming lessons in regional languages",
];

export const NATURAL_FARMING_LONGTAIL_KEYWORDS = [
  "Natural farming for beginners",
  "Mulching and cover cropping guide",
  "Farming quiz app",
  "Farmer community app",
  "Natural farming vs organic farming",
  "Soil health and biodiversity lessons",
];

// ─── Core copy ────────────────────────────────────────────────────────────────

export const NATURAL_FARMING_TAGLINE = "A new way of farming.";

export const NATURAL_FARMING_SUBTAGLINE =
  "Learn the principles and practices of sustainable, chemical-free farming — Know, Grow, Sustain. Free lessons, daily quizzes and a community of growers, in your language.";

export const NATURAL_FARMING_HERO_NOTE =
  "Android · Free to download · 22 languages · Works offline";

export const NATURAL_FARMING_FOOTER_BLURB =
  "An educational app that helps everyday people learn natural farming — sustainable, chemical-free and accessible to all. By Paul Kreations.";

export const NATURAL_FARMING_DISCLAIMER =
  "Natural Farming is an educational app. Its lessons, quizzes and community posts are for general learning and are not professional agricultural, financial, legal or safety advice. Results depend on your soil, climate, crops and local rules — check important decisions with a qualified local expert.";

export const naturalFarmingCopy = {
  featuresEyebrow: "Know · Grow · Sustain",
  featuresTitle: "Everything you need to start learning",
  featuresIntro:
    "From the basics to measuring soil health and valuing natural capital, Natural Farming turns a big subject into short, readable lessons.",
  howEyebrow: "Getting Started",
  howIntro: "Four steps from install to learning something new every day.",
  benefitsTitle: "Why people choose Natural Farming",
};

// ─── Features ───────────────────────────────────────────────────────────────────

export type NaturalFarmingFeature = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  top?: boolean;
};

export const naturalFarmingFeatures: NaturalFarmingFeature[] = [
  {
    id: "lessons",
    icon: Sprout,
    title: "37 Lessons",
    description:
      "From what natural farming is and its advantages, to mulching, cover cropping, water harvesting, bee keeping, mixed animal husbandry and eco-agritourism.",
    top: true,
  },
  {
    id: "daily-quiz",
    icon: Flame,
    title: "Daily Quiz & Streaks",
    description:
      "A short daily quiz of four questions — multiple choice, fill in the blank or true or false — builds a learning streak.",
    top: true,
  },
  {
    id: "lesson-quizzes",
    icon: Trophy,
    title: "Lesson Quizzes & Badges",
    description:
      "Test what you learned after each lesson and unlock badges as you pass.",
    top: true,
  },
  {
    id: "community",
    icon: MessagesSquare,
    title: "Community",
    description:
      "Ask a question, share a farming tip or reply to others, and flag anything inappropriate.",
    top: true,
  },
  {
    id: "languages",
    icon: Languages,
    title: "22 Languages",
    description:
      "Change the app's language at any time — it applies immediately.",
    top: true,
  },
  {
    id: "faq",
    icon: BookOpenCheck,
    title: "Built-in FAQs",
    description:
      "Quick answers to common questions, such as how natural farming differs from organic farming and how it manages pests, water and soil.",
    top: true,
  },
  {
    id: "offline",
    icon: WifiOff,
    title: "Learn Offline",
    description:
      "Lessons are stored on your phone, so you can keep learning when the connection drops.",
  },
  {
    id: "accessibility",
    icon: Accessibility,
    title: "Reading Comfort",
    description:
      "Adjust the font size, switch on a dyslexia-friendly font and choose touch haptics.",
  },
  {
    id: "reminders",
    icon: BellRing,
    title: "Learning Reminders",
    description:
      "Optional push notifications nudge you to keep your streak going — switch them off any time.",
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Us",
    description:
      "Questions or ideas? Send them to us from inside the app or at support@paulkreations.com.",
  },
];

// ─── Trust badges (must be stated in the Privacy Policy) ─────────────────────

export const naturalFarmingTrustBadges: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: EyeOff,
    title: "No Data Selling",
    description: "We do not sell your personal data.",
  },
  {
    icon: Lock,
    title: "No Sign-Up Needed",
    description:
      "You do not need an email or password to learn. An anonymous identifier is created for your device.",
  },
  {
    icon: Settings2,
    title: "Location Is Optional",
    description:
      "Approximate location sharing is asked about and can be turned off in Settings.",
  },
  {
    icon: ShieldCheck,
    title: "You Can Ask For Deletion",
    description:
      "Request deletion of your profile and linked data on this site, any time.",
  },
];

export const naturalFarmingPrivacyPoints = [
  "Learning needs no email or password — the app creates an anonymous identifier for your device.",
  "Approximate location, once each time you open the app, is optional and can be switched off in Settings.",
  "Anything you post in the Community is visible to other users.",
  "The app shows ads, and where required asks for your consent first. We do not sell your personal data.",
] as const;

// ─── Benefits ────────────────────────────────────────────────────────────────────
// Mirrors the app's own "Why Natural Farming?" benefits.

export type NaturalFarmingBenefitGroup = {
  id: string;
  title: string;
  points: string[];
};

export const naturalFarmingBenefitGroups: NaturalFarmingBenefitGroup[] = [
  {
    id: "healthy-food",
    title: "Healthy Food",
    points: [
      "Nutritious, chemical-free food for a healthier you and your family",
    ],
  },
  {
    id: "profitable",
    title: "Profitable Business",
    points: [
      "Low-cost, high-return farming for a sustainable and profitable future",
    ],
  },
  {
    id: "environment",
    title: "Beautiful Environment",
    points: [
      "Protects soil, water and air, and supports biodiversity for a better tomorrow",
    ],
  },
  {
    id: "peace",
    title: "Peace of Mind",
    points: [
      "Connect with nature, reduce stress and live a balanced, comfortable life",
    ],
  },
  {
    id: "learn-your-way",
    title: "Learn Your Way",
    points: [
      "22 languages",
      "Short lessons with quizzes after each one",
      "A daily quiz and streak to build the habit",
    ],
  },
  {
    id: "community-and-privacy",
    title: "Community, With Care",
    points: [
      "Ask questions and share tips with other growers",
      "Report posts that break the rules",
      "We do not sell your personal data",
    ],
  },
];

// ─── How it works (4-step flow) ────────────────────────────────────────────────

export type NaturalFarmingStep = {
  step: number;
  title: string;
  description: string;
};

export const naturalFarmingHowItWorks: NaturalFarmingStep[] = [
  {
    step: 1,
    title: "Install and pick your language",
    description:
      "Open the app and choose from 22 languages. No sign-up is needed to start learning.",
  },
  {
    step: 2,
    title: "Read the lessons",
    description:
      "Work through short lessons on natural farming, from the basics to advanced practices.",
  },
  {
    step: 3,
    title: "Take the quizzes",
    description:
      "Check your understanding after each lesson and answer the daily quiz to build your streak.",
  },
  {
    step: 4,
    title: "Join the community",
    description:
      "Ask questions, share tips and learn from other growers whenever you want to.",
  },
];

// ─── Screens (code-drawn previews; real PNGs in public/apps/natural-farming/screenshots) ──

export type NaturalFarmingScreen = {
  caption: string;
  title: string;
  rows: string[];
  kind?: "list" | "board";
};

export const naturalFarmingScreens: NaturalFarmingScreen[] = [
  {
    caption: "Grow naturally, live better",
    title: "Natural Farming",
    rows: [
      "Explore Now",
      "Why Natural Farming?",
      "Healthy Food",
      "Profitable Business",
    ],
  },
  {
    caption: "Lessons",
    title: "Lessons",
    rows: [
      "Introduction to Natural Farming",
      "What is Natural Capital?",
      "Mulching",
      "Cover Cropping",
    ],
  },
  {
    caption: "Daily Quiz",
    title: "Daily Quiz",
    rows: [
      "4 questions · ~2 minutes",
      "Multiple Choice",
      "Fill in the Blank",
      "True or False",
    ],
  },
  {
    caption: "Community",
    title: "Community",
    rows: [
      "All topics",
      "Start a conversation",
      "Helpful",
      "Report this content",
    ],
  },
  {
    caption: "Built-in FAQs",
    title: "FAQ",
    rows: [
      "Organic vs natural farming?",
      "How does it maintain soil tilth?",
      "How does it regulate the water cycle?",
      "How does it regulate the nitrogen cycle?",
    ],
  },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────────
// Plain text only: faq.tsx renders each answer in a single <p>.

export type NaturalFarmingFaqItem = {
  question: string;
  answer: string;
};

export const naturalFarmingFaqs: NaturalFarmingFaqItem[] = [
  {
    question: "What is the Natural Farming app?",
    answer:
      "Natural Farming is a free educational app that teaches the principles and practices of sustainable, chemical-free farming. It has 37 lessons, a daily quiz, quizzes after each lesson, built-in FAQs and a community where you can ask questions and share tips.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. There is no email-and-password sign-up. The app creates an anonymous identifier for your device and uses it to remember your progress. If you join the community you can add a display name and, optionally, contact details, which are explained in the Privacy Policy.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes, the app is free to download and use. It shows ads, and where the law requires it, asks for your consent first. You can change your ad choices from the Privacy options in the app.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "The app supports 22 languages. Change the language in Settings and it applies immediately.",
  },
  {
    question: "Does it work without internet?",
    answer:
      "Yes. The lessons are stored on your phone, so you can keep learning offline. The app updates its content, loads community posts and syncs quizzes when you are back online.",
  },
  {
    question: "What topics do the lessons cover?",
    answer:
      "They start with an introduction and the advantages and disadvantages of natural farming, then cover ecosystem services and the water, carbon, nitrogen, phosphorus and potassium cycles. Practical lessons include no-till, mulching, cover cropping, water harvesting, probiotics, multilayer polycropping, bee keeping, mixed animal husbandry and aquaculture, direct marketing and eco-agritourism. Later lessons cover measuring soil health and biodiversity and valuing natural capital and ecosystem services.",
  },
  {
    question: "What is the difference between organic and natural farming?",
    answer:
      "The app's FAQ explains it in depth. In short, it describes organic farming as a certified system that avoids synthetic inputs, and natural farming as a low-cost, biodiversity-based approach that depends on natural resources and ecosystem services rather than outside inputs. Open the FAQ in the app for the full explanation.",
  },
  {
    question: "How do the daily quiz and streaks work?",
    answer:
      "Each day you can take a short quiz of four questions in about two minutes. Completing it extends your streak, and the app tracks your best streak. Lesson quizzes also award badges when you pass.",
  },
  {
    question: "Who can see what I post in the community?",
    answer:
      "Posts, replies and photos you share in the community are visible to other app users. Do not share personal or sensitive information there. You can report any post with the flag button, and we may remove content that breaks the rules.",
  },
  {
    question: "Why does the app ask about my location?",
    answer:
      "To understand which regions use the app, it can record your approximate location once each time you open it. This is optional and you can turn it off in Settings at any time. Details are in the Privacy Policy.",
  },
  {
    question: "How do I delete my data?",
    answer:
      "Clearing the app on your phone removes only the copy on your device. To delete what is held on our servers, use the delete-your-data page on this website or email support@paulkreations.com, and tell us the display name on your community profile so we can find it.",
  },
  {
    question: "Is this professional farming advice?",
    answer:
      "No. The app is for general learning. Results depend on your soil, climate, crops and local rules, so please check important decisions with a qualified local expert.",
  },
  {
    question: "Who can use the app?",
    answer:
      "People aged 13 and over. If you are under 18, please use the community features with a parent or guardian's permission.",
  },
  {
    question: "How can I contact you or suggest a topic?",
    answer:
      "Use the Contact option in the app or email support@paulkreations.com. We read every message.",
  },
];
