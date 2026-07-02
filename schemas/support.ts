// schemas/support.ts
// Validates data crossing the boundary with Stream Chat — external
// service responses are still external input, never trusted blindly.

import { z } from "zod";

// Mirrors support_category.dart exactly, so admin filters and channel
// IDs stay in sync with the categories the mobile app already writes.
export const supportCategorySchema = z.enum([
  "account",
  "payment",
  "technical",
  "feedback",
]);
export type SupportCategoryId = z.infer<typeof supportCategorySchema>;

export const SUPPORT_CATEGORY_LABELS: Record<SupportCategoryId, string> = {
  account: "Account & Access",
  payment: "Payment & Billing",
  technical: "Technical",
  feedback: "Complaint & Feedback",
};

export const conversationStatusSchema = z.enum(["open", "resolved"]);
export type ConversationStatus = z.infer<typeof conversationStatusSchema>;

export const sendReplySchema = z.object({
  channelId: z.string().min(1),
  text: z.string().min(1, "Message can't be empty").max(5000),
});
export type SendReplyInput = z.infer<typeof sendReplySchema>;

export const conversationSummarySchema = z.object({
  channelId: z.string(),
  category: supportCategorySchema.nullable(),
  status: conversationStatusSchema,
  adminUnread: z.boolean(),
  customerUserId: z.string(),
  lastMessageText: z.string().nullable(),
  lastMessageAt: z.string().nullable(),
});
export type ConversationSummary = z.infer<typeof conversationSummarySchema>;

export const chatMessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  senderId: z.string(),
  senderName: z.string(),
  isStaff: z.boolean(),
  createdAt: z.string(),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;
