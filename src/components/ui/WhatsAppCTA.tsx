"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface WhatsAppCTAProps {
  message: string;
  label?: string;
  variant?: "primary" | "outline" | "minimal";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

export default function WhatsAppCTA({
  message,
  label = "Order on WhatsApp",
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
}: WhatsAppCTAProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200";

  const variants = {
    primary: "bg-brand-green text-white hover:bg-brand-green-dark shadow-sm hover:shadow-md",
    outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white",
    minimal: "text-brand-green hover:text-brand-green-dark underline-offset-2 hover:underline",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3",
  };

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      <MessageCircle className={cn(size === "sm" ? "w-4 h-4" : "w-5 h-5")} />
      {label}
    </a>
  );
}
