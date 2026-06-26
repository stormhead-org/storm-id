export type UiNodeGroup =
  | "default"
  | "profile"
  | "password"
  | "totp"
  | "webauthn"
  | "oidc"
  | "lookup_secret";

export interface UiText {
  id: number;
  text: string;
  type: "info" | "error" | "success";
  context?: Record<string, unknown>;
}

export interface UiNodeInputAttributes {
  node_type: "input";
  name: string;
  type: string;
  value?: string | boolean;
  disabled?: boolean;
  label?: UiText;
  required?: boolean;
  pattern?: string;
  onclick?: string;
  autocomplete?: string;
}

export interface UiNodeTextAttributes {
  node_type: "text";
  id: string;
  text: UiText;
}

export interface UiNodeScriptAttributes {
  node_type: "script";
  id: string;
  src: string;
  async?: boolean;
  crossorigin?: string;
  integrity?: string;
  referrerpolicy?: string;
  type?: string;
}

export interface UiNodeAnchorAttributes {
  node_type: "a";
  id: string;
  href: string;
  title: UiText;
}

export interface UiNodeImageAttributes {
  node_type: "img";
  id: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export type UiNodeAttributes =
  | UiNodeInputAttributes
  | UiNodeTextAttributes
  | UiNodeScriptAttributes
  | UiNodeAnchorAttributes
  | UiNodeImageAttributes;

export interface UiNode {
  group: UiNodeGroup;
  attributes: UiNodeAttributes;
  messages: UiText[];
  meta: {
    label?: UiText;
  };
}

export interface SettingsFlow {
  id: string;
  type: string;
  expires_at: string;
  issued_at: string;
  request_url: string;
  ui: {
    nodes: UiNode[];
    messages: UiText[];
    action: string;
    method: string;
  };
  state: "show_form" | "success" | "error";
}

export type SettingsFlowGroup = Exclude<UiNodeGroup, "default">;
