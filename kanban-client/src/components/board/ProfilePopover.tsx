"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/types/user/index";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { CiInboxIn } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Avatar } from "radix-ui";

interface ProfilePopoverProps {
  user: UserProfile | null;
  className?: string;
  logoutHander: () => void;
}

const ProfilePopover = ({
  user,
  className,
  logoutHander,
}: ProfilePopoverProps) => {
  return (
    <div>
      <Popover.Root>
        <Popover.Trigger
          aria-label="User profile"
          className={cn(
            "rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-white",
            className
          )}
        >
          <Avatar.Root className="relative inline-flex size-[40px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle ">
            <Avatar.Image
              className="size-full rounded-[inherit] object-cover"
              src={user ? user.avatar?.url : "avatarr.jpg"}
              alt="Colm Tuite"
            />
            <Avatar.Fallback
              className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
              delayMs={600}
            >
              CT
            </Avatar.Fallback>
          </Avatar.Root>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="center"
            sideOffset={4}
            collisionPadding={20}
            className={cn(
              "z-50 w-64 rounded-lg bg-popover p-5 shadow-lg shadow-gray11 ",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "focus:outline-none bg-white"
            )}
            style={{ minHeight: "70px" }}
          >
            <div className="flex h-full flex-col justify-between gap-4">
              <Link href="/setting" className="flex items-center gap-4 mt-4">
                <FaRegUserCircle size={18} />
                <p>Profile</p>
              </Link>
              <div className="flex items-center gap-4">
                <CiInboxIn size={18} />
                <p>Inbox</p>
              </div>

              <button
                type="button"
                onClick={logoutHander}
                className="mt-2 self-start text-sm text-destructive transition-colors hover:text-destructive/80 flex items-center gap-2"
              >
                <IoIosLogOut size={18} />

                <p>Sign Out</p>
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default ProfilePopover;
