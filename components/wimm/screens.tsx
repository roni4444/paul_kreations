// components/wimm/screens.tsx
// Server Component. "Inside the app" screenshot strip for /wimm. The files in
// public/apps/wimm/screenshots are already designed store graphics (headline +
// phone), so they are shown as rounded cards rather than inside a drawn phone
// frame. Screens whose file is missing are skipped; with none, the section is
// hidden.

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const SCREENS = [
  { file: "01.png", caption: "Know what you can afford" },
  { file: "02.png", caption: "Your whole financial life, connected" },
  { file: "03.png", caption: "Budgets at a glance" },
  { file: "04.png", caption: "Real vehicle running costs" },
  { file: "05.png", caption: "See where your money goes" },
] as const;

function exists(file: string): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", "apps", "wimm", "screenshots", file),
    );
  } catch {
    return false;
  }
}

export function WimmScreens() {
  const screens = SCREENS.filter((s) => exists(s.file));
  if (screens.length === 0) return null;

  return (
    <section id="screens" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <span
            className={`${MONO} inline-block text-[11px] text-[#0F7A4E] uppercase mb-4`}
          >
            Inside the app
          </span>
          <h2
            className={`${HEADING} text-[2rem] font-bold tracking-[-0.02em] text-[#0E2A20] leading-tight`}
          >
            A look at Where Is My Money?
          </h2>
        </div>

        <ul
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:justify-center"
          aria-label="Where Is My Money? screens"
        >
          {screens.map((screen) => (
            <li
              key={screen.file}
              className="flex w-[220px] flex-shrink-0 snap-center flex-col items-center gap-3"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] border border-[#D8E8E0] bg-[#F6FAF8] shadow-[0px_8px_28px_rgba(15,122,78,0.10)]">
                <Image
                  src={`/apps/wimm/screenshots/${screen.file}`}
                  alt={`Where Is My Money? — ${screen.caption}`}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <span className="text-center text-sm text-[#4A5A52]">
                {screen.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
