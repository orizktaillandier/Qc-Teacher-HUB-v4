'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sparkles,
  BookOpen,
  Brain,
  Users,
  CheckCircle,
  GraduationCap,
  LogIn
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl">Quebec Teacher Hub</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Nouveau: 59+ thèmes québécois
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-4 leading-tight">
              Créez du Contenu Éducatif
              <br />
              Aligné au PFEQ
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Générez instantanément des cartes éducatives personnalisées avec notre IA
              spécialisée dans le curriculum québécois
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                size="lg"
                className="group transition-all active:scale-95"
                onClick={() => signIn('google', { callbackUrl: '/home' })}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Se connecter avec Google
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
