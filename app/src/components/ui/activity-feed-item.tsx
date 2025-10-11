"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ActivityFeedItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  colorScheme?: "primary" | "secondary" | "accent";
  className?: string;
}

const colorSchemes = {
  primary: {
    icon: "bg-primary/10 text-primary",
    dot: "bg-primary",
  },
  secondary: {
    icon: "bg-secondary/10 text-secondary",
    dot: "bg-secondary",
  },
  accent: {
    icon: "bg-accent/10 text-accent",
    dot: "bg-accent",
  },
};

export function ActivityFeedItem({
  icon: Icon,
  title,
  description,
  time,
  colorScheme = "primary",
  className
}: ActivityFeedItemProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <div className={cn("relative flex gap-4 pb-8 last:pb-0 group", className)}>
      {/* Timeline line */}
      <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border group-last:hidden" />

      {/* Icon */}
      <div className={cn(
        "relative z-10 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
        colors.icon
      )}>
        <Icon className="h-5 w-5" />
        <div className={cn("absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background", colors.dot)} />
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display font-semibold text-sm leading-tight">{title}</p>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0">{time}</span>
        </div>
      </div>
    </div>
  );
}
