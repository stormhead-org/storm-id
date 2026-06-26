"use client";

import { useState, useCallback } from "react";

export function useCopyToClipboard(resetDelay = 2000) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, fieldName: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), resetDelay);
        return true;
      } catch {
        return false;
      }
    },
    [resetDelay],
  );

  return { copy, copiedField };
}
