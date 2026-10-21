import type { Metadata } from "next";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { requireWimmStaffPage } from "../guard";
import { formatBlogDate } from "@/components/blog/post-meta";
import { signOut } from "@/server/actions/admin-auth";
import {
  type BlogPostAdminRow,
  listAllPostsForAdmin,
} from "@/services/supabase/blog";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Blog — Where Is My Money? admin" };

async function loadPosts(): Promise<{
  posts: BlogPostAdminRow[];
  error: string | null;
}> {
  try {
    return { posts: await listAllPostsForAdmin(), error: null };
  } catch (err) {
    Sentry.captureException(err);
    return {
      posts: [],
      error:
        "Couldn't load posts. Has docs/sql/blog.sql been run on the main Supabase project?",
    };
  }
}

export default async function WimmBlogAdminPage() {
  const staff = await requireWimmStaffPage();
  const { posts, error } = await loadPosts();

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        Where Is My Money? admin — blog
      </p>
      <div className="mt-1 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#111c2d]">Posts</h1>
          <p className="mt-1 text-sm text-[#5f5e5e]">
            Signed in as {staff.displayName}. You&apos;re the author of posts
            you create; when you edit someone else&apos;s post, you become its
            reviewer.
          </p>
        </div>
        <Link href="/admin/wimm/blog/new" className="shrink-0">
          <Button className="h-9 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]">
            New post
          </Button>
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {error ? (
          <p role="alert" className="text-sm text-[#9e0027]">
            {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-[#5f5e5e]">
            No posts yet — create the first one.
          </p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/wimm/blog/${post.id}`}
              className="block rounded-[4px] border border-[#e3bebd] bg-white p-4 transition-colors hover:border-[#c41e3a]"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-semibold text-[#111c2d]">
                  {post.title}
                </h2>
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
              <p className="mt-2 font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
                By {post.authorName}
                {post.reviewerName ? ` · Reviewed by ${post.reviewerName}` : ""}
                {" · Updated "}
                {formatBlogDate(post.updatedAt)}
              </p>
            </Link>
          ))
        )}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/admin/wimm"
          className="text-sm text-[#c41e3a] hover:underline"
        >
          Back to Where Is My Money? admin
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
