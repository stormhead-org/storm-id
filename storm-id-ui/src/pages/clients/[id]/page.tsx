"use client";

import { useParams } from "next/navigation";
import { ClientDetail } from "@/src/widgets/clients/ui/client-detail";

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params?.id as string;

  if (!clientId) return null;

  return <ClientDetail clientId={clientId} />;
}
