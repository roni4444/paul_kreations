import Link from "next/link";
import { listCookbooks } from "@/services/supabase/cookbooks";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateCookbookForm } from "./create-cookbook-form";

export const metadata = { title: "Cookbooks" };
export const dynamic = "force-dynamic";

export default async function CookbooksPage() {
  const cookbooks = await listCookbooks();

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        Henstel admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-[#111c2d]">Cookbooks</h1>
      <p className="mt-1 text-sm text-[#5f5e5e]">
        {cookbooks.length} cookbook{cookbooks.length === 1 ? "" : "s"}
      </p>

      <div className="mt-8">
        <CreateCookbookForm />
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {cookbooks.map((cb) => (
          <Link key={cb.id} href={`/admin/henstel/cookbooks/${cb.id}`}>
            <Card className="transition-colors hover:border-[#c41e3a]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{cb.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {cb.no_of_recipes} recipe{cb.no_of_recipes === 1 ? "" : "s"}
                  </CardDescription>
                </div>
                <span
                  className={`shrink-0 rounded-[4px] px-2 py-1 font-mono text-xs tracking-wide uppercase ${
                    cb.status === "reviewed"
                      ? "bg-[#eaf3de] text-[#3b6d11]"
                      : "bg-[#fff5f5] text-[#9e0027]"
                  }`}
                >
                  {cb.status}
                </span>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {cookbooks.length === 0 && (
          <p className="text-sm text-[#5f5e5e]">
            No cookbooks yet — create one above.
          </p>
        )}
      </div>
    </div>
  );
}
