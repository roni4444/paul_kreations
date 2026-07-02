import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { MANAGED_APPS } from "@/lib/admin/apps";
import { getCurrentStaff, staffCanAccess } from "@/services/staff";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Admin" };

export default async function AdminPickerPage() {
  const staff = await getCurrentStaff();

  return (
    <div className="mx-auto max-w-[640px] px-6 py-20">
      <div className="mb-10 flex items-center gap-2">
        <Lock size={16} className="text-[#c41e3a]" />
        <span className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
          Paul Kreations — Admin
        </span>
      </div>

      <h1 className="text-2xl font-semibold text-[#111c2d]">
        Choose an app to manage
      </h1>
      <p className="mt-1 text-sm text-[#5f5e5e]">
        Each app has its own data and its own access controls.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {MANAGED_APPS.map((app) => {
          const hasAccess = app.enabled && staffCanAccess(staff, app.slug);
          const href = !app.enabled
            ? undefined
            : hasAccess
              ? `/admin/${app.slug}`
              : `/admin/login?app=${app.slug}`;

          const card = (
            <Card
              className={
                app.enabled
                  ? "transition-colors hover:border-[#c41e3a]"
                  : "opacity-50"
              }
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{app.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {app.tagline}
                  </CardDescription>
                </div>
                {app.enabled && (
                  <ArrowRight size={16} className="shrink-0 text-[#c41e3a]" />
                )}
              </CardHeader>
              {!app.enabled && (
                <CardContent>
                  <span className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
                    Coming soon
                  </span>
                </CardContent>
              )}
            </Card>
          );

          return href ? (
            <Link key={app.slug} href={href}>
              {card}
            </Link>
          ) : (
            <div key={app.slug}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
