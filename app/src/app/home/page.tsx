'use client'

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
          {/* Welcome Header - Clean and simple */}
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-2 text-foreground">
              Bonjour, {firstName}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Que souhaitez-vous créer aujourd'hui?
            </p>
          </div>

          {/* Main Actions - Clean cards with subtle hover */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Link href="/generator" className="group">
              <Card className="p-6 h-full hover:border-primary/50 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Wand2 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Créer des cartes</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Générez des cartes éducatives alignées au PFEQ
                  </p>
                  <div className="flex items-center text-sm text-primary font-medium">
                    Commencer
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/library" className="group">
              <Card className="p-6 h-full hover:border-secondary/50 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Library className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Ma bibliothèque</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Accédez à vos créations sauvegardées
                  </p>
                  <div className="flex items-center text-sm text-secondary font-medium">
                    Voir
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/shared-library" className="group">
              <Card className="p-6 h-full hover:border-accent/50 hover:shadow-md transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">Communauté</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    Découvrez les créations d'autres enseignants
                  </p>
                  <div className="flex items-center text-sm text-accent font-medium">
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
