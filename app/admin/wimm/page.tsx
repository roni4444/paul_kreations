import type { Metadata } from "next";
import Link from "next/link";
import { requireWimmStaffPage } from "./guard";
import * as Sentry from "@sentry/nextjs";
import { signOut } from "@/server/actions/admin-auth";
import { countPendingComments } from "@/services/supabase/blog-comments";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Where Is My Money? admin" };

async function pendingCommentCount(): Promise<number | null> {
  try {
    return await countPendingComments();
  } catch (err) {
    Sentry.captureException(err);
    return null;
  }
}

export default async function WimmStaffAdminHome() {
  const staff = await requireWimmStaffPage();
  const pending = await pendingCommentCount();

  return (
    <div className="mx-auto max-w-[640px] px-6 py-20">
      <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        Where Is My Money? admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-[#111c2d]">
        Signed in as {staff.email}
      </h1>

      <div className="mt-8 flex flex-col gap-3">
        <Link href="/admin/wimm/blog">
          <Card className="transition-colors hover:border-[#c41e3a]">
            <CardHeader>
              <CardTitle>Blog</CardTitle>
              <CardDescription className="mt-1">
                Write, edit, and publish posts shown at /blog
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/wimm/blog/comments">
          <Card className="transition-colors hover:border-[#c41e3a]">
            <CardHeader>
              <CardTitle>
                Comments
                {pending ? (
                  <span className="ml-2 rounded-[4px] bg-[#c41e3a] px-2 py-0.5 text-xs font-normal text-white">
                    {pending} pending
                  </span>
                ) : null}
              </CardTitle>
              <CardDescription className="mt-1">
                Review comments left on blog posts
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        {/* Promo offers has its own Google sign-in and its own Supabase
            project, so this only links out — the staff session plays no
            part there. */}
        <Link href="/wimm/admin">
          <Card className="transition-colors hover:border-[#c41e3a]">
            <CardHeader>
              <CardTitle>Promo offers</CardTitle>
              <CardDescription className="mt-1">
                Offers and redemptions — opens the separate promo admin, which
                has its own Google sign-in
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Link href="/admin" className="text-sm text-[#c41e3a] hover:underline">
          Back to app picker
        </Link>
        <form action={signOut}>
          <Button type="submit" variant="outline" className="h-8 rounded-[4px]">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
