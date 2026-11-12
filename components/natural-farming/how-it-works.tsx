import {
  naturalFarmingCopy,
  naturalFarmingHowItWorks,
} from "@/lib/data/natural-farming";

const HEADING = "font-[family-name:var(--font-natural-farming-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function NaturalFarmingHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#FFFFFF]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E7D32] uppercase mb-4`}
          >
            {naturalFarmingCopy.howEyebrow}
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#1B2E1C] leading-tight mb-4`}
          >
            How Natural Farming works
          </h2>
          <p className="text-[#3F5543] leading-relaxed">
            {naturalFarmingCopy.howIntro}
          </p>
        </div>

        {/* This IS a real sequence, so numbered steps encode genuine order. */}
        <ol
          className={`relative grid grid-cols-1 gap-8 md:gap-4 ${naturalFarmingHowItWorks.length === 4 ? "md:grid-cols-4" : "md:grid-cols-5"}`}
        >
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-[#D6E6D6]"
          />

          {naturalFarmingHowItWorks.map((item) => (
            <li
              key={item.step}
              className="relative flex flex-col items-center text-center gap-3"
            >
              <div className="relative z-10 size-10 rounded-full flex items-center justify-center bg-[#2E7D32] text-[#FFFFFF] font-semibold text-sm">
                {item.step}
              </div>
              <h3
                className={`${HEADING} font-semibold text-[#1B2E1C] text-[14px] leading-snug`}
              >
                {item.title}
              </h3>
              <p className="text-[13px] text-[#566B5A] leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
