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
            <StatsCard
              title="Cartes créées"
              value={42}
              icon={Sparkles}
              trend={{ value: 12, label: "Cette semaine", isPositive: true }}
            />
            <StatsCard
              title="Collections"
              value={8}
              icon={Library}
              className="border-secondary/30"
            />
            <StatsCard
              title="Temps économisé"
              value="12h"
              icon={Clock}
              trend={{ value: 5, label: "Ce mois-ci", isPositive: true }}
              className="border-accent/30"
            />
            <StatsCard
              title="Notes moyennes"
              value="4.8"
              icon={Star}
              className="border-primary/30"
            />
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
            <div className="bg-card rounded-2xl border-2 p-6">
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
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl border-2 border-primary/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-display font-semibold">Astuce du jour</h2>
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
