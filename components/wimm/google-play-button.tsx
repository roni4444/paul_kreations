// components/wimm/google-play-button.tsx
// A code-drawn "Get it on Google Play" badge — avoids needing to source and
// self-host Google's official badge artwork as a static asset. Uses the same
// Play triangle glyph already hand-rolled inline in components/apps/apps.tsx
// and components/layout/footer.tsx, kept visually close to the familiar
// badge (black pill, two-line label) without claiming to be the official mark.

import { WIMM_PLAY_STORE_URL } from "@/lib/data/wimm";

type GooglePlayButtonProps = {
  className?: string;
};

export function GooglePlayButton({ className = "" }: GooglePlayButtonProps) {
  return (
    <a
      href={WIMM_PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Where Is My Money? on Google Play"
      className={`inline-flex items-center gap-3 h-14 px-5 bg-[#0E2A20] hover:bg-[#0A2018] text-white transition-colors ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6 fill-current flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M3.18 23.76c.34.19.72.24 1.09.14l.1-.05 11.2-6.47-2.44-2.44-9.95 8.82zm-.9-20.4A1.84 1.84 0 0 0 2 4.65v14.7c0 .52.17.96.28 1.29l.12-.07 9.8-8.67-9.92-8.54zm20.04 8.27-2.8-1.6-2.75 2.44 2.75 2.75 2.81-1.63a1.85 1.85 0 0 0 0-3.27l-.01.31zM4.27.1C3.9 0 3.52.04 3.18.23l9.92 8.8 2.44-2.44L4.35.14 4.27.1z" />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] tracking-[0.03em]">GET IT ON</span>
        <span className="text-lg font-semibold tracking-[-0.01em] -mt-0.5">
          Google Play
        </span>
      </span>
    </a>
  );
}
