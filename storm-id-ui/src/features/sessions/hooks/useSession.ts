"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "@/src/shared/lib/i18n";

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
    id?: string;
    ip_address?: string;
    user_agent?: string;
    location?: string;
  }>;
  identity?: {
    id: string;
    traits?: Record<string, unknown>;
    state?: string;
    schema_id?: string;
  };
}

export function useSession(sessionId?: string) {
  return useQuery<Session | null>({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      if (!sessionId) return null;
      const res = await fetch(
        `/api/kratos-admin/sessions/${sessionId}?expand=identity&expand=devices`,
      );
      if (!res.ok) throw new Error("Failed to fetch session");
      return res.json();
    },
    enabled: !!sessionId,
  });
}

export function useDisableSession() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await fetch(`/api/kratos-admin/sessions/${sessionId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed to revoke session");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.invalidateQueries({ queryKey: ["identity-sessions"] });
      toast.success(t("toasts.success.sessionRevoked"));
    },
    onError: () => {
      toast.error(t("toasts.error.sessionRevokeFailed"));
    },
  });
}

export function useExtendSession() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await fetch(`/api/kratos-admin/sessions/${sessionId}/extend`, {
        method: "PATCH",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed to extend session");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.invalidateQueries({ queryKey: ["identity-sessions"] });
      toast.success(t("toasts.success.sessionExtended"));
    },
    onError: () => {
      toast.error(t("toasts.error.sessionExtendFailed"));
    },
  });
}
