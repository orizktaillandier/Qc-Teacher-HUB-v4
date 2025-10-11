"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CelebrationAnimationProps {
  trigger?: boolean;
  duration?: number;
  className?: string;
}

export function CelebrationAnimation({
  trigger = false,
  duration = 2000,
  className
}: CelebrationAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (!isAnimating) return null;

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      {/* Maple leaves confetti */}
      {Array.from({ length: 20 }).map((_, i) => {
        const delay = Math.random() * 500;
        const duration = 2000 + Math.random() * 1000;
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() - 0.5) * 30;
        const rotation = Math.random() * 360;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${startX}%`,
              top: "-10%",
              animation: `fall ${duration}ms ease-in ${delay}ms forwards`,
              "--end-x": `${endX}%`,
              "--rotation": `${rotation}deg`,
            } as React.CSSProperties}
          >
            <svg
              className="w-6 h-6 text-primary opacity-70"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L9 9H2l6 4.5L5 22l7-5 7 5-3-8.5L22 9h-7z" />
            </svg>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes fall {
          to {
            top: 110%;
            left: var(--end-x);
            transform: rotate(var(--rotation));
          }
        }
      `}</style>
    </div>
  );
}
