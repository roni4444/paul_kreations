// app/wimm/admin/(protected)/blog/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatBlogDate } from "@/components/blog/post-meta";
import { BlogPostForm } from "@/components/wimm-admin/blog-post-form";
import {
  deleteBlogPostAction,
  updateBlogPostAction,
} from "@/server/actions/blog";
import { getPostForAdmin } from "@/services/supabase/blog";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditWimmBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Validate before it reaches a query: a non-UUID would make Postgres
  // throw instead of simply finding nothing.
  if (!UUID_PATTERN.test(id)) notFound();

  const post = await getPostForAdmin(id);
  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/wimm/admin/blog"
          className={`${MONO} text-[11px] text-[#0F7A4E] uppercase hover:underline`}
        >
          ← All posts
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className={`${HEADING} text-[1.5rem] font-bold text-[#0E2A20]`}>
            Edit post
          </h1>
          <span
            className={`${MONO} inline-block px-2 py-1 text-[10px] uppercase ${
              post.status === "published"
                ? "bg-[#E8F5EE] text-[#0A5C3A]"
                : "bg-[#F3F4F2] text-[#4A5A52]"
            }`}
          >
            {post.status}
          </span>
        </div>
        <p className={`${MONO} mt-1 text-[11px] text-[#7C9187] uppercase`}>
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
              className="text-[#0F7A4E] hover:underline"
            >
              View live post ↗
            </Link>
          </p>
        )}
      </div>

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

      <div className="mt-6 max-w-[760px] border-t border-[#D8E8E0] pt-6">
        <h2 className={`${HEADING} text-sm font-semibold text-[#0E2A20]`}>
          Delete post
        </h2>
        <p className="mt-1 text-sm text-[#4A5A52]">
          This permanently removes the post. To just hide it, unpublish it
          instead.
        </p>
        <form
          action={deleteBlogPostAction.bind(null, post.id)}
          className="mt-3"
        >
          <button
            type="submit"
            className="inline-flex h-10 items-center border border-[#C0392B] bg-white px-5 text-sm font-semibold text-[#C0392B] transition-colors hover:bg-[#FCEEEC]"
          >
            Delete post
          </button>
        </form>
      </div>
    </div>
  );
}
