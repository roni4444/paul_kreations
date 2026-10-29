// components/blog/play-store-button.tsx
// "Get WIMM on Google Play" call to action, shown under the "Do this in
// WIMM" boxes in posts. Server-safe — a plain link.

import { WIMM_PLAY_STORE_URL } from "@/lib/data/links";

export function PlayStoreButton() {
  return (
    <a
      href={WIMM_PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex h-9 items-center gap-2 rounded-[4px] bg-[#c41e3a] px-4 text-sm font-medium text-white not-italic no-underline transition-colors hover:bg-[#9e0027]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden
      >
        <path d="M3.6 2.2a1.5 1.5 0 0 0-.6 1.3v17a1.5 1.5 0 0 0 .6 1.3l9.5-9.8zM14.2 12.4l2.6-2.7L5.4 3.2zM14.2 11.6 5.4 20.8l11.4-6.5zM20.4 10.7l-2.4-1.4-2.9 2.7 2.9 2.7 2.4-1.4a1.4 1.4 0 0 0 0-2.6z" />
      </svg>
      Download WIMM on Google Play
    </a>
  );
}
