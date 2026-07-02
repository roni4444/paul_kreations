// types/stream-chat.d.ts
// Declaration merging into stream-chat's own CustomChannelData interface
// (intentionally shipped empty by the library for exactly this purpose —
// see node_modules/stream-chat/dist/types/custom_types.d.ts). This is
// what makes support_user_id / status / last_admin_read_at type-check
// as real properties in channel filters, channel.data, and
// channel.update() calls, instead of needing an `any` cast anywhere
// (PROJECT_RULES.md §4: avoid `any`).
//
// Fields match exactly what support_chat_service_impl.dart writes
// (support_user_id, via extraData) plus the two admin-only fields this
// codebase adds via channel.update() (status, last_admin_read_at) — see
// services/stream/conversations.ts.

import "stream-chat";

declare module "stream-chat" {
  interface CustomChannelData {
    support_user_id?: string;
    status?: "open" | "resolved";
    last_admin_read_at?: string;
  }
}
