// components/henstel/follow-us.tsx
// Renders the social links defined in lib/data/henstel.ts (henstelSocialLinks),
// styled for the WIMM green palette. Pure server-rendered markup — no
// client JS needed for a set of static links.

import { SOCIAL_ICONS } from "@/components/shared/social-icons";
import { socialLinks } from "@/lib/data";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

type HenstelFollowUsProps = {
  className?: string;
};

export function HenstelFollowUs({ className = "" }: HenstelFollowUsProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <span className={`${MONO} text-[11px] text-[#8A7A60] uppercase`}>
        Follow Henstel
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
                aria-label={`Henstel on ${link.label}`}
                className="flex items-center justify-center size-9 border border-[#E6DCC6] text-[#5C4A36] hover:border-[#2E6B3F] hover:text-[#2E6B3F] hover:bg-[#E6F0E4] transition-colors"
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
