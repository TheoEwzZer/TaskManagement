import { ReactElement } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageButtonProps {
  currentPage: number;
  targetPage: number;
  displayValue: number | string;
  onClick: (page: number) => void;
}

interface PaginationProps {
  page: number;
  count: number;
  onChange: (page: number) => void;
}

function PageButton({
  currentPage,
  targetPage,
  displayValue,
  onClick,
}: PageButtonProps): ReactElement {
  const isCurrent: boolean = currentPage === targetPage;
  const handleClick: () => void = (): void => {
    if (!isCurrent && displayValue !== "...") {
      onClick(targetPage);
    }
  };

  return (
    <Button
      size="icon"
      variant={isCurrent ? "default" : "ghost"}
      className={cn(
        "rounded-full w-8 h-8",
        displayValue === "..." ? "hover:bg-transparent hover:cursor-default" : ""
      )}
      onClick={handleClick}
    >
      {displayValue}
    </Button>
  );
}

export function Pagination({ page, count, onChange }: PaginationProps): ReactElement {
  return (
    <div className="flex my-4 space-x-3 justify-center">
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full w-8 h-8"
        onClick={(): void => onChange(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <PageButton
        currentPage={page}
        targetPage={0}
        displayValue={1}
        onClick={onChange}
      />
      <PageButton
        currentPage={page}
        targetPage={1}
        displayValue={page > 3 ? "..." : 2}
        onClick={onChange}
      />
      <PageButton
        currentPage={page}
        targetPage={page < 3 ? 2 : page >= count - 4 ? count - 5 : page - 1}
        displayValue={page < 3 ? 3 : page >= count - 4 ? count - 4 : page}
        onClick={onChange}
      />
      <PageButton
        currentPage={page}
        targetPage={page < 4 ? 3 : page >= count - 3 ? count - 4 : page}
        displayValue={page < 4 ? 4 : page >= count - 3 ? count - 3 : page + 1}
        onClick={onChange}
      />
      <PageButton
        currentPage={page}
        targetPage={page < 4 ? 4 : page >= count - 3 ? count - 3 : page + 1}
        displayValue={page < 4 ? 5 : page >= count - 3 ? count - 2 : page + 2}
        onClick={onChange}
      />
      <PageButton
        currentPage={page}
        targetPage={count - 2}
        displayValue={count - 4 > page ? "..." : count - 1}
        onClick={onChange}
      />
      <PageButton
        currentPage={page}
        targetPage={count - 1}
        displayValue={count}
        onClick={onChange}
      />
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full w-8 h-8"
        onClick={(): void => {
          if (page !== count - 1) {
            onChange(page + 1);
          }
        }}
        disabled={page === count - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
