// server/actions/support.ts
// Server Actions for the support inbox. Every action starts with
// requireStaffAccess("henstel") — see services/staff.ts (Phase 1) for
// why that's the real authorization boundary, not the calling page.

"use server";

import * as Sentry from "@sentry/nextjs";
import { requireStaffAccess } from "@/services/staff";
import { sendReplySchema } from "@/schemas/support";
import * as conversationsService from "@/services/stream/conversations";
import type {
  ConversationSummary,
  ChatMessage,
  ConversationStatus,
} from "@/schemas/support";

export interface ListConversationsResult {
  status: "ok" | "error";
  conversations?: ConversationSummary[];
  message?: string;
}

export async function listConversationsAction(): Promise<ListConversationsResult> {
  await requireStaffAccess("henstel");

  try {
    const conversations = await conversationsService.listConversations();
    return { status: "ok", conversations };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message:
        err instanceof Error ? err.message : "Couldn't load conversations.",
    };
  }
}

export interface GetMessagesResult {
  status: "ok" | "error";
  messages?: ChatMessage[];
  message?: string;
}

/** Also marks the conversation read, since opening it in the UI is
 * exactly the "admin has seen this" moment the unread indicator tracks. */
export async function getConversationMessagesAction(
  channelId: string,
): Promise<GetMessagesResult> {
  await requireStaffAccess("henstel");

  try {
    const messages =
      await conversationsService.getConversationMessages(channelId);
    await conversationsService.markConversationRead(channelId);
    return { status: "ok", messages };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Couldn't load messages.",
    };
  }
}

export interface SendReplyResult {
  status: "ok" | "error";
  message?: string;
}

export async function sendReplyAction(
  channelId: string,
  text: string,
): Promise<SendReplyResult> {
  const staff = await requireStaffAccess("henstel");

  const parsed = sendReplySchema.safeParse({ channelId, text });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid message.",
    };
  }

  try {
    await conversationsService.sendReply(
      parsed.data.channelId,
      staff.id,
      parsed.data.text,
    );
    return { status: "ok" };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Couldn't send reply.",
    };
  }
}

export async function setConversationStatusAction(
  channelId: string,
  status: ConversationStatus,
): Promise<SendReplyResult> {
  await requireStaffAccess("henstel");

  try {
    await conversationsService.setConversationStatus(channelId, status);
    return { status: "ok" };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Couldn't update status.",
    };
  }
}
