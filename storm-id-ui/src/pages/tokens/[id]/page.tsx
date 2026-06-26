"use client";

import { useParams } from "next/navigation";
import { TokenDetail } from "@/src/widgets/tokens/ui/token-detail";

export default function TokenDetailPage() {
  const params = useParams();
  const tokenId = params?.id as string;

  if (!tokenId) return null;

  return <TokenDetail tokenId={tokenId} />;
}
