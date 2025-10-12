"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  colorScheme?: "primary" | "secondary" | "accent";
  className?: string;
}

const colorSchemes = {
  primary: {
    bg: "bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-700 dark:to-orange-800",
    border: "border-orange-400 dark:border-orange-600",
    icon: "bg-white/40 text-orange-700 dark:text-orange-200",
  },
  secondary: {
    bg: "bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-700 dark:to-blue-800",
    border: "border-blue-400 dark:border-blue-600",
    icon: "bg-white/40 text-blue-700 dark:text-blue-200",
  },
  accent: {
    bg: "bg-gradient-to-br from-green-200 to-green-300 dark:from-green-700 dark:to-green-800",
    border: "border-green-400 dark:border-green-600",
    icon: "bg-white/40 text-green-700 dark:text-green-200",
  },
};

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  colorScheme = "primary",
  className
}: QuickActionCardProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <Link href={href} className="block group">
      <Card className={cn(
        "relative overflow-hidden transition-all duration-300",
        "hover:shadow-xl hover:scale-105 cursor-pointer",
        "border-2",
        colors.bg,
        colors.border,
        className
      )}>
        <div className="p-6">
          {/* Icon */}
          <div className={cn(
            "inline-flex p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110",
            colors.icon
          )}>
            <Icon className="h-8 w-8" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-xl font-display font-semibold tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Arrow indicator */}
          <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Commencer
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Decorative maple leaf pattern */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary">
              <path d="M12 2L9 9H2l6 4.5L5 22l7-5 7 5-3-8.5L22 9h-7z" />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
