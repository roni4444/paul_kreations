// ─────────────────────────────────────────────────────────────────────────────
// "Where Is My Money?" — Landing Page Data
// lib/data/wimm.ts
//
// Single source of truth for /app/wimm content. Keeping copy here (not
// hardcoded in components) means the launch-date flip, pricing, and FAQ
// answers can all be updated in one place without touching JSX.
// ─────────────────────────────────────────────────────────────────────────────

import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BarChart3,
  Car,
  CreditCard,
  Gem,
  HeartPulse,
  Plane,
  Receipt,
  RefreshCw,
  ShieldAlert,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

// ─── Launch state ─────────────────────────────────────────────────────────────
// Flip this (or drive it from an env var) on launch day to switch the whole
// page from "waitlist" mode to "download" mode without touching components.
// Target launch: 22 Aug 2026.
export const WIMM_LAUNCH_DATE = "2026-08-22T00:00:00+05:30";
export const WIMM_IS_LIVE = true;

export const WIMM_APP_STORE_URL = ""; // fill in when live
export const WIMM_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=kreations.paul.whereismymoney";
export const WIMM_WINDOWS_URL = ""; // fill in when live
export const WIMM_MAC_URL = ""; // fill in when live
export const WIMM_LINUX_URL = ""; // fill in when live

// ─── Support ──────────────────────────────────────────────────────────────────
// Shown in the launch section and the trust section. Social links live in
// lib/data/index.ts (socialLinks) — single source of truth shared with the
// main site footer, since they're the same Paul Kreations accounts.

export const WIMM_SUPPORT_EMAIL = "support@paulkreations.com";

// ─── Core copy ────────────────────────────────────────────────────────────────

export const WIMM_TAGLINE =
  "Know exactly where every rupee goes — and where it's headed.";

export const WIMM_SUBTAGLINE =
  "Stop juggling five different apps for banking, cards, investments, and tax. Where Is My Money? is one home for your entire financial life — built for India.";

// ─── Unified feature categories (14) ───────────────────────────────────────────
// Shown as a grid. "top" flags the 6 highlighted on first view; the rest
// expand under "Show all 14".

export type WimmFeature = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  top?: boolean;
};

export const wimmFeatures: WimmFeature[] = [
  {
    id: "banking",
    icon: Wallet,
    title: "Banking & Wallets",
    description:
      "See balances across every bank account and wallet in one view — no more app-hopping to check what you actually have.",
    top: true,
  },
  {
    id: "cards",
    icon: CreditCard,
    title: "Credit Cards & Rewards",
    description:
      "Track statements, due dates, reward points, and spending patterns for every card side by side.",
    top: true,
  },
  {
    id: "investments",
    icon: TrendingUp,
    title: "Investments",
    description:
      "Stocks, mutual funds, ETFs, and bonds with real XIRR calculations — see your actual return, not a rough estimate.",
    top: true,
  },
  {
    id: "debt",
    icon: ShieldAlert,
    title: "Debt & Credit Health",
    description:
      "Loans and credit cards in one place, with a credit health score that tells you where you stand.",
    top: true,
  },
  {
    id: "goals",
    icon: Target,
    title: "Goals & Budgeting",
    description:
      "Personal and household budgets with forecasting, so you know today if you're on track for next month.",
    top: true,
  },
  {
    id: "tax",
    icon: Receipt,
    title: "Income Tax",
    description:
      "New Regime calculator with Form 26AS tracking, built in — no separate tax software required.",
    top: true,
  },
  {
    id: "cash",
    icon: Banknote,
    title: "Cash Management",
    description:
      "Multiple wallets with categorised tracking, for the cash that never shows up in any bank statement.",
  },
  {
    id: "travel",
    icon: Plane,
    title: "Travel & Expense Splitting",
    description:
      "Trip funds, group expense splitting, and journey journals — settle up without the group-chat maths.",
  },
  {
    id: "vehicles",
    icon: Car,
    title: "Vehicles",
    description:
      "Maintenance, fuel economy, depreciation, insurance, and challans tracked against the vehicle you actually own.",
  },
  {
    id: "metals",
    icon: Gem,
    title: "Precious Metals & Gemstones",
    description:
      "Track holdings against live rate feeds, so gold and silver show up in your net worth like any other asset.",
  },
  {
    id: "subscriptions",
    icon: RefreshCw,
    title: "Subscriptions",
    description:
      "Every recurring charge in one list, so nothing renews quietly in the background again.",
  },
  {
    id: "family",
    icon: Users,
    title: "Family Sharing",
    description:
      "Shared budgets, allowances, and grants — manage household money together without shared logins.",
  },
  {
    id: "health-score",
    icon: HeartPulse,
    title: "Financial Health Scoring",
    description:
      "One number that rolls up debt, savings, and investing behaviour into a wellness score you can actually improve.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Spending trends and a year-in-review that shows you the story your transactions were quietly telling all along.",
  },
];

// ─── Key benefits (grouped, for the "why Where Is My Money?" section) ────────────────────────

export type WimmBenefitGroup = {
  id: string;
  title: string;
  points: string[];
};

export const wimmBenefitGroups: WimmBenefitGroup[] = [
  {
    id: "one-dashboard",
    title: "One Dashboard, Everything Visible",
    points: [
      "Stop switching between five-plus apps — bank app, card app, investment app, travel app, tax software",
      "A real-time view of net worth across every account you hold",
    ],
  },
  {
    id: "india-first",
    title: "India-First Design",
    points: [
      "Budget natively in INR — no forex-conversion headaches",
      "Income Tax (New Regime) calculator built in",
      "Support for family structures — joint budgets, kids' allowances",
    ],
  },
  {
    id: "smart-insights",
    title: "Smart, Automated Insights",
    points: [
      "Credit health scoring and spending-trend alerts",
      "Goal progress tracking with forecasts, not just totals",
      "A year-in-review that actually tells you something new",
    ],
  },
  {
    id: "control-privacy",
    title: "Control & Privacy",
    points: [
      "Local-first — your data lives on your device first, cloud sync is optional",
      "No ads, no data selling, ever",
      "Biometric + PIN security on top of local storage",
    ],
  },
  {
    id: "beyond-tracking",
    title: "Comprehensive Beyond Tracking",
    points: [
      "Not just where money went — where money is: investments, vehicles, metals",
      "Life-event coverage: travel budgets, vehicle lifecycle, precious-metal insurance",
    ],
  },
  {
    id: "cross-platform",
    title: "Cross-Platform Freedom",
    points: [
      "Android, iOS, Windows, macOS, and Linux",
      "Sync when you want to, or stay completely local",
      "Export everything to PDF whenever you need it",
    ],
  },
];

// ─── How it works (5-step flow) ────────────────────────────────────────────────

export type WimmStep = {
  step: number;
  title: string;
  description: string;
};

export const wimmHowItWorks: WimmStep[] = [
  {
    step: 1,
    title: "Add your bank, cards, and wallets",
    description:
      "Bring your accounts into one place in a few minutes — no lengthy onboarding.",
  },
  {
    step: 2,
    title: "Categorise expenses",
    description:
      "Auto-suggested categories do most of the work; adjust anything by hand when you want to.",
  },
  {
    step: 3,
    title: "View your financial health dashboard",
    description:
      "Net worth, budgets, and investments — one screen, always current.",
  },
  {
    step: 4,
    title: "Get alerts on budgets, investments, goals",
    description:
      "Where Is My Money? tells you when something needs attention, instead of you having to go looking for it.",
  },
  {
    step: 5,
    title: "Export reports, share with family",
    description:
      "PDF exports and shared budgets, whenever the numbers need to leave the app.",
  },
];

// ─── Waitlist form option sets ──────────────────────────────────────────────────

export const WIMM_INTEREST_OPTIONS = [
  { value: "salaried", label: "Salaried professional" },
  { value: "freelancer", label: "Freelancer / self-employed" },
  { value: "investor", label: "Active investor" },
  { value: "family", label: "Managing family finances" },
  { value: "business-owner", label: "Small business owner" },
  { value: "expat", label: "Expat managing India finances" },
  { value: "other", label: "Something else" },
] as const;

export const WIMM_PLATFORM_OPTIONS = [
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "windows", label: "Windows" },
  { value: "mac", label: "macOS" },
  { value: "linux", label: "Linux" },
  { value: "any", label: "Not sure yet" },
] as const;

// ─── FAQ ────────────────────────────────────────────────────────────────────────
// Answers are placeholders — replace with real copy before launch.
// Keeping the question set here now means the FAQPage JSON-LD and the
// on-page accordion never drift out of sync.

export type WimmFaqItem = {
  question: string;
  answer: string;
};

export const wimmFaqs: WimmFaqItem[] = [
  {
    question: "Is my data safe?",
    answer:
      "Where Is My Money? is local-first: your financial data lives on your device first, and cloud sync is optional. [Placeholder — replace with final security/encryption copy before launch.]",
  },
  {
    question: "Do I need internet to use Where Is My Money?",
    answer:
      "No — core tracking works fully offline. Internet is only needed for optional cloud sync and live rate feeds (like precious metal prices). [Placeholder — confirm before launch.]",
  },
  {
    question: "What's the difference between free and premium?",
    answer:
      "[Placeholder — add the final free vs. premium feature breakdown and pricing once decided.]",
  },
  {
    question: "Can I share with my family?",
    answer:
      "Yes — Family Sharing lets you set up joint budgets and allowances without sharing your login. [Placeholder — refine once the feature is finalised.]",
  },
  {
    question: "How do I export my data?",
    answer:
      "Every report can be exported to PDF from inside the app. [Placeholder — add step-by-step detail once the export flow is finalised.]",
  },
  {
    question: "Which banks are supported?",
    answer:
      "[Placeholder — list supported banks / import methods once confirmed.]",
  },
  {
    question: "Is there a web version?",
    answer:
      "Where Is My Money? currently targets Android, iOS, Windows, macOS, and Linux. [Placeholder — confirm web-version plans, if any.]",
  },
  {
    question: "How much does premium cost?",
    answer: "[Placeholder — add pricing once finalised.]",
  },
  {
    question: "Can I use this for business finances?",
    answer:
      "Where Is My Money? is built for personal finance. It isn't designed for business accounting. [Placeholder — refine wording before launch.]",
  },
  {
    question: "What if I have multiple currencies?",
    answer: "[Placeholder — confirm multi-currency support before launch.]",
  },
];

// ─── SEO keywords ────────────────────────────────────────────────────────────────
// Primary set drives metadata.keywords; used sparingly and naturally in copy —
// not stuffed.

export const WIMM_PRIMARY_KEYWORDS = [
  "Personal finance app India",
  "Money tracker India",
  "Expense manager India",
  "Family budget app India",
  "Investment tracker India",
];

export const WIMM_LONGTAIL_KEYWORDS = [
  "Expense tracker with investment tracking",
  "Family budget sharing app",
  "Debt payoff calculator India",
  "Financial goals tracker",
  "Vehicle maintenance tracker",
  "Travel budget app",
  "Debt tracker India",
  "Financial health score",
  "Income tax calculator India",
  "Best finance app for Indians",
];
