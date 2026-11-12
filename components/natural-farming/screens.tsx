// components/natural-farming/screens.tsx
// Server Component. Shows the app's screenshots as phone frames. Each frame uses
// the real image if public/apps/natural-farming/screenshots/<n>.png exists (1.png, 3.png,
// ...), and otherwise a code-drawn preview built from the app's real labels
// (see naturalFarmingScreens in lib/data/natural-farming.ts). Drop real PNGs in later and
// they replace the drawn previews automatically — no code change.

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import {
  type NaturalFarmingScreen,
  naturalFarmingScreens,
} from "@/lib/data/natural-farming";

const HEADING = "font-[family-name:var(--font-natural-farming-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

function hasScreenshot(index: number): boolean {
  try {
    return fs.existsSync(
      path.join(
        process.cwd(),
        "public",
        "apps",
        "natural-farming",
        "screenshots",
        `${index + 1}.png`,
      ),
    );
  } catch {
    return false;
  }
}

function BoardPreview() {
  // 5x5 board with a tiger (accent) and hunters (primary) — drawn, not a photo.
  const nodes = Array.from({ length: 25 }, (_, i) => ({
    x: 20 + (i % 5) * 40,
    y: 20 + Math.floor(i / 5) * 40,
    i,
  }));
  const hunters = new Set([10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 23]);
  return (
    <svg viewBox="0 0 200 200" className="w-full" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((n) => (
        <g key={n} stroke="#D6E6D6" strokeWidth="1.5">
          <line x1="20" y1={20 + n * 40} x2="180" y2={20 + n * 40} />
          <line x1={20 + n * 40} y1="20" x2={20 + n * 40} y2="180" />
        </g>
      ))}
      {nodes.map((n) => (
        <circle
          key={n.i}
          cx={n.x}
          cy={n.y}
          r={n.i === 2 ? 9 : hunters.has(n.i) ? 6 : 3}
          fill={
            n.i === 2 ? "#FFC107" : hunters.has(n.i) ? "#2E7D32" : "#D6E6D6"
          }
        />
      ))}
    </svg>
  );
}

function ScreenPreview({ screen }: { screen: NaturalFarmingScreen }) {
  return (
    <div className="flex h-full flex-col bg-[#F9FBF9]">
      <div className="flex items-center gap-2 bg-[#2E7D32] px-3 pt-5 pb-3 text-[#FFFFFF]">
        <span className="size-2 rounded-full bg-[#FFFFFF] opacity-70" />
        <span className={`${HEADING} text-[12px] font-semibold`}>
          {screen.title}
        </span>
      </div>
      {screen.kind === "board" ? (
        <div className="flex flex-1 flex-col justify-center gap-4 px-4">
          <BoardPreview />
          <div className="flex justify-between text-[10px] text-[#3F5543]">
            {screen.rows.map((row) => (
              <span key={row}>{row}</span>
            ))}
          </div>
        </div>
      ) : (
        <ul className="flex flex-1 flex-col gap-2 p-3">
          {screen.rows.map((row, i) => (
            <li
              key={row}
              className="flex items-center gap-2 border border-[#D6E6D6] bg-[#FFFFFF] px-2.5 py-2"
            >
              <span
                className="size-5 flex-shrink-0 rounded"
                style={{ background: i % 2 === 0 ? "#E4F1E4" : "#EDF5ED" }}
              />
              <span className="text-[11px] leading-tight text-[#1B2E1C]">
                {row}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-around border-t border-[#D6E6D6] bg-[#FFFFFF] py-2.5">
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className={`size-2 rounded-full ${n === 0 ? "bg-[#2E7D32]" : "bg-[#D6E6D6]"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function NaturalFarmingScreens() {
  return (
    <section id="screens" className="py-24 bg-[#FFFFFF]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#2E7D32] uppercase mb-4`}
          >
            Inside the app
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#1B2E1C] leading-tight`}
          >
            A look at Natural Farming
          </h2>
        </div>

        <ul
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:justify-center"
          aria-label="Natural Farming screens"
        >
          {naturalFarmingScreens.map((screen, index) => (
            <li
              key={screen.caption}
              className="flex w-[200px] flex-shrink-0 snap-center flex-col items-center gap-3"
            >
              <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[28px] border-[6px] border-[#1B2E1C] bg-[#F9FBF9] shadow-[0px_8px_28px_rgba(46,125,50,0.10)]">
                {hasScreenshot(index) ? (
                  <Image
                    src={`/apps/natural-farming/screenshots/${index + 1}.png`}
                    alt={`Natural Farming — ${screen.caption}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                ) : (
                  <ScreenPreview screen={screen} />
                )}
              </div>
              <span className="text-center text-sm text-[#3F5543]">
                {screen.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
