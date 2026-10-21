// app/wimm/admin/(protected)/blog/new/page.tsx
import Link from "next/link";
import { BlogPostForm } from "@/components/wimm-admin/blog-post-form";
import { createBlogPostAction } from "@/server/actions/blog";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

export default function NewWimmBlogPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/wimm/admin/blog"
          className={`${MONO} text-[11px] text-[#0F7A4E] uppercase hover:underline`}
        >
          ← All posts
        </Link>
        <h1
          className={`${HEADING} mt-2 text-[1.5rem] font-bold text-[#0E2A20]`}
        >
          New post
        </h1>
        <p className={`${MONO} mt-1 text-[11px] text-[#7C9187]`}>
          It starts as a draft. You can preview, edit and publish it next.
        </p>
      </div>
      <BlogPostForm action={createBlogPostAction} mode="create" />
    </div>
  );
}
