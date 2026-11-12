import { surroundItCopy, surroundItHowItWorks } from "@/lib/data/surround-it";

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function SurroundItHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#14221E]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <span
            className={`${MONO} inline-block text-[11px] text-[#D4AF37] uppercase mb-4`}
          >
            {surroundItCopy.howEyebrow}
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#F4EEDA] leading-tight mb-4`}
          >
            How Surround It works
          </h2>
          <p className="text-[#C9C3AE] leading-relaxed">
            {surroundItCopy.howIntro}
          </p>
        </div>

        {/* This IS a real sequence, so numbered steps encode genuine order. */}
        <ol
          className={`relative grid grid-cols-1 gap-8 md:gap-4 ${surroundItHowItWorks.length === 4 ? "md:grid-cols-4" : "md:grid-cols-5"}`}
        >
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-[#263A32]"
          />

          {surroundItHowItWorks.map((item) => (
            <li
              key={item.step}
              className="relative flex flex-col items-center text-center gap-3"
            >
              <div className="relative z-10 size-10 rounded-full flex items-center justify-center bg-[#D4AF37] text-[#081612] font-semibold text-sm">
                {item.step}
              </div>
              <h3
                className={`${HEADING} font-semibold text-[#F4EEDA] text-[14px] leading-snug`}
              >
                {item.title}
              </h3>
              <p className="text-[13px] text-[#A9B3A8] leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
