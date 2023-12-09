"use client";

import { ReactElement, useEffect, useState } from "react";

import { updateCard } from "@/actions/update-card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { cn } from "@/lib/utils";
import { CardWithListTitle } from "@/types";
import { useOrganization } from "@clerk/nextjs";
import type { OrganizationMembershipResource, PublicUserData } from "@clerk/types";
import { Card } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Check, UserRoundPlus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionProps {
  data: CardWithListTitle;
}

export function CardMember({ data }: ActionProps): ReactElement {
  const params = useParams();
  const queryClient = useQueryClient();
  const { organization: activeOrganization } = useOrganization();
  const [members, setMembers] = useState<PublicUserData[]>([]);
  const [value, setValue] = useState<string>(data.userId || "");

  useEffect((): void => {
    const fetchMembers: () => Promise<void> = async (): Promise<void> => {
      if (activeOrganization) {
        const memberships: OrganizationMembershipResource[] =
          await activeOrganization.getMemberships();
        const members: PublicUserData[] = memberships
          .filter((membership: OrganizationMembershipResource): boolean =>
            Boolean(membership.publicUserData.userId)
          )
          .map(
            (membership: OrganizationMembershipResource): PublicUserData =>
              membership.publicUserData
          );
        setMembers(members);
      }
    };

    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { execute } = useAction(updateCard, {
    onSuccess: (data: Card): void => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Card "${data.title}" updated`);
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const onAdd: (publicUserData: PublicUserData) => void = async (
    publicUserData: PublicUserData
  ): Promise<void> => {
    const boardId = params.boardId as string;

    if (publicUserData.userId) {
      if (publicUserData.userId === value) {
        execute({
          id: data.id,
          boardId,
          userId: null,
          userImage: null,
          userName: null,
        });
      } else {
        execute({
          id: data.id,
          boardId,
          userId: publicUserData.userId,
          userImage: publicUserData.imageUrl,
          userName:
            (publicUserData.firstName ? publicUserData.firstName + " " : "") +
            (publicUserData.lastName || ""),
        });
      }
    }

    setValue(publicUserData.userId === value ? "" : publicUserData.userId || "");
  };

  return (
    <Popover onOpenChange={(): void => setValue(data.userId || "")}>
      <PopoverTrigger asChild>
        <Button
          variant="accent"
          className="w-full justify-start"
          size="inline"
        >
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Member
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pb-3 pt-3"
        side="bottom"
        align="start"
      >
        <div
          className={`
            pb-4 
            text-center 
            text-sm 
            font-medium 
            text-neutral-600 
            dark:text-neutral-400
          `}
        >
          Member
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className={`
              absolute 
              right-2 
              top-2 
              h-auto 
              w-auto 
              p-2 
              text-neutral-600 
              dark:text-neutral-400
            `}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Command>
          <CommandInput placeholder="Search member" />
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup>
            {members.map(
              (member: PublicUserData): ReactElement => (
                <CommandItem
                  key={member.userId}
                  value={member.userId}
                  onSelect={(): void => onAdd(member)}
                >
                  {member && member.imageUrl && (
                    <Avatar className="mr-2 h-6 w-6">
                      <AvatarImage
                        src={member.imageUrl}
                        alt={member.firstName + " " + member.lastName}
                      />
                    </Avatar>
                  )}
                  {member.firstName && member.firstName + " "}
                  {member.lastName && member.lastName}
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      value === member.userId ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              )
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
