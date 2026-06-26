"use client";

import { useParams } from "next/navigation";
import { IdentityDetail } from "@/src/widgets/identities/ui/identity-detail";

export default function IdentityDetailPage() {
  const params = useParams();
  const identityId = params?.id as string;

  if (!identityId) return null;

  return <IdentityDetail identityId={identityId} />;
}
