import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireWimmStaffPage } from "../../guard";
import { formatBlogDate } from "@/components/blog/post-meta";
import {
  deleteBlogPostAction,
  updateBlogPostAction,
} from "@/server/actions/blog";
import { getPostForAdmin } from "@/services/supabase/blog";
import { BlogPostForm } from "../blog-post-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Edit post — Blog admin" };

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditWimmBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWimmStaffPage();

  const { id } = await params;
  // Validate before it reaches a query: a non-UUID would make Postgres
  // throw instead of simply finding nothing.
  if (!UUID_PATTERN.test(id)) notFound();

  const post = await getPostForAdmin(id);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <Link
        href="/admin/wimm/blog"
        className="font-mono text-xs tracking-wide text-[#c41e3a] uppercase hover:underline"
      >
        ← All posts
      </Link>

      <div className="mt-3 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[#111c2d]">Edit post</h1>
        <span
          className={`shrink-0 rounded-[4px] px-2 py-1 font-mono text-xs tracking-wide uppercase ${
            post.status === "published"
              ? "bg-[#eaf3de] text-[#3b6d11]"
              : "bg-[#fff5f5] text-[#9e0027]"
          }`}
        >
          {post.status}
        </span>
      </div>

      <p className="mt-1 font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        By {post.authorName}
        {post.reviewerName ? ` · Reviewed by ${post.reviewerName}` : ""}
        {" · Updated "}
        {formatBlogDate(post.updatedAt)}
      </p>
      {post.status === "published" && (
        <p className="mt-2 text-sm">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="text-[#c41e3a] hover:underline"
          >
            View live post ↗
          </Link>
        </p>
      )}

      <div className="mt-8">
        <BlogPostForm
          action={updateBlogPostAction.bind(null, post.id)}
          mode="edit"
          status={post.status}
          defaults={{
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            bodyMd: post.bodyMd,
          }}
        />
      </div>

      <div className="mt-12 border-t border-[#e3bebd] pt-6">
        <h2 className="text-sm font-semibold text-[#111c2d]">Delete post</h2>
        <p className="mt-1 text-sm text-[#5f5e5e]">
          This permanently removes the post. To just hide it, unpublish it
          instead.
        </p>
        <form
          action={deleteBlogPostAction.bind(null, post.id)}
          className="mt-3"
        >
          <Button type="submit" variant="outline" className="h-8 rounded-[4px]">
            Delete post
          </Button>
        </form>
      </div>
    </div>
  );
}
