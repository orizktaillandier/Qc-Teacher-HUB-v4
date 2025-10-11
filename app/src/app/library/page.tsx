'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Library as LibraryIcon,
  Download,
  Trash2,
  Eye,
  Calendar,
  GraduationCap,
  Loader2,
  FolderOpen,
  AlertCircle,
  Share2
} from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

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
  const [filter, setFilter] = useState<'all' | 'recent' | 'subject'>('all')

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
      const response = await fetch('/api/library/generations')
      const data = await response.json()

      if (data.success) {
        setGenerations(data.generations)
      } else {
        throw new Error(data.error || 'Failed to fetch generations')
      }
    } catch (error) {
      console.error('Error fetching generations:', error)
      toast.error('Erreur', {
        description: 'Impossible de charger vos générations'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette génération?')) {
      return
    }

    try {
      const response = await fetch(`/api/library/generations/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setGenerations(prev => prev.filter(gen => gen.id !== id))
        toast.success('Supprimé!', {
          description: 'Génération supprimée avec succès'
        })
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

  const handleShare = async (generationId: string) => {
    if (!confirm('Partager cette génération avec tous les utilisateurs?')) {
      return
    }

    try {
      const response = await fetch('/api/shared-library/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          generationId
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Partagé!', {
          description: 'Votre génération est maintenant visible dans la bibliothèque partagée'
        })
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Navigation />
        <div className="pt-20 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="text-center py-20">
              <CardContent>
                <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Connexion requise</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navigation />

      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <LibraryIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Ma Bibliothèque</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Retrouvez toutes vos générations de cartes à tâches
            </p>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <Card className="py-20">
              <CardContent className="flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Chargement de vos générations...</p>
              </CardContent>
            </Card>
          ) : generations.length === 0 ? (
            /* Empty state */
            <Card className="py-20">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <FolderOpen className="h-16 w-16 text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucune génération</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
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
              {generations.map((generation, index) => (
                <motion.div
                  key={generation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
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
                            onClick={() => handleShare(generation.id)}
                            title="Partager avec la communauté"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(generation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
