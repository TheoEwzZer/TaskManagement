import { ReactElement } from "react";

import { cn } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PageButtonProps {
  currentPage: number;
  targetPage: number;
  displayValue: number | string;
}

interface PaginationProps {
  page: number;
  count: number;
}

function PageButton({
  currentPage,
  targetPage,
  displayValue,
}: PageButtonProps): ReactElement {
  const isCurrent: boolean = currentPage === targetPage;

  if (displayValue === "...") {
    return <PaginationEllipsis />;
  }

  return (
    <PaginationItem>
      <PaginationLink
        href={`?page=${targetPage}`}
        isActive={isCurrent}
      >
        {displayValue}
      </PaginationLink>
    </PaginationItem>
  );
}

export function CustomPagination({ page, count }: PaginationProps): ReactElement {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(page === 0 && "pointer-events-none opacity-50")}
            href={`?page=${page - 1}`}
          />
        </PaginationItem>
        <PageButton
          currentPage={page}
          targetPage={0}
          displayValue={1}
        />
        <PageButton
          currentPage={page}
          targetPage={1}
          displayValue={page > 3 ? "..." : 2}
        />
        <PageButton
          currentPage={page}
          targetPage={page < 3 ? 2 : page >= count - 4 ? count - 5 : page - 1}
          displayValue={page < 3 ? 3 : page >= count - 4 ? count - 4 : page}
        />
        <PageButton
          currentPage={page}
          targetPage={page < 4 ? 3 : page >= count - 3 ? count - 4 : page}
          displayValue={page < 4 ? 4 : page >= count - 3 ? count - 3 : page + 1}
        />
        <PageButton
          currentPage={page}
          targetPage={page < 4 ? 4 : page >= count - 3 ? count - 3 : page + 1}
          displayValue={page < 4 ? 5 : page >= count - 3 ? count - 2 : page + 2}
        />
        <PageButton
          currentPage={page}
          targetPage={count - 2}
          displayValue={count - 4 > page ? "..." : count - 1}
        />
        <PageButton
          currentPage={page}
          targetPage={count - 1}
          displayValue={count}
        />
        <PaginationItem>
          <PaginationNext
            className={cn(page === count - 1 && "pointer-events-none opacity-50")}
            href={`?page=${page + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
