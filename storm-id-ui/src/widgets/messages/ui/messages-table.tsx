"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMessagesPaginated } from "@/src/features/messages/hooks/useMessages";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { useTranslations } from "@/src/shared/lib/i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { Mail, Search, X, ChevronDown, Smartphone, Loader2 } from "lucide-react";

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  sent: "default",
  queued: "secondary",
  failed: "destructive",
  processing: "outline",
  abandoned: "secondary",
};

export function MessagesTable() {
  const t = useTranslations();
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, isLoading, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessagesPaginated(50, statusFilter === "all" ? undefined : statusFilter);

  const messages = useMemo(() => (data ? data.pages.flatMap((page) => page.messages) : []), [data]);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return messages;
    const q = debouncedSearch.toLowerCase();
    return messages.filter(
      (m) =>
        m.recipient?.toLowerCase().includes(q) ||
        m.subject?.toLowerCase().includes(q) ||
        m.id?.toLowerCase().includes(q) ||
        m.template_type?.toLowerCase().includes(q) ||
        m.type?.toLowerCase().includes(q),
    );
  }, [messages, debouncedSearch]);

  const hasActiveFilters = searchInput || statusFilter !== "all";

  const STATUS_OPTIONS = [
    { value: "all", label: t("messages.table.statuses.all") },
    { value: "queued", label: t("messages.table.statuses.queued") },
    { value: "sent", label: t("messages.table.statuses.sent") },
    { value: "failed", label: t("messages.table.statuses.failed") },
    { value: "processing", label: t("messages.table.statuses.processing") },
    { value: "abandoned", label: t("messages.table.statuses.abandoned") },
  ];

  const handleClearFilters = () => {
    setSearchInput("");
    setStatusFilter("all");
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="size-8 mb-2" />
        <p>{t("messages.table.failedToLoad")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("messages.table.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t("messages.table.search")}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            <X className="size-4 mr-1" />
            {t("messages.table.clearFilters")}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Mail className="size-8 mb-2" />
          <p>{debouncedSearch ? t("messages.table.noResults") : t("messages.table.noMessages")}</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("messages.table.columns.type")}</TableHead>
                <TableHead>{t("messages.table.columns.status")}</TableHead>
                <TableHead>{t("messages.table.columns.recipient")}</TableHead>
                <TableHead className="hidden md:table-cell">
                  {t("messages.table.columns.subject")}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t("messages.table.columns.template")}
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  {t("messages.table.columns.sendCount")}
                </TableHead>
                <TableHead>{t("messages.table.columns.created")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((msg) => (
                <TableRow
                  key={msg.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/messages/${msg.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-1 capitalize text-sm">
                      {msg.type === "sms" ? (
                        <Smartphone className="size-4 text-primary" />
                      ) : (
                        <Mail className="size-4 text-primary" />
                      )}
                      {msg.type || "email"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANTS[msg.status] || "secondary"}>{msg.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm max-w-[200px] truncate">{msg.recipient}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm max-w-[250px] truncate">
                    {msg.subject || "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm font-mono">
                      {msg.template_type || t("messages.table.unknown")}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {msg.send_count ?? 0}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {hasNextPage && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Loader2 className="size-4 mr-1 animate-spin" />
                ) : (
                  <ChevronDown className="size-4 mr-1" />
                )}
                {t("messages.table.loadMore")}
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center mt-2">
            {t("messages.table.showing", { n: filtered.length })}
            {hasNextPage && ` (${t("messages.table.showing")})`}
          </p>
        </>
      )}
    </div>
  );
}
