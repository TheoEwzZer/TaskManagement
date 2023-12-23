import { ForwardedRef, forwardRef, HTMLAttributes, ReactElement } from "react";

import { cn } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (
    { className, ...props }: HTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (
    { className, ...props }: HTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  (
    { className, ...props }: HTMLAttributes<HTMLHeadingElement>,
    ref: ForwardedRef<HTMLParagraphElement>
  ): ReactElement => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(
  (
    { className, ...props }: HTMLAttributes<HTMLParagraphElement>,
    ref: ForwardedRef<HTMLParagraphElement>
  ): ReactElement => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (
    { className, ...props }: HTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (
    { className, ...props }: HTMLAttributes<HTMLDivElement>,
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
