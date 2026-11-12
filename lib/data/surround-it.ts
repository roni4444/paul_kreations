// ─────────────────────────────────────────────────────────────────────────────
// Surround It — Landing Page Data
// lib/data/surround-it.ts
//
// Single source of truth for /app/surround-it content. Every claim must match
// the Privacy Policy at app/surround-it/privacy/page.tsx. The production online
// game server is not live yet — online features are described as optional and
// "when available" everywhere.
// ─────────────────────────────────────────────────────────────────────────────

import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Crown,
  EyeOff,
  Gamepad2,
  Lock,
  Medal,
  Settings2,
  ShieldCheck,
  Swords,
  Target,
  Users,
  Vibrate,
  Volume2,
  WifiOff,
} from "lucide-react";

export const SURROUND_IT_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=kreations.paul.surround_it";

// ─── Support ──────────────────────────────────────────────────────────────────
export const SURROUND_IT_SUPPORT_EMAIL = "support@paulkreations.com";

// ─── Download stats (mirrors the Google Play listing) ────────────────────────
export const SURROUND_IT_DOWNLOADS = "10+";

// ─── SEO ─────────────────────────────────────────────────────────────────────
export const SURROUND_IT_META_TITLE =
  "Surround It — Tiger vs Hunters strategy board game for Android";
export const SURROUND_IT_META_DESCRIPTION =
  "Surround It is a classic Tiger vs Hunters strategy board game reimagined for Android: one tiger against twelve hunters on a 25-point board. Play the computer at four difficulty levels, offline.";

export const SURROUND_IT_PRIMARY_KEYWORDS = [
  "Tiger vs Hunters game",
  "Surround It game",
  "Strategy board game Android",
  "Traditional board game app",
  "Two-player abstract strategy game",
];

export const SURROUND_IT_LONGTAIL_KEYWORDS = [
  "Tiger and goats style board game",
  "Offline board game against computer",
  "Abstract strategy game for Android",
  "Classic Indian strategy board game",
  "Hunters trap the tiger game",
];

// ─── Core copy ────────────────────────────────────────────────────────────────

export const SURROUND_IT_TAGLINE = "Outsmart or surround!";

export const SURROUND_IT_SUBTAGLINE =
  "A classic Tiger vs Hunters strategy board game, reimagined for mobile. Twelve hunters try to trap one cunning tiger — simple rules, deep tactics.";

export const SURROUND_IT_HERO_NOTE =
  "Android · Free to download · Play offline against the computer";

export const SURROUND_IT_FOOTER_BLURB =
  "A traditional two-player abstract strategy game reimagined for mobile — by Paul Kreations.";

export const SURROUND_IT_DISCLAIMER =
  "Surround It is a game provided for entertainment. Online features such as leaderboards and matches against other players are optional and are provided only when and where they are available.";

export const surroundItCopy = {
  featuresEyebrow: "Simple rules · Deep tactics",
  featuresTitle: "Play as the tiger or lead the hunters",
  featuresIntro:
    "One tiger, twelve hunters, a 25-point board. Capture six hunters to win as the tiger — or trap the tiger so it cannot move.",
  howEyebrow: "How to play",
  howIntro: "Four steps from install to your first win.",
  benefitsTitle: "Why you will keep coming back",
};

// ─── Features ───────────────────────────────────────────────────────────────────

export type SurroundItFeature = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  top?: boolean;
};

export const surroundItFeatures: SurroundItFeature[] = [
  {
    id: "tiger-vs-hunters",
    icon: Swords,
    title: "Tiger vs Hunters",
    description:
      "One tiger against twelve hunters on a 25-point board. The tiger wins by capturing six hunters; the hunters win by trapping the tiger.",
    top: true,
  },
  {
    id: "ai",
    icon: Brain,
    title: "Four AI Difficulty Levels",
    description:
      "Easy, Normal, Hard and Extreme. Every level uses the same tactics — a deeper search simply sees further ahead.",
    top: true,
  },
  {
    id: "offline",
    icon: WifiOff,
    title: "Play Offline",
    description:
      "Play against the computer without a connection. Online features simply switch off when you are offline.",
    top: true,
  },
  {
    id: "leaderboard",
    icon: Medal,
    title: "Leaderboards & Achievements",
    description:
      "Link Google Play Games to see leaderboards and achievements, where available.",
    top: true,
  },
  {
    id: "online",
    icon: Users,
    title: "Online Matches (coming)",
    description:
      "Casual and ranked matches against other players are planned. They are optional and will only be available once our game server is live.",
    top: true,
  },
  {
    id: "scoring",
    icon: Target,
    title: "Score Points",
    description:
      "Earn points for every capture, plus bonuses for winning as the tiger or as the hunters.",
    top: true,
  },
  {
    id: "sound",
    icon: Volume2,
    title: "Music & Sound Effects",
    description:
      "Background music, gameplay sounds and a victory cheer — each can be switched off in Settings.",
  },
  {
    id: "haptics",
    icon: Vibrate,
    title: "Haptic Feedback",
    description:
      "A light tap on every move and a heavier thump on a capture, if you want it.",
  },
  {
    id: "guest",
    icon: Gamepad2,
    title: "Jump In As A Guest",
    description:
      "No account is needed to play offline. Sign in only if you want online features.",
  },
  {
    id: "classic",
    icon: Crown,
    title: "A Classic Reimagined",
    description:
      "A traditional two-player abstract strategy game, rebuilt for mobile with clean visuals.",
  },
];

// ─── Trust badges (must be stated in the Privacy Policy) ─────────────────────

export const surroundItTrustBadges: {
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
    title: "Offline By Default",
    description:
      "Playing against the computer works without an account and without sending your game progress to our game server.",
  },
  {
    icon: Settings2,
    title: "Online Is Optional",
    description:
      "Leaderboards and online matches are opt-in and ask for your consent first.",
  },
  {
    icon: ShieldCheck,
    title: "You Can Ask For Deletion",
    description:
      "Request deletion of your online account and data on this site, any time.",
  },
];

export const surroundItPrivacyPoints = [
  "You can play against the computer offline, with no account.",
  "Online features are optional and ask for your consent before an account is created from your Google sign-in.",
  "The game shows ads; they are served by Google AdMob.",
  "We do not sell your personal data.",
] as const;

// ─── Benefits ────────────────────────────────────────────────────────────────────

export type SurroundItBenefitGroup = {
  id: string;
  title: string;
  points: string[];
};

export const surroundItBenefitGroups: SurroundItBenefitGroup[] = [
  {
    id: "easy-to-learn",
    title: "Easy To Learn",
    points: [
      "A short rulebook: one tiger, twelve hunters, 25 points",
      "A path legend inside the game shows how pieces move",
    ],
  },
  {
    id: "hard-to-master",
    title: "Hard To Master",
    points: [
      "Four AI levels from Easy to Extreme",
      "Two very different roles: predator or pack",
    ],
  },
  {
    id: "play-anywhere",
    title: "Play Anywhere",
    points: [
      "Fully playable offline against the computer",
      "Sound, music and vibration are all optional",
    ],
  },
  {
    id: "compete",
    title: "Compete When You Want To",
    points: [
      "Google Play Games leaderboards and achievements",
      "Online matches planned for when our server is live",
    ],
  },
  {
    id: "fair",
    title: "Fair And Simple",
    points: [
      "Skill decides the game, not luck",
      "Difficulty comes from search depth, not hidden cheats",
    ],
  },
  {
    id: "privacy",
    title: "Respect For Your Data",
    points: [
      "We do not sell your personal data",
      "Request deletion of your online account any time",
    ],
  },
];

// ─── How it works (4-step flow) ────────────────────────────────────────────────

export type SurroundItStep = {
  step: number;
  title: string;
  description: string;
};

export const surroundItHowItWorks: SurroundItStep[] = [
  {
    step: 1,
    title: "Pick your side",
    description:
      "Play as the lone tiger or as the twelve hunters, and choose an AI difficulty from Easy to Extreme.",
  },
  {
    step: 2,
    title: "Move along the lines",
    description:
      "Pieces move one point at a time along the board's lines. The tiger can jump over a hunter to capture it.",
  },
  {
    step: 3,
    title: "Win your way",
    description:
      "The tiger wins by capturing six hunters. The hunters win by surrounding the tiger so it cannot move.",
  },
  {
    step: 4,
    title: "Climb the ranks",
    description:
      "Link Google Play Games for leaderboards and achievements, where available.",
  },
];

// ─── Screens (code-drawn previews; real PNGs in public/apps/surround-it/screenshots) ──

export type SurroundItScreen = {
  caption: string;
  title: string;
  rows: string[];
  kind?: "list" | "board";
};

export const surroundItScreens: SurroundItScreen[] = [
  {
    caption: "Main menu",
    title: "Surround It",
    rows: ["Play", "Leaderboard", "Settings", "Account"],
  },
  {
    caption: "The board",
    title: "Tiger vs Hunters",
    rows: ["Tiger", "Hunters", "6 kills to win"],
    kind: "board",
  },
  {
    caption: "Choose your difficulty",
    title: "Play vs Computer",
    rows: ["Easy", "Normal", "Hard", "Extreme"],
  },
  {
    caption: "Gameplay",
    title: "Gameplay",
    rows: ["Hunter's turn", "Easy", "Captured 4 / 6", "Pause"],
  },
  {
    caption: "Winning screen",
    title: "Tiger Wins!",
    rows: ["Score", "Hunters killed", "Total moves", "Play Again"],
  },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────────
// Plain text only: faq.tsx renders each answer in a single <p>.

export type SurroundItFaqItem = {
  question: string;
  answer: string;
};

export const surroundItFaqs: SurroundItFaqItem[] = [
  {
    question: "What is Surround It?",
    answer:
      "Surround It is a Tiger vs Hunters strategy board game for Android. It is a traditional two-player abstract strategy game reimagined for mobile, with simple rules and deep tactics.",
  },
  {
    question: "How do you win?",
    answer:
      "The tiger wins by capturing six of the twelve hunters. The hunters win by surrounding the tiger so that it has no legal move.",
  },
  {
    question: "Can I play without internet?",
    answer:
      "Yes. You can play against the computer offline. Leaderboards and online play need a connection, and the game tells you when they are unavailable.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. You can play offline as a guest. An account is only created if you choose online features and give your consent; it is created from your Google sign-in.",
  },
  {
    question: "Are online matches available?",
    answer:
      "Casual and ranked online matches are planned, but our production game server is not live yet. Online features are optional, will appear only once the server is ready, and may be limited or change.",
  },
  {
    question: "How strong is the computer?",
    answer:
      "There are four levels: Easy, Normal, Hard and Extreme. They all use the same tactics; a higher level simply searches deeper and makes fewer deliberate mistakes.",
  },
  {
    question: "What are Google Play Games leaderboards and achievements?",
    answer:
      "If you link Google Play Games from the Account screen, the game can show leaderboards and achievements. That data is held by Google under Google's own privacy policy.",
  },
  {
    question: "Does the game have ads?",
    answer:
      "Yes. The game shows banner and interstitial ads served by Google AdMob. We do not sell your personal data.",
  },
  {
    question: "How are points scored?",
    answer:
      "You earn 100 points for each capture, plus a bonus of 500 for a tiger win or 300 for a hunters win.",
  },
  {
    question: "Can I turn off sound and vibration?",
    answer:
      "Yes. In Settings you can switch music, gameplay sounds, the victory cheer and vibration on or off separately.",
  },
  {
    question: "How do I delete my data?",
    answer:
      "If you only played offline, nothing about you is on our servers; uninstalling removes local data. If you created an online account, use the delete-your-data page on this website or email support@paulkreations.com from the Google account email you play with.",
  },
  {
    question: "Who can play?",
    answer:
      "People aged 13 and over. If you are under 18, please use online features with a parent or guardian's permission.",
  },
  {
    question: "Is it available on iPhone?",
    answer:
      "Surround It is currently available on Android through Google Play.",
  },
  {
    question: "How do I contact you?",
    answer:
      "Email support@paulkreations.com. We aim to reply within 30 days, and usually much sooner.",
  },
];
