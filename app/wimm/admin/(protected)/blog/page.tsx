// app/wimm/admin/(protected)/blog/page.tsx
// Blog posts list inside the WIMM admin. The (protected) layout already
// runs requireWimmAdmin(); every blog Server Action re-checks it.

import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { formatBlogDate } from "@/components/blog/post-meta";
import {
  type BlogPostAdminRow,
  listAllPostsForAdmin,
} from "@/services/supabase/blog";

const HEADING = "font-[family-name:var(--font-wimm-heading)]";
const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

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

export default async function WimmAdminBlogPage() {
  const { posts, error } = await loadPosts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${HEADING} text-[1.5rem] font-bold text-[#0E2A20]`}>
            Blog posts
          </h1>
          <p className={`${MONO} mt-1 text-[11px] text-[#7C9187]`}>
            You become the author of posts you create, and the reviewer when you
            edit someone else&apos;s.
          </p>
        </div>
        <Link
          href="/wimm/admin/blog/new"
          className={`${MONO} inline-flex h-9 items-center bg-[#0F7A4E] px-4 text-[11px] text-white uppercase transition-colors hover:bg-[#0A5C3A]`}
        >
          + New post
        </Link>
      </div>

      {error && (
        <div className="border border-[#C0392B] bg-[#FCEEEC] px-3 py-2.5">
          <span className={`${MONO} text-[11px] text-[#C0392B]`}>{error}</span>
        </div>
      )}

      <div className="overflow-x-auto border border-[#D8E8E0] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr
              className={`${MONO} border-b border-[#D8E8E0] text-[10px] text-[#7C9187] uppercase`}
            >
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Reviewer</th>
              <th className="px-4 py-3 text-left">Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-[#EEF4F1] last:border-0"
              >
                <td className="px-4 py-3">
                  <span
                    className={`${MONO} inline-block px-2 py-1 text-[10px] uppercase ${
                      post.status === "published"
                        ? "bg-[#E8F5EE] text-[#0A5C3A]"
                        : "bg-[#F3F4F2] text-[#4A5A52]"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/wimm/admin/blog/${post.id}`}
                    className="font-medium text-[#0E2A20] hover:text-[#0F7A4E] hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className={`${MONO} px-4 py-3 text-[11px] text-[#4A5A52]`}>
                  {post.authorName}
                </td>
                <td className={`${MONO} px-4 py-3 text-[11px] text-[#4A5A52]`}>
                  {post.reviewerName ?? "—"}
                </td>
                <td className={`${MONO} px-4 py-3 text-[11px] text-[#4A5A52]`}>
                  {formatBlogDate(post.updatedAt)}
                </td>
              </tr>
            ))}
            {posts.length === 0 && !error && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-[#7C9187]"
                >
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
