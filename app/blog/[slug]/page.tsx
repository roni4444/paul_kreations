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
import { PostBody } from "@/components/blog/post-body";
import { ProtectedContent } from "@/components/blog/protected-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { BASE_URL } from "@/lib/config";
import { CurrencyProvider, CurrencySwitcher } from "@/components/blog/currency";
import { hasMoneyMarkers, isInrOnly } from "@/lib/money";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { postQualifiesForAds } from "@/lib/ads";
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
  const showAds = postQualifiesForAds(post.bodyMd);
  const mentionsWimm = /\bWIMM\b/.test(post.bodyMd);
  // Amounts are converted only in guides that mark them and aren't flagged
  // India-specific ({{currency:inr}}).
  const convertCurrency =
    hasMoneyMarkers(post.bodyMd) && !isInrOnly(post.bodyMd);

  return (
    <>
      <BlogPostJsonLd post={post} />
      {showAds && <AdSenseScript />}
      <Navbar />
      <main className="mx-auto w-full max-w-[720px] flex-1 px-6 pt-32 pb-24">
        <Link
          href="/blog"
          className={`${MONO} text-[11px] text-[#c41e3a] uppercase hover:underline`}
        >
          ← All posts
        </Link>

        <CurrencyProvider enabled={convertCurrency}>
          <article className="mt-6">
            <header>
              <h1 className="text-3xl leading-tight font-semibold text-[#111c2d] sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4">
                <PostMeta post={post} />
              </div>
              <p
                className={`${MONO} mt-1 text-[11px] text-[#8f6f6f] uppercase`}
              >
                Published{" "}
                <time dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt)}
                </time>
              </p>
              {mentionsWimm && (
                <p className="mt-4 rounded-[4px] border border-[#e3bebd] bg-[#fff5f5] px-3 py-2 text-sm text-[#5f5e5e]">
                  <strong className="font-semibold text-[#111c2d]">WIMM</strong>{" "}
                  is short for <em>Where Is My Money?</em>, our personal finance
                  app for Android.
                </p>
              )}
              <CurrencySwitcher />
            </header>

            <div className="mt-8 border-t border-[#e3bebd] pt-2">
              <ProtectedContent>
                <PostBody source={post.bodyMd} />
              </ProtectedContent>
            </div>

            <PostEngagement
              postId={post.id}
              initial={{
                views: post.viewCount,
                likes: post.likeCount,
                dislikes: post.dislikeCount,
              }}
            />

            <ShareButtons
              url={`${BASE_URL}/blog/${post.slug}`}
              title={post.title}
            />
          </article>
        </CurrencyProvider>

        {/* Closing ad: below the like buttons, above the comments, so it
            separates the reaction row from the comment form. */}
        {showAds && <AdSlot variant="display" />}

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
