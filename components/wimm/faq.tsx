"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { wimmFaqs } from "@/lib/data/wimm";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export function WimmFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#F6FAF8]">
      <div className="max-w-[760px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#0F7A4E] uppercase mb-4`}
          >
            Questions
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#0E2A20] leading-tight`}
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="flex flex-col border-t border-[#D8E8E0]">
          {wimmFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-[#D8E8E0]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`${HEADING} font-semibold text-[#0E2A20] text-[15px]`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#0F7A4E] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-[#5B6E64] leading-relaxed">
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
