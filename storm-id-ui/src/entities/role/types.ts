export interface Role {
  id: string;
  name: string;
  description: string;
  is_system: boolean;
  is_default: boolean;
  position: number;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface PermissionGroup {
  group: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  label: string;
}
