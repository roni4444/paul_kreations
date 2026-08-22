// components/wimm/google-play-qr.tsx
// Server Component — generates the QR code SVG server-side via the `qrcode`
// package (added to package.json). No client JS ships, and there's no
// runtime dependency on a third-party image API. Encodes WIMM_PLAY_STORE_URL
// so scanning it takes the user straight to the Play Store listing.

import QRCode from "qrcode";
import { WIMM_PLAY_STORE_URL } from "@/lib/data/wimm";

type GooglePlayQrProps = {
  size?: number;
  className?: string;
};

export async function GooglePlayQr({
  size = 128,
  className = "",
}: GooglePlayQrProps) {
  if (!WIMM_PLAY_STORE_URL) return null;

  const svg = await QRCode.toString(WIMM_PLAY_STORE_URL, {
    type: "svg",
    margin: 0,
    color: {
      dark: "#0E2A20",
      light: "#00000000", // transparent — the wrapper supplies the background
    },
  });

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 p-3 bg-white border border-[#D8E8E0] ${className}`}
    >
      <div
        style={{ width: size, height: size }}
         
        dangerouslySetInnerHTML={{ __html: svg }}
        role="img"
        aria-label="QR code to download Where Is My Money? on Google Play"
      />
      <span className="font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em] text-[10px] text-[#7C9187] uppercase">
        Scan to install
      </span>
    </div>
  );
}
