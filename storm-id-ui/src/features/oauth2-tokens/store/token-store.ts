"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IntrospectResponse {
  active: boolean;
  client_id?: string;
  scope?: string;
  exp?: number;
  iat?: number;
  nbf?: number;
  sub?: string;
  aud?: string[];
  iss?: string;
  token_type?: string;
  username?: string;
  [key: string]: unknown;
}

export interface IntrospectedToken extends IntrospectResponse {
  id: string;
  original_token: string;
  introspected_at: string;
}

interface TokenStore {
  tokens: IntrospectedToken[];
  addToken: (token: IntrospectedToken) => void;
  removeToken: (id: string) => void;
  clearAll: () => void;
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      tokens: [],
      addToken: (token) => set((state) => ({ tokens: [token, ...state.tokens] })),
      removeToken: (id) => set((state) => ({ tokens: state.tokens.filter((t) => t.id !== id) })),
      clearAll: () => set({ tokens: [] }),
    }),
    { name: "token-store" },
  ),
);
