"use client";

import { useMutation } from "@tanstack/react-query";
import { useTokenStore, type IntrospectResponse } from "../store/token-store";

export function useTokenIntrospectionManager() {
  const { addToken } = useTokenStore();

  const introspectMutation = useMutation({
    mutationFn: async ({ token, scope }: { token: string; scope?: string }) => {
      const body = new URLSearchParams();
      body.set("token", token);
      if (scope) body.set("scope", scope);
      const res = await fetch("/api/hydra-admin/oauth2/introspect", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error("Failed to introspect token");
      return res.json() as Promise<IntrospectResponse>;
    },
    onSuccess: (data, variables) => {
      if (data.active) {
        addToken({
          ...data,
          id: crypto.randomUUID(),
          original_token: variables.token,
          introspected_at: new Date().toISOString(),
        });
      }
    },
  });

  const revokeMutation = useMutation({
    mutationFn: async (token: string) => {
      const body = new URLSearchParams();
      body.set("token", token);
      const res = await fetch("/api/hydra-admin/oauth2/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error("Failed to revoke token");
    },
  });

  return {
    introspect: (token: string, scope?: string) => introspectMutation.mutateAsync({ token, scope }),
    isIntrospecting: introspectMutation.isPending,
    introspectError: introspectMutation.error,
    revoke: revokeMutation.mutateAsync,
    isRevoking: revokeMutation.isPending,
  };
}

export function useTokenStats() {
  const tokens = useTokenStore((s) => s.tokens);
  const active = tokens.filter((t) => t.active).length;
  const expired = tokens.filter((t) => !t.active || (t.exp && t.exp * 1000 < Date.now())).length;
  return { active, expired, total: tokens.length };
}
