"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Session {
  id: string;
  active: boolean;
  authenticated_at: string;
  issued_at: string;
  expires_at: string;
  authenticator_assurance_level?: "aal1" | "aal2" | "aal3";
  authentication_methods?: Array<{
    method: string;
    completed_at: string;
  }>;
  devices?: Array<{
    ip_address?: string;
    user_agent?: string;
    location?: string;
  }>;
}

export function useIdentitySessions(identityId?: string) {
  return useQuery<Session[]>({
    queryKey: ["identity-sessions", identityId],
    queryFn: async () => {
      if (!identityId) return [];
      const res = await fetch(`/api/kratos-admin/identities/${identityId}/sessions`);
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return res.json();
    },
    enabled: !!identityId,
    staleTime: 30_000,
  });
}

export function useSessionRefresh() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["identity-sessions"] });
}
