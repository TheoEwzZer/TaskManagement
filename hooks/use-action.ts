import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction: <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options?: UseActionOptions<TOutput>
) => {
  execute: (input: TInput) => Promise<void>;
  fieldErrors: FieldErrors<TInput> | undefined;
  error: string | undefined;
  data: TOutput | undefined;
  isLoading: boolean;
} = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
): {
  execute: (input: TInput) => Promise<void>;
  fieldErrors: FieldErrors<TInput> | undefined;
  error: string | undefined;
  data: TOutput | undefined;
  isLoading: boolean;
} => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute: (input: TInput) => Promise<void> = useCallback(
    async (input: TInput): Promise<void> => {
      setIsLoading(true);

      try {
        const result: ActionState<TInput, TOutput> = await action(input);

        if (!result) {
          return;
        }

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
