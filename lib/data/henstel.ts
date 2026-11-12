// ─────────────────────────────────────────────────────────────────────────────
// Henstel — Landing Page Data
// lib/data/henstel.ts
//
// Single source of truth for /app/henstel content. Keeping copy here (not
// hardcoded in components) means feature, FAQ and download details can be
// updated in one place without touching JSX. Every claim must match the
// Privacy Policy at app/henstel/privacy/page.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  ChefHat,
  Crown,
  EyeOff,
  Fingerprint,
  Globe2,
  Lock,
  MessageCircle,
  Refrigerator,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export const HENSTEL_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=kreations.paul.henstel";

// ─── Support ──────────────────────────────────────────────────────────────────
export const HENSTEL_SUPPORT_EMAIL = "support@paulkreations.com";

// ─── Download stats ──────────────────────────────────────────────────────────
// Mirrors the Google Play listing. Leave empty while the count is too small to
// be worth showing (the badge then just says "Now available on Google Play").
export const HENSTEL_DOWNLOADS = "";

// ─── SEO ─────────────────────────────────────────────────────────────────────
export const HENSTEL_META_TITLE =
  "Henstel — Your kitchen operating system | Cookbooks & Smart Pantry App";
export const HENSTEL_META_DESCRIPTION =
  "Henstel is a modern kitchen companion for Android that combines curated cookbooks with intelligent pantry organisation, expiry reminders and AI help for preparing and beautifying recipes.";

export const HENSTEL_PRIMARY_KEYWORDS = [
  "Henstel app",
  "Pantry inventory app",
  "Recipe and cookbook app",
  "Kitchen organiser app",
  "Ingredient expiry reminder app",
];

export const HENSTEL_LONGTAIL_KEYWORDS = [
  "Kitchen companion app for Android",
  "Pantry tracker with expiry alerts",
  "Curated cookbooks app",
  "AI recipe helper",
  "Cooking app with pantry management",
];

// ─── Core copy ────────────────────────────────────────────────────────────────

export const HENSTEL_TAGLINE = "Your kitchen operating system.";

export const HENSTEL_SUBTAGLINE =
  "Henstel combines curated cookbooks with intelligent pantry organisation — so you always know what you have, what to cook, and what needs using up first.";

export const HENSTEL_HERO_NOTE =
  "Android · Free to download · We do not sell your personal data";

export const HENSTEL_FOOTER_BLURB =
  "A modern kitchen companion that combines curated cookbooks with intelligent pantry organisation — by Paul Kreations.";

export const HENSTEL_DISCLAIMER =
  "Henstel is a cooking and kitchen-organisation tool. Recipes, AI-assisted suggestions and expiry reminders are provided for convenience only and are not medical, dietary or food-safety advice. Check ingredients, allergens and the condition of your food yourself before cooking or eating.";

export const henstelCopy = {
  featuresEyebrow: "Cook · Organise · Plan",
  featuresTitle: "Everything your kitchen needs, in one app",
  featuresIntro:
    "Henstel brings recipes and your pantry together, so what you cook is shaped by what you actually have at home.",
  howEyebrow: "Getting Started",
  howIntro:
    "Four simple steps from install to a kitchen that runs itself a little more smoothly.",
  benefitsTitle: "Built for people who love to cook",
};

// ─── Features ───────────────────────────────────────────────────────────────────

export type HenstelFeature = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  top?: boolean;
};

export const henstelFeatures: HenstelFeature[] = [
  {
    id: "cookbooks",
    icon: BookOpen,
    title: "Curated Cookbooks",
    description:
      "Browse cookbooks put together for you, and keep the recipes you love close at hand.",
    top: true,
  },
  {
    id: "pantry",
    icon: Refrigerator,
    title: "Smart Pantry",
    description:
      "Keep track of the ingredients you have, so you can cook from your own shelves before buying more.",
    top: true,
  },
  {
    id: "expiry",
    icon: Bell,
    title: "Expiry Reminders",
    description:
      "Get a nudge before an ingredient goes off, so less food is wasted.",
    top: true,
  },
  {
    id: "ai",
    icon: Sparkles,
    title: "AI Recipe Help",
    description:
      "Let AI help prepare and beautify a recipe — a cleaner layout and clearer steps, ready to cook from.",
    top: true,
  },
  {
    id: "taste",
    icon: ChefHat,
    title: "Cooking Your Way",
    description:
      "Tell Henstel your favourite cuisines in your profile, so the app can reflect the food you enjoy.",
    top: true,
  },
  {
    id: "pro",
    icon: Crown,
    title: "Henstel Pro",
    description:
      "Keep using Henstel after your free-usage days with a Pro subscription, managed through Google Play.",
    top: true,
  },
  {
    id: "sign-in",
    icon: Fingerprint,
    title: "Quick, Secure Sign-In",
    description:
      "Use your device's biometric unlock to get back into the app quickly.",
  },
  {
    id: "support",
    icon: MessageCircle,
    title: "In-App Support",
    description:
      "Questions or feedback? Reach us from inside the app, or at support@paulkreations.com.",
  },
  {
    id: "account",
    icon: UserRound,
    title: "Your Account, Your Control",
    description:
      "Update your profile or delete your account and its data from inside the app, any time.",
  },
];

// ─── Trust badges (must be stated in the Privacy Policy) ─────────────────────

export const henstelTrustBadges: {
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
    title: "Encrypted In Transit",
    description:
      "Data sent between the app and our servers travels over encrypted connections.",
  },
  {
    icon: Globe2,
    title: "Clear About Providers",
    description:
      "Every service provider we use is listed in the Privacy Policy.",
  },
  {
    icon: ShieldCheck,
    title: "You're In Control",
    description:
      "Delete your account and data from inside the app, or by request on this site.",
  },
];

export const henstelPrivacyPoints = [
  "You create an account so your profile and kitchen data can be saved and synced.",
  "We do not sell your personal data.",
  "AI recipe features send only the recipe content you ask Henstel to prepare or beautify.",
  "Biometric unlock is handled by your device — we never receive your fingerprint or face data.",
] as const;

// ─── Benefits ────────────────────────────────────────────────────────────────────

export type HenstelBenefitGroup = {
  id: string;
  title: string;
  points: string[];
};

export const henstelBenefitGroups: HenstelBenefitGroup[] = [
  {
    id: "cook-from-what-you-have",
    title: "Cook From What You Have",
    points: [
      "Cookbooks and your pantry live side by side",
      "Less guessing about what is in the cupboard",
    ],
  },
  {
    id: "waste-less",
    title: "Waste Less Food",
    points: [
      "Expiry reminders for the ingredients you track",
      "Use up what is ageing before it is lost",
    ],
  },
  {
    id: "smart-help",
    title: "A Little Help From AI",
    points: [
      "Prepare and beautify recipes with AI assistance",
      "You stay in charge of what you cook",
    ],
  },
  {
    id: "yours",
    title: "Made Around You",
    points: [
      "Favourite cuisines in your profile",
      "Biometric unlock for quick access",
    ],
  },
  {
    id: "fair-pricing",
    title: "Simple, Honest Pricing",
    points: [
      "Free to download",
      "Henstel Pro lets you continue after your free-usage days",
      "Subscription managed by Google Play — cancel any time",
    ],
  },
  {
    id: "privacy",
    title: "Respect For Your Data",
    points: [
      "We do not sell your personal data",
      "Delete your account from inside the app",
      "A plain-language Privacy Policy that names every provider",
    ],
  },
];

// ─── How it works (4-step flow) ────────────────────────────────────────────────

export type HenstelStep = {
  step: number;
  title: string;
  description: string;
};

export const henstelHowItWorks: HenstelStep[] = [
  {
    step: 1,
    title: "Install and create your account",
    description:
      "Download Henstel from Google Play and set up your profile, including your favourite cuisines.",
  },
  {
    step: 2,
    title: "Stock your pantry",
    description:
      "Add the ingredients you have so Henstel knows what is on your shelves.",
  },
  {
    step: 3,
    title: "Browse and prepare recipes",
    description:
      "Explore cookbooks and let AI help prepare and beautify a recipe you want to cook.",
  },
  {
    step: 4,
    title: "Get reminded, cook, repeat",
    description:
      "Expiry reminders keep your ingredients in order while you get on with cooking.",
  },
];

// ─── Screens (code-drawn previews; real PNGs in public/apps/henstel/screenshots) ──

export type HenstelScreen = {
  caption: string;
  title: string;
  rows: string[];
  kind?: "list" | "board";
};

export const henstelScreens: HenstelScreen[] = [
  {
    caption: "Your kitchen home",
    title: "Henstel",
    rows: [
      "Cookbook — Browse recipes",
      "Ingredients — Your ingredients",
      "Utensils — Your workspace",
      "Tips and Tricks",
    ],
  },
  {
    caption: "Curated cookbooks",
    title: "Cookbook",
    rows: [
      "Featured cookbooks",
      "Saved recipes",
      "By cuisine",
      "Recently viewed",
    ],
  },
  {
    caption: "Your pantry",
    title: "Ingredients",
    rows: ["Fresh produce", "Dairy", "Dry goods", "Spices"],
  },
  {
    caption: "Expiry reminders",
    title: "Reminders",
    rows: ["Use soon", "Expiring this week", "Already expired"],
  },
  {
    caption: "Henstel Pro",
    title: "Henstel Pro",
    rows: ["Keep using Henstel", "Choose a plan", "Managed by Google Play"],
  },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────────
// Plain text only: faq.tsx renders each answer in a single <p>.

export type HenstelFaqItem = {
  question: string;
  answer: string;
};

export const henstelFaqs: HenstelFaqItem[] = [
  {
    question: "What is Henstel?",
    answer:
      "Henstel is a modern kitchen companion for Android. It combines curated cookbooks with intelligent pantry organisation, so you can see what you have, find something to cook, and be reminded before ingredients expire.",
  },
  {
    question: "Is Henstel free?",
    answer:
      "Henstel is free to download. You can use it for a number of free-usage days; to keep using it after that you subscribe to Henstel Pro. There is no conventional free trial — the free-usage days are simply the days you can use the app before Pro is needed.",
  },
  {
    question: "What does Henstel Pro give me?",
    answer:
      "Henstel Pro lets you continue using the app after your free-usage days are over. Plans and prices are shown on the Pro screen in the app and can vary by country; the subscription is billed through Google Play and managed with RevenueCat.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Open Google Play on your phone, go to Payments & subscriptions, choose Henstel and cancel. Deleting your Henstel account does not cancel a Google Play subscription on its own, so cancel first if you do not want to be billed again.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Yes. An account lets Henstel save your profile, your pantry and your cookbooks and keep them in sync. Your profile can include your name, date of birth, sex, country of origin and residence, favourite cuisines and a profile photo. The Privacy Policy explains what is collected and why.",
  },
  {
    question: "What does the AI feature do?",
    answer:
      "Henstel uses Firebase's AI services for recipe preparation and beautification — helping turn a recipe into a clear, well-laid-out version. The recipe content you ask it to work on is sent to Google's AI service to produce the result. The Privacy Policy covers this in detail.",
  },
  {
    question: "How do expiry reminders work?",
    answer:
      "When you add ingredients to your pantry, Henstel can send a notification before they expire. You can turn notifications off in your phone's settings at any time.",
  },
  {
    question: "Can I sign in with my fingerprint or face?",
    answer:
      "Yes. Henstel supports your device's biometric unlock. The check is done entirely by your phone's operating system — Henstel never receives or stores your fingerprint or face data.",
  },
  {
    question: "Why does Henstel ask for camera and photo access?",
    answer:
      "Only when you choose to use a feature that needs it — for example, adding a profile photo. You can allow or deny each permission in your phone's settings, and the rest of the app keeps working.",
  },
  {
    question: "Does Henstel use affiliate links?",
    answer:
      "Some products shown in Henstel link to Amazon. As an Amazon Associate we earn from qualifying purchases. This costs you nothing extra and does not change the price you pay.",
  },
  {
    question: "Is my data sold or shared with advertisers?",
    answer:
      "No. We do not sell your personal data. We use service providers such as Supabase, Firebase, RevenueCat, OneSignal, Sentry and Stream Chat to run the app; each is listed in the Privacy Policy with what it does and what data it handles.",
  },
  {
    question: "How do I delete my account and data?",
    answer:
      "Open Settings and choose Delete Account in the app. If you no longer have the app, use the delete-account page on this website or email support@paulkreations.com. Deleted records can remain in routine backups for up to 30 days. The Privacy Policy lists exactly what is deleted and what is kept.",
  },
  {
    question: "Who can use Henstel?",
    answer:
      "Henstel is for people aged 13 and over. If you are under 18, please use it with a parent or guardian's permission.",
  },
  {
    question: "Is Henstel available on iPhone?",
    answer: "Henstel is currently available on Android through Google Play.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Use the in-app support option, or email support@paulkreations.com. We aim to reply within 30 days, and usually much sooner.",
  },
];
