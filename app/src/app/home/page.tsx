'use client'

import { Navigation } from "@/components/navigation"
import { BetaTesterBanner } from "@/components/BetaTesterBanner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wand2,
  Library,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  Clock,
  TrendingUp,
  Share2,
  Heart
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function Home() {
  const { data: session } = useSession()
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [recentGenerations, setRecentGenerations] = useState<any[]>([])

  // Fetch recent generations for library card
  useEffect(() => {
    if (session && expandedCard === 'library') {
      fetchRecentGenerations()
    }
  }, [session, expandedCard])

  const fetchRecentGenerations = async () => {
    try {
      const response = await fetch('/api/library/generations')
      const data = await response.json()
      if (data.success) {
        setRecentGenerations(data.generations.slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching recent generations:', error)
    }
  }

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Beta Tester Banner - with top padding to clear fixed nav */}
      <div className="pt-20">
        <BetaTesterBanner />
      </div>

      <div className="relative pt-6 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Welcome Header with Illustration */}
          <Card className="mb-8 border-2 shadow-lg bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/10 dark:to-purple-950/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Illustration */}
                <div className="flex-shrink-0">
                  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Teacher at desk with sparkles */}

                    {/* Desk */}
                    <rect x="30" y="100" width="100" height="8" rx="2" className="fill-blue-200 dark:fill-blue-900/50"/>

                    {/* Book/Cards on desk */}
                    <rect x="45" y="85" width="25" height="15" rx="2" className="fill-orange-200 dark:fill-orange-900/50 stroke-orange-400 dark:stroke-orange-600" strokeWidth="2"/>
                    <rect x="75" y="85" width="25" height="15" rx="2" className="fill-green-200 dark:fill-green-900/50 stroke-green-400 dark:stroke-green-600" strokeWidth="2"/>
                    <rect x="105" y="85" width="25" height="15" rx="2" className="fill-purple-200 dark:fill-purple-900/50 stroke-purple-400 dark:stroke-purple-600" strokeWidth="2"/>

                    {/* Person/Teacher */}
                    <circle cx="80" cy="50" r="15" className="fill-blue-400 dark:fill-blue-500"/>
                    <path d="M65 65 Q80 75 95 65" className="stroke-blue-400 dark:stroke-blue-500" strokeWidth="8" strokeLinecap="round" fill="none"/>

                    {/* Graduation cap */}
                    <path d="M65 45 L80 40 L95 45 L80 50 Z" className="fill-blue-600 dark:fill-blue-400"/>
                    <rect x="78" y="38" width="4" height="8" className="fill-blue-600 dark:fill-blue-400"/>

                    {/* Sparkles around */}
                    <g className="animate-pulse">
                      <circle cx="25" cy="30" r="2" className="fill-orange-400"/>
                      <line x1="25" y1="24" x2="25" y2="36" strokeWidth="1.5" className="stroke-orange-400"/>
                      <line x1="19" y1="30" x2="31" y2="30" strokeWidth="1.5" className="stroke-orange-400"/>
                    </g>

                    <g className="animate-pulse" style={{animationDelay: '0.3s'}}>
                      <circle cx="135" cy="40" r="2" className="fill-green-400"/>
                      <line x1="135" y1="34" x2="135" y2="46" strokeWidth="1.5" className="stroke-green-400"/>
                      <line x1="129" y1="40" x2="141" y2="40" strokeWidth="1.5" className="stroke-green-400"/>
                    </g>

                    <g className="animate-pulse" style={{animationDelay: '0.6s'}}>
                      <circle cx="140" cy="80" r="1.5" className="fill-purple-400"/>
                      <line x1="140" y1="75" x2="140" y2="85" strokeWidth="1.5" className="stroke-purple-400"/>
                      <line x1="135" y1="80" x2="145" y2="80" strokeWidth="1.5" className="stroke-purple-400"/>
                    </g>
                  </svg>
                </div>

                {/* Welcome Text */}
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-4xl font-display font-bold mb-2 text-foreground">
                    Créez du matériel pédagogique
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    Générez des cartes à tâches alignées au PFEQ en quelques clics.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Choisissez une action ci-dessous pour commencer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Actions - Expandable cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12 items-start">
            {/* Card 1: Create Content */}
            <Card className="border-2 shadow-lg hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-xl transition-all overflow-hidden gap-0 py-0">
              <button
                onClick={() => toggleCard('create')}
                className="w-full p-6 text-left transition-all h-[140px] flex flex-col justify-center"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/50">
                      <Wand2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Créer du contenu</h3>
                  </div>
                  <div className="transition-transform duration-300">
                    {expandedCard === 'create' ? (
                      <ChevronUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Générez du matériel pédagogique aligné au PFEQ
                </p>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  expandedCard === 'create' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-8 space-y-3">
                  <Link href="/generator">
                    <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-orange-50 dark:hover:bg-orange-950/20 h-12">
                      <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <span>Cartes à tâches</span>
                    </Button>
                  </Link>
                  <Link href="/drill-generator">
                    <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-orange-50 dark:hover:bg-orange-950/20 h-12">
                      <Sparkles className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      <span>Fiches d'exercices</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start gap-3 opacity-50 cursor-not-allowed h-12">
                    <Sparkles className="h-5 w-5" />
                    <span>Plans de leçon</span>
                    <Badge variant="outline" className="ml-auto text-xs">Bientôt</Badge>
                  </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 2: Library */}
            <Card className="border-2 shadow-lg hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all overflow-hidden gap-0 py-0">
              <button
                onClick={() => toggleCard('library')}
                className="w-full p-6 text-left transition-all h-[140px] flex flex-col justify-center"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/50">
                      <Library className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Ma bibliothèque</h3>
                  </div>
                  <div className="transition-transform duration-300">
                    {expandedCard === 'library' ? (
                      <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Accédez à vos créations sauvegardées
                </p>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  expandedCard === 'library' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-8 space-y-4">
                  {recentGenerations.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {recentGenerations.map((gen) => (
                          <Link key={gen.id} href={`/generator?view=library`} onClick={() => sessionStorage.setItem('viewGeneration', JSON.stringify(gen))}>
                            <div className="p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{gen.notion}</p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(gen.createdAt).toLocaleDateString('fr-CA')}
                                  </p>
                                </div>
                                <Badge variant="secondary" className="ml-2">{gen.cardCount}</Badge>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link href="/library" className="block">
                        <Button variant="outline" className="w-full gap-2 h-10">
                          Voir tout
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      <p>Aucune génération récente</p>
                      <Link href="/generator">
                        <Button variant="outline" className="mt-4" size="sm">Créer maintenant</Button>
                      </Link>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3: Community Highlights */}
            <Card className="border-2 shadow-lg hover:border-green-200 dark:hover:border-green-800 hover:shadow-xl transition-all overflow-hidden gap-0 py-0">
              <button
                onClick={() => toggleCard('community')}
                className="w-full p-6 text-left transition-all h-[140px] flex flex-col justify-center"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/50">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Communauté</h3>
                  </div>
                  <div className="transition-transform duration-300">
                    {expandedCard === 'community' ? (
                      <ChevronUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Découvrez les créations populaires
                </p>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  expandedCard === 'community' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-8 space-y-3">
                  <Link href="/shared-library">
                    <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-green-50 dark:hover:bg-green-950/20 h-12">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span>Cartes populaires</span>
                    </Button>
                  </Link>
                  <Link href="/shared-library">
                    <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-green-50 dark:hover:bg-green-950/20 h-12">
                      <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span>Nouveautés</span>
                    </Button>
                  </Link>
                  <Link href="/shared-library">
                    <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-green-50 dark:hover:bg-green-950/20 h-12">
                      <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span>Favoris de la communauté</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-green-50 dark:hover:bg-green-950/20 h-12">
                    <Share2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span>Partager mes créations</span>
                  </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
