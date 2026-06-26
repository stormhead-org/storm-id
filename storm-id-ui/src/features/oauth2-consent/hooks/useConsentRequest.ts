"use client";

import { useQuery } from "@tanstack/react-query";

export interface ConsentRequestData {
  clientId: string;
  clientName: string;
  clientLogoUrl: string | null;
  requestedScope: string[];
  requestedAudience: string[];
}

export function useConsentRequest() {
  return useQuery<ConsentRequestData>({
    queryKey: ["consent-request"],
    queryFn: async () => {
      const res = await fetch("/api/hydra/auth/state");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to load consent request");
      }
      return res.json();
    },
    retry: false,
    staleTime: 0,
  });
}
