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

import { DOTS, usePagination } from "@/hooks/use-pagination";

interface PaginationProps {
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export function CustomPagination({
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps): ReactElement | null {
  const paginationRange: number[] | undefined = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const lastPage: number = paginationRange[paginationRange.length - 1];

  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationPrevious
          className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
          href={`?page=${currentPage - 1}`}
        />
        {paginationRange.map((pageNumber: number, index: number): ReactElement => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationLink
              key={index}
              isActive={pageNumber === currentPage}
              href={`?page=${pageNumber}`}
            >
              {pageNumber}
            </PaginationLink>
          );
        })}

        <PaginationNext
          className={cn(currentPage === lastPage && "pointer-events-none opacity-50")}
          href={`?page=${currentPage + 1}`}
        />
      </PaginationContent>
    </Pagination>
  );
}
