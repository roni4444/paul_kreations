// server/actions/blog.ts
// Server Actions for the blog editor inside the WIMM admin
// (/wimm/admin/blog). Every action starts with requireWimmAdmin() —
// proxy.ts only confirms *a* WIMM session exists, not money.promo_admins
// membership, so this is the real authorization boundary. Data access
// lives in services/supabase/blog.ts; this file is validation + error
// translation only, matching server/actions/wimm-admin.ts.

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { blogPostFormSchema } from "@/schemas/blog";
import { requireWimmAdmin } from "@/services/supabase/wimm-admin";
import * as blogService from "@/services/supabase/blog";

export interface BlogFormState {
  status: "idle" | "saved" | "error";
  message?: string;
}

const GENERIC_ERROR = "Something went wrong saving the post. Please try again.";
const SLUG_TAKEN_MESSAGE =
  "Another post already uses that slug. Choose a different one.";

function parseForm(formData: FormData) {
  return blogPostFormSchema.safeParse({
    title: formData.get("title") ?? "",
    slug: formData.get("slug") ?? "",
    excerpt: formData.get("excerpt") ?? "",
    bodyMd: formData.get("bodyMd") ?? "",
    intent: formData.get("intent") ?? "save",
  });
}

/** Public pages are cached (ISR) — push edits out immediately. */
function revalidatePublicBlog(...slugs: (string | null | undefined)[]) {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  for (const slug of new Set(slugs)) {
    if (slug) revalidatePath(`/blog/${slug}`);
  }
}

export async function createBlogPostAction(
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const admin = await requireWimmAdmin();

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  let postId: string;
  try {
    postId = await blogService.createPost(
      {
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        bodyMd: parsed.data.bodyMd,
      },
      { id: admin.userId, name: admin.displayName },
    );
  } catch (err) {
    if (err instanceof Error && err.message === blogService.SLUG_TAKEN) {
      return { status: "error", message: SLUG_TAKEN_MESSAGE };
    }
    Sentry.captureException(err);
    return { status: "error", message: GENERIC_ERROR };
  }

  revalidatePath("/wimm/admin/blog");
  redirect(`/wimm/admin/blog/${postId}`);
}

/** Bound to a post id in the edit page: updateBlogPostAction.bind(null, id).
 * The submit button's `intent` decides save / publish / unpublish. */
export async function updateBlogPostAction(
  postId: string,
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const admin = await requireWimmAdmin();

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    const result = await blogService.updatePost(
      postId,
      {
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        bodyMd: parsed.data.bodyMd,
      },
      parsed.data.intent,
      { id: admin.userId, name: admin.displayName },
    );

    if (!result) {
      return { status: "error", message: "That post no longer exists." };
    }

    revalidatePath("/wimm/admin/blog");
    revalidatePath(`/wimm/admin/blog/${postId}`);
    revalidatePublicBlog(result.previousSlug, parsed.data.slug);

    const message =
      parsed.data.intent === "publish"
        ? "Published."
        : parsed.data.intent === "unpublish"
          ? "Unpublished — the post is now a draft."
          : "Saved.";
    return { status: "saved", message };
  } catch (err) {
    if (err instanceof Error && err.message === blogService.SLUG_TAKEN) {
      return { status: "error", message: SLUG_TAKEN_MESSAGE };
    }
    Sentry.captureException(err);
    return { status: "error", message: GENERIC_ERROR };
  }
}

export async function deleteBlogPostAction(postId: string) {
  await requireWimmAdmin();

  try {
    const slug = await blogService.deletePost(postId);
    revalidatePath("/wimm/admin/blog");
    revalidatePublicBlog(slug);
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }
  redirect("/wimm/admin/blog");
}
