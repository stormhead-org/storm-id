export interface SessionProfile {
  identityId: string;
  email?: string;
  name?: string;
  roles: string[];
  roleNames: Record<string, string>;
  permissions: string[];
  maxPosition: number;
  aal: "aal1" | "aal2";
  createdAt: string;
  state: string;
  verified: boolean;
  traits: Record<string, unknown>;
}
