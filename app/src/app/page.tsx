'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  GraduationCap,
  LogIn,
  Wand2,
  Library,
  Users,
  Shield,
  Sparkles
} from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect authenticated users to /home
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home')
    }
  }, [status, router])

  // Show loading state while checking auth
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Navigation Bar */}
      <nav className="w-full bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-display font-semibold text-lg">Studio PFEQ</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Simple Welcome */}
      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
            Bonjour! 👋
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Créez du matériel pédagogique aligné au PFEQ en quelques clics.
          </p>
        </div>

        {/* Quick Start Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Card className="p-6 hover:border-orange-200 dark:hover:border-orange-800 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950/50">
                <Wand2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1">Créer une carte</h3>
                <p className="text-sm text-muted-foreground">Générateur guidé avec filtres PFEQ</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950/50">
                <Library className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1">Ma bibliothèque</h3>
                <p className="text-sm text-muted-foreground">Vos créations sauvegardées</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sign In CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => signIn('google', { callbackUrl: '/home' })}
            className="shadow-lg"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Se connecter avec Google
          </Button>
          <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            Connexion sécurisée
          </p>
        </div>

        {/* Simple Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="inline-flex p-3 rounded-lg bg-orange-100 dark:bg-orange-950/50 mb-3">
              <Sparkles className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="font-display font-semibold mb-1">IA spécialisée</h4>
            <p className="text-sm text-muted-foreground">Aligné au PFEQ</p>
          </div>
          <div>
            <div className="inline-flex p-3 rounded-lg bg-blue-100 dark:bg-blue-950/50 mb-3">
              <Wand2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-display font-semibold mb-1">59+ thèmes</h4>
            <p className="text-sm text-muted-foreground">Designs variés</p>
          </div>
          <div>
            <div className="inline-flex p-3 rounded-lg bg-green-100 dark:bg-green-950/50 mb-3">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-display font-semibold mb-1">Communauté</h4>
            <p className="text-sm text-muted-foreground">Partagez & découvrez</p>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-8 px-6 border-t border-border mt-20">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Studio PFEQ · Fait au Québec</p>
        </div>
      </footer>
    </div>
  )
}
