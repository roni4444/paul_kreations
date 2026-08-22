// components/wimm/follow-us.tsx
// Renders the social links defined in lib/data/wimm.ts (wimmSocialLinks),
// styled for the WIMM green palette. Pure server-rendered markup — no
// client JS needed for a set of static links.

import { SOCIAL_ICONS } from "@/components/shared/social-icons";
import { socialLinks } from "@/lib/data";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

type WimmFollowUsProps = {
  className?: string;
};

export function WimmFollowUs({ className = "" }: WimmFollowUsProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <span className={`${MONO} text-[11px] text-[#7C9187] uppercase`}>
        Follow Where Is My Money?
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
                aria-label={`Where Is My Money? on ${link.label}`}
                className="flex items-center justify-center size-9 border border-[#D8E8E0] text-[#4A5A52] hover:border-[#0F7A4E] hover:text-[#0F7A4E] hover:bg-[#E3F3EA] transition-colors"
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
