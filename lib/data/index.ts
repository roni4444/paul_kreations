// ─────────────────────────────────────────────
// Paul Kreations — Site Data
// Edit this file to update all site content.
// ─────────────────────────────────────────────

export type AppItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  type: "app" | "game";
  playStoreUrl: string;
  downloads: string;
  rating: number;
  colorFrom: string;
  colorTo: string;
  emoji: string;
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
  contributions: {
    project: string;
    role: string;
  }[];
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

// ─── APPS ──────────────────────────────────────
// Replace placeholder values with your real app data.
// playStoreUrl format: https://play.google.com/store/apps/details?id=YOUR.PACKAGE.NAME

export const apps: AppItem[] = [
  {
    id: "app-1",
    name: "Henstel",
    tagline: "Your kitchen operating system.",
    description: "Your modern kitchen companion for cooking mastery.",
    category: "Productivity",
    type: "app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=kreations.paul.henstel",
    downloads: "5",
    rating: 4.0,
    colorFrom: "#3c52c0",
    colorTo: "#576cdb",
    emoji: "📊",
  },
  {
    id: "app-2",
    name: "Natural Farming",
    tagline: "A new way of farming",
    description:
      "This app is intended to educate common people about the natural farming.",
    category: "Utilities",
    type: "app",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=agri.startup.natural_farming",
    downloads: "500+",
    rating: 4.2,
    colorFrom: "#5a5a86",
    colorTo: "#cecdff",
    emoji: "⚡",
  },
  {
    id: "game-1",
    name: "Surround It",
    tagline: "Outsmart or surround!",
    description: "Classic Tiger vs Hunters strategy board game.",
    category: "Casual",
    type: "game",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=kreations.paul.surround_it",
    downloads: "5",
    rating: 4.0,
    colorFrom: "#8b4d00",
    colorTo: "#af6200",
    emoji: "🎮",
  },
];

// ─── SERVICES ──────────────────────────────────

export const services: Service[] = [
  {
    id: "mobile",
    title: "Android Development",
    description:
      "Native Android applications engineered for performance, reliability, and excellent user experience — built for the Play Store.",
    icon: "Smartphone",
    highlights: [
      "Native Android",
      "Play Store Publishing",
      "Performance Optimization",
    ],
  },
  {
    id: "web",
    title: "Web Development",
    description:
      "Modern, full-stack web applications using the latest technologies. From marketing sites to complex web platforms.",
    icon: "Globe",
    highlights: ["Next.js & React", "TypeScript", "Vercel & Cloud Deploy"],
  },
  {
    id: "design",
    title: "UI/UX Design",
    description:
      "User-centric interfaces that balance visual refinement with intuitive flows, backed by thoughtful design systems.",
    icon: "Layers",
    highlights: ["User Research", "Figma Prototyping", "Design Systems"],
  },
  {
    id: "consulting",
    title: "Tech Consulting",
    description:
      "Strategic guidance on technology choices, architecture decisions, and helping teams ship better software faster.",
    icon: "Lightbulb",
    highlights: ["Architecture Review", "Tech Stack Guidance", "Code Audits"],
  },
];

// ─── TEAM ──────────────────────────────────────
// Add more team members as the company grows.

export const teamMembers: TeamMember[] = [
  {
    id: "paul1",
    name: "Debapriyo Paul",
    role: "Founder & Lead Developer",
    bio: "Passionate builder of digital products. Combines engineering precision with design sensibility to create software people love to use.",
    initials: "D",
    avatarColor: "#3c52c0",
    skills: [
      "Flutter",
      "Android",
      "Next.js",
      "TypeScript",
      "UI/UX Design",
      "Product Strategy",
    ],
    contributions: [
      { project: apps[0].name, role: "Lead Developer & Designer" },
      { project: apps[1].name, role: "Lead Developer" },
      { project: apps[2].name, role: "Developer & Game Designer" },
    ],
    github: "https://github.com/roni4444", // Replace with actual GitHub URL
    linkedin: "https://www.linkedin.com/in/debapriyo-paul-198369105/", // Replace with actual LinkedIn URL
  },
];

// ─── ROADMAP ───────────────────────────────────

export const roadmap: RoadmapItem[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Storefront",
    description:
      "A fully integrated storefront to sell digital and physical products, directly embedded in the platform.",
    status: "planned",
    icon: "ShoppingBag",
    eta: "2025",
  },
  {
    id: "ios",
    title: "iOS App Portfolio",
    description:
      "Expanding to the Apple ecosystem with native iOS versions of existing and upcoming applications.",
    status: "planned",
    icon: "Smartphone",
    eta: "2025",
  },
  {
    id: "saas",
    title: "SaaS Products",
    description:
      "Standalone web-based tools and services available via subscription, tailored for developers and creators.",
    status: "planned",
    icon: "Server",
    eta: "2026",
  },
];
