// components/ui/button.tsx
"use client";

import * as React from "react";
import { cn } from "@/libs/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "default" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "rounded-lg text-sm font-medium transition",
        {
          primary: "bg-blue-600 text-white hover:bg-blue-700",
          ghost: "bg-transparent hover:bg-gray-100",
        }[variant],
        {
          default: "px-4 py-2",
          icon: "p-2",
        }[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "ButtonBoard";
