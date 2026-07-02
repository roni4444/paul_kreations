import { redirect } from "next/navigation";
import { getManagedApp } from "@/lib/admin/apps";
import { LoginForm } from "./login-form";

export const metadata = { title: "Admin sign in" };

const ERROR_MESSAGES: Record<string, string> = {
  missing_token:
    "That link is missing required information. Request a new one below.",
  invalid_link:
    "That link is invalid or has already been used. Request a new one below.",
  unexpected: "Something went wrong signing you in. Request a new link below.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ app?: string; error?: string }>;
}) {
  const { app, error } = await searchParams;
  const managedApp = app ? getManagedApp(app) : undefined;

  if (!managedApp) {
    redirect("/admin");
  }

  const errorMessage = error
    ? (ERROR_MESSAGES[error] ??
      "Something went wrong. Request a new link below.")
    : null;

  return (
    <div className="mx-auto max-w-[420px] px-6 py-24">
      <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        {managedApp.name} admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-[#111c2d]">Sign in</h1>
      <p className="mt-1 text-sm text-[#5f5e5e]">
        Enter your staff email and we&apos;ll send you a sign-in link.
      </p>

      {errorMessage && (
        <div
          role="alert"
          className="mt-6 rounded-[4px] border border-[#e3bebd] bg-[#fff5f5] px-4 py-3 text-sm text-[#9e0027]"
        >
          {errorMessage}
        </div>
      )}

      <div className="mt-8">
        <LoginForm app={managedApp.slug} />
      </div>
    </div>
  );
}
