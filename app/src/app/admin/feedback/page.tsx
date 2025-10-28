'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, User, Globe, Calendar } from 'lucide-react'
import { Navigation } from '@/components/navigation'

interface FeedbackItem {
  id: string
  feedback: string
  userAgent: string | null
  currentPage: string | null
  createdAt: string
  user: {
    name: string | null
    email: string | null
  }
}

export default function AdminFeedbackPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
      return
    }

    if (status === 'authenticated') {
      fetchFeedback()
    }
  }, [status, router])

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/admin/feedback')
      if (!response.ok) {
        throw new Error('Failed to fetch feedback')
      }
      const data = await response.json()
      setFeedbackList(data.feedback)
    } catch (error) {
      console.error('Error fetching feedback:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white dark:from-gray-900 dark:to-gray-950 pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Feedback Beta
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Commentaires et suggestions des utilisateurs
            </p>
          </div>

          <div className="mb-6">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <MessageSquare className="h-4 w-4 mr-2" />
              {feedbackList.length} commentaire{feedbackList.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <div className="space-y-4">
            {feedbackList.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Aucun feedback reçu pour le moment
                  </p>
                </CardContent>
              </Card>
            ) : (
              feedbackList.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <CardTitle className="text-lg">
                            {item.user.name || 'Utilisateur anonyme'}
                          </CardTitle>
                        </div>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.createdAt).toLocaleString('fr-CA', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {item.user.email && (
                            <span className="text-xs text-muted-foreground">
                              {item.user.email}
                            </span>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                        {item.feedback}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {item.currentPage && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <span>Page: {item.currentPage}</span>
                        </div>
                      )}
                      {item.userAgent && (
                        <div className="flex items-center gap-1">
                          <span className="truncate max-w-md">
                            {item.userAgent.split(' ').slice(0, 3).join(' ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
