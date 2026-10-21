"use client";

import { useActionState, useState } from "react";
import type { BlogFormState } from "@/server/actions/blog";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: BlogFormState = { status: "idle" };

const LABEL = "font-mono text-xs tracking-wide text-[#8f6f6f] uppercase";
const FIELD = "rounded-[4px] border-[#e3bebd]";

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

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title" className={LABEL}>
          Title
        </Label>
        <Input
          id="title"
          name="title"
          required
          maxLength={160}
          defaultValue={defaults?.title}
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="slug" className={LABEL}>
          Slug
        </Label>
        <Input
          id="slug"
          name="slug"
          maxLength={80}
          defaultValue={defaults?.slug}
          placeholder="leave blank to generate from the title"
          className={FIELD}
        />
        {mode === "edit" && status === "published" && (
          <p className="text-xs text-[#8f6f6f]">
            Changing the slug of a published post changes its public URL.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="excerpt" className={LABEL}>
          Excerpt
        </Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          maxLength={300}
          rows={3}
          defaultValue={defaults?.excerpt}
          placeholder="One or two sentences shown in the post list and in search results."
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="bodyMd" className={LABEL}>
            Content (Markdown)
          </Label>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="font-mono text-xs tracking-wide text-[#c41e3a] uppercase hover:underline"
          >
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {/* Kept mounted (just hidden) while previewing so the value is
            still submitted with the form. */}
        <Textarea
          id="bodyMd"
          name="bodyMd"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={50000}
          className={`${FIELD} min-h-[420px] font-mono ${showPreview ? "hidden" : ""}`}
          placeholder={
            "## A heading\n\nWrite in **Markdown**. Links, lists, quotes and code blocks are supported."
          }
        />
        {showPreview && (
          <div className="min-h-[420px] rounded-[4px] border border-[#e3bebd] bg-white px-5 py-2">
            {body.trim() ? (
              <MarkdownContent source={body} />
            ) : (
              <p className="my-4 text-sm text-[#8f6f6f]">Nothing to preview.</p>
            )}
          </div>
        )}
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-[#9e0027]">
          {state.message}
        </p>
      )}
      {state.status === "saved" && (
        <p role="status" className="text-sm text-[#3b6d11]">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {mode === "create" ? (
          <Button
            type="submit"
            name="intent"
            value="save"
            disabled={isPending}
            className="h-9 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
          >
            {isPending ? "Creating…" : "Create draft"}
          </Button>
        ) : (
          <>
            <Button
              type="submit"
              name="intent"
              value="save"
              variant={status === "published" ? "default" : "outline"}
              disabled={isPending}
              className={
                status === "published"
                  ? "h-9 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
                  : "h-9 rounded-[4px]"
              }
            >
              {isPending
                ? "Saving…"
                : status === "published"
                  ? "Save changes"
                  : "Save draft"}
            </Button>
            {status === "draft" ? (
              <Button
                type="submit"
                name="intent"
                value="publish"
                disabled={isPending}
                className="h-9 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
              >
                Publish
              </Button>
            ) : (
              <Button
                type="submit"
                name="intent"
                value="unpublish"
                variant="outline"
                disabled={isPending}
                className="h-9 rounded-[4px]"
              >
                Unpublish
              </Button>
            )}
          </>
        )}
      </div>
    </form>
  );
}
