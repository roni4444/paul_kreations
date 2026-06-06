import { teamMembers } from "@/lib/data";

// Mono label style — JetBrains Mono
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

// Brand icons removed from lucide-react v1+ — using inline SVGs instead
function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Team() {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* ── Section Header ───────────────────── */}
        <div className="max-w-lg mb-16">
          <span
            className={`${MONO} inline-block text-[11px] text-[#c41e3a] uppercase mb-4`}
          >
            The People
          </span>
          <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#111c2d] leading-tight mb-3">
            Team
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-[#5f5e5e] leading-relaxed">
            Every product is shaped by real people with real skills. Meet the
            team behind Paul Kreations — and see exactly who built what.
          </p>
        </div>

        {/* ── Team Grid — flat cards ────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="flex flex-col gap-5 p-6 bg-[#f9f9ff] border border-[#e3bebd] hover:border-[#c41e3a] hover:shadow-[0px_4px_20px_rgba(196,30,58,0.08)] transition-all duration-200"
            >
              {/* ── Header ─────────────────────── */}
              <div className="flex items-start gap-4">
                {/* Avatar — crimson gradient */}
                <div
                  className="size-12 flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${member.avatarColor} 0%, #9e0027 100%)`,
                    // To use a real photo instead, replace this with:
                    // background: 'none'
                    // And render: <Image src="/team/paul.jpg" alt={member.name} width={48} height={48} className="object-cover" />
                  }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#111c2d] tracking-[-0.01em] leading-tight">
                    {member.name}
                  </h3>
                  {/* Role — JetBrains Mono label */}
                  <p className={`${MONO} text-[11px] text-[#c41e3a] mt-0.5`}>
                    {member.role}
                  </p>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-7 flex items-center justify-center text-[#8f6f6f] hover:text-[#111c2d] hover:bg-[#ffdad9] transition-colors"
                      aria-label={`${member.name} on GitHub`}
                    >
                      <GitHubIcon size={14} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-7 flex items-center justify-center text-[#8f6f6f] hover:text-[#111c2d] hover:bg-[#ffdad9] transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* ── Bio — Inter body ─────────────── */}
              <p className="font-[family-name:var(--font-sans)] text-sm text-[#5f5e5e] leading-relaxed">
                {member.bio}
              </p>

              {/* ── Skills — Rose Mist chips per spec */}
              <div>
                <p
                  className={`${MONO} text-[10px] text-[#8f6f6f] uppercase mb-2`}
                >
                  Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`${MONO} px-2 py-0.5 text-[10px] font-medium text-[#c41e3a] bg-[#fff5f5] border border-[#c41e3a]/30`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Contributions — 2px crimson left-border per spec */}
              <div className="pt-4 border-t border-[#e3bebd]">
                <p
                  className={`${MONO} text-[10px] text-[#8f6f6f] uppercase mb-3`}
                >
                  Contributions
                </p>
                <ul className="flex flex-col gap-0">
                  {member.contributions.map((c, i) => (
                    <li
                      key={c.project}
                      className={`flex items-center gap-2.5 py-2 ${
                        i < member.contributions.length - 1
                          ? "border-b border-[#e3bebd]"
                          : ""
                      }`}
                    >
                      {/* 2px crimson highlight per spec */}
                      <div
                        className="w-[2px] h-4 bg-[#c41e3a] flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs text-[#111c2d] font-medium flex-shrink-0">
                        {c.project}
                      </span>
                      <span
                        className={`${MONO} text-[10px] text-[#8f6f6f] truncate`}
                      >
                        {c.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          {/* ── "Growing the Team" placeholder ─── */}
          <div className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-[#e3bebd] text-center min-h-[260px] hover:border-[#c41e3a]/40 transition-colors cursor-default">
            <div className="size-10 border-2 border-dashed border-[#e3bebd] flex items-center justify-center text-[#e3bebd]">
              <span className="text-xl font-bold leading-none">+</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111c2d] mb-1">
                Growing the Team
              </p>
              <p className={`${MONO} text-[10px] text-[#8f6f6f] max-w-[160px]`}>
                New contributors appear here as the company expands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
