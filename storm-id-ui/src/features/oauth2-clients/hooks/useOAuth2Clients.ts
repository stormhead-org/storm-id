"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "@/src/shared/lib/i18n";

export interface OAuth2Client {
  client_id: string;
  client_name?: string;
  client_secret?: string;
  client_secret_expires_at?: number;
  redirect_uris?: string[];
  grant_types?: string[];
  response_types?: string[];
  scope?: string;
  token_endpoint_auth_method?: string;
  subject_type?: string;
  owner?: string;
  client_uri?: string;
  logo_uri?: string;
  userinfo_signed_response_alg?: string;
  backchannel_logout_uri?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

interface CreateClientInput {
  client_name?: string;
  redirect_uris: string[];
  grant_types: string[];
  response_types: string[];
  scope?: string;
  token_endpoint_auth_method?: string;
  subject_type?: string;
  metadata?: Record<string, unknown>;
  owner?: string;
}

export function useAllOAuth2Clients(owner?: string, opts?: { enabled?: boolean }) {
  return useQuery<OAuth2Client[]>({
    queryKey: ["oauth2-clients", owner],
    queryFn: async () => {
      const params = owner ? `?owner=${owner}` : "";
      const res = await fetch(`/api/hydra-admin/clients${params}`);
      if (!res.ok) throw new Error("Failed to fetch OAuth2 clients");
      return res.json();
    },
    staleTime: 30_000,
    enabled: opts?.enabled ?? true,
  });
}

export function useOAuth2Client(id: string) {
  return useQuery<OAuth2Client>({
    queryKey: ["oauth2-client", id],
    queryFn: async () => {
      const res = await fetch(`/api/hydra-admin/clients/${id}`);
      if (!res.ok) throw new Error("Failed to fetch OAuth2 client");
      return res.json();
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useCreateOAuth2Client() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: async (data: CreateClientInput) => {
      const res = await fetch("/api/hydra-admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error_description || err.error || "Failed to create client");
      }
      return res.json() as Promise<OAuth2Client>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oauth2-clients"] });
      toast.success(t("toasts.success.clientCreated"));
    },
    onError: () => {
      toast.error(t("toasts.error.clientCreateFailed"));
    },
  });
}

export function useUpdateOAuth2Client() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateClientInput> }) => {
      const res = await fetch(`/api/hydra-admin/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error_description || err.error || "Failed to update client");
      }
      return res.json() as Promise<OAuth2Client>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oauth2-clients"] });
      queryClient.invalidateQueries({ queryKey: ["oauth2-client"] });
      toast.success(t("toasts.success.clientUpdated"));
    },
    onError: () => {
      toast.error(t("toasts.error.clientUpdateFailed"));
    },
  });
}

export function useDeleteOAuth2Client() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/hydra-admin/clients/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error_description || err.error || "Failed to delete client");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oauth2-clients"] });
      toast.success(t("toasts.success.clientDeleted"));
    },
    onError: () => {
      toast.error(t("toasts.error.clientDeleteFailed"));
    },
  });
}
