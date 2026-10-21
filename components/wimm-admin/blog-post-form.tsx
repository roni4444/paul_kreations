"use client";

// components/wimm-admin/blog-post-form.tsx
// Create/edit form for blog posts inside the WIMM admin. Styled like
// offer-form.tsx (WIMM green, native inputs). The Markdown preview reuses
// the same renderer as the public post page.

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { MarkdownContent } from "@/components/blog/markdown-content";
import type { BlogFormState } from "@/server/actions/blog";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";
const LABEL = `${MONO} text-[11px] text-[#4A5A52] uppercase`;
const FIELD =
  "w-full px-3 border border-[#D8E8E0] bg-white text-[#0E2A20] text-sm outline-none transition-all placeholder:text-[#8FA69B] focus:border-[#0F7A4E] focus:border-2 disabled:opacity-50 disabled:cursor-not-allowed h-11";
const PRIMARY =
  "inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#0F7A4E] hover:bg-[#0A5C3A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors";
const SECONDARY =
  "inline-flex items-center justify-center gap-2 h-11 px-6 border border-[#D8E8E0] bg-white hover:border-[#0F7A4E] disabled:opacity-50 disabled:cursor-not-allowed text-[#0E2A20] text-sm font-semibold transition-colors";

const initialState: BlogFormState = { status: "idle" };

interface BlogPostFormProps {
  action: (
    prevState: BlogFormState,
    formData: FormData,
  ) => Promise<BlogFormState>;
  mode: "create" | "edit";
  /** Only meaningful in edit mode. */
  status?: "draft" | "published";
  defaults?: {
    title: string;
    slug: string;
    excerpt: string;
    bodyMd: string;
  };
}

export function BlogPostForm({
  action,
  mode,
  status = "draft",
  defaults,
}: BlogPostFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [body, setBody] = useState(defaults?.bodyMd ?? "");
  const [showPreview, setShowPreview] = useState(false);

  const spinner = isPending ? (
    <Loader2 size={14} className="animate-spin" aria-hidden="true" />
  ) : null;

  return (
    <form action={formAction} className="flex max-w-[760px] flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className={LABEL}>
          Title <span className="text-[#0F7A4E]">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={160}
          defaultValue={defaults?.title}
          className={FIELD}
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="slug" className={LABEL}>
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          maxLength={80}
          defaultValue={defaults?.slug}
          placeholder="leave blank to generate from the title"
          className={FIELD}
          disabled={isPending}
        />
        {mode === "edit" && status === "published" && (
          <p className={`${MONO} text-[10px] text-[#7C9187]`}>
            Changing the slug of a published post changes its public URL.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="excerpt" className={LABEL}>
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          maxLength={300}
          defaultValue={defaults?.excerpt}
          placeholder="One or two sentences shown in the post list and in search results."
          className={`${FIELD} h-auto resize-none py-2`}
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="bodyMd" className={LABEL}>
            Content (Markdown)
          </label>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className={`${MONO} text-[11px] text-[#0F7A4E] uppercase hover:underline`}
          >
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {/* Kept mounted (just hidden) while previewing so the value is
            still submitted with the form. */}
        <textarea
          id="bodyMd"
          name="bodyMd"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={50000}
          disabled={isPending}
          placeholder={
            "## A heading\n\nWrite in **Markdown**. Links, lists, quotes and code blocks are supported."
          }
          className={`${FIELD} h-auto min-h-[420px] resize-y py-2 font-mono ${showPreview ? "hidden" : ""}`}
        />
        {showPreview && (
          <div className="min-h-[420px] border border-[#D8E8E0] bg-white px-5 py-2">
            {body.trim() ? (
              <MarkdownContent source={body} />
            ) : (
              <p className="my-4 text-sm text-[#7C9187]">Nothing to preview.</p>
            )}
          </div>
        )}
      </div>

      {state.status === "error" && (
        <div className="border border-[#C0392B] bg-[#FCEEEC] px-3 py-2.5">
          <span className={`${MONO} text-[11px] text-[#C0392B]`}>
            {state.message}
          </span>
        </div>
      )}
      {state.status === "saved" && (
        <div className="border border-[#0F7A4E] bg-[#E8F5EE] px-3 py-2.5">
          <span className={`${MONO} text-[11px] text-[#0A5C3A]`}>
            {state.message}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {mode === "create" ? (
          <button
            type="submit"
            name="intent"
            value="save"
            disabled={isPending}
            className={PRIMARY}
          >
            {spinner}
            Create draft
          </button>
        ) : (
          <>
            <button
              type="submit"
              name="intent"
              value="save"
              disabled={isPending}
              className={status === "published" ? PRIMARY : SECONDARY}
            >
              {spinner}
              {status === "published" ? "Save changes" : "Save draft"}
            </button>
            {status === "draft" ? (
              <button
                type="submit"
                name="intent"
                value="publish"
                disabled={isPending}
                className={PRIMARY}
              >
                Publish
              </button>
            ) : (
              <button
                type="submit"
                name="intent"
                value="unpublish"
                disabled={isPending}
                className={SECONDARY}
              >
                Unpublish
              </button>
            )}
          </>
        )}
      </div>
    </form>
  );
}
