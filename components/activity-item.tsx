import { ReactElement } from "react";

import { format } from "date-fns";
import { AuditLog } from "@prisma/client";

import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  data: AuditLog;
}

export function ActivityItem({ data }: ActivityItemProps): ReactElement {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={data.userImage}
          alt={data.userName}
        />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-neutral-700">{data.userName}</span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(data.createdAt), "MMM dd, yyyy 'at' hh:mm a")}{" "}
        </p>
      </div>
    </li>
  );
}
