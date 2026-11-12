// components/surround-it/google-play-qr.tsx
// Server Component — generates the QR code SVG server-side via the `qrcode`
// package (already a dependency). No client JS, no third-party image API.

import QRCode from "qrcode";
import { SURROUND_IT_PLAY_STORE_URL } from "@/lib/data/surround-it";

type GooglePlayQrProps = {
  size?: number;
  className?: string;
};

export async function GooglePlayQr({
  size = 128,
  className = "",
}: GooglePlayQrProps) {
  if (!SURROUND_IT_PLAY_STORE_URL) return null;

  const svg = await QRCode.toString(SURROUND_IT_PLAY_STORE_URL, {
    type: "svg",
    margin: 0,
    color: {
      dark: "#081612",
      light: "#00000000", // transparent — the wrapper supplies the background
    },
  });

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 p-3 bg-[#F4EEDA] border border-[#263A32] ${className}`}
    >
      <div
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: svg }}
        role="img"
        aria-label="QR code to download Surround It on Google Play"
      />
      <span className="font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em] text-[10px] text-[#4A5A52] uppercase">
        Scan to install
      </span>
    </div>
  );
}
