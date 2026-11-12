"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { henstelFaqs } from "@/lib/data/henstel";

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function HenstelFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#FBF6EC]">
      <div className="max-w-[760px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E6B3F] uppercase mb-4`}
          >
            Questions
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#3B2A18] leading-tight`}
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="flex flex-col border-t border-[#E6DCC6]">
          {henstelFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-[#E6DCC6]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`${HEADING} font-semibold text-[#3B2A18] text-[15px]`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#2E6B3F] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-[#7A6850] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
