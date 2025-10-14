'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeroSection } from "@/components/ui/hero-section"
import { BackgroundPattern } from "@/components/ui/background-pattern"
import {
  Sparkles,
  BookOpen,
  Brain,
  Users,
  CheckCircle,
  GraduationCap,
  LogIn,
  Palette,
  Wand2,
  Heart,
  Clock,
  Download,
  Shield
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-yellow-50/80 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Professional Educational Illustrations Background */}
      <BackgroundPattern variant="illustrations" />

      {/* Floating Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative w-full bg-card/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">Quebec Teacher Hub</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection
        subtitle="🍁 Fait au Québec pour le Québec"
        title="Votre Studio Créatif d'Enseignement"
        description="Générez des cartes éducatives magnifiques, alignées au PFEQ, en quelques clics. Rejoignez des centaines d'enseignants québécois qui économisent des heures chaque semaine."
      >
        <Button
          size="lg"
          className="group transition-all hover:scale-105 active:scale-95 shadow-lg"
          onClick={() => signIn('google', { callbackUrl: '/home' })}
        >
          <LogIn className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-[-2px]" />
          Commencer gratuitement
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="group transition-all hover:scale-105"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Voir un exemple
        </Button>
      </HeroSection>

      {/* Social Proof */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="animate-fade-in">
              <p className="text-3xl font-display font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Enseignants actifs</p>
            </div>
            <div className="animate-fade-in delay-200">
              <p className="text-3xl font-display font-bold text-secondary">10,000+</p>
              <p className="text-sm text-muted-foreground">Cartes générées</p>
            </div>
            <div className="animate-fade-in delay-400">
              <p className="text-3xl font-display font-bold text-accent">59+</p>
              <p className="text-sm text-muted-foreground">Thèmes uniques</p>
            </div>
            <div className="animate-fade-in delay-400">
              <p className="text-3xl font-display font-bold text-primary">4.9/5</p>
              <p className="text-sm text-muted-foreground">Note moyenne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Tout ce dont vous avez besoin pour créer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des outils puissants, une interface intuitive, et une touche québécoise dans chaque détail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Cards */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 bg-gradient-to-br from-white to-orange-50">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 w-fit transition-transform group-hover:scale-110">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">IA Spécialisée PFEQ</h3>
                  <p className="text-sm text-muted-foreground">
                    Notre intelligence artificielle connaît le curriculum québécois par cœur et génère du contenu parfaitement aligné.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 w-fit transition-transform group-hover:scale-110">
                  <Palette className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">59+ Thèmes Magnifiques</h3>
                  <p className="text-sm text-muted-foreground">
                    Des designs colorés et engageants qui captivent vos élèves. Des thèmes Minecraft aux styles scrapbook.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 w-fit transition-transform group-hover:scale-110">
                  <Wand2 className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">120+ Illustrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Personnages kawaii, icônes éducatives, émojis et plus. Ajoutez de la vie à chaque carte.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 bg-gradient-to-br from-white to-yellow-50">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 w-fit transition-transform group-hover:scale-110">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">Économisez des Heures</h3>
                  <p className="text-sm text-muted-foreground">
                    De la conception à l'impression en 2 minutes. Plus de temps pour enseigner, moins pour créer.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 bg-gradient-to-br from-white to-purple-50">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 w-fit transition-transform group-hover:scale-110">
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">Export PDF Parfait</h3>
                  <p className="text-sm text-muted-foreground">
                    Téléchargez vos cartes prêtes à imprimer. Format A4 optimisé, couleurs fidèles.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 bg-gradient-to-br from-white to-pink-50">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-500/10 w-fit transition-transform group-hover:scale-110">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">Bibliothèque Communautaire</h3>
                  <p className="text-sm text-muted-foreground">
                    Partagez vos créations et découvrez celles d'autres enseignants québécois.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Prêt à transformer votre enseignement?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'enseignants québécois qui ont déjà adopté Quebec Teacher Hub. Gratuit pour commencer.
          </p>
          <Button
            size="lg"
            className="group transition-all hover:scale-105 active:scale-95 shadow-xl"
            onClick={() => signIn('google', { callbackUrl: '/home' })}
          >
            <LogIn className="mr-2 h-5 w-5" />
            Créer mon compte gratuitement
          </Button>
          <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            Connexion sécurisée avec Google
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-2">Fait avec <Heart className="inline h-4 w-4 text-primary" /> au Québec pour les enseignants du Québec</p>
          <p>© 2025 Quebec Teacher Hub v5 · Aligné au PFEQ</p>
        </div>
      </footer>

    </div>
  )
}
