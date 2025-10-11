"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105",
      "bg-gradient-to-br from-white to-orange-50/50 dark:from-slate-800 dark:to-slate-900 border-2",
      className
    )}>
      <div className="p-6">
        {/* Icon with Quebec colors */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {trend && (
            <div className={cn(
              "text-sm font-medium px-3 py-1 rounded-full",
              trend.isPositive
                ? "bg-accent/10 text-accent"
                : "bg-destructive/10 text-destructive"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-display font-bold">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground">{trend.label}</p>
          )}
        </div>

        {/* Decorative element */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />
      </div>
    </Card>
  );
}
