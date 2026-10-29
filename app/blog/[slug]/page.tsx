// app/blog/[slug]/page.tsx
// Public blog post. ISR like the index: re-fetched at most every 60s and
// immediately when an admin saves (server/actions/blog.ts). Slugs are rendered
// on demand — no generateStaticParams, so the build never needs the
// database for individual posts.

import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommentsSection } from "@/components/blog/comments-section";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { PostEngagement } from "@/components/blog/post-engagement";
import { formatBlogDate, PostMeta } from "@/components/blog/post-meta";
import { BlogPostJsonLd } from "@/components/seo/blog-json-ld";
import { publicSlugSchema } from "@/schemas/blog";
import {
  type BlogPostPublic,
  getPublishedPostBySlug,
} from "@/services/supabase/blog";
import {
  listApprovedComments,
  type PublicComment,
} from "@/services/supabase/blog-comments";

export const revalidate = 60;

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

/** Validates the slug from the URL before it goes anywhere near a query,
 * and treats a database error as an error (500), not as "not found".
 * cache() so generateMetadata and the page share one query per request. */
const loadPost = cache(
  async (rawSlug: string): Promise<BlogPostPublic | null> => {
    const parsed = publicSlugSchema.safeParse(rawSlug);
    if (!parsed.success) return null;

    try {
      return await getPublishedPostBySlug(parsed.data);
    } catch (err) {
      Sentry.captureException(err);
      throw err;
    }
  },
);

/** Comments are secondary — if loading them fails the post still renders. */
async function loadComments(
  postId: string,
): Promise<{ comments: PublicComment[]; failed: boolean }> {
  try {
    return { comments: await listApprovedComments(postId), failed: false };
  } catch (err) {
    Sentry.captureException(err);
    return { comments: [], failed: true };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const { comments, failed: commentsFailed } = await loadComments(post.id);

  return (
    <>
      <BlogPostJsonLd post={post} />
      <Navbar />
      <main className="mx-auto w-full max-w-[720px] flex-1 px-6 pt-32 pb-24">
        <Link
          href="/blog"
          className={`${MONO} text-[11px] text-[#c41e3a] uppercase hover:underline`}
        >
          ← All posts
        </Link>

        <article className="mt-6">
          <header>
            <h1 className="text-3xl leading-tight font-semibold text-[#111c2d] sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4">
              <PostMeta post={post} />
            </div>
            <p className={`${MONO} mt-1 text-[11px] text-[#8f6f6f] uppercase`}>
              Published{" "}
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
            </p>
          </header>

          <div className="mt-8 border-t border-[#e3bebd] pt-2">
            <MarkdownContent source={post.bodyMd} />
          </div>

          <PostEngagement
            postId={post.id}
            initial={{
              views: post.viewCount,
              likes: post.likeCount,
              dislikes: post.dislikeCount,
            }}
          />
        </article>

        <CommentsSection
          postId={post.id}
          comments={comments}
          loadFailed={commentsFailed}
        />
      </main>
      <Footer />
    </>
  );
}
