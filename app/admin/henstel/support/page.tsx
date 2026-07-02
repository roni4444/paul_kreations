import { SupportInbox } from "./support-inbox";

export const metadata = { title: "Support — Henstel admin" };

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-16">
      <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        Henstel admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-[#111c2d]">Support</h1>
      <p className="mt-1 text-sm text-[#5f5e5e]">
        Customer conversations from the live app.
      </p>

      <div className="mt-8">
        <SupportInbox />
      </div>
    </div>
  );
}
