"use client";

import { useActionState } from "react";
import {
  requestMagicLink,
  type MagicLinkState,
} from "@/server/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: MagicLinkState = { status: "idle" };

export function LoginForm({ app }: { app: string }) {
  const [state, formAction, isPending] = useActionState(
    requestMagicLink,
    initialState,
  );

  if (state.status === "sent") {
    return (
      <div className="rounded-[4px] border border-[#e3bebd] bg-[#fff5f5] px-4 py-4 text-sm">
        <p className="font-medium text-[#111c2d]">Check your email</p>
        <p className="mt-1 text-[#5f5e5e]">
          We sent a sign-in link. Open it on this device to continue.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="app" value={app} />

      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="email"
          className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase"
        >
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@paulkreations.com"
          className="rounded-[4px] border-[#e3bebd] focus-visible:border-[#c41e3a] focus-visible:ring-[#c41e3a]/20"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-[#9e0027]">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-9 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
      >
        {isPending ? "Sending…" : "Send sign-in link"}
      </Button>
    </form>
  );
}
