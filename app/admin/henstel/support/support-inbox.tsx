"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  listConversationsAction,
  getConversationMessagesAction,
  sendReplyAction,
  setConversationStatusAction,
} from "@/server/actions/support";
import type { ConversationSummary, ChatMessage } from "@/schemas/support";
import { SUPPORT_CATEGORY_LABELS } from "@/schemas/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const POLL_INTERVAL_MS = 8000;

function formatTime(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function SupportInbox() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const refreshList = useCallback(async () => {
    const result = await listConversationsAction();
    if (result.status === "error") {
      setError(result.message ?? "Couldn't load conversations.");
      return;
    }
    setError(null);
    setConversations(result.conversations ?? []);
  }, []);

  useEffect(() => {
    refreshList().finally(() => setLoading(false));
    const interval = setInterval(refreshList, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refreshList]);

  const selected =
    conversations.find((c) => c.channelId === selectedId) ?? null;

  if (loading) {
    return <p className="text-sm text-[#5f5e5e]">Loading conversations…</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[300px_1fr]">
      <div className="flex flex-col gap-2">
        {error && (
          <p role="alert" className="text-sm text-[#9e0027]">
            {error}
          </p>
        )}
        {conversations.length === 0 && !error && (
          <p className="text-sm text-[#5f5e5e]">No conversations yet.</p>
        )}
        {conversations.map((conv) => (
          <button
            key={conv.channelId}
            type="button"
            onClick={() => setSelectedId(conv.channelId)}
            className={`flex flex-col gap-1 rounded-[4px] border px-3 py-2.5 text-left transition-colors ${
              selectedId === conv.channelId
                ? "border-[#c41e3a] bg-[#fff5f5]"
                : "border-[#e3bebd] bg-white hover:bg-[#fff5f5]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] tracking-wide text-[#8f6f6f] uppercase">
                {conv.category
                  ? SUPPORT_CATEGORY_LABELS[conv.category]
                  : "Support"}
              </span>
              {conv.adminUnread && (
                <span
                  className="size-2 shrink-0 rounded-full bg-[#c41e3a]"
                  aria-label="Unread"
                />
              )}
            </div>
            <p className="truncate text-sm text-[#111c2d]">
              {conv.lastMessageText ?? "(no messages yet)"}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8f6f6f]">
                {formatTime(conv.lastMessageAt)}
              </span>
              <span
                className={`rounded-[4px] px-1.5 py-0.5 font-mono text-[10px] uppercase ${
                  conv.status === "resolved"
                    ? "bg-[#eaf3de] text-[#3b6d11]"
                    : "bg-[#ffdad9] text-[#9e0027]"
                }`}
              >
                {conv.status}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-[4px] border border-[#e3bebd] bg-white">
        {selected ? (
          // key={selected.channelId} forces a full remount when the
          // selected conversation changes. ConversationPanel's own
          // state (messages, loadingMessages, draft) then resets via
          // React's normal mount lifecycle instead of a synchronous
          // setState call inside an effect — which is both a real bug
          // (this component was never unmounting between selections, so
          // stale messages/draft could bleed across conversations) and
          // what react-hooks/set-state-in-effect was correctly flagging.
          <ConversationPanel
            key={selected.channelId}
            conversation={selected}
            onStatusChanged={refreshList}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-10">
            <p className="text-sm text-[#8f6f6f]">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ConversationPanel({
  conversation,
  onStatusChanged,
}: {
  conversation: ConversationSummary;
  onStatusChanged: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const refreshMessages = useCallback(async () => {
    const result = await getConversationMessagesAction(conversation.channelId);
    if (result.status === "ok") {
      setMessages(result.messages ?? []);
    }
  }, [conversation.channelId]);

  useEffect(() => {
    // No setLoadingMessages(true) here — loadingMessages already starts
    // true via useState(true), and this component now fully remounts
    // per conversation (see the `key` prop above), so that initial
    // value is always correct for whichever conversation is selected.
    refreshMessages().finally(() => setLoadingMessages(false));
    const interval = setInterval(refreshMessages, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refreshMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages.length]);

  async function handleSend() {
    if (!draft.trim()) return;
    setSending(true);
    setSendError(null);

    const result = await sendReplyAction(conversation.channelId, draft.trim());

    setSending(false);
    if (result.status === "error") {
      setSendError(result.message ?? "Couldn't send reply.");
      return;
    }
    setDraft("");
    refreshMessages();
  }

  async function handleToggleStatus() {
    const nextStatus = conversation.status === "resolved" ? "open" : "resolved";
    await setConversationStatusAction(conversation.channelId, nextStatus);
    onStatusChanged();
  }

  return (
    <div className="flex h-[560px] flex-col">
      <div className="flex items-center justify-between border-b border-[#e3bebd] bg-[#fff5f5] px-4 py-3">
        <div>
          <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
            {conversation.category
              ? SUPPORT_CATEGORY_LABELS[conversation.category]
              : "Support"}
          </p>
          <p className="text-xs text-[#5f5e5e]">
            Customer {conversation.customerUserId}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleToggleStatus}
          className="h-7 rounded-[4px]"
        >
          {conversation.status === "resolved" ? "Reopen" : "Mark resolved"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loadingMessages ? (
          <p className="text-sm text-[#5f5e5e]">Loading messages…</p>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isStaff ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-[4px] px-3 py-2 text-sm ${
                    msg.isStaff
                      ? "bg-[#c41e3a] text-white"
                      : "bg-[#f0f3ff] text-[#111c2d]"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="mt-0.5 text-[10px] text-[#8f6f6f]">
                  {msg.isStaff ? msg.senderName : "Customer"} ·{" "}
                  {formatTime(msg.createdAt)}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-[#e3bebd] p-3">
        {sendError && (
          <p role="alert" className="mb-2 text-sm text-[#9e0027]">
            {sendError}
          </p>
        )}
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a reply…"
            className="rounded-[4px] border-[#e3bebd]"
          />
          <Button
            type="button"
            onClick={handleSend}
            disabled={sending || !draft.trim()}
            className="h-9 shrink-0 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
          >
            {sending ? "Sending…" : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
