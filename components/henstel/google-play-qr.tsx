// components/henstel/google-play-qr.tsx
// Server Component — generates the QR code SVG server-side via the `qrcode`
// package (already a dependency). No client JS, no third-party image API.

import QRCode from "qrcode";
import { HENSTEL_PLAY_STORE_URL } from "@/lib/data/henstel";

type GooglePlayQrProps = {
  size?: number;
  className?: string;
};

export async function GooglePlayQr({
  size = 128,
  className = "",
}: GooglePlayQrProps) {
  if (!HENSTEL_PLAY_STORE_URL) return null;

  const svg = await QRCode.toString(HENSTEL_PLAY_STORE_URL, {
    type: "svg",
    margin: 0,
    color: {
      dark: "#3B2A18",
      light: "#00000000", // transparent — the wrapper supplies the background
    },
  });

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 p-3 bg-[#FFFFFF] border border-[#E6DCC6] ${className}`}
    >
      <div
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: svg }}
        role="img"
        aria-label="QR code to download Henstel on Google Play"
      />
      <span className="font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em] text-[10px] text-[#8A7A60] uppercase">
        Scan to install
      </span>
    </div>
  );
}
