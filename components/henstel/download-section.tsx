import { GooglePlayButton } from "@/components/henstel/google-play-button";
import { GooglePlayQr } from "@/components/henstel/google-play-qr";
import { HenstelFollowUs } from "@/components/henstel/follow-us";
import {
  HENSTEL_PLAY_STORE_URL,
  HENSTEL_SUPPORT_EMAIL,
} from "@/lib/data/henstel";

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function HenstelDownloadSection() {
  return (
    <section id="download" className="py-24 bg-[#FFFFFF]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[560px] mx-auto mb-10">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E6B3F] uppercase mb-4`}
          >
            Now Live
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#3B2A18] leading-tight mb-4`}
          >
            Henstel is on Google Play
          </h2>
          <p className="text-[#5C4A36] leading-relaxed">
            Download it now on Google Play, or scan the code to install straight
            from your phone.
          </p>
        </div>

        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {HENSTEL_PLAY_STORE_URL && <GooglePlayButton />}
            <GooglePlayQr />
          </div>

          <HenstelFollowUs />

          <p className={`${MONO} text-[11px] text-[#8A7A60]`}>
            Need help?{" "}
            <a
              href={`mailto:${HENSTEL_SUPPORT_EMAIL}`}
              className="text-[#2E6B3F] hover:underline"
            >
              {HENSTEL_SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
