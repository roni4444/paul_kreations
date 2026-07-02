# 0003 — Support inbox uses the `stream-chat` server SDK

## Status

Accepted

## Context

The Henstel mobile app's customer support chat already runs on Stream
Chat (see `support_chat_service_impl.dart` / `support_view_model.dart`).
The admin section needs a read-and-reply inbox into those same
conversations. Per `PROJECT_RULES.md` §7, new dependencies require
justification.

## Decision

Add `stream-chat` (Stream's official Node/JS client) as a **server-only**
dependency, imported exclusively inside `services/stream/*`.

- Stream's protocol (channel queries, membership, message send, server
  token signing) is a well-defined external contract with real security
  consequences if implemented incorrectly by hand (the signing scheme in
  particular). This mirrors the reasoning already used for
  `@supabase/ssr` and `node-appwrite` — an official SDK for a
  non-trivial external protocol, not a convenience wrapper around a
  single REST call the way `services/gemini/recipe-extraction.ts` uses
  raw `fetch`.
- No overlap with anything already in the stack — there is no existing
  chat/messaging dependency.

## No browser-side Stream client

A conventional real-time inbox connects Stream's client SDK directly in
the browser via WebSocket, which requires minting and shipping a
per-user Stream token to that browser. Two rules argue against this:

- §9: "No secrets in client code." A Stream user token is scoped (not
  the full API secret), but it is still a credential that grants
  message-send rights as that identity — better kept server-side.
- §8: "Minimize client JS." The browser client bundle is large and adds
  its own connection-lifecycle complexity (exactly the kind of bug the
  Flutter app's `SupportChatServiceImpl` singleton workaround exists to
  paper over).

Instead: all Stream calls happen in Server Actions. The inbox page
polls a Server Action every ~8 seconds for new messages while open.
This trades true real-time push for a simpler, more rule-compliant
architecture. If sub-second latency becomes a real requirement later,
this can be revisited — noted here rather than decided unilaterally.

## Staff identity in chat

Each staff member authenticates to Stream as their own user
(`staff_{appwriteUserId}`), not a single shared identity, so replies
are individually attributable. The customer-facing display name is a
deterministic pseudonym derived from that ID (see
`services/stream/agent-identity.ts`) rather than the staff member's real
email — chosen so customers never see staff members' actual identities,
without adding a new editable "display name" field/UI for this first
version.

## Conversation state without a new database table

"Resolved" status is stored as **Stream channel custom data**
(`status`), updated via `channel.update()`, rather than a new Supabase
table. "Unread by admin" is *derived*, not stored as a flag — computed
from a `last_admin_read_at` timestamp (also channel custom data, set
whenever a staff member views or replies to a conversation) compared
against the most recent message's sender and timestamp. This was
deliberately designed to require zero changes to the existing mobile
app: it never needs to write anything for this to work. Both approaches
keep Phase 3 fully isolated from Phase 2's `chef`/`staging` schemas,
avoiding any new sync surface between two sources of truth.

## Alternatives considered

- **Store conversation state in a new Supabase table.** Rejected for
  now: introduces a new table needing its own RLS setup and a
  Stream-Supabase sync path for something Stream already supports
  natively via custom channel data.
- **Give admin a shared "Henstel Support" Stream identity.** Rejected:
  loses accountability for which staff member replied to what.
- **True real-time via a browser-side Stream client.** Deferred — see
  above.

## Consequences

- One new dependency, `stream-chat`, scoped entirely to
  `services/stream/*`.
- Messages have up to ~8 seconds of latency versus true push — an
  explicit, documented trade-off, not an oversight.
- If the customer-facing pseudonym scheme ever needs to be
  staff-editable, that's a small additive change (an optional
  `displayName` column on the existing Appwrite `staff` table), not a
  redesign.
