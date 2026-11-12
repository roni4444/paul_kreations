// components/henstel/screens.tsx
// Server Component. Shows Henstel's real screenshots as phone frames.
// Looks for public/apps/henstel/screenshots/1.png, 2.png, ... (in the order of
// henstelScreens in lib/data/henstel.ts). Screens whose image is missing are
// skipped, and when none exist the whole section (and its nav link) is hidden.
// Drop PNGs into that folder and the section appears — no code change.

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { henstelScreens } from "@/lib/data/henstel";

const HEADING = "font-[family-name:var(--font-henstel-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

function hasScreenshot(index: number): boolean {
  try {
    return fs.existsSync(
      path.join(
        process.cwd(),
        "public",
        "apps",
        "henstel",
        "screenshots",
        `${index + 1}.png`,
      ),
    );
  } catch {
    return false;
  }
}

function availableScreens() {
  return henstelScreens
    .map((screen, index) => ({ screen, index }))
    .filter(({ index }) => hasScreenshot(index));
}

/** True when at least one real Henstel screenshot exists. */
export function henstelHasScreenshots(): boolean {
  return availableScreens().length > 0;
}

export function HenstelScreens() {
  const screens = availableScreens();
  if (screens.length === 0) return null;

  return (
    <section id="screens" className="py-24 bg-[#FFFFFF]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E6B3F] uppercase mb-4`}
          >
            Inside the app
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#3B2A18] leading-tight`}
          >
            A look at Henstel
          </h2>
        </div>

        <ul
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:justify-center"
          aria-label="Henstel screens"
        >
          {screens.map(({ screen, index }) => (
            <li
              key={screen.caption}
              className="flex w-[200px] flex-shrink-0 snap-center flex-col items-center gap-3"
            >
              <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[28px] border-[6px] border-[#3B2A18] bg-[#FBF6EC] shadow-[0px_8px_28px_rgba(46,107,63,0.10)]">
                <Image
                  src={`/apps/henstel/screenshots/${index + 1}.png`}
                  alt={`Henstel — ${screen.caption}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <span className="text-center text-sm text-[#5C4A36]">
                {screen.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
