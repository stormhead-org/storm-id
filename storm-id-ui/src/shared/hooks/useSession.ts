"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { SessionProfile } from "@/src/shared/types/session";

export function useSession() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const aal2Redirected = useRef(false);

  const { data, isLoading: loading } = useQuery<SessionProfile | null>({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/kratos/session/validate");
      if (!res.ok) {
        if (res.status === 401) return null;
        if (res.status === 403) {
          if (!aal2Redirected.current) {
            aal2Redirected.current = true;
            window.location.href = "/login?aal=aal2";
          }
          return null;
        }
        throw new Error("Failed to fetch session");
      }
      return res.json();
    },
    staleTime: 30_000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  const session = data ?? null;

  useEffect(() => {
    if (!loading && !session && !aal2Redirected.current) {
      router.push("/login");
    }
  }, [loading, session, router]);

  return {
    session,
    roles: session?.roles ?? [],
    permissions: session?.permissions ?? [],
    maxPosition: session?.maxPosition ?? 0,
    loading,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["session"] }),
  };
}
