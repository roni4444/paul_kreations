import { GooglePlayButton } from "@/components/natural-farming/google-play-button";
import { GooglePlayQr } from "@/components/natural-farming/google-play-qr";
import { NaturalFarmingFollowUs } from "@/components/natural-farming/follow-us";
import {
  NATURAL_FARMING_PLAY_STORE_URL,
  NATURAL_FARMING_SUPPORT_EMAIL,
} from "@/lib/data/natural-farming";

const HEADING = "font-[family-name:var(--font-natural-farming-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function NaturalFarmingDownloadSection() {
  return (
    <section id="download" className="py-24 bg-[#FFFFFF]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[560px] mx-auto mb-10">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E7D32] uppercase mb-4`}
          >
            Now Live
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#1B2E1C] leading-tight mb-4`}
          >
            Natural Farming is on Google Play
          </h2>
          <p className="text-[#3F5543] leading-relaxed">
            Download it now on Google Play, or scan the code to install straight
            from your phone.
          </p>
        </div>

        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {NATURAL_FARMING_PLAY_STORE_URL && <GooglePlayButton />}
            <GooglePlayQr />
          </div>

          <NaturalFarmingFollowUs />

          <p className={`${MONO} text-[11px] text-[#6B8470]`}>
            Need help?{" "}
            <a
              href={`mailto:${NATURAL_FARMING_SUPPORT_EMAIL}`}
              className="text-[#2E7D32] hover:underline"
            >
              {NATURAL_FARMING_SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
