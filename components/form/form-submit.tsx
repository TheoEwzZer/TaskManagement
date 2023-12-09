"use client";

import { ReactElement, ReactNode } from "react";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export function FormSubmit({
  children,
  disabled,
  className,
  variant = "default",
}: FormSubmitProps): ReactElement {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled || pending}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
}
