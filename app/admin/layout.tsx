import type { ReactNode } from "react";
import type { Metadata } from "next";

// Every page under /admin inherits this — kept out of search results since
// it's an internal tool, not public marketing content.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f9f9ff]">{children}</div>;
}
