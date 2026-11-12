import { GooglePlayButton } from "@/components/surround-it/google-play-button";
import { GooglePlayQr } from "@/components/surround-it/google-play-qr";
import { SurroundItFollowUs } from "@/components/surround-it/follow-us";
import {
  SURROUND_IT_PLAY_STORE_URL,
  SURROUND_IT_SUPPORT_EMAIL,
} from "@/lib/data/surround-it";

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function SurroundItDownloadSection() {
  return (
    <section id="download" className="py-24 bg-[#14221E]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[560px] mx-auto mb-10">
          <span
            className={`${MONO} inline-block text-[11px] text-[#D4AF37] uppercase mb-4`}
          >
            Now Live
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#F4EEDA] leading-tight mb-4`}
          >
            Surround It is on Google Play
          </h2>
          <p className="text-[#C9C3AE] leading-relaxed">
            Download it now on Google Play, or scan the code to install straight
            from your phone.
          </p>
        </div>

        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {SURROUND_IT_PLAY_STORE_URL && <GooglePlayButton />}
            <GooglePlayQr />
          </div>

          <SurroundItFollowUs />

          <p className={`${MONO} text-[11px] text-[#8C9A90]`}>
            Need help?{" "}
            <a
              href={`mailto:${SURROUND_IT_SUPPORT_EMAIL}`}
              className="text-[#D4AF37] hover:underline"
            >
              {SURROUND_IT_SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
