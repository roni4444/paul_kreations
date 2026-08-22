import { WimmWaitlistForm } from "@/components/wimm/waitlist-form";
import { GooglePlayButton } from "@/components/wimm/google-play-button";
import { GooglePlayQr } from "@/components/wimm/google-play-qr";
import { WimmFollowUs } from "@/components/wimm/follow-us";
import {
  WIMM_IS_LIVE,
  WIMM_LAUNCH_DATE,
  WIMM_PLAY_STORE_URL,
  WIMM_SUPPORT_EMAIL,
} from "@/lib/data/wimm";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

function formatLaunchDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Live: download / launch content ───────────────────────────────────────
function LaunchContent() {
  return (
    <>
      <div className="text-center max-w-[560px] mx-auto mb-10">
        <span
          className={`${MONO} inline-block text-[11px] text-[#0F7A4E] uppercase mb-4`}
        >
          Now Live
        </span>
        <h2
          className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#0E2A20] leading-tight mb-4`}
        >
          Where Is My Money? is here
        </h2>
        <p className="text-[#4A5A52] leading-relaxed">
          Download it now on Google Play, or scan the code to install straight
          from your phone.
        </p>
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {WIMM_PLAY_STORE_URL && <GooglePlayButton />}
          <GooglePlayQr />
        </div>

        <WimmFollowUs />

        <p className={`${MONO} text-[11px] text-[#7C9187]`}>
          Need help?{" "}
          <a
            href={`mailto:${WIMM_SUPPORT_EMAIL}`}
            className="text-[#0F7A4E] hover:underline"
          >
            {WIMM_SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </>
  );
}

// ─── Pre-launch: waitlist content ──────────────────────────────────────────
function WaitlistContent() {
  return (
    <>
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
    </>
  );
}

export function WimmWaitlistSection() {
  return (
    <section id="waitlist" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {WIMM_IS_LIVE ? <LaunchContent /> : <WaitlistContent />}
      </div>
    </section>
  );
}
