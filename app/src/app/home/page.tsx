'use client'

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/ui/stats-card"
import { QuickActionCard } from "@/components/ui/quick-action-card"
import { ActivityFeedItem } from "@/components/ui/activity-feed-item"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sparkles,
  Zap,
  BookOpen,
  Users,
  Brain,
  ArrowRight,
  Wand2,
  Library,
  TrendingUp,
  Clock,
  Star,
  Download,
  FileText,
  Image,
  Info
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"

export default function Home() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] || 'Enseignant'

  // FAB quick actions (inspired by Canva)
  const fabActions = [
    {
      icon: Wand2,
      label: "Générer des cartes",
      href: "/generator",
      color: "bg-primary hover:bg-primary/90"
    },
    {
      icon: Library,
      label: "Ma bibliothèque",
      href: "/library",
      color: "bg-secondary hover:bg-secondary/90"
    },
    {
      icon: FileText,
      label: "Modèles",
      href: "/templates",
      color: "bg-accent hover:bg-accent/90"
    }
  ];

  // Smooth animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const statsCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-yellow-50/80 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Floating Decorative Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large orange circle - top right */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          {/* Medium blue circle - middle left */}
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
          {/* Small green circle - bottom right */}
          <div className="absolute bottom-32 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          {/* Extra small yellow circle - top left */}
          <div className="absolute top-48 left-1/4 w-48 h-48 bg-yellow-300/10 rounded-full blur-2xl" />
        </div>

        <Navigation />

      <div className="relative pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl space-y-10">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Bonjour, {firstName}! 👋
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Bienvenue dans votre studio créatif. Qu'allez-vous créer aujourd'hui?
            </p>
          </motion.div>

          {/* Stats Overview - Hidden during testing phase */}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">Actions rapides</h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <QuickActionCard
                title="Générer des cartes"
                description="Créez un nouveau jeu de cartes éducatives avec notre IA spécialisée PFEQ"
                icon={Wand2}
                href="/generator"
                colorScheme="primary"
              />
              <QuickActionCard
                title="Mes créations"
                description="Accédez à vos cartes sauvegardées et continuez où vous vous êtes arrêté"
                icon={Library}
                href="/library"
                colorScheme="secondary"
              />
              <QuickActionCard
                title="Bibliothèque communautaire"
                description="Découvrez et utilisez les créations d'autres enseignants québécois"
                icon={Users}
                href="/shared-library"
                colorScheme="accent"
              />
            </motion.div>
          </motion.div>

          {/* Recent Activity & Tips */}
          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-800 rounded-2xl border-2 border-purple-400 dark:border-purple-600 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">Activité récente</h2>
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
              </div>
              <div className="space-y-2">
                <ActivityFeedItem
                  icon={Sparkles}
                  title="Cartes de mathématiques créées"
                  description="12 cartes sur les fractions - 3e année"
                  time="Il y a 2h"
                  colorScheme="primary"
                />
                <ActivityFeedItem
                  icon={Download}
                  title="Export PDF réussi"
                  description="Cartes d'univers social exportées"
                  time="Il y a 5h"
                  colorScheme="secondary"
                />
                <ActivityFeedItem
                  icon={Users}
                  title="Partagé à la communauté"
                  description="Vos cartes de français ont été publiées"
                  time="Hier"
                  colorScheme="accent"
                />
              </div>
            </div>

            {/* Tips & Inspiration */}
            <div className="bg-gradient-to-br from-pink-200 to-pink-300 dark:from-pink-700 dark:to-pink-800 rounded-2xl border-2 border-pink-400 dark:border-pink-600 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-white/40">
                  <Sparkles className="h-5 w-5 text-pink-800 dark:text-pink-100" />
                </div>
                <h2 className="text-xl font-display font-semibold text-pink-900 dark:text-pink-100">Astuce du jour</h2>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  💡 <strong>Saviez-vous?</strong> Vous pouvez générer jusqu'à 24 cartes à la fois et les personnaliser avec 59+ thèmes différents!
                </p>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-3">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    Thèmes populaires cette semaine
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary text-xs font-medium hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer">
                      Minecraft Pixel
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 text-secondary text-xs font-medium hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer">
                      Kawaii Pastel
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 text-accent text-xs font-medium hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer">
                      Scrapbook Vintage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspiring CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-[2px] shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 mt-8">
            <div className="bg-background/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Prêt à inspirer vos élèves?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Créez des cartes éducatives magnifiques en quelques minutes. L'IA fait le travail, vous ajoutez votre touche personnelle.
              </p>
              <Link href="/generator">
                <Button size="lg" className="group shadow-lg">
                  <Wand2 className="mr-2 h-5 w-5" />
                  Commencer la création
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

        {/* Floating Action Button (Canva-inspired) */}
        <FloatingActionButton
          actions={fabActions}
          mainLabel="Actions rapides"
        />
      </div>
    </TooltipProvider>
  )
}
