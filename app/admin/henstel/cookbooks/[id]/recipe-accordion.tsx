"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { RecipeDetail } from "@/services/supabase/cookbooks";

interface RecipeAccordionProps {
  recipes: RecipeDetail[];
  /** One panel per recipe, in the same order. Rendered server-side (so
   * form actions / delete / mark reviewed can be server components) and
   * passed in as children so the accordion stays purely a UI control. */
  panels: ReactNode[];
}

export function RecipeAccordion({ recipes, panels }: RecipeAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {recipes.map((recipe, index) => {
        const isOpen = openIndex === index;
        const headerId = `recipe-header-${recipe.id}`;
        const panelId = `recipe-panel-${recipe.id}`;

        return (
          <div
            key={recipe.id}
            className="rounded-[4px] border border-[#e3bebd] bg-white"
          >
            <button
              type="button"
              id={headerId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#fff5f5]"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs tracking-wide text-[#8f6f6f] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate font-medium text-[#111c2d]">
                  {recipe.title}
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded-[4px] px-2 py-1 font-mono text-xs tracking-wide uppercase ${
                    recipe.status === "reviewed"
                      ? "bg-[#eaf3de] text-[#3b6d11]"
                      : "bg-[#fff5f5] text-[#9e0027]"
                  }`}
                >
                  {recipe.status}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[#8f6f6f] transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            {isOpen && (
              <div
                role="region"
                id={panelId}
                aria-labelledby={headerId}
                className="border-t border-[#e3bebd] px-4 py-4"
              >
                {panels[index]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
