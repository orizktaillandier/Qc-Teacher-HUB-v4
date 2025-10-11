"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemePreviewCardProps {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ThemePreviewCard({
  name,
  colors,
  isSelected,
  onClick,
  className
}: ThemePreviewCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:scale-105",
        "border-2",
        isSelected ? "border-primary ring-2 ring-primary/20" : "border-border",
        className
      )}
      onClick={onClick}
    >
      <div className="p-4">
        {/* Color preview */}
        <div className="flex gap-2 mb-3">
          <div
            className="flex-1 h-16 rounded-lg shadow-sm"
            style={{ backgroundColor: colors.primary }}
          />
          <div
            className="flex-1 h-16 rounded-lg shadow-sm"
            style={{ backgroundColor: colors.secondary }}
          />
          <div
            className="flex-1 h-16 rounded-lg shadow-sm"
            style={{ backgroundColor: colors.accent }}
          />
        </div>

        {/* Name */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-display font-semibold truncate">{name}</p>
          {isSelected && (
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="h-3 w-3 text-primary-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      )}
    </Card>
  );
}
