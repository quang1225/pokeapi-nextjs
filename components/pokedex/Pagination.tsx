"use client";

import * as Toolbar from "@radix-ui/react-toolbar";

type PaginationProps = {
  page: number;
  pageCount: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const safePage = Math.min(Math.max(1, page), pageCount);
  const from = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalItems);

  return (
    <Toolbar.Root
      className="pokedex-pagination-toolbar"
      aria-label="Pagination"
    >
      <Toolbar.Button
        type="button"
        className="pokedex-pagination__btn"
        disabled={safePage <= 1}
        onClick={() => {
          onPageChange(safePage - 1);
        }}
      >
        Previous
      </Toolbar.Button>
      <Toolbar.Separator
        orientation="vertical"
        className="pokedex-pagination__sep"
        aria-hidden
      />
      <span className="pokedex-pagination__meta">
        {totalItems === 0
          ? "No results"
          : `${String(from)}–${String(to)} of ${String(totalItems)}`}
      </span>
      <Toolbar.Separator
        orientation="vertical"
        className="pokedex-pagination__sep"
        aria-hidden
      />
      <Toolbar.Button
        type="button"
        className="pokedex-pagination__btn"
        disabled={safePage >= pageCount}
        onClick={() => {
          onPageChange(safePage + 1);
        }}
      >
        Next
      </Toolbar.Button>
    </Toolbar.Root>
  );
}
