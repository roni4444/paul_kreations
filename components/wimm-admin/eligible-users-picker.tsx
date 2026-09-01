"use client";

// components/wimm-admin/eligible-users-picker.tsx
// Lets the admin type an email, resolves it to an auth.users id via the
// wimm-admin-user-lookup Edge Function (through lookupUserByEmailAction),
// and shows the resulting chips with email visible — never raw UUIDs.
// An empty list means "everyone", per money.promo_offers.eligible_user_ids.

import { useState, useTransition } from "react";
import { Loader2, X } from "lucide-react";
import { lookupUserByEmailAction } from "@/server/actions/wimm-admin";
import type { EligibleUser } from "@/lib/wimm-admin/types";

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";
const FIELD =
  "w-full px-3 border border-[#D8E8E0] bg-white text-[#0E2A20] text-sm outline-none transition-all placeholder:text-[#8FA69B] focus:border-[#0F7A4E] focus:border-2 disabled:opacity-50 disabled:cursor-not-allowed";

export function EligibleUsersPicker({
  initialUsers,
  onChange,
}: {
  initialUsers: EligibleUser[];
  onChange: (users: EligibleUser[]) => void;
}) {
  const [users, setUsers] = useState<EligibleUser[]>(initialUsers);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateUsers(next: EligibleUser[]) {
    setUsers(next);
    onChange(next);
  }

  function handleAdd() {
    setError("");
    const trimmed = email.trim();
    if (!trimmed) return;

    if (users.some((u) => u.email.toLowerCase() === trimmed.toLowerCase())) {
      setError("Already added.");
      return;
    }

    startTransition(async () => {
      const result = await lookupUserByEmailAction(trimmed);
      if (result.status === "found" && result.user) {
        updateUsers([...users, result.user]);
        setEmail("");
      } else if (result.status === "not_found") {
        setError("No account found with that email.");
      } else {
        setError(result.message ?? "Lookup failed. Please try again.");
      }
    });
  }

  function handleRemove(id: string) {
    updateUsers(users.filter((u) => u.id !== id));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="collaborator@email.com"
          className={`${FIELD} h-10`}
          disabled={isPending}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isPending || !email.trim()}
          className="shrink-0 h-10 px-4 bg-[#0F7A4E] hover:bg-[#0A5C3A] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors inline-flex items-center gap-2"
        >
          {isPending && (
            <Loader2 size={14} className="animate-spin" aria-hidden="true" />
          )}
          Add
        </button>
      </div>

      {error && (
        <span className={`${MONO} text-[10px] text-[#C0392B]`}>{error}</span>
      )}

      {users.length === 0 ? (
        <p className={`${MONO} text-[11px] text-[#7C9187] uppercase`}>
          Empty — everyone can see and apply this offer.
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {users.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between px-3 py-1.5 border border-[#D8E8E0] bg-[#F6FAF8] text-sm text-[#0E2A20]"
            >
              {u.email}
              <button
                type="button"
                onClick={() => handleRemove(u.id)}
                aria-label={`Remove ${u.email}`}
                className="text-[#7C9187] hover:text-[#C0392B]"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
