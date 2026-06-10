// ─────────────────────────────────────────────────────────────────────────────
// Paul Kreations — Site Data
// ─────────────────────────────────────────────────────────────────────────────

export type TechStackItem = {
  /** Display label shown in tooltip */
  name: string;
  /**
   * Devicon CDN path — format: "icon-name/icon-name-variant"
   * Full URL: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{deviconPath}.svg
   * Variants: original | plain | line  (add -wordmark for text versions)
   * Browse all icons: https://devicon.dev
   *
   * Leave undefined when the service has no devicon — use localIconPath instead.
   */
  deviconPath?: string;
  /**
   * Path to a local icon inside /public, e.g. "/tech-icons/onesignal.png"
   * Place files at:  public/tech-icons/{filename}
   * Recommended source size: 64×64 px or larger (rendered at 24×24 px).
   * Use for services with no devicon: OneSignal, RevenueCat, Stream Chat, etc.
   *
   * Priority: localIconPath → deviconPath → text-badge fallback.
   */
  localIconPath?: string;
};

export type ThirdPartyService = {
  name: string;
  privacyUrl: string;
};

export type PrivacyPolicyData = {
  /** ISO date e.g. "2025-06-01" */
  lastUpdated: string;
  contactEmail: string;
  /** Android permissions declared in the manifest — include plain-language reason */
  permissions: string[];
  thirdPartyServices: ThirdPartyService[];
  /** Plain-language list of what data the app collects */
  dataCollected: string[];
  /** true = adds COPPA-compliant children's privacy section */
  isChildrenApp: boolean;
  /** Optional extra clauses appended verbatim after main body */
  additionalNotes?: string;
};

export type AppItem = {
  id: string;
  /**
   * URL slug — used for /apps/[slug]/privacy.
   * This is what goes in the Play Store Console privacy policy URL.
   * Keep lowercase and hyphen-separated.
   */
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  type: "app" | "game";
  playStoreUrl: string;
  downloads: string;
  rating: number;
  /** Gradient fallback shown when feature graphic / icon images are missing */
  colorFrom: string;
  colorTo: string;
  techStack: TechStackItem[];
  privacyPolicy: PrivacyPolicyData;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatarColor: string;
  skills: string[];
  contributions: { project: string; role: string }[];
  github?: string;
  linkedin?: string;
};

export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "soon";
  icon: string;
  eta?: string;
};

// ─── IMAGE CONVENTION ─────────────────────────────────────────────────────────
// public/apps/{slug}/feature.png   →  1024 × 500 px  (landscape feature graphic)
// public/apps/{slug}/icon.png      →  512  × 512 px  (app / game icon)
// Component shows gradient fallback automatically when files are absent.

// ─── APPS ─────────────────────────────────────────────────────────────────────

export const apps: AppItem[] = [
  {
    id: "app-1",
    slug: "henstel",
    name: "Henstel",
    tagline: "Your kitchen operating system.",
    description:
      "Your modern kitchen companion for cooking mastery. Manage recipes, plan meals, and track pantry inventory — all in one place.",
    category: "Food & Drink",
    type: "app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=kreations.paul.henstel",
    downloads: "5+",
    rating: 4.0,
    colorFrom: "#9e0027",
    colorTo: "#c41e3a",
    techStack: [
      { name: "Android", deviconPath: "android/android-original" },
      { name: "Flutter", deviconPath: "flutter/flutter-original" },
      { name: "Firebase", deviconPath: "firebase/firebase-plain" },
      { name: "Supabase", deviconPath: "supabase/supabase-original" },
      { name: "Sentry", deviconPath: "sentry/sentry-original" },
      {
        name: "Android Studio",
        deviconPath: "androidstudio/androidstudio-original",
      },
      { name: "Canva", deviconPath: "canva/canva-original" },
      { name: "Git", deviconPath: "git/git-original" },
      // ── No devicon available — add icon files to public/tech-icons/ then uncomment ──
      // { name: "OneSignal",   localIconPath: "/tech-icons/onesignal.png"   },
      // { name: "RevenueCat",  localIconPath: "/tech-icons/revenuecat.png"  },
      // { name: "Drift",       localIconPath: "/tech-icons/drift.png"       },
      // { name: "Stream Chat", localIconPath: "/tech-icons/stream-chat.png" },
      // { name: "Wiredash",    localIconPath: "/tech-icons/wiredash.png"    },
    ],
    privacyPolicy: {
      lastUpdated: "2025-06-01",
      contactEmail: "debapriyopaul.dp@gmail.com",
      permissions: [
        "INTERNET — Required to load recipes, sync data, and deliver app updates.",
        "ACCESS_NETWORK_STATE — Used to check connectivity before making network requests.",
      ],
      thirdPartyServices: [
        {
          name: "Google Firebase (Analytics & Crashlytics)",
          privacyUrl: "https://firebase.google.com/support/privacy",
        },
        {
          name: "Google Play Services",
          privacyUrl: "https://policies.google.com/privacy",
        },
      ],
      dataCollected: [
        "Anonymized usage statistics (screens visited, features used)",
        "Crash reports and error logs — no personal content is included",
        "Device information such as OS version and device model, used for compatibility",
      ],
      isChildrenApp: false,
    },
  },
  {
    id: "app-2",
    slug: "natural-farming",
    name: "Natural Farming",
    tagline: "A new way of farming.",
    description:
      "This app is intended to educate common people about the principles and practices of natural farming — sustainable, chemical-free, and accessible to all.",
    category: "Education",
    type: "app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=agri.startup.natural_farming",
    downloads: "500+",
    rating: 4.5,
    colorFrom: "#474746",
    colorTo: "#636262",
    techStack: [
      { name: "Android", deviconPath: "android/android-original" },
      { name: "Flutter", deviconPath: "flutter/flutter-original" },
      { name: "Firebase", deviconPath: "firebase/firebase-plain" },
      {
        name: "Android Studio",
        deviconPath: "androidstudio/androidstudio-original",
      },
      { name: "Git", deviconPath: "git/git-original" },
    ],
    privacyPolicy: {
      lastUpdated: "2025-06-01",
      contactEmail: "debapriyopaul.dp@gmail.com",
      permissions: [
        "INTERNET — Required to load educational content and check for updates.",
        "ACCESS_NETWORK_STATE — Used to verify connectivity before fetching content.",
      ],
      thirdPartyServices: [
        {
          name: "Google Firebase (Analytics & Crashlytics)",
          privacyUrl: "https://firebase.google.com/support/privacy",
        },
        {
          name: "Google Play Services",
          privacyUrl: "https://policies.google.com/privacy",
        },
      ],
      dataCollected: [
        "Anonymized usage statistics (content viewed, features used)",
        "Crash reports and error logs — no personal content is included",
        "Device information such as OS version and device model, used for compatibility",
      ],
      isChildrenApp: false,
    },
  },
  {
    id: "game-1",
    slug: "surround-it",
    name: "Surround It",
    tagline: "Outsmart or surround!",
    description:
      "Classic Tiger vs Hunters strategy board game. A traditional two-player abstract strategy game reimagined for mobile — simple rules, deep tactics.",
    category: "Strategy",
    type: "game",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=kreations.paul.surround_it",
    downloads: "5+",
    rating: 4.0,
    colorFrom: "#912421",
    colorTo: "#b23c36",
    techStack: [
      { name: "Android", deviconPath: "android/android-original" },
      { name: "Flutter", deviconPath: "flutter/flutter-original" },
      { name: "Sentry", deviconPath: "sentry/sentry-original" },
      {
        name: "Android Studio",
        deviconPath: "androidstudio/androidstudio-original",
      },
      { name: "Canva", deviconPath: "canva/canva-original" },
      { name: "Git", deviconPath: "git/git-original" },
      // ── No devicon available — add icon files to public/tech-icons/ then uncomment ──
      // { name: "OneSignal",   localIconPath: "/tech-icons/onesignal.png"   },
      // { name: "RevenueCat",  localIconPath: "/tech-icons/revenuecat.png"  },
      // { name: "Drift",       localIconPath: "/tech-icons/drift.png"       },
      // { name: "Stream Chat", localIconPath: "/tech-icons/stream-chat.png" },
      // { name: "Wiredash",    localIconPath: "/tech-icons/wiredash.png"    },
    ],
    privacyPolicy: {
      lastUpdated: "2025-06-01",
      contactEmail: "debapriyopaul.dp@gmail.com",
      permissions: [],
      thirdPartyServices: [
        {
          name: "Google Play Services",
          privacyUrl: "https://policies.google.com/privacy",
        },
      ],
      dataCollected: [
        "Anonymized gameplay statistics (games played — no personal data)",
        "Crash reports — no personal content is included",
        "Device information such as OS version and device model, used for compatibility",
      ],
      isChildrenApp: false,
    },
  },
];

// ─── SERVICES ─────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: "mobile",
    title: "Android App Development",
    description:
      "End-to-end Android and Flutter application development — from architecture and UI design to Play Store submission, optimisation, and post-launch support.",
    icon: "Smartphone",
    highlights: [
      "Flutter & Kotlin",
      "Play Store Publishing",
      "Performance & UX",
    ],
  },
  {
    id: "web",
    title: "Web Development",
    description:
      "Modern, full-stack web applications built with Next.js and TypeScript — from landing pages to complex platforms, deployed and scaled on Vercel.",
    icon: "Globe",
    highlights: ["Next.js & React", "TypeScript", "Vercel & Cloud Deploy"],
  },
  {
    id: "game",
    title: "Game Development",
    description:
      "Mobile-first game development combining tight mechanics, engaging design, and optimised performance — built for Android and ready for the Play Store.",
    icon: "Gamepad2",
    highlights: [
      "Android Games",
      "Game Design & Mechanics",
      "Play Store Publishing",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that grow visibility, attract the right audience, and convert traffic into measurable results across channels.",
    icon: "TrendingUp",
    highlights: [
      "SEO & ASO Strategy",
      "Growth Analytics",
      "Campaign Management",
    ],
  },
  {
    id: "social",
    title: "Social Media Content",
    description:
      "Scroll-stopping content crafted for each platform — consistent brand voice, sharp visual storytelling, and audience engagement that compounds over time.",
    icon: "Share2",
    highlights: [
      "Content Strategy",
      "Visual & Copy Creation",
      "Platform Management",
    ],
  },
  {
    id: "cv",
    title: "CV Optimisation",
    description:
      "Professional CV and résumé refinement tailored for tech roles — structured to clear ATS filters and make an immediate impression with hiring managers.",
    icon: "ScrollText",
    highlights: [
      "ATS Optimisation",
      "Tech Role Targeting",
      "LinkedIn Alignment",
    ],
  },
];

// ─── TEAM ─────────────────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    id: "member1",
    name: "Debapriyo Paul",
    role: "Founder & Lead Developer",
    bio:
      "Passionate builder of digital products. Combines engineering" +
      " precision with design sensibility to create software people love" +
      " to use.",
    initials: "D",
    avatarColor: "#c41e3a",
    skills: [
      "Flutter",
      "Supabase",
      "Firebase",
      "Android",
      "Next.js",
      "TypeScript",
      "UI/UX Design",
      "Product Strategy",
    ],
    contributions: [
      { project: apps[0].name, role: "Lead Developer & Designer" },
      { project: apps[1].name, role: "Lead Developer" },
      { project: apps[2].name, role: "Developer & Level Designer" },
    ],
    github: "https://github.com/roni4444",
    linkedin: "https://www.linkedin.com/in/debapriyo-paul-198369105/",
  },
  {
    id: "member2",
    name: "Debarati Paul",
    role: "Lead Digital Marketer",
    bio: "A Canva Designer and Content Creator with a strong background in hospitality across the UAE.",
    initials: "D",
    avatarColor: "#c41e3a",
    skills: [
      "Digital Marketing",
      "Canva",
      "Meta Business Suite",
      "Social" + " Media Platforms",
    ],
    contributions: [
      { project: apps[0].name, role: "Lead Digital Marketer" },
      { project: apps[1].name, role: "Lead Digital Marketer" },
      { project: apps[2].name, role: "Digital Marketer & Game assets creator" },
    ],
    linkedin: "https://www.linkedin.com/in/debarati-paul-designer/",
  },
];

// ─── ROADMAP ──────────────────────────────────────────────────────────────────

export const roadmap: RoadmapItem[] = [
  {
    id: "unity",
    title: "Project Ironway",
    description: "Expanding to the AAA games for PC using Unity",
    status: "in-progress",
    icon: "Gamepad2",
    eta: "2027",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Storefront",
    description:
      "A fully integrated storefront to sell digital and physical products, directly embedded in the platform.",
    status: "planned",
    icon: "ShoppingBag",
    eta: "2028",
  },
  {
    id: "saas",
    title: "SaaS Products",
    description:
      "Standalone web-based tools and services available via subscription, tailored for developers and creators.",
    status: "planned",
    icon: "Server",
    eta: "2028",
  },
];
