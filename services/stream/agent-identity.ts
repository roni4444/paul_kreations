// services/stream/agent-identity.ts
// Generates a stable, human-friendly pseudonym for a staff member from
// their Appwrite user ID — deterministic (same ID always yields the same
// name), so customers see a consistent "agent" across a conversation
// without ever seeing a staff member's real email. No new data entry
// step, no new Appwrite column — see ADR 0003.

const ADJECTIVES = [
  "Swift",
  "Bright",
  "Steady",
  "Quiet",
  "Sharp",
  "Calm",
  "Keen",
  "Clear",
  "Prime",
  "Solid",
  "Rapid",
  "Focused",
  "Precise",
  "Vivid",
  "Alert",
];

const NOUNS = [
  "Falcon",
  "Compass",
  "Beacon",
  "Harbor",
  "Ridge",
  "Ember",
  "Anchor",
  "Summit",
  "Cedar",
  "River",
  "Sparrow",
  "Lantern",
  "Meridian",
  "Atlas",
];

/** Simple, fast, non-cryptographic string hash — sufficient here since
 * this only needs to distribute IDs evenly across a small name list,
 * not resist any adversarial input. */
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** e.g. staffId "abc123" -> "Agent Swift Falcon", always the same
 * output for the same input. */
export function getAgentDisplayName(staffId: string): string {
  const hash = hashString(staffId);
  const adjective = ADJECTIVES[hash % ADJECTIVES.length];
  const noun = NOUNS[Math.floor(hash / ADJECTIVES.length) % NOUNS.length];
  return `Agent ${adjective} ${noun}`;
}

/** The Stream user ID for a staff member — namespaced so it can never
 * collide with a customer's own Stream user ID (customers are plain
 * app-side UUIDs with no prefix). */
export function getStaffStreamUserId(staffId: string): string {
  return `staff_${staffId}`;
}
