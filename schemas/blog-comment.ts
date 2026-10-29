// schemas/blog-comment.ts
// Validation for the public comment form, the reaction/view actions and
// the admin moderation actions (PROJECT_RULES.md §5).

import { z } from "zod";

export const commentFormSchema = z.object({
  postId: z.uuid(),
  authorName: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(60, "Name must be 60 characters or fewer."),
  body: z
    .string()
    .trim()
    .min(3, "Your comment is too short.")
    .max(2000, "Comments can be at most 2000 characters."),
  // Honeypot — real visitors never see or fill this.
  website: z.string().max(200).optional(),
  // Empty in local dev when no Turnstile key is configured; the server
  // verifier decides (services/security/turnstile.ts).
  turnstileToken: z.string().max(4096),
});

export type CommentFormInput = z.infer<typeof commentFormSchema>;

export const REACTIONS = ["like", "dislike"] as const;
export type Reaction = (typeof REACTIONS)[number];

export const reactionSchema = z.enum(REACTIONS);
export const postIdSchema = z.uuid();

export const COMMENT_STATUSES = ["pending", "approved", "rejected"] as const;
export type CommentStatus = (typeof COMMENT_STATUSES)[number];
export const commentStatusSchema = z.enum(COMMENT_STATUSES);
