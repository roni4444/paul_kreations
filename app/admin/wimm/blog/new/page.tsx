import type { Metadata } from "next";
import Link from "next/link";
import { requireWimmStaffPage } from "../../guard";
import { createBlogPostAction } from "@/server/actions/blog";
import { BlogPostForm } from "../blog-post-form";

export const metadata: Metadata = { title: "New post — Blog admin" };

export default async function NewWimmBlogPostPage() {
  await requireWimmStaffPage();

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <Link
        href="/admin/wimm/blog"
        className="font-mono text-xs tracking-wide text-[#c41e3a] uppercase hover:underline"
      >
        ← All posts
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-[#111c2d]">New post</h1>
      <p className="mt-1 text-sm text-[#5f5e5e]">
        It starts as a draft. You can preview, edit and publish it next.
      </p>

      <div className="mt-8">
        <BlogPostForm action={createBlogPostAction} mode="create" />
      </div>
    </div>
  );
}
