// services/stream/conversations.ts
// All Stream Chat reads/writes for the support inbox. Server Actions
// call into these functions — never call getStreamServerClient()
// directly anywhere else.
//
// Custom channel fields (support_user_id, status, last_admin_read_at)
// type-check as real properties — not `any` — because of the
// declaration merging in types/stream-chat.d.ts, which augments
// stream-chat's own (intentionally empty) CustomChannelData interface.

import { getStreamServerClient } from "./client";
import { getAgentDisplayName, getStaffStreamUserId } from "./agent-identity";
import type {
  ChatMessage,
  ConversationStatus,
  ConversationSummary,
  SupportCategoryId,
} from "@/schemas/support";

const CHANNEL_TYPE = "messaging";
const SUPPORT_CHANNEL_PREFIX = "support_";

/** Extracts the category suffix from a channel ID formatted as
 * support_{userId}_{category} (see support_category.dart /
 * support_chat_service_impl.dart) — the suffix is always the last
 * underscore-delimited segment and always one of the 4 known values. */
function parseCategoryFromChannelId(
  channelId: string,
): SupportCategoryId | null {
  const suffix = channelId.split("_").pop();
  const known: SupportCategoryId[] = [
    "account",
    "payment",
    "technical",
    "feedback",
  ];
  return known.includes(suffix as SupportCategoryId)
    ? (suffix as SupportCategoryId)
    : null;
}

export async function listConversations(): Promise<ConversationSummary[]> {
  const client = getStreamServerClient();

  // Queries all channels of type "messaging" rather than filtering on
  // the support_user_id custom field server-side (Stream's $exists
  // operator against a schemaless custom field proved unreliable in
  // practice — conversations visible in the Stream dashboard were not
  // being returned). Filtering down to just support channels happens
  // here in code, on the ID prefix support_chat_service_impl.dart
  // always writes. At current volume (single digits of conversations)
  // this is simpler and removes a whole class of "did the filter syntax
  // actually match" doubt, at negligible cost.
  const allChannels = await client.queryChannels(
    { type: CHANNEL_TYPE },
    { last_message_at: -1 },
    { state: true, watch: false, message_limit: 1, limit: 30 },
  );

  console.log(
    `[listConversations] Stream returned ${allChannels.length} total "${CHANNEL_TYPE}" channel(s):`,
    allChannels.map((c) => c.id),
  );

  const channels = allChannels.filter((c) =>
    c.id?.startsWith(SUPPORT_CHANNEL_PREFIX),
  );

  console.log(
    `[listConversations] ${channels.length} match the "${SUPPORT_CHANNEL_PREFIX}" prefix.`,
  );

  return channels.map((channel) => {
    const data = channel.data ?? {};
    const lastMessage = channel.state.messages.at(-1);
    const customerUserId = data.support_user_id ?? "";

    // "Unread by admin" is derived, not stored as a flag someone else
    // (the mobile app) would need to set: true only when the most
    // recent message is from the customer AND it arrived after the
    // last time admin marked this channel read. This keeps the whole
    // mechanism self-contained on the admin side — no mobile app change
    // required.
    const lastAdminReadAt = data.last_admin_read_at
      ? new Date(data.last_admin_read_at).getTime()
      : 0;
    const lastMessageIsFromCustomer = Boolean(
      lastMessage && !lastMessage.user?.id?.startsWith("staff_"),
    );
    const lastMessageTime = lastMessage?.created_at
      ? new Date(lastMessage.created_at).getTime()
      : 0;
    const adminUnread =
      lastMessageIsFromCustomer && lastMessageTime > lastAdminReadAt;

    return {
      channelId: channel.id ?? "",
      category: parseCategoryFromChannelId(channel.id ?? ""),
      status:
        data.status === "resolved"
          ? "resolved"
          : ("open" as ConversationStatus),
      adminUnread,
      customerUserId,
      lastMessageText: lastMessage?.text ?? null,
      lastMessageAt: lastMessage?.created_at
        ? new Date(lastMessage.created_at).toISOString()
        : null,
    };
  });
}

export async function getConversationMessages(
  channelId: string,
): Promise<ChatMessage[]> {
  const client = getStreamServerClient();
  const channel = client.channel(CHANNEL_TYPE, channelId);
  const state = await channel.query({ messages: { limit: 200 } });

  return (state.messages ?? []).map((msg) => {
    const senderId = msg.user?.id ?? "unknown";
    const isStaff = senderId.startsWith("staff_");
    return {
      id: msg.id,
      text: msg.text ?? "",
      senderId,
      senderName: isStaff ? (msg.user?.name ?? "Support") : "Customer",
      isStaff,
      createdAt: msg.created_at
        ? new Date(msg.created_at).toISOString()
        : new Date().toISOString(),
    };
  });
}

/** Sends a reply as the given staff member. Ensures that staff member
 * exists as a Stream user (with their pseudonym as display name) before
 * sending, since Stream requires the sender to be an upserted user. */
export async function sendReply(
  channelId: string,
  staffId: string,
  text: string,
): Promise<void> {
  const client = getStreamServerClient();
  const streamUserId = getStaffStreamUserId(staffId);

  await client.upsertUser({
    id: streamUserId,
    name: getAgentDisplayName(staffId),
  });

  const channel = client.channel(CHANNEL_TYPE, channelId);
  await channel.sendMessage({ text, user_id: streamUserId });

  // Replying implies the admin has seen everything up to now.
  await channel.update({ last_admin_read_at: new Date().toISOString() });
}

export async function setConversationStatus(
  channelId: string,
  status: ConversationStatus,
): Promise<void> {
  const client = getStreamServerClient();
  const channel = client.channel(CHANNEL_TYPE, channelId);
  await channel.update({ status });
}

export async function markConversationRead(channelId: string): Promise<void> {
  const client = getStreamServerClient();
  const channel = client.channel(CHANNEL_TYPE, channelId);
  await channel.update({ last_admin_read_at: new Date().toISOString() });
}
