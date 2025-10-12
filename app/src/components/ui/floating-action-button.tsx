"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface FABAction {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
}

interface FloatingActionButtonProps {
  actions?: FABAction[];
  mainIcon?: LucideIcon;
  mainLabel?: string;
  className?: string;
}

export function FloatingActionButton({
  actions = [],
  mainIcon: MainIcon = Plus,
  mainLabel = "Créer",
  className
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("fixed bottom-8 right-8 z-50", className)}>
      <AnimatePresence>
        {isOpen && actions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3"
          >
            {actions.map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={action.href}>
                    <Button
                      size="lg"
                      className={cn(
                        "group shadow-lg hover:shadow-2xl transition-all",
                        "flex items-center gap-3 pr-6",
                        action.color
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <ActionIcon className="h-5 w-5" />
                      <span className="font-medium">{action.label}</span>
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          size="lg"
          className={cn(
            "h-16 w-16 rounded-full shadow-2xl",
            "bg-gradient-to-br from-primary via-secondary to-accent",
            "hover:shadow-primary/50",
            "transition-all duration-300"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MainIcon className="h-7 w-7" />
        </Button>
      </motion.div>

      {/* Label tooltip */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
            {mainLabel}
          </div>
        </motion.div>
      )}
    </div>
  );
}
