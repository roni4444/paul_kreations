// components/surround-it/follow-us.tsx
// Renders the social links defined in lib/data/surround-it.ts (surroundItSocialLinks),
// styled for the WIMM green palette. Pure server-rendered markup — no
// client JS needed for a set of static links.

import { SOCIAL_ICONS } from "@/components/shared/social-icons";
import { socialLinks } from "@/lib/data";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

type SurroundItFollowUsProps = {
  className?: string;
};

export function SurroundItFollowUs({
  className = "",
}: SurroundItFollowUsProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <span className={`${MONO} text-[11px] text-[#8C9A90] uppercase`}>
        Follow Surround It
      </span>
      <ul className="flex items-center gap-2.5" aria-label="Social media links">
        {socialLinks.map((link) => {
          const Icon = SOCIAL_ICONS[link.id];
          return (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Surround It on ${link.label}`}
                className="flex items-center justify-center size-9 border border-[#263A32] text-[#C9C3AE] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#1B2E27] transition-colors"
              >
                <Icon size={16} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
