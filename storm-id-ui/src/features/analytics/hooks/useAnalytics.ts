"use client";

import { useQuery } from "@tanstack/react-query";

interface KratosHealth {
  status: "ok" | "error";
}

interface HydraHealth {
  status: "ok" | "error";
}

interface Identity {
  id: string;
  traits?: {
    email?: string;
    name?: string;
  };
  created_at?: string;
  updated_at?: string;
  state?: string;
  schema_id?: string;
  schema_url?: string;
  verifiable_addresses?: Array<{
    verified: boolean;
  }>;
}

interface OAuth2ClientSummary {
  client_id: string;
  client_name?: string;
  token_endpoint_auth_method?: string;
  grant_types?: string[];
  created_at?: string;
}

interface KratosSession {
  id: string;
  active: boolean;
  authenticated_at: string;
  issued_at: string;
  expires_at: string;
}

export interface AnalyticsData {
  kratosHealth: boolean;
  hydraHealth: boolean;
  totalUsers: number;
  newUsers30d: number;
  verifiedUsers: number;
  verificationRate: number;
  activeSessions: number;
  sessions7d: number;
  totalClients: number;
  publicClients: number;
  confidentialClients: number;
  avgSessionDuration: number;
  identitySchemas: number;
  userGrowth: Array<{ date: string; count: number }>;
  clientTypes: Array<{ name: string; value: number }>;
  usersBySchema: Array<{ name: string; value: number }>;
  sessionActivity: Array<{ date: string; count: number }>;
  verificationGauge: Array<{ name: string; value: number }>;
  grantTypes: Array<{ name: string; value: number }>;
  identities: Identity[];
  clients: OAuth2ClientSummary[];
}

function useKratosHealth() {
  return useQuery<KratosHealth>({
    queryKey: ["kratos-health"],
    queryFn: async () => {
      const res = await fetch("/api/kratos-admin/health/ready");
      return { status: res.ok ? "ok" : "error" };
    },
    staleTime: 60_000,
  });
}

function useHydraHealth() {
  return useQuery<HydraHealth>({
    queryKey: ["hydra-health"],
    queryFn: async () => {
      const res = await fetch("/api/hydra-admin/health/ready");
      return { status: res.ok ? "ok" : "error" };
    },
    staleTime: 60_000,
  });
}

function useAllIdentities() {
  return useQuery<Identity[]>({
    queryKey: ["all-identities"],
    queryFn: async () => {
      const res = await fetch("/api/kratos-admin/identities?page_size=999");
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 60_000,
  });
}

function useAllClientsAnalytics() {
  return useQuery<OAuth2ClientSummary[]>({
    queryKey: ["all-clients-analytics"],
    queryFn: async () => {
      const res = await fetch("/api/hydra-admin/clients");
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 60_000,
  });
}

function useAllSessions() {
  return useQuery<KratosSession[]>({
    queryKey: ["all-sessions"],
    queryFn: async () => {
      const res = await fetch("/api/kratos-admin/sessions?page_size=999");
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
    staleTime: 60_000,
    retry: 1,
  });
}

export function useAnalytics(): {
  data: AnalyticsData | null;
  isLoading: boolean;
  error: boolean;
  refetch: () => void;
} {
  const kratos = useKratosHealth();
  const hydra = useHydraHealth();
  const identities = useAllIdentities();
  const clients = useAllClientsAnalytics();
  const sessions = useAllSessions();

  const isLoading = identities.isLoading || clients.isLoading || sessions.isLoading;
  const error = !!identities.error;

  const data: AnalyticsData | null = identities.data
    ? {
        kratosHealth: kratos.data?.status === "ok",
        hydraHealth: hydra.data?.status === "ok",
        totalUsers: identities.data.length,
        newUsers30d: buildNewUsers30d(identities.data),
        verifiedUsers: identities.data.filter((i) =>
          i.verifiable_addresses?.some((a) => a.verified),
        ).length,
        verificationRate:
          identities.data.length > 0
            ? Math.round(
                (identities.data.filter((i) => i.verifiable_addresses?.some((a) => a.verified))
                  .length /
                  identities.data.length) *
                  100,
              )
            : 0,
        activeSessions: sessions.data ? sessions.data.filter((s) => s.active).length : 0,
        sessions7d: sessions.data ? buildSessions7d(sessions.data) : 0,
        totalClients: clients.data?.length ?? 0,
        publicClients:
          clients.data?.filter((c) => c.token_endpoint_auth_method === "none").length ?? 0,
        confidentialClients:
          clients.data?.filter((c) => c.token_endpoint_auth_method !== "none").length ?? 0,
        avgSessionDuration: sessions.data
          ? buildAvgSessionDuration(sessions.data.filter((s) => s.active))
          : 0,
        identitySchemas: new Set(
          identities.data.map((i) => i.schema_id || "default").filter(Boolean),
        ).size,
        userGrowth: buildUserGrowth(identities.data),
        clientTypes: buildClientTypes(clients.data ?? []),
        usersBySchema: buildUsersBySchema(identities.data),
        sessionActivity: sessions.data ? buildSessionActivity(sessions.data) : [],
        verificationGauge: buildVerificationGauge(
          identities.data.filter((i) => i.verifiable_addresses?.some((a) => a.verified)).length,
          identities.data.length,
        ),
        grantTypes: buildGrantTypes(clients.data ?? []),
        identities: identities.data,
        clients: clients.data ?? [],
      }
    : null;

  return {
    data,
    isLoading,
    error,
    refetch: () => {
      kratos.refetch();
      hydra.refetch();
      identities.refetch();
      clients.refetch();
      sessions.refetch();
    },
  };
}

function buildNewUsers30d(identities: Identity[]): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  return identities.filter((i) => {
    if (!i.created_at) return false;
    return new Date(i.created_at) >= cutoff;
  }).length;
}

function buildSessions7d(sessions: KratosSession[]): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return sessions.filter((s) => {
    return new Date(s.authenticated_at || s.issued_at) >= cutoff;
  }).length;
}

function buildAvgSessionDuration(activeSessions: KratosSession[]): number {
  if (activeSessions.length === 0) return 0;
  let totalMinutes = 0;
  const now = Date.now();
  for (const session of activeSessions) {
    const issued = new Date(session.issued_at || session.authenticated_at).getTime();
    const expires = new Date(session.expires_at).getTime();
    const durationMs = Math.min(expires, now) - issued;
    totalMinutes += Math.max(0, Math.round(durationMs / 60000));
  }
  return Math.round(totalMinutes / activeSessions.length);
}

function buildUserGrowth(identities: Identity[]): Array<{ date: string; count: number }> {
  const daily: Record<string, number> = {};
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    daily[key] = 0;
  }
  for (const identity of identities) {
    if (identity.created_at) {
      const d = new Date(identity.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (daily[key] !== undefined) daily[key]++;
    }
  }
  return Object.entries(daily).map(([date, count]) => ({ date, count }));
}

function buildClientTypes(clients: OAuth2ClientSummary[]): Array<{ name: string; value: number }> {
  const publicCount = clients.filter((c) => c.token_endpoint_auth_method === "none").length;
  const confidentialCount = clients.length - publicCount;
  return [
    { name: "Public (PKCE)", value: publicCount },
    { name: "Confidential", value: confidentialCount },
  ];
}

function buildUsersBySchema(identities: Identity[]): Array<{ name: string; value: number }> {
  const schemaCounts: Record<string, number> = {};
  for (const identity of identities) {
    const schema = identity.schema_id || "default";
    schemaCounts[schema] = (schemaCounts[schema] || 0) + 1;
  }
  return Object.entries(schemaCounts).map(([name, value]) => ({ name, value }));
}

function buildSessionActivity(sessions: KratosSession[]): Array<{ date: string; count: number }> {
  const daily: Record<string, number> = {};
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    daily[key] = 0;
  }
  for (const session of sessions) {
    const dateStr = session.authenticated_at || session.issued_at;
    if (dateStr) {
      const d = new Date(dateStr);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (daily[key] !== undefined) daily[key]++;
    }
  }
  return Object.entries(daily).map(([date, count]) => ({ date, count }));
}

function buildVerificationGauge(
  verified: number,
  total: number,
): Array<{ name: string; value: number }> {
  const verifiedCount = verified;
  const unverifiedCount = total - verified;
  return [
    { name: "Verified", value: verifiedCount },
    { name: "Unverified", value: unverifiedCount },
  ];
}

function buildGrantTypes(clients: OAuth2ClientSummary[]): Array<{ name: string; value: number }> {
  const grantCounts: Record<string, number> = {};
  for (const client of clients) {
    for (const gt of client.grant_types || ["authorization_code"]) {
      grantCounts[gt] = (grantCounts[gt] || 0) + 1;
    }
  }
  return Object.entries(grantCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
