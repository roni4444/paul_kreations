"use client";

// components/blog/comment-thread.tsx
// Approved comments with per-comment like/dislike and one level of replies.
// Counts come from the (ISR-cached) server render; this visitor's own
// reactions are loaded after mount. Replies use the same form, Turnstile and
// moderation as comments — they appear only once approved.

import { useEffect, useMemo, useState, useTransition } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import {
  loadMyCommentReactionsAction,
  reactToCommentAction,
} from "@/server/actions/blog-comments";
import type { Reaction } from "@/schemas/blog-comment";
import type { PublicComment } from "@/services/supabase/blog-comments";
import { CommentForm } from "./comment-form";
import { formatBlogDate } from "./post-meta";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

interface ReplyTarget {
  /** Comment whose Reply button was pressed (where the form opens). */
  openUnder: string;
  /** Top-level comment the reply attaches to. */
  parentId: string;
  prefill: string;
}

export function CommentThread({
  postId,
  comments,
}: {
  postId: string;
  comments: PublicComment[];
}) {
  const [mine, setMine] = useState<Record<string, Reaction>>({});
  const [counts, setCounts] = useState<
    Record<string, { likes: number; dislikes: number }>
  >({});
  const [reply, setReply] = useState<ReplyTarget | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    loadMyCommentReactionsAction().then((r) => {
      if (!cancelled) setMine(r);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const { topLevel, repliesByParent } = useMemo(() => {
    const top = comments.filter((c) => !c.parentId);
    const topIds = new Set(top.map((c) => c.id));
    const byParent = new Map<string, PublicComment[]>();
    for (const c of comments) {
      // Replies whose parent isn't approved/visible are not shown.
      if (c.parentId && topIds.has(c.parentId)) {
        const list = byParent.get(c.parentId) ?? [];
        list.push(c);
        byParent.set(c.parentId, list);
      }
    }
    return { topLevel: top, repliesByParent: byParent };
  }, [comments]);

  function react(id: string, reaction: Reaction) {
    startTransition(async () => {
      const next = await reactToCommentAction(id, reaction);
      if (!next) return;
      setCounts((c) => ({
        ...c,
        [id]: { likes: next.likes, dislikes: next.dislikes },
      }));
      setMine((m) => {
        const copy = { ...m };
        if (next.myReaction) copy[id] = next.myReaction;
        else delete copy[id];
        return copy;
      });
    });
  }

  function reactionButton(c: PublicComment, reaction: Reaction) {
    const active = mine[c.id] === reaction;
    const value =
      reaction === "like"
        ? (counts[c.id]?.likes ?? c.likeCount)
        : (counts[c.id]?.dislikes ?? c.dislikeCount);
    const Icon = reaction === "like" ? ThumbsUp : ThumbsDown;
    return (
      <button
        type="button"
        onClick={() => react(c.id, reaction)}
        disabled={isPending}
        aria-pressed={active}
        aria-label={
          reaction === "like" ? "Like this comment" : "Dislike this comment"
        }
        className={`inline-flex h-7 items-center gap-1.5 rounded-[4px] border px-2 text-xs transition-colors disabled:opacity-60 ${
          active
            ? "border-[#c41e3a] bg-[#fff5f5] text-[#c41e3a]"
            : "border-[#e3bebd] text-[#5f5e5e] hover:border-[#c41e3a]"
        }`}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
        <span>{value.toLocaleString("en-IN")}</span>
      </button>
    );
  }

  function item(c: PublicComment, parentId: string, isReply: boolean) {
    const replyOpenHere = reply?.openUnder === c.id;
    return (
      <div
        className={`rounded-[4px] border border-[#e3bebd] bg-white p-4 ${
          isReply ? "bg-[#fffafa]" : ""
        }`}
      >
        <p className={`${MONO} text-[11px] text-[#8f6f6f] uppercase`}>
          {c.authorName} · {formatBlogDate(c.createdAt)}
        </p>
        <p className="mt-2 text-base leading-7 whitespace-pre-wrap text-[#2b3445]">
          {c.body}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {reactionButton(c, "like")}
          {reactionButton(c, "dislike")}
          <button
            type="button"
            onClick={() =>
              setReply(
                replyOpenHere
                  ? null
                  : {
                      openUnder: c.id,
                      parentId,
                      prefill: isReply ? `@${c.authorName} ` : "",
                    },
              )
            }
            className={`${MONO} ml-1 text-[11px] text-[#c41e3a] uppercase hover:underline`}
          >
            {replyOpenHere ? "Cancel reply" : "Reply"}
          </button>
        </div>

        {replyOpenHere && reply && (
          <div className="mt-4 border-t border-[#e3bebd] pt-4">
            <CommentForm
              key={reply.openUnder}
              postId={postId}
              parentId={reply.parentId}
              initialBody={reply.prefill}
              onCancel={() => setReply(null)}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <ul className="mt-6 flex flex-col gap-5">
      {topLevel.map((c) => {
        const replies = repliesByParent.get(c.id) ?? [];
        return (
          <li key={c.id}>
            {item(c, c.id, false)}
            {replies.length > 0 && (
              <ul className="mt-3 ml-4 flex flex-col gap-3 border-l-2 border-[#e3bebd] pl-4 sm:ml-8">
                {replies.map((r) => (
                  <li key={r.id}>{item(r, c.id, true)}</li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
