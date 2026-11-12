// components/natural-farming/follow-us.tsx
// Renders the social links defined in lib/data/natural-farming.ts (naturalFarmingSocialLinks),
// styled for the WIMM green palette. Pure server-rendered markup — no
// client JS needed for a set of static links.

import { SOCIAL_ICONS } from "@/components/shared/social-icons";
import { socialLinks } from "@/lib/data";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

type NaturalFarmingFollowUsProps = {
  className?: string;
};

export function NaturalFarmingFollowUs({
  className = "",
}: NaturalFarmingFollowUsProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <span className={`${MONO} text-[11px] text-[#6B8470] uppercase`}>
        Follow Natural Farming
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
                aria-label={`Natural Farming on ${link.label}`}
                className="flex items-center justify-center size-9 border border-[#D6E6D6] text-[#3F5543] hover:border-[#2E7D32] hover:text-[#2E7D32] hover:bg-[#E4F1E4] transition-colors"
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
