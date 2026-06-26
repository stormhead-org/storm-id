"use client";

import { useParams } from "next/navigation";
import { MessageDetail } from "@/src/widgets/messages/ui/message-detail";

export default function MessageDetailPage() {
  const params = useParams();
  const messageId = params?.id as string;

  if (!messageId) return null;

  return <MessageDetail messageId={messageId} />;
}
