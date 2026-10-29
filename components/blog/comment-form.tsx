"use client";

// components/blog/comment-form.tsx
// Anonymous comment form: name + comment, Turnstile and a honeypot
// (PROJECT_RULES.md §9). Submits via server/actions/blog-comments.ts; the
// comment is held for moderation, so the success message says so.

import type { SubmitEvent as ReactSubmitEvent } from "react";
import { useId, useState, useTransition } from "react";
import { submitCommentAction } from "@/server/actions/blog-comments";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const LABEL =
  "font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.05em] text-[#8f6f6f] uppercase";
const FIELD = "rounded-[4px] border-[#e3bebd]";

type Status =
  | { kind: "idle" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

interface CommentFormProps {
  postId: string;
  /** Top-level comment being replied to (reply mode). */
  parentId?: string;
  /** Pre-filled text, e.g. "@Name " when replying to a reply. */
  initialBody?: string;
  /** Shows a Cancel/Close button (reply mode). */
  onCancel?: () => void;
}

export function CommentForm({
  postId,
  parentId,
  initialBody,
  onCancel,
}: CommentFormProps) {
  const uid = useId();
  const isReply = Boolean(parentId);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  // Turnstile tokens are single-use; remounting gives a fresh challenge.
  const [widgetKey, setWidgetKey] = useState(0);
  const [formKey, setFormKey] = useState(0);

  function handleSubmit(e: ReactSubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitCommentAction({
        postId,
        parentId,
        authorName: (raw.get("authorName") as string) ?? "",
        authorEmail: (raw.get("authorEmail") as string) ?? "",
        body: (raw.get("body") as string) ?? "",
        website: (raw.get("website") as string) ?? "",
        turnstileToken,
      });

      setTurnstileToken("");
      setWidgetKey((k) => k + 1);

      if (result.success) {
        setStatus({ kind: "sent" });
        setFormKey((k) => k + 1); // clears the fields
      } else {
        setStatus({ kind: "error", message: result.error });
      }
    });
  }

  return (
    <form
      key={formKey}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${uid}-name`} className={LABEL}>
          Name
        </Label>
        <Input
          id={`${uid}-name`}
          name="authorName"
          maxLength={60}
          autoComplete="nickname"
          disabled={isPending}
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${uid}-email`} className={LABEL}>
          Email (optional)
        </Label>
        <Input
          id={`${uid}-email`}
          name="authorEmail"
          type="email"
          maxLength={254}
          autoComplete="email"
          disabled={isPending}
          className={FIELD}
        />
        <p className="text-xs text-[#8f6f6f]">
          Never shown on the site. Only used if we want to reply to you.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`${uid}-body`} className={LABEL}>
          Comment
        </Label>
        <Textarea
          id={`${uid}-body`}
          name="body"
          rows={isReply ? 3 : 5}
          defaultValue={initialBody}
          maxLength={2000}
          disabled={isPending}
          className={FIELD}
        />
      </div>

      {/* Honeypot — hidden from people and assistive tech. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <TurnstileWidget
        key={widgetKey}
        onVerifyAction={setTurnstileToken}
        onExpireAction={() => setTurnstileToken("")}
      />

      {status.kind === "error" && (
        <p role="alert" className="text-sm text-[#9e0027]">
          {status.message}
        </p>
      )}
      {status.kind === "sent" && (
        <p role="status" className="text-sm text-[#3b6d11]">
          Thanks! Your {isReply ? "reply" : "comment"} will appear after it has
          been reviewed.
        </p>
      )}

      <div>
        <Button
          type="submit"
          disabled={isPending}
          className="h-9 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
        >
          {isPending ? "Sending…" : isReply ? "Post reply" : "Post comment"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="ml-2 h-9 rounded-[4px]"
          >
            {status.kind === "sent" ? "Close" : "Cancel"}
          </Button>
        )}
      </div>
    </form>
  );
}
