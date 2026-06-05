import { teamMembers } from "@/lib/data";
import { ChevronRight } from "lucide-react";

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
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Section Header ──────────────────── */}
        <div className="max-w-lg mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-[#3c52c0] mb-4">
            The People
          </span>
          <h2 className="text-[2rem] font-bold tracking-[-0.025em] text-[#1a1c1d] leading-tight mb-3">
            Team
          </h2>
          <p className="text-[#444653] leading-relaxed">
            Every product is shaped by real people with real skills. Meet the
            team behind Paul Kreations — and see who built what.
          </p>
        </div>

        {/* ── Team Grid ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="flex flex-col gap-5 p-6 bg-[#f9f9fb] rounded-xl border border-[#e2e2e4] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-px"
            >
              {/* ── Header ──────────────────────── */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="size-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${member.avatarColor} 0%, ${member.avatarColor}cc 100%)`,
                    // Replace with Image if a real photo is available:
                    // background: 'none'
                  }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1a1c1d] tracking-[-0.01em] leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-[#576cdb] mt-0.5">
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
                      className="size-7 flex items-center justify-center rounded-md text-[#757684] hover:text-[#1a1c1d] hover:bg-[#edeef0] transition-colors"
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
                      className="size-7 flex items-center justify-center rounded-md text-[#757684] hover:text-[#1a1c1d] hover:bg-[#edeef0] transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* ── Bio ─────────────────────────── */}
              <p className="text-sm text-[#444653] leading-relaxed">
                {member.bio}
              </p>

              {/* ── Skills ──────────────────────── */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[#757684] mb-2">
                  Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium text-[#444653] bg-white border border-[#e2e2e4]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Contributions ───────────────── */}
              <div className="pt-4 border-t border-[#e2e2e4]">
                <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[#757684] mb-3">
                  Contributions
                </p>
                <ul className="flex flex-col gap-2">
                  {member.contributions.map((c) => (
                    <li key={c.project} className="flex items-center gap-2.5">
                      <ChevronRight
                        size={12}
                        className="text-[#3c52c0] flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs text-[#1a1c1d] font-medium flex-shrink-0">
                        {c.project}
                      </span>
                      <span className="text-[10px] text-[#757684] truncate">
                        — {c.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          {/* ── "Join the Team" placeholder card ─ */}
          <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-[#e2e2e4] text-center min-h-[260px] bg-transparent hover:border-[#c5c5d5] hover:bg-[#f9f9fb] transition-colors cursor-default">
            <div className="size-10 rounded-xl border-2 border-dashed border-[#c5c5d5] flex items-center justify-center text-[#c5c5d5]">
              <span className="text-xl font-bold leading-none">+</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a1c1d] mb-1">
                Growing the Team
              </p>
              <p className="text-xs text-[#757684] max-w-[160px]">
                New contributors will appear here as the company expands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
