import { henstelCopy, henstelHowItWorks } from "@/lib/data/henstel";

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function HenstelHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#FFFFFF]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E6B3F] uppercase mb-4`}
          >
            {henstelCopy.howEyebrow}
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#3B2A18] leading-tight mb-4`}
          >
            How Henstel works
          </h2>
          <p className="text-[#5C4A36] leading-relaxed">
            {henstelCopy.howIntro}
          </p>
        </div>

        {/* This IS a real sequence, so numbered steps encode genuine order. */}
        <ol
          className={`relative grid grid-cols-1 gap-8 md:gap-4 ${henstelHowItWorks.length === 4 ? "md:grid-cols-4" : "md:grid-cols-5"}`}
        >
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-[#E6DCC6]"
          />

          {henstelHowItWorks.map((item) => (
            <li
              key={item.step}
              className="relative flex flex-col items-center text-center gap-3"
            >
              <div className="relative z-10 size-10 rounded-full flex items-center justify-center bg-[#2E6B3F] text-[#FFFFFF] font-semibold text-sm">
                {item.step}
              </div>
              <h3
                className={`${HEADING} font-semibold text-[#3B2A18] text-[14px] leading-snug`}
              >
                {item.title}
              </h3>
              <p className="text-[13px] text-[#7A6850] leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
