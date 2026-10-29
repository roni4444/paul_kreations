"use client";

// components/blog/post-engagement.tsx
// Views, likes and dislikes under a post. Initial numbers come from the
// (ISR-cached) server render; on mount we ask the server to count this
// visit and return live numbers plus the visitor's own reaction.

import { useEffect, useState, useTransition } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import {
  type EngagementState,
  loadEngagementAction,
  reactToPostAction,
} from "@/server/actions/blog-engagement";
import type { Reaction } from "@/schemas/blog-comment";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

interface PostEngagementProps {
  postId: string;
  initial: { views: number; likes: number; dislikes: number };
}

export function PostEngagement({ postId, initial }: PostEngagementProps) {
  const [state, setState] = useState<EngagementState>({
    ...initial,
    myReaction: null,
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    loadEngagementAction(postId).then((next) => {
      if (!cancelled && next) setState(next);
    });
    return () => {
      cancelled = true;
    };
  }, [postId]);

  function react(reaction: Reaction) {
    startTransition(async () => {
      const next = await reactToPostAction(postId, reaction);
      if (next) setState(next);
    });
  }

  const button = (reaction: Reaction, count: number) => {
    const active = state.myReaction === reaction;
    const Icon = reaction === "like" ? ThumbsUp : ThumbsDown;
    return (
      <button
        type="button"
        onClick={() => react(reaction)}
        disabled={isPending}
        aria-pressed={active}
        aria-label={
          reaction === "like" ? "Like this post" : "Dislike this post"
        }
        className={`inline-flex h-9 items-center gap-2 rounded-[4px] border px-3 text-sm transition-colors disabled:opacity-60 ${
          active
            ? "border-[#c41e3a] bg-[#fff5f5] text-[#c41e3a]"
            : "border-[#e3bebd] text-[#5f5e5e] hover:border-[#c41e3a]"
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden />
        <span>{count.toLocaleString("en-IN")}</span>
      </button>
    );
  };

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#e3bebd] pt-6">
      {button("like", state.likes)}
      {button("dislike", state.dislikes)}
      <span className={`${MONO} ml-auto text-[11px] text-[#8f6f6f] uppercase`}>
        {state.views.toLocaleString("en-IN")}{" "}
        {state.views === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
