import { ExternalLink } from "lucide-react";
import { getUsageDashboardAction } from "@/server/actions/usage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Usage — Henstel admin" };

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline justify-between border-t border-[#e3bebd] py-2 first:border-t-0 first:pt-0">
      <span className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        {label}
      </span>
      <span className="text-sm font-semibold text-[#111c2d]">{value}</span>
    </div>
  );
}

function DashboardLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1 font-mono text-xs tracking-wide text-[#c41e3a] uppercase hover:underline"
    >
      View in dashboard <ExternalLink size={12} aria-hidden="true" />
    </a>
  );
}

function ErrorCard({ message }: { message: string }) {
  return <p className="text-sm text-[#9e0027]">{message}</p>;
}

export default async function UsagePage() {
  const usage = await getUsageDashboardAction();

  return (
    <div className="mx-auto max-w-[900px] px-6 py-16">
      <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        Henstel admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-[#111c2d]">Usage</h1>
      <p className="mt-1 text-sm text-[#5f5e5e]">
        Live figures where a vendor exposes them; a dashboard link where they
        don&apos;t.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sentry</CardTitle>
            <CardDescription>Error and event volume</CardDescription>
          </CardHeader>
          <CardContent>
            {usage.sentry.status === "error" ? (
              <ErrorCard message={usage.sentry.message} />
            ) : (
              <>
                <StatRow label={usage.sentry.periodLabel} value="" />
                <StatRow
                  label="Error events"
                  value={usage.sentry.errorEvents}
                />
                <StatRow
                  label="Transaction events"
                  value={usage.sentry.transactionEvents}
                />
                <DashboardLink href={usage.sentry.dashboardUrl} />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resend</CardTitle>
            <CardDescription>Recent send activity</CardDescription>
          </CardHeader>
          <CardContent>
            {usage.resend.status === "error" ? (
              <ErrorCard message={usage.resend.message} />
            ) : (
              <>
                <StatRow
                  label="Recent emails"
                  value={usage.resend.recentEmailCount}
                />
                <StatRow
                  label="Last sent"
                  value={
                    usage.resend.lastSentAt
                      ? new Date(usage.resend.lastSentAt).toLocaleString(
                          "en-IN",
                          {
                            timeZone: "Asia/Kolkata",
                            dateStyle: "medium",
                            timeStyle: "short",
                          },
                        )
                      : "—"
                  }
                />
                <DashboardLink href={usage.resend.dashboardUrl} />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase</CardTitle>
            <CardDescription>Project status</CardDescription>
          </CardHeader>
          <CardContent>
            {usage.supabase.status === "error" ? (
              <ErrorCard message={usage.supabase.message} />
            ) : (
              <>
                {usage.supabase.projects.map((p) => (
                  <StatRow
                    key={p.id}
                    label={`${p.name} (${p.region})`}
                    value={p.status}
                  />
                ))}
                <p className="mt-2 text-xs text-[#8f6f6f]">
                  Bandwidth, storage, and compute usage aren&apos;t exposed by a
                  personal access token — see the dashboard for detail.
                </p>
                <DashboardLink href={usage.supabase.dashboardUrl} />
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appwrite</CardTitle>
            <CardDescription>Staff auth project</CardDescription>
          </CardHeader>
          <CardContent>
            {usage.appwrite.status === "error" ? (
              <ErrorCard message={usage.appwrite.message} />
            ) : (
              <>
                <StatRow
                  label="Staff users"
                  value={usage.appwrite.totalStaffUsers}
                />
                <StatRow
                  label="Staff table rows"
                  value={usage.appwrite.totalStaffRows}
                />
                <p className="mt-2 text-xs text-[#8f6f6f]">
                  Bandwidth, storage, and execution usage aren&apos;t exposed
                  via API key — see the console for detail.
                </p>
                <DashboardLink href={usage.appwrite.dashboardUrl} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
