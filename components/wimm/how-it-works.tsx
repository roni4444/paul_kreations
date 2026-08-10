import { wimmHowItWorks } from "@/lib/data/wimm";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function WimmHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <span
            className={`${MONO} inline-block text-[11px] text-[#0F7A4E] uppercase mb-4`}
          >
            Getting Started
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#0E2A20] leading-tight mb-4`}
          >
            How Where Is My Money? works
          </h2>
          <p className="text-[#4A5A52] leading-relaxed">
            Five steps from install to a full picture of your money — this is a
            real, ordered flow, not a feature list.
          </p>
        </div>

        {/* This IS a real sequence, so numbered steps encode genuine order. */}
        <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-[#D8E8E0]"
          />

          {wimmHowItWorks.map((item) => (
            <li
              key={item.step}
              className="relative flex flex-col items-center text-center gap-3"
            >
              <div className="relative z-10 size-10 rounded-full flex items-center justify-center bg-[#0F7A4E] text-white font-semibold text-sm">
                {item.step}
              </div>
              <h3
                className={`${HEADING} font-semibold text-[#0E2A20] text-[14px] leading-snug`}
              >
                {item.title}
              </h3>
              <p className="text-[13px] text-[#5B6E64] leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
