"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  children,
  className
}: HeroSectionProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Maple leaf pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="maple-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 10L45 30H30l15 12-5 23l15-11 15 11-5-23 15-12H65z" fill="currentColor" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#maple-pattern)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
        {subtitle && (
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 animate-fade-in">
            {subtitle}
          </p>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 animate-fade-in-up">
          {title}
        </h1>

        {description && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up delay-200">
            {description}
          </p>
        )}

        {children && (
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-400">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
