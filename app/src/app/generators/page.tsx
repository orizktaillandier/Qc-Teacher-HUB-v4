'use client'

import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function GeneratorsPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white dark:from-gray-900 dark:to-gray-950 pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Générateurs PFEQ
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Créez du matériel pédagogique aligné avec le Programme de formation de l'école québécoise
            </p>
          </div>

          {/* Generator Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card Generator */}
            <Link href="/generator" className="group">
              <Card className="h-full transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-blue-300 dark:hover:border-blue-700">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900 group-hover:scale-110 transition-transform">
                      <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    Cartes de Tâches
                  </CardTitle>
                  <CardDescription className="text-base">
                    Créez des cartes de tâches personnalisées avec des thèmes colorés et des illustrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span>59+ thèmes professionnels</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span>120+ illustrations kawaii</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span>Export PDF prêt à imprimer</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      <span>Personnalisation complète</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 group-hover:bg-blue-600" size="lg">
                    Créer des Cartes
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Drill Sheet Generator */}
            <Link href="/drill-generator" className="group">
              <Card className="h-full transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-indigo-300 dark:hover:border-indigo-700">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900 group-hover:scale-110 transition-transform">
                      <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    Fiches d'Exercices
                  </CardTitle>
                  <CardDescription className="text-base">
                    Générez des feuilles d'exercices adaptées au niveau et aux notions ciblées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400">•</span>
                      <span>5-30 exercices par fiche</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400">•</span>
                      <span>Difficulté progressive ou uniforme</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400">•</span>
                      <span>Corrigé inclus automatiquement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400">•</span>
                      <span>Disposition en grille flexible</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 group-hover:bg-indigo-600" size="lg">
                    Créer une Fiche
                    <FileText className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <div className="bg-orange-50 dark:bg-orange-950/30 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                🍁 Aligné avec le PFEQ
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tous nos générateurs sont conçus pour respecter le Programme de formation de l'école québécoise.
                Choisissez votre cycle, année scolaire, matière et notion pour du contenu parfaitement adapté.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
