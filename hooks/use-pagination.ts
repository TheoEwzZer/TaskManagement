import { useMemo } from "react";

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const DOTS = -1;

function range(start: number, end: number): number[] {
  const result: number[] = [];

  for (let i: number = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

export const usePagination: ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}: UsePaginationProps) => number[] | undefined = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps): number[] | undefined => {
  return useMemo((): number[] | undefined => {
    const totalPageCount: number = Math.ceil(totalCount / pageSize);

    // Pages count is determined as
    // firstPage + DOTS + siblingCount / 2 + currentPage + siblingCount / 2 + DOTS + lastPage
    const totalPageNumbers: number = siblingCount + 5;

    // Case 1:
    // If the number of pages is less than the page numbers we want to show in
    // the pagination component, we return the range [1..totalPageCount]
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    const leftSiblingIndex: number = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex: number = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    // We do not show dots just when there is just one page number to be inserted
    // between the extremes of sibling and the page limits i.e 1 and totalPageCount.
    // Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    const shouldShowLeftDots: boolean = leftSiblingIndex > 2;
    const shouldShowRightDots: boolean = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex: number = totalPageCount;

    // Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount: number = 3 + 2 * siblingCount;
      const leftRange: number[] = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount: number = 3 + 2 * siblingCount;
      const rightRange: number[] = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange: number[] = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
};
