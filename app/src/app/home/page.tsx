'use client'

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/ui/stats-card"
import { QuickActionCard } from "@/components/ui/quick-action-card"
import { ActivityFeedItem } from "@/components/ui/activity-feed-item"
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
  Download
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] || 'Enseignant'

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Welcome Header */}
          <div className="animate-fade-in-down">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Bonjour, {firstName}! 👋
            </h1>
            <p className="text-muted-foreground">
              Bienvenue dans votre studio créatif. Qu'allez-vous créer aujourd'hui?
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40 rounded-2xl p-6 border-2 border-orange-300 dark:border-orange-700 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-orange-500/20">
                  <Sparkles className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-sm font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-400">
                  ↑ 12%
                </div>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">Cartes créées</p>
              <p className="text-3xl font-display font-bold text-orange-900 dark:text-orange-100">42</p>
              <p className="text-xs text-orange-600 dark:text-orange-400">Cette semaine</p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-blue-500/20">
                  <Library className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Collections</p>
              <p className="text-3xl font-display font-bold text-blue-900 dark:text-blue-100">8</p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-green-500/20">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-sm font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-400">
                  ↑ 5%
                </div>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">Temps économisé</p>
              <p className="text-3xl font-display font-bold text-green-900 dark:text-green-100">12h</p>
              <p className="text-xs text-green-600 dark:text-green-400">Ce mois-ci</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 rounded-2xl p-6 border-2 border-yellow-300 dark:border-yellow-700 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-yellow-500/20">
                  <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">Notes moyennes</p>
              <p className="text-3xl font-display font-bold text-yellow-900 dark:text-yellow-100">4.8</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-display font-semibold mb-4">Actions rapides</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
          </div>

          {/* Recent Activity & Tips */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700 p-6">
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
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl border-2 border-pink-200 dark:border-pink-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-pink-500/20">
                  <Sparkles className="h-5 w-5 text-pink-600 dark:text-pink-400" />
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
    </div>
  )
}
