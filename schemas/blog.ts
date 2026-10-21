// schemas/blog.ts
// Validation for the blog admin form and for slugs coming from public URLs
// (PROJECT_RULES.md §5: every input validated with Zod, server-side).

import { z } from "zod";

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** "Hello, World! 2026" -> "hello-world-2026". */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

export const publicSlugSchema = z.string().max(80).regex(SLUG_PATTERN);

export const BLOG_INTENTS = ["save", "publish", "unpublish"] as const;
export type BlogIntent = (typeof BLOG_INTENTS)[number];

export const blogPostFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(160, "Title must be 160 characters or fewer"),
    // Blank means "generate from the title".
    slug: z.string().trim().max(80, "Slug must be 80 characters or fewer"),
    excerpt: z
      .string()
      .trim()
      .max(300, "Excerpt must be 300 characters or fewer"),
    bodyMd: z.string().max(50_000, "Post is too long (50,000 characters max)"),
    intent: z.enum(BLOG_INTENTS),
  })
  .transform((value) => ({
    ...value,
    slug: value.slug || slugify(value.title),
  }))
  .refine((value) => SLUG_PATTERN.test(value.slug), {
    message:
      "Slug may only contain lowercase letters, numbers and single hyphens.",
    path: ["slug"],
  })
  .refine(
    (value) =>
      value.intent !== "publish" ||
      (value.excerpt.length > 0 && value.bodyMd.trim().length > 0),
    {
      message: "Add an excerpt and some content before publishing.",
      path: ["bodyMd"],
    },
  );

export type BlogPostFormInput = z.infer<typeof blogPostFormSchema>;
