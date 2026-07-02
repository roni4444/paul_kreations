import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentStaff, staffCanAccess } from "@/services/staff";
import { signOut } from "@/server/actions/admin-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Henstel admin" };

export default async function HenstelAdminHome() {
  const staff = await getCurrentStaff();

  if (!staff) {
    redirect("/admin/login?app=henstel");
  }
  if (!staffCanAccess(staff, "henstel")) {
    redirect("/admin/unauthorized");
  }

  return (
    <div className="mx-auto max-w-[640px] px-6 py-20">
      <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        Henstel admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-[#111c2d]">
        Signed in as {staff.email}
      </h1>

      <div className="mt-8">
        <Link href="/admin/henstel/cookbooks">
          <Card className="transition-colors hover:border-[#c41e3a]">
            <CardHeader>
              <CardTitle>Cookbooks</CardTitle>
              <CardDescription className="mt-1">
                Create, review, and upload PDFs to extract recipes
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/henstel/support" className="mt-3 block">
          <Card className="transition-colors hover:border-[#c41e3a]">
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <CardDescription className="mt-1">
                Reply to customer conversations from the live app
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/henstel/usage" className="mt-3 block">
          <Card className="transition-colors hover:border-[#c41e3a]">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription className="mt-1">
                Sentry, Resend, Supabase, and Appwrite at a glance
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <p className="mt-6 text-sm text-[#5f5e5e]">
        Usage and support move in here next.
      </p>
      <form action={signOut} className="mt-6">
        <Button type="submit" variant="outline" className="h-8 rounded-[4px]">
          Sign out
        </Button>
      </form>
    </div>
  );
}
