// supabase/functions/deno-env.d.ts
// Editor-only type shims for Supabase Edge Functions (Deno runtime).
// The Next.js app is type-checked by Node/TypeScript, which knows nothing
// about the Deno global or `jsr:` imports. These declarations make the
// editor happy; they have no effect at runtime or on `supabase functions deploy`.

declare module "jsr:@supabase/supabase-js@2" {
  export * from "@supabase/supabase-js";
}

declare namespace Deno {
  const env: {
    get(key: string): string | undefined;
  };
  function serve(
    handler: (req: Request) => Response | Promise<Response>,
  ): unknown;
}
