"use client";

import { useState, useCallback } from "react";

interface UsePaginationOptions {
  defaultPageSize?: number;
}

export function usePagination({ defaultPageSize = 20 }: UsePaginationOptions = {}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const previousPage = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const resetPage = useCallback(() => setPage(0), []);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    resetPage,
  };
}
