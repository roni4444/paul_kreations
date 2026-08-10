import { WimmWaitlistForm } from "@/components/wimm/waitlist-form";
import { WIMM_LAUNCH_DATE } from "@/lib/data/wimm";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

function formatLaunchDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function WimmWaitlistSection() {
  return (
    <section id="waitlist" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[560px] mx-auto mb-10">
          {/* Gold is reserved for this one "exclusive / premium" moment on
              the page — the early-access invite — rather than spread across
              every section. */}
          <span
            className={`${MONO} inline-block text-[11px] text-[#B27B1F] uppercase mb-4`}
          >
            Early Access
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#0E2A20] leading-tight mb-4`}
          >
            Be first to know when Where Is My Money? launches
          </h2>
          <p className="text-[#4A5A52] leading-relaxed">
            We&apos;re targeting {formatLaunchDate(WIMM_LAUNCH_DATE)}. Join the
            waitlist and we&apos;ll email you the moment early access opens.
          </p>
        </div>

        <WimmWaitlistForm />
      </div>
    </section>
  );
}
