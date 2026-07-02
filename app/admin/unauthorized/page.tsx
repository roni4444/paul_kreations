import Link from "next/link";
import { signOut } from "@/server/actions/admin-auth";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Not authorized" };

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto max-w-[420px] px-6 py-24 text-center">
      <h1 className="text-xl font-semibold text-[#111c2d]">Not authorized</h1>
      <p className="mt-2 text-sm text-[#5f5e5e]">
        Your account doesn&apos;t have access to this app yet. Contact the site
        owner if you believe this is a mistake.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
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
