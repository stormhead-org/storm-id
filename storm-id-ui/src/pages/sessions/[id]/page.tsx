"use client";

import { useParams } from "next/navigation";
import { SessionDetail } from "@/src/widgets/sessions/ui/session-detail";

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = params?.id as string;

  if (!sessionId) return null;

  return <SessionDetail sessionId={sessionId} />;
}
