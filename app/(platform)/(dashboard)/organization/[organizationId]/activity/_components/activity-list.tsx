"use client";

import { ReactElement, useEffect, useState } from "react";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/fetcher";
import { AuditLog } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Pagination } from "@/components/pagination";

export interface ActivityLog {
  auditLogs: AuditLog[];
  total: number;
}

export function ActivityList(): ReactElement {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const pageParam: string | null = searchParams.get("page");
  const pageNumber: number = pageParam ? parseInt(pageParam, 10) : -1;

  const { isPending, data } = useQuery<ActivityLog>({
    queryKey: ["activity-logs", page],
    queryFn: (): Promise<ActivityLog> => fetcher(`/api/logs?page=${page}`),
    placeholderData: keepPreviousData,
  });

  useEffect((): void => {
    if (pageNumber < 0) {
      setPage(0);
      router.push("?page=0");
    } else {
      setPage(pageNumber);
    }
  }, [pageNumber, router]);

  useEffect((): void => {
    if (data) {
      setCount(Math.ceil(data.total / 10));
    }
    if (data && data.auditLogs.length === 0) {
      setPage(0);
      router.push("?page=0");
    }
  }, [data, router]);

  const onChange: (newPage: number) => void = (newPage: number): void => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  if (!data || isPending) {
    return <ActivityList.Skeleton />;
  }

  return (
    <>
      <ol className="mt-4 space-y-4">
        <p className="hidden text-center text-xs text-muted-foreground last:block">
          No activity found inside this organization
        </p>
        {data.auditLogs.map(
          (log: AuditLog): ReactElement => (
            <ActivityItem
              key={log.id}
              data={log}
            />
          )
        )}
      </ol>
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
      />
    </>
  );
}

ActivityList.Skeleton = function SkeletonActivityList(): ReactElement {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="h-10 w-[80%]" />
      <Skeleton className="h-10 w-[50%]" />
      <Skeleton className="h-10 w-[70%]" />
      <Skeleton className="h-10 w-[80%]" />
      <Skeleton className="h-10 w-[75%]" />
      <Skeleton className="h-10 w-[80%]" />
      <Skeleton className="h-10 w-[50%]" />
      <Skeleton className="h-10 w-[70%]" />
      <Skeleton className="h-10 w-[80%]" />
      <Skeleton className="h-10 w-[75%]" />
    </ol>
  );
};
