"use client";

import { useConsentRequest } from "@/src/features/oauth2-consent/hooks/useConsentRequest";
import { ConsentCard } from "@/src/widgets/consent/ui/ConsentCard";

export default function ConsentPage() {
  const { data, isLoading, error } = useConsentRequest();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-destructive">
          <p className="text-lg font-semibold">Error</p>
          <p className="text-sm">
            {error instanceof Error ? error.message : "Consent session expired or invalid"}
          </p>
        </div>
      </div>
    );
  }

  return <ConsentCard data={data} />;
}
