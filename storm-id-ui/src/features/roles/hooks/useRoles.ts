"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "@/src/shared/lib/i18n";

export interface Role {
  id: string;
  name: string;
  description: string;
  is_system: boolean;
  is_default: boolean;
  position: number;
  permissions: string[];
  color: string;
}

export interface PermissionGroup {
  group: string;
  permissions: { id: string }[];
}

export function useRoles() {
  return useQuery<Role[]>({
    queryKey: ["admin-roles"],
    queryFn: () => fetch("/api/admin/roles").then((r) => r.json()),
  });
}

export function usePermissionCatalog() {
  return useQuery<PermissionGroup[]>({
    queryKey: ["permission-catalog"],
    queryFn: () => fetch("/api/admin/roles/permission-catalog").then((r) => r.json()),
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      permissions?: string[];
      is_default?: boolean;
      color?: string;
    }) => {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create role");
      }
      return res.json();
    },
    onSuccess: (data: Role) => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast.success(t("toasts.success.roleCreated", { name: data.name }));
    },
    onError: () => {
      toast.error(t("toasts.error.roleCreateFailed"));
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      name?: string;
      description?: string;
      permissions?: string[];
      color?: string;
    }) => {
      const res = await fetch(`/api/admin/roles/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update role");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast.success(t("toasts.success.roleUpdated"));
    },
    onError: () => {
      toast.error(t("toasts.error.roleUpdateFailed"));
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/roles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete role");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast.success(t("toasts.success.roleDeleted"));
    },
    onError: () => {
      toast.error(t("toasts.error.roleDeleteFailed"));
    },
  });
}

export function useReorderRoles() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: async (roleIds: string[]) => {
      const res = await fetch("/api/admin/roles/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleIds }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Reorder failed");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast.success(t("toasts.success.rolesReordered"));
    },
    onError: () => {
      toast.error(t("toasts.error.rolesReorderFailed"));
    },
  });
}

export function useRoleAssignments() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation({
    mutationFn: async (data: { subject_id: string; role_ids: string[] }) => {
      const res = await fetch("/api/admin/role-assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to assign roles");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-roles"] });
    },
    onError: () => {
      toast.error(t("toasts.error.roleAssignFailed"));
    },
  });
}
