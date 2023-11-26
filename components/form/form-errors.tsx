import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

import { ReactElement } from "react";

export function FormErrors({ id, errors }: FormErrorsProps): ReactElement | null {
  if (!errors) {
    return null;
  }

  return (
    <div
      id={`${id}-errors`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
      {errors[id]?.map(
        (error: string): ReactElement => (
          <div
            key={error}
            className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
          >
            <XCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )
      )}
    </div>
  );
}
