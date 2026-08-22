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
  "https://play.google.com/store/apps/details?id=kreations.paul.whereismymoney"; // fill in when live
export const WIMM_WINDOWS_URL = ""; // fill in when live
export const WIMM_MAC_URL = ""; // fill in when live
export const WIMM_LINUX_URL = ""; // fill in when live

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
// Finalized launch copy. Free/premium + pricing merged into one question;
// added account deletion, investment tracking, tax filing, launch/platform
// questions, and two "bonus" trust-building questions (funding model,
// competitor comparison). FAQPage JSON-LD is generated from this array (see
// components/seo/wimm-json-ld.tsx), so the on-page accordion and structured
// data can never drift out of sync.

export type WimmFaqItem = {
  question: string;
  answer: string;
};

export const wimmFaqs: WimmFaqItem[] = [
  {
    question: "Is my data safe?",
    answer:
      "Yes. All your financial data is encrypted at rest using AES-256 directly on your device, and only decrypts locally when you enter your 6-digit PIN — we never see your data ourselves. If you enable cloud sync on Premium, your data syncs to our servers over HTTPS, encrypted both in transit and at rest.",
  },
  {
    question: "Do I need internet to use Where Is My Money?",
    answer:
      "No — the entire app works fully offline. You can track expenses, income, investments, budgets, and goals without ever connecting to the internet. Cloud sync across devices is optional and only available on Premium.",
  },
  {
    question:
      "What's the difference between free and premium, and how much does premium cost?",
    answer:
      "Free includes every core finance feature — expense, income, budget, and goal tracking, investments, debt, vehicles, precious metals, financial health scoring, the tax calculator, reports, home-screen widgets, and local family tagging — with no paywall. Premium adds cloud sync across Android, iOS, and desktop, attachments for receipts and documents, live precious-metal rates, multi-currency support, cross-account family sharing, and priority support. At launch, early-bird pricing (through 30 September 2026) is roughly ₹49/week, ₹99/month, or ₹499/year, and early subscribers keep that rate going forward.",
  },
  {
    question: "Can I share with my family?",
    answer:
      "Yes. On the free plan you can tag local family members when logging expenses or income. Premium adds cross-account sharing — invite another person to a shared household, set permissions on which data they see, and track joint budgets, subscriptions, and goals together.",
  },
  {
    question: "How do I export my data?",
    answer:
      "You can export an encrypted, passphrase-protected backup from Settings at any time and restore it on a new device. PDF financial reports are free for every user, and you can import bank statements as CSV. Premium adds continuous cloud backup for all synced data.",
  },
  {
    question: "Which banks are supported?",
    answer:
      "We support 200+ Indian banks, NBFCs, and digital banks out of the box. The app doesn't auto-connect to your bank — you add accounts manually with opening balances or import a CSV statement, so you stay in full control of what's tracked.",
  },
  {
    question: "Is there a web version?",
    answer:
      "Not yet. Where Is My Money? is mobile-first: Android launches first, iOS follows once Android has stabilised, and Windows, macOS, and Linux are planned after the mobile launch. There are no current plans for a web version.",
  },
  {
    question: "Can I use this for business finances?",
    answer:
      "No — the app is built for personal finances, around individual budgets, household expenses, and personal tax filing under India's New Regime. If you need to separate business and personal finances, you could use a second account, but it isn't optimised for business accounting.",
  },
  {
    question: "What if I have multiple currencies?",
    answer:
      "The free plan tracks everything in INR. Premium lets you log expenses and income in any currency, with automatic conversion to your base currency using live exchange rates — useful for travel or NRI finances.",
  },
  {
    question: "How do I delete my account or my data?",
    answer:
      "You can wipe just the app's local data from Settings > Data Management > Factory Reset, which keeps the app installed. To delete your account entirely — local data, cloud data if you're on Premium, and your cloud account — use Settings > Account Deletion. Both actions are instant and irreversible.",
  },
  {
    question: "How does investment tracking work?",
    answer:
      "Where Is My Money? tracks SIP and lump-sum investments and calculates XIRR — your real return, accounting for the timing of each deposit — along with current capital gains and a breakdown of your asset allocation across mutual funds, stocks, gold, and more.",
  },
  {
    question: "Does it help with Income Tax filing?",
    answer:
      "Yes, for India's New Regime. The app includes a tax calculator that pulls from your actual income entries, a slab visualisation, NPS tax-saving tips, advance tax tracking, and Form 26AS/AIS reconciliation. It's not a replacement for a CA, but it helps you understand your liability and keep documents organised.",
  },
  {
    question: "When is Where Is My Money? launching, and on which platforms?",
    answer:
      "Android launches first, with early-bird pricing available through 30 September 2026. iOS follows once Android has stabilised, and Windows, macOS, and Linux are planned after the mobile launch — there's no web version planned at this time.",
  },
  {
    question: "How is the app funded?",
    answer:
      "The free tier is fully free forever, with no ads and no data selling. Premium is a subscription — weekly, monthly, or yearly, cancel anytime — that funds ongoing development. Usage analytics are optional and off by default for free users; if you opt in, no financial data is ever included.",
  },
  {
    question: "How does this compare to other finance apps?",
    answer:
      "Most personal finance apps lock core features like budgeting, investing, or tax tools behind a paywall, or run on an ad-supported free tier. Where Is My Money? doesn't lock any core finance feature behind Premium — everything you need works offline and free. Premium adds genuine extras like cloud sync, attachments, live rates, and family sharing, but it was never meant to be required for a complete app.",
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
