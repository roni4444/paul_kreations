// services/stream/client.ts
// Server-only Stream Chat client. Never import from a "use client" file —
// this holds the API secret, which can sign tokens for any user identity.
//
// Uses the SAME Stream project the Henstel mobile app already uses
// (confirmed: same STREAM_APP_ID, a newly generated API key/secret pair
// for this admin integration — not a separate Stream app). Channels
// created by the app (support_{userId}_{category}) are the same
// channels this code queries and replies in.

import { StreamChat } from "stream-chat";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

let cachedClient: StreamChat | null = null;

/** Server-side Stream client authenticated with the API secret — full
 * privileges (read/write any channel, mint tokens for any user).
 * getInstance() is Stream's documented singleton pattern; caching it
 * here avoids re-creating the client on every Server Action call. */
export function getStreamServerClient(): StreamChat {
  if (!cachedClient) {
    cachedClient = StreamChat.getInstance(
      requireEnv("STREAM_API_KEY"),
      requireEnv("STREAM_SECRET_KEY"),
    );
  }
  return cachedClient;
}
