"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "@/src/shared/lib/i18n";

interface IdentityAddress {
  id: string;
  value: string;
  verified: boolean;
  via: string;
  status: string;
}

export interface Identity {
  id: string;
  state: string;
  traits?: {
    email?: string;
    name?: string;
    [key: string]: unknown;
  };
  verifiable_addresses?: IdentityAddress[];
  created_at: string;
  updated_at: string;
  schema_id?: string;
  schema_url?: string;
  metadata_public?: Record<string, unknown>;
  metadata_admin?: Record<string, unknown>;
  credentials?: Record<
    string,
    { type: string; identifiers: string[]; config?: Record<string, unknown> }
  >;
}

interface CreateIdentityInput {
  schema_id: string;
  traits: Record<string, unknown>;
  credentials?: Record<string, unknown>;
  metadata_admin?: Record<string, unknown>;
  metadata_public?: Record<string, unknown>;
  state?: string;
}

export function useIdentities(pageSize = 100) {
  return useQuery<Identity[]>({
    queryKey: ["identities", pageSize],
    queryFn: async () => {
      const res = await fetch(`/api/kratos-admin/identities?page_size=${pageSize}`);
      if (!res.ok) throw new Error("Failed to fetch identities");
      return res.json();
    },
    staleTime: 30_000,
  });
}

export function useIdentity(id?: string) {
  return useQuery<Identity>({
    queryKey: ["identity", id],
    queryFn: async () => {
      if (!id) throw new Error("No identity ID");
      const res = await fetch(`/api/kratos-admin/identities/${id}`);
      if (!res.ok) throw new Error("Failed to fetch identity");
      return res.json();
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useCreateIdentity() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: async (data: CreateIdentityInput) => {
      const res = await fetch("/api/kratos-admin/identities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || err.message || "Failed to create identity");
      }
      return res.json() as Promise<Identity>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] });
      toast.success(t("toasts.success.identityCreated"));
    },
    onError: () => {
      toast.error(t("toasts.error.identityCreateFailed"));
    },
  });
}

export function useDeleteIdentity() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/kratos-admin/identities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete identity");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] });
      toast.success(t("toasts.success.identityDeleted"));
    },
    onError: () => {
      toast.error(t("toasts.error.identityDeleteFailed"));
    },
  });
}

export function usePatchIdentity() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
      const jsonPatch = [{ op: "replace", path: "/traits", value: data }];
      const res = await fetch(`/api/kratos-admin/identities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonPatch),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || err.message || "Failed to update identity");
      }
      return res.json() as Promise<Identity>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] });
      queryClient.invalidateQueries({ queryKey: ["identity"] });
      toast.success(t("toasts.success.identityUpdated"));
    },
    onError: () => {
      toast.error(t("toasts.error.identityUpdateFailed"));
    },
  });
}

export function usePatchIdentityState() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: async ({ id, state }: { id: string; state: "active" | "inactive" }) => {
      const jsonPatch = [{ op: "replace", path: "/state", value: state }];
      const res = await fetch(`/api/kratos-admin/identities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonPatch),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || err.message || "Failed to update identity state");
      }
      return res.json() as Promise<Identity>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] });
      queryClient.invalidateQueries({ queryKey: ["identity"] });
      toast.success(t("toasts.success.identityUpdated"));
    },
    onError: () => {
      toast.error(t("toasts.error.identityStateFailed"));
    },
  });
}

export interface RecoveryCodeResponse {
  recovery_link: string;
  recovery_code: string;
  expires_at: string;
}

export function useRecoverIdentity() {
  const t = useTranslations();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch("/api/kratos-admin/recovery/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity_id: id }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || err.message || "Failed to send recovery link");
      }
      return res.json() as Promise<RecoveryCodeResponse>;
    },
    onSuccess: () => {
      toast.success(t("toasts.success.recoverySent"));
    },
    onError: () => {
      toast.error(t("toasts.error.identityRecoverFailed"));
    },
  });
}

export function useDeleteIdentitySessions() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/kratos-admin/identities/${id}/sessions`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete identity sessions");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identity"] });
      toast.success(t("toasts.success.identitySessionsRevoked"));
    },
    onError: () => {
      toast.error(t("toasts.error.identitySessionsRevokeFailed"));
    },
  });
}
