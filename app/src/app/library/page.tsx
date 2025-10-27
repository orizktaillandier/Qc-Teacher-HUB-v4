'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Trash2,
  Eye,
  Calendar,
  GraduationCap,
  Loader2,
  FolderOpen,
  AlertCircle,
  Share2,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

interface CardGenerationItem {
  id: string
  cycle: string
  grade: string
  subject: string
  notion: string
  subNotions: string[]
  cardCount: number
  theme?: string
  fontFamily?: string
  cards: any[]
  createdAt: string
  updatedAt: string
}

export default function LibraryPage() {
  const { data: session, status } = useSession()
  const [generations, setGenerations] = useState<CardGenerationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [filter, setFilter] = useState<'all' | 'recent' | 'subject'>('all')

  // AlertDialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedGenerationId, setSelectedGenerationId] = useState<string | null>(null)

  // Fetch user's card generations
  useEffect(() => {
    if (status === 'authenticated') {
      fetchGenerations()
    } else if (status === 'unauthenticated') {
      setIsLoading(false)
    }
  }, [status])

  const fetchGenerations = async () => {
    try {
      setIsLoading(true)
      setHasError(false)
      const response = await fetch('/api/library/generations')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Library API response:', data)

      if (data.success) {
        setGenerations(data.generations || [])
      } else {
        throw new Error(data.error || 'Failed to fetch generations')
      }
    } catch (error) {
      console.error('Error fetching generations:', error)
      setHasError(true)
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de charger vos générations'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openDeleteDialog = (id: string) => {
    setSelectedGenerationId(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedGenerationId) return

    try {
      const response = await fetch(`/api/library/generations/${selectedGenerationId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setGenerations(prev => prev.filter(gen => gen.id !== selectedGenerationId))
        toast.success('Supprimé!', {
          description: 'Génération supprimée avec succès'
        })
        setDeleteDialogOpen(false)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error deleting generation:', error)
      toast.error('Erreur', {
        description: 'Impossible de supprimer la génération'
      })
    }
  }

  const handleView = (generation: CardGenerationItem) => {
    // Store generation data in sessionStorage and navigate to generator
    sessionStorage.setItem('viewGeneration', JSON.stringify(generation))
    window.location.href = '/generator?view=library'
  }

  const openShareDialog = (id: string) => {
    setSelectedGenerationId(id)
    setShareDialogOpen(true)
  }

  const handleShare = async () => {
    if (!selectedGenerationId) return

    try {
      const response = await fetch('/api/shared-library/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          generationId: selectedGenerationId
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Partagé!', {
          description: 'Votre génération est maintenant visible dans la bibliothèque partagée'
        })
        setShareDialogOpen(false)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error sharing generation:', error)
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de partager'
      })
    }
  }

  // Format date to French locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get subject label in French
  const getSubjectLabel = (subjectKey: string) => {
    const labels: Record<string, string> = {
      'mathematiques': 'Mathématiques',
      'francais-langue-enseignement': 'Français',
      'science-et-technologie': 'Science et technologie',
      'univers-social': 'Univers social',
      'arts-plastiques': 'Arts plastiques',
      'education-physique-sante': 'Éducation physique'
    }
    return labels[subjectKey] || subjectKey
  }

  // Unauthenticated state
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="text-center py-20 border shadow-sm">
              <CardContent>
                <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-display font-bold mb-2">Connexion requise</h2>
                <p className="text-muted-foreground mb-6">
                  Vous devez être connecté pour accéder à votre bibliothèque
                </p>
                <Button onClick={() => window.location.href = '/api/auth/signin'}>
                  Se connecter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2 text-foreground">
              Ma Bibliothèque
            </h1>
            <p className="text-muted-foreground">
              Retrouvez toutes vos générations de cartes à tâches
            </p>
          </div>

          {/* Loading state with skeletons */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-full border shadow-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-32" />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-9 flex-1" />
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : hasError ? (
            /* Error state with retry */
            <Card className="py-20 border shadow-sm border-red-200 dark:border-red-900">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-16 w-16 text-red-500 dark:text-red-400 mb-4" />
                <h3 className="text-xl font-display font-semibold mb-2">Erreur de chargement</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Une erreur est survenue lors du chargement de vos générations. Veuillez réessayer.
                </p>
                <Button onClick={fetchGenerations} variant="default">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Réessayer
                </Button>
              </CardContent>
            </Card>
          ) : generations.length === 0 ? (
            /* Empty state */
            <Card className="py-20 border shadow-sm">
              <CardContent className="flex flex-col items-center justify-center text-center">
                {/* Friendly illustration */}
                <div className="mb-6">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Empty folder */}
                    <path d="M30 60 L30 150 C30 155 32 160 40 160 L160 160 C168 160 170 155 170 150 L170 75 C170 70 168 65 160 65 L95 65 L85 55 L40 55 C32 55 30 57 30 60 Z"
                          className="fill-blue-100 dark:fill-blue-950/50 stroke-blue-300 dark:stroke-blue-800"
                          stroke="currentColor"
                          strokeWidth="2"/>

                    {/* Sparkle 1 */}
                    <circle cx="60" cy="90" r="3" className="fill-orange-400 dark:fill-orange-500"/>
                    <line x1="60" y1="82" x2="60" y2="98" strokeWidth="2" className="stroke-orange-400 dark:stroke-orange-500"/>
                    <line x1="52" y1="90" x2="68" y2="90" strokeWidth="2" className="stroke-orange-400 dark:stroke-orange-500"/>

                    {/* Sparkle 2 */}
                    <circle cx="140" cy="100" r="2.5" className="fill-green-400 dark:fill-green-500"/>
                    <line x1="140" y1="93" x2="140" y2="107" strokeWidth="2" className="stroke-green-400 dark:stroke-green-500"/>
                    <line x1="133" y1="100" x2="147" y2="100" strokeWidth="2" className="stroke-green-400 dark:stroke-green-500"/>

                    {/* Plus sign in center */}
                    <circle cx="100" cy="110" r="20" className="fill-blue-200 dark:fill-blue-900/50"/>
                    <line x1="100" y1="100" x2="100" y2="120" strokeWidth="3" strokeLinecap="round" className="stroke-blue-600 dark:stroke-blue-400"/>
                    <line x1="90" y1="110" x2="110" y2="110" strokeWidth="3" strokeLinecap="round" className="stroke-blue-600 dark:stroke-blue-400"/>
                  </svg>
                </div>

                <h3 className="text-xl font-display font-semibold mb-2">Aucune génération</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Vous n'avez pas encore créé de cartes à tâches. Commencez par générer votre première collection!
                </p>
                <Button onClick={() => window.location.href = '/generator'}>
                  Créer des cartes
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Generations grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generations.map((generation) => (
                <div key={generation.id}>
                  <Card className="h-full border shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {generation.cardCount} cartes
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(generation.createdAt)}
                        </div>
                      </div>
                      <CardTitle className="text-lg">
                        {getSubjectLabel(generation.subject)}
                      </CardTitle>
                      <CardDescription>
                        {generation.notion}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Metadata */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {generation.grade}e année
                          </Badge>
                          {generation.subNotions && generation.subNotions.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              +{generation.subNotions.length} sous-notions
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleView(generation)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openShareDialog(generation.id)}
                            title="Partager avec la communauté"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(generation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette génération? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Share Confirmation Dialog */}
      <AlertDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Partager avec la communauté</AlertDialogTitle>
            <AlertDialogDescription>
              Votre génération sera visible par tous les utilisateurs dans la bibliothèque partagée. Voulez-vous continuer?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleShare}>
              Partager
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
