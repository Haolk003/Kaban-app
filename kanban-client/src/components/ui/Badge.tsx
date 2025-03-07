"use client";

import * as React from "react";
import { cn } from "@/libs/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-block rounded-full px-2 py-1 text-xs font-medium bg-gray-200",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
