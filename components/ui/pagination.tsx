import {
  ComponentProps,
  DetailedHTMLProps,
  ForwardRefExoticComponent,
  ForwardedRef,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactElement,
  RefAttributes,
  forwardRef,
} from "react";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Pagination: ({ className, ...props }: ComponentProps<"nav">) => ReactElement = ({
  className,
  ...props
}: ComponentProps<"nav">): ReactElement => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent: ForwardRefExoticComponent<
  Omit<DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> &
    RefAttributes<HTMLUListElement>
> = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  (
    {
      className,
      ...props
    }: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
    ref: ForwardedRef<HTMLUListElement>
  ): ReactElement => (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
);

PaginationContent.displayName = "PaginationContent";

const PaginationItem: ForwardRefExoticComponent<
  Omit<DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> &
    RefAttributes<HTMLLIElement>
> = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  (
    {
      className,
      ...props
    }: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    ref: ForwardedRef<HTMLLIElement>
  ): ReactElement => (
    <li
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
);

PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  ComponentProps<typeof Link>;

const PaginationLink: {
  ({ className, isActive, size, ...props }: PaginationLinkProps): ReactElement;
  displayName: string;
} = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps): ReactElement => (
  <PaginationItem>
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  </PaginationItem>
);

PaginationLink.displayName = "PaginationLink";

const PaginationPrevious: {
  ({ className, ...props }: ComponentProps<typeof PaginationLink>): ReactElement;
  displayName: string;
} = ({ className, ...props }: ComponentProps<typeof PaginationLink>): ReactElement => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext: ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) => ReactElement = ({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>): ReactElement => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);

const PaginationEllipsis: ({
  className,
  ...props
}: ComponentProps<"span">) => ReactElement = ({
  className,
  ...props
}: ComponentProps<"span">): ReactElement => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
