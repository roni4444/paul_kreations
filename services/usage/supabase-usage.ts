// services/usage/supabase-usage.ts
// Reads real project metadata (status, region) via the Supabase
// Management API, scoped to a single named organization
// (SUPABASE_ORG_SLUG). GET /v1/projects returns every project the
// token's account can see across all orgs — there's no built-in
// per-org filter on that endpoint — so this resolves the org slug to
// its ID via GET /v1/organizations first, then filters client-side on
// each project's organization_id.
//
// Detailed bandwidth/storage/compute usage numbers live behind the
// Studio billing UI, not a stable Management API endpoint accessible
// to a personal access token — rather than fabricate that data, this
// links out to the dashboard for it.

import type { SupabaseUsage } from "@/schemas/usage";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

interface SupabaseOrgResponse {
  id: string;
  name: string;
}

interface SupabaseProjectResponse {
  id: string;
  name: string;
  region: string;
  status: string;
  organization_id: string;
}

export async function getSupabaseUsage(): Promise<SupabaseUsage> {
  try {
    const token = requireEnv("SUPABASE_MANAGEMENT_ACCESS_TOKEN");
    const orgSlug = requireEnv("SUPABASE_ORG_SLUG");
    const headers = { Authorization: `Bearer ${token}` };

    const orgsRes = await fetch("https://api.supabase.com/v1/organizations", {
      headers,
    });
    if (!orgsRes.ok) {
      throw new Error(
        `Supabase organizations request failed (${orgsRes.status})`,
      );
    }
    const orgs = (await orgsRes.json()) as SupabaseOrgResponse[];

    console.log(
      `[getSupabaseUsage] Organizations visible to this token:`,
      orgs.map((o) => ({ id: o.id, name: o.name })),
    );

    const matchedOrg = orgs.find(
      (o) =>
        o.id.toLowerCase() === orgSlug.toLowerCase() ||
        o.name.toLowerCase() === orgSlug.toLowerCase(),
    );

    if (!matchedOrg) {
      throw new Error(
        `No organization matching "${orgSlug}" was found. Check the console log above for the exact id/name values this token can see, and set SUPABASE_ORG_SLUG to one of those.`,
      );
    }

    const projectsRes = await fetch("https://api.supabase.com/v1/projects", {
      headers,
    });
    if (!projectsRes.ok) {
      throw new Error(
        `Supabase projects request failed (${projectsRes.status})`,
      );
    }
    const allProjects = (await projectsRes.json()) as SupabaseProjectResponse[];

    const projects = allProjects.filter(
      (p) => p.organization_id === matchedOrg.id,
    );

    console.log(
      `[getSupabaseUsage] ${projects.length} of ${allProjects.length} total project(s) belong to "${matchedOrg.name}".`,
    );

    return {
      status: "ok",
      projects: projects.map((p) => ({
        id: p.id,
        name: p.name,
        region: p.region,
        status: p.status,
      })),
      dashboardUrl: `https://supabase.com/dashboard/org/${matchedOrg.id}/general`,
    };
  } catch (err) {
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : "Couldn't load Supabase project status.",
    };
  }
}
