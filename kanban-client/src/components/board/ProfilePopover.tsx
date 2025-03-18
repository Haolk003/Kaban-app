"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/types/user/index";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { CiInboxIn } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

interface ProfilePopoverProps {
  user: UserProfile;
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
            "rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            className
          )}
        >
          <Image
            src={user.imageUrl || "/avatarr.jpg"}
            alt="User avatar"
            className="h-10 w-10 rounded-full object-cover"
            width={40}
            height={40}
          />
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="center"
            sideOffset={4}
            collisionPadding={20}
            className={cn(
              "z-50 w-64 rounded-lg bg-popover p-5 shadow-lg ",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "focus:outline-none"
            )}
            style={{ minHeight: "70px" }}
          >
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="flex items-center gap-4 mt-4">
                <FaRegUserCircle size={18} />
                <p>Profile</p>
              </div>
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
