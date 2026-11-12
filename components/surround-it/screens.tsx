// components/surround-it/screens.tsx
// Server Component. Shows the app's screenshots as phone frames. Each frame uses
// the real image if public/apps/surround-it/screenshots/<n>.png exists (1.png, 3.png,
// ...), and otherwise a code-drawn preview built from the app's real labels
// (see surroundItScreens in lib/data/surround-it.ts). Drop real PNGs in later and
// they replace the drawn previews automatically — no code change.

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import {
  type SurroundItScreen,
  surroundItScreens,
} from "@/lib/data/surround-it";

const HEADING = "font-[family-name:var(--font-surround-it-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

function hasScreenshot(index: number): boolean {
  try {
    return fs.existsSync(
      path.join(
        process.cwd(),
        "public",
        "apps",
        "surround-it",
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
        <g key={n} stroke="#263A32" strokeWidth="1.5">
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
            n.i === 2 ? "#B23C36" : hunters.has(n.i) ? "#D4AF37" : "#263A32"
          }
        />
      ))}
    </svg>
  );
}

function ScreenPreview({ screen }: { screen: SurroundItScreen }) {
  return (
    <div className="flex h-full flex-col bg-[#081612]">
      <div className="flex items-center gap-2 bg-[#D4AF37] px-3 pt-5 pb-3 text-[#081612]">
        <span className="size-2 rounded-full bg-[#081612] opacity-70" />
        <span className={`${HEADING} text-[12px] font-semibold`}>
          {screen.title}
        </span>
      </div>
      {screen.kind === "board" ? (
        <div className="flex flex-1 flex-col justify-center gap-4 px-4">
          <BoardPreview />
          <div className="flex justify-between text-[10px] text-[#C9C3AE]">
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
              className="flex items-center gap-2 border border-[#263A32] bg-[#14221E] px-2.5 py-2"
            >
              <span
                className="size-5 flex-shrink-0 rounded"
                style={{ background: i % 2 === 0 ? "#1B2E27" : "#1B2E27" }}
              />
              <span className="text-[11px] leading-tight text-[#F4EEDA]">
                {row}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-around border-t border-[#263A32] bg-[#14221E] py-2.5">
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className={`size-2 rounded-full ${n === 0 ? "bg-[#D4AF37]" : "bg-[#263A32]"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function SurroundItScreens() {
  return (
    <section id="screens" className="py-24 bg-[#14221E]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#D4AF37] uppercase mb-4`}
          >
            Inside the app
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#F4EEDA] leading-tight`}
          >
            A look at Surround It
          </h2>
        </div>

        <ul
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:justify-center"
          aria-label="Surround It screens"
        >
          {surroundItScreens.map((screen, index) => (
            <li
              key={screen.caption}
              className="flex w-[200px] flex-shrink-0 snap-center flex-col items-center gap-3"
            >
              <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[28px] border-[6px] border-[#F4EEDA] bg-[#081612] shadow-[0px_8px_28px_rgba(0,0,0,0.35)]">
                {hasScreenshot(index) ? (
                  <Image
                    src={`/apps/surround-it/screenshots/${index + 1}.png`}
                    alt={`Surround It — ${screen.caption}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                ) : (
                  <ScreenPreview screen={screen} />
                )}
              </div>
              <span className="text-center text-sm text-[#C9C3AE]">
                {screen.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
