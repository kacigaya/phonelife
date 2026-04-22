import React from "react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <span className="font-display text-2xl tracking-tight md:text-3xl">
        Phone <span className="text-brand">Life</span>
      </span>
    </div>
  );
}

export function IconLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M9 22V10H14.5C16.433 10 18 11.567 18 13.5C18 15.433 16.433 17 14.5 17H11V22H9Z"
        fill="white"
      />
      <path
        d="M21 22V17H26V22H21Z"
        fill="#ff791d" 
      />
    </svg>
  );
}
