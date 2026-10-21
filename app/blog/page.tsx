// app/blog/page.tsx
// Public blog index. Posts come from Supabase (services/supabase/blog.ts).
// ISR: re-fetched at most every 60s, and immediately when staff save a
// post (revalidatePath in server/actions/blog.ts).

import type { Metadata } from "next";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PostMeta } from "@/components/blog/post-meta";
import {
  type BlogPostSummary,
  listPublishedPosts,
} from "@/services/supabase/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the Paul Kreations studio — app updates, engineering write-ups and ideas behind Henstel, Where Is My Money?, and more.",
};

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

async function loadPosts(): Promise<{
  posts: BlogPostSummary[];
  failed: boolean;
}> {
  try {
    return { posts: await listPublishedPosts(), failed: false };
  } catch (err) {
    // Never fail silently (PROJECT_RULES.md §6), but don't take the whole
    // page down for a database hiccup either.
    Sentry.captureException(err);
    return { posts: [], failed: true };
  }
}

export default async function BlogIndexPage() {
  const { posts, failed } = await loadPosts();

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[760px] flex-1 px-6 pt-32 pb-24">
        <p className={`${MONO} text-xs text-[#8f6f6f] uppercase`}>Blog</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#111c2d]">
          Notes from the studio
        </h1>
        <p className="mt-2 text-base text-[#5f5e5e]">
          Updates, write-ups and ideas from Paul Kreations.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {failed ? (
            <p role="alert" className="text-sm text-[#9e0027]">
              We couldn&apos;t load the posts right now. Please try again in a
              moment.
            </p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-[#5f5e5e]">
              No posts yet — check back soon.
            </p>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-[4px] border border-[#e3bebd] bg-white transition-colors hover:border-[#c41e3a]"
              >
                <Link href={`/blog/${post.slug}`} className="block p-5">
                  <h2 className="text-xl font-semibold text-[#111c2d]">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#5f5e5e]">
                    {post.excerpt}
                  </p>
                  <div className="mt-3">
                    <PostMeta post={post} />
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
