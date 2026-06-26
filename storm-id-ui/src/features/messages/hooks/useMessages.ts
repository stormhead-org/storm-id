"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface Message {
  id: string;
  status: "queued" | "sent" | "failed" | "processing" | "abandoned";
  recipient: string;
  subject?: string;
  body?: string;
  type?: string;
  channel?: string;
  template_type?: string;
  send_count?: number;
  created_at: string;
  updated_at?: string;
  dispatches?: Array<{
    id: string;
    status: string;
    created_at: string;
    updated_at?: string;
    error?: string | Record<string, unknown> | null;
  }>;
}

interface MessagesPage {
  messages: Message[];
  nextPageToken?: string;
}

export function useMessagesPaginated(pageSize = 50, status?: string, recipient?: string) {
  return useInfiniteQuery<MessagesPage>({
    queryKey: ["messages", "paginated", pageSize, status, recipient],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({ page_size: String(pageSize) });
      if (status && status !== "all") params.set("status", status);
      if (recipient) params.set("recipient", recipient);
      if (pageParam) params.set("page_token", pageParam as string);

      const res = await fetch(`/api/kratos-admin/courier/messages?${params}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      const messages = Array.isArray(data) ? data : data.messages || [];
      return {
        messages,
        nextPageToken: data.next_page_token || undefined,
      };
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    staleTime: 30_000,
  });
}

export function useMessage(id: string) {
  return useQuery<Message>({
    queryKey: ["message", id],
    queryFn: async () => {
      const res = await fetch(`/api/kratos-admin/courier/messages/${id}`);
      if (!res.ok) throw new Error("Failed to fetch message");
      return res.json();
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}
