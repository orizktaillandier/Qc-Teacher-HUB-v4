'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Globe, Download, Eye, Calendar, Filter } from 'lucide-react'

interface SharedGeneration {
  id: string
  authorName: string | null
  cycle: string
  grade: string
  subject: string
  notion: string
  subNotions: string[]
  cardCount: number
  theme: string | null
  fontFamily: string | null
  cards: any[]
  views: number
  copies: number
  sharedAt: string
  // All customization fields
  textPositions?: any
  editedTexts?: any
  fontSize?: number
  isBold?: boolean
  isItalic?: boolean
  isUnderline?: boolean
  textAlign?: string
  textBackground?: number
  selectedCharacter?: string
  selectedMood?: string
  showIllustrations?: boolean
  illustrationScale?: number
  illustrationColor?: string
  transparentBackground?: boolean
  illustrationTransforms?: any
  themeType?: string
  selectedAdvancedTheme?: number | null
  selectedDalleTheme?: number | null
}

const subjectLabels: Record<string, string> = {
  francais: 'Français',
  mathematiques: 'Mathématiques',
  'univers-social': 'Univers social',
  science: 'Science et technologie',
  'arts-plastiques': 'Arts plastiques',
  musique: 'Musique',
  'education-physique': 'Éducation physique',
  'ethique-culture': 'Éthique et culture religieuse',
  anglais: 'Anglais'
}

const gradeLabels: Record<string, string> = {
  '1': '1re année',
  '2': '2e année',
  '3': '3e année',
  '4': '4e année',
  '5': '5e année',
  '6': '6e année'
}

export default function SharedLibraryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [generations, setGenerations] = useState<SharedGeneration[]>([])
  const [filteredGenerations, setFilteredGenerations] = useState<SharedGeneration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterSubject, setFilterSubject] = useState<string>('all')
  const [filterGrade, setFilterGrade] = useState<string>('all')

  // Load shared generations on mount
  useEffect(() => {
    loadSharedGenerations()
  }, [])

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters()
  }, [generations, filterSubject, filterGrade])

  const loadSharedGenerations = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/shared-library/generations')
      const data = await response.json()

      if (data.success) {
        setGenerations(data.generations)
      } else {
        toast.error('Erreur', {
          description: data.error || 'Impossible de charger les générations'
        })
      }
    } catch (error) {
      console.error('Error loading shared generations:', error)
      toast.error('Erreur', {
        description: 'Impossible de charger les générations partagées'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...generations]

    if (filterSubject !== 'all') {
      filtered = filtered.filter(gen => gen.subject === filterSubject)
    }

    if (filterGrade !== 'all') {
      filtered = filtered.filter(gen => gen.grade === filterGrade)
    }

    setFilteredGenerations(filtered)
  }

  const handleCopyToLibrary = async (sharedGenerationId: string) => {
    if (!session) {
      toast.error('Connexion requise', {
        description: 'Veuillez vous connecter pour copier cette génération'
      })
      return
    }

    try {
      const response = await fetch('/api/shared-library/copy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sharedGenerationId
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Copié!', {
          description: 'Génération ajoutée à votre bibliothèque personnelle'
        })
        // Reload to update copy counter
        loadSharedGenerations()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error copying generation:', error)
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de copier'
      })
    }
  }

  const handleView = (generation: SharedGeneration) => {
    // Store in sessionStorage for generator page to load
    sessionStorage.setItem('viewGeneration', JSON.stringify(generation))
    router.push('/generator')
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Get unique subjects and grades from generations for filter dropdowns
  const availableSubjects = Array.from(new Set(generations.map(g => g.subject)))
  const availableGrades = Array.from(new Set(generations.map(g => g.grade)))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-display font-bold text-foreground">
                Bibliothèque Partagée
              </h1>
              <Badge variant="outline">
                {generations.length} générations
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Découvrez et copiez des cartes créées par d'autres enseignants
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6 border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Matière</label>
                  <Select value={filterSubject} onValueChange={setFilterSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les matières" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les matières</SelectItem>
                      {availableSubjects.map(subject => (
                        <SelectItem key={subject} value={subject}>
                          {subjectLabels[subject] || subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Année</label>
                  <Select value={filterGrade} onValueChange={setFilterGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les années" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les années</SelectItem>
                      {availableGrades.sort().map(grade => (
                        <SelectItem key={grade} value={grade}>
                          {gradeLabels[grade] || grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generations Grid */}
          {filteredGenerations.length === 0 ? (
            <Card className="border shadow-sm">
              <CardContent className="py-20">
                <div className="text-center">
                  <Globe className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-display font-semibold mb-2">Aucune génération partagée</h3>
                  <p className="text-muted-foreground">
                    {filterSubject !== 'all' || filterGrade !== 'all'
                      ? 'Aucune génération ne correspond à vos filtres'
                      : 'Soyez le premier à partager des cartes!'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGenerations.map((generation) => (
                <div key={generation.id}>
                  <Card className="h-full border shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
                    <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">
                        {subjectLabels[generation.subject] || generation.subject}
                      </Badge>
                      <Badge variant="outline">
                        {gradeLabels[generation.grade] || generation.grade}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{generation.notion}</CardTitle>
                      <CardDescription>
                        Par {generation.authorName || 'Utilisateur anonyme'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>{generation.cardCount} carte{generation.cardCount > 1 ? 's' : ''}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(generation.sharedAt).toLocaleDateString('fr-CA')}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {generation.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {generation.copies} copie{generation.copies !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleView(generation)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCopyToLibrary(generation.id)}
                          disabled={!session}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Copier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
