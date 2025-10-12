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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Bonjour, {firstName}! 👋
            </h1>
            <p className="text-muted-foreground">
              Bienvenue dans votre studio créatif. Qu'allez-vous créer aujourd'hui?
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  className="bg-gradient-to-br from-orange-300 to-orange-400 dark:from-orange-600 dark:to-orange-700 rounded-2xl p-6 border-2 border-orange-500 dark:border-orange-600 hover:scale-105 transition-all shadow-lg cursor-pointer relative group"
                  variants={statsCardVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/30">
                      <Sparkles className="h-6 w-6 text-orange-900 dark:text-orange-100" />
                    </div>
                    {/* Hidden during testing phase */}
                    {/* <div className="flex items-center gap-2">
                      <div className="text-sm font-medium px-3 py-1 rounded-full bg-green-500 text-white">
                        ↑ 12%
                      </div>
                      <Info className="h-4 w-4 text-orange-700 dark:text-orange-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div> */}
                  </div>
                  <p className="text-sm text-orange-900 dark:text-orange-100 font-medium">Cartes créées</p>
                  <p className="text-3xl font-display font-bold text-orange-950 dark:text-white">42</p>
                  <p className="text-xs text-orange-800 dark:text-orange-200">Cette semaine</p>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">12% d'augmentation par rapport à la semaine dernière</p>
              </TooltipContent>
            </Tooltip>

            <motion.div
              className="bg-gradient-to-br from-blue-300 to-blue-400 dark:from-blue-600 dark:to-blue-700 rounded-2xl p-6 border-2 border-blue-500 dark:border-blue-600 hover:scale-105 transition-all shadow-lg cursor-pointer"
              variants={statsCardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/30">
                  <Library className="h-6 w-6 text-blue-900 dark:text-blue-100" />
                </div>
              </div>
              <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">Collections</p>
              <p className="text-3xl font-display font-bold text-blue-950 dark:text-white">8</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-300 to-green-400 dark:from-green-600 dark:to-green-700 rounded-2xl p-6 border-2 border-green-500 dark:border-green-600 hover:scale-105 transition-all shadow-lg cursor-pointer"
              variants={statsCardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/30">
                  <Clock className="h-6 w-6 text-green-900 dark:text-green-100" />
                </div>
                {/* Hidden during testing phase */}
                {/* <div className="text-sm font-medium px-3 py-1 rounded-full bg-green-600 text-white">
                  ↑ 5%
                </div> */}
              </div>
              <p className="text-sm text-green-900 dark:text-green-100 font-medium">Temps économisé</p>
              <p className="text-3xl font-display font-bold text-green-950 dark:text-white">12h</p>
              <p className="text-xs text-green-800 dark:text-green-200">Ce mois-ci</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-yellow-300 to-yellow-400 dark:from-yellow-600 dark:to-yellow-700 rounded-2xl p-6 border-2 border-yellow-500 dark:border-yellow-600 hover:scale-105 transition-all shadow-lg cursor-pointer"
              variants={statsCardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/30">
                  <Star className="h-6 w-6 text-yellow-900 dark:text-yellow-100" />
                </div>
              </div>
              <p className="text-sm text-yellow-900 dark:text-yellow-100 font-medium">Notes moyennes</p>
              <p className="text-3xl font-display font-bold text-yellow-950 dark:text-white">4.8</p>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-display font-semibold mb-4">Actions rapides</h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
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
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-800 rounded-2xl border-2 border-purple-400 dark:border-purple-600 p-6 shadow-lg">
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
            <div className="bg-gradient-to-br from-pink-200 to-pink-300 dark:from-pink-700 dark:to-pink-800 rounded-2xl border-2 border-pink-400 dark:border-pink-600 p-6 shadow-lg">
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
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Minecraft Pixel
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                      Kawaii Pastel
                    </span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                      Scrapbook Vintage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspiring CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-[2px]">
            <div className="bg-background rounded-3xl p-8 md:p-12 text-center">
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
