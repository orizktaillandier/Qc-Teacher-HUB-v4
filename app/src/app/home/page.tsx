'use client'

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Wand2,
  Library,
  Users,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] || 'Enseignant'

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="relative pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Welcome Header with Illustration */}
          <Card className="mb-8 border shadow-sm bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/10 dark:to-purple-950/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Illustration */}
                <div className="flex-shrink-0">
                  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Teacher at desk with sparkles */}

                    {/* Desk */}
                    <rect x="30" y="100" width="100" height="8" rx="2" className="fill-blue-200 dark:fill-blue-900/50"/>

                    {/* Book/Cards on desk */}
                    <rect x="45" y="85" width="25" height="15" rx="2" className="fill-orange-200 dark:fill-orange-900/50" stroke="currentColor" strokeWidth="2" className="stroke-orange-400 dark:stroke-orange-600"/>
                    <rect x="75" y="85" width="25" height="15" rx="2" className="fill-green-200 dark:fill-green-900/50" stroke="currentColor" strokeWidth="2" className="stroke-green-400 dark:stroke-green-600"/>
                    <rect x="105" y="85" width="25" height="15" rx="2" className="fill-purple-200 dark:fill-purple-900/50" stroke="currentColor" strokeWidth="2" className="stroke-purple-400 dark:stroke-purple-600"/>

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

          {/* Main Actions - Clean cards with subtle hover */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Link href="/generator" className="group">
              <Card className="p-6 h-full hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/50">
                      <Wand2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Créer des cartes</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Générez des cartes éducatives alignées au PFEQ
                  </p>
                  <div className="flex items-center text-sm text-orange-600 dark:text-orange-400 font-medium">
                    Commencer
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/library" className="group">
              <Card className="p-6 h-full hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/50">
                      <Library className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Ma bibliothèque</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Accédez à vos créations sauvegardées
                  </p>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Voir
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/shared-library" className="group">
              <Card className="p-6 h-full hover:border-green-200 dark:hover:border-green-800 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/50">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Communauté</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Découvrez les créations d'autres enseignants
                  </p>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
                    Explorer
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Quick CTA */}
          <div className="text-center pt-8 border-t border-border">
            <p className="text-muted-foreground mb-4">
              Prêt à créer du matériel pédagogique?
            </p>
            <Link href="/generator">
              <Button size="lg" className="gap-2">
                <Wand2 className="h-5 w-5" />
                Générer des cartes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
