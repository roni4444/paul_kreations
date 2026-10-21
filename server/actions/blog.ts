// server/actions/blog.ts
// Server Actions for the blog editor in the main admin
// (/admin/wimm/blog). Every action starts with requireStaffAccess("wimm")
// — see services/staff.ts for why that's the real authorization boundary,
// not the calling page. Data access lives in services/supabase/blog.ts;
// this file is validation + error translation only, matching
// server/actions/cookbooks.ts.

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { blogPostFormSchema } from "@/schemas/blog";
import { requireStaffAccess } from "@/services/staff";
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
  const staff = await requireStaffAccess("wimm");

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
      { id: staff.id, name: staff.displayName },
    );
  } catch (err) {
    if (err instanceof Error && err.message === blogService.SLUG_TAKEN) {
      return { status: "error", message: SLUG_TAKEN_MESSAGE };
    }
    Sentry.captureException(err);
    return { status: "error", message: GENERIC_ERROR };
  }

  revalidatePath("/admin/wimm/blog");
  redirect(`/admin/wimm/blog/${postId}`);
}

/** Bound to a post id in the edit page: updateBlogPostAction.bind(null, id).
 * The submit button's `intent` decides save / publish / unpublish. */
export async function updateBlogPostAction(
  postId: string,
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const staff = await requireStaffAccess("wimm");

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
      { id: staff.id, name: staff.displayName },
    );

    if (!result) {
      return { status: "error", message: "That post no longer exists." };
    }

    revalidatePath("/admin/wimm/blog");
    revalidatePath(`/admin/wimm/blog/${postId}`);
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
  await requireStaffAccess("wimm");

  try {
    const slug = await blogService.deletePost(postId);
    revalidatePath("/admin/wimm/blog");
    revalidatePublicBlog(slug);
  } catch (err) {
    Sentry.captureException(err);
    throw err;
  }
  redirect("/admin/wimm/blog");
}
