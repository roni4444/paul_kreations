"use client";

// Needs "use client" because Next.js Image onError requires browser event handling.
// Imported by the Server Component apps.tsx — keeps the rest of the section server-side.

import { useState } from "react";
import Image from "next/image";
import type { AppItem } from "@/lib/data";

// ─── Feature Graphic ─────────────────────────────────────────────────────────
// Displays the 1024×500 landscape image at the top of each app card.
// Falls back to a crimson gradient when the file is absent (e.g. during dev).
// Place files at: public/apps/{slug}/feature.png

type FeatureGraphicProps = {
  app: AppItem;
};

export function FeatureGraphic({ app }: FeatureGraphicProps) {
  const [error, setError] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "1024 / 500" }}
    >
      {/* Gradient layer — always visible; image sits on top if it loads */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${app.colorFrom} 0%, ${app.colorTo} 100%)`,
        }}
        aria-hidden="true"
      />

      {!error && (
        <Image
          src={`/apps/${app.slug}/feature.png`}
          alt={`${app.name} feature graphic`}
          fill
          className="object-cover"
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          onError={() => setError(true)}
          priority={false}
        />
      )}
    </div>
  );
}

// ─── App Icon ─────────────────────────────────────────────────────────────────
// Displays the 512×512 app icon at 40×40 px, inline with the app name.
// Falls back to a lettered monogram when the file is absent.
// Place files at: public/apps/{slug}/icon.png

type AppIconProps = {
  app: AppItem;
};

export function AppIcon({ app }: AppIconProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="size-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
        style={{
          background: `linear-gradient(135deg, ${app.colorFrom} 0%, ${app.colorTo} 100%)`,
        }}
        aria-hidden="true"
      >
        {app.name[0]}
      </div>
    );
  }

  return (
    <div className="size-10 flex-shrink-0 overflow-hidden">
      <Image
        src={`/apps/${app.slug}/icon.png`}
        alt={`${app.name} icon`}
        width={40}
        height={40}
        className="object-cover size-10"
        onError={() => setError(true)}
      />
    </div>
  );
}
