'use client'

import { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export function BetaFeedbackButton() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Only show to logged-in users
  if (!session) return null

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error('Veuillez entrer votre commentaire')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/beta-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback.trim(),
          userAgent: navigator.userAgent,
          currentPage: window.location.pathname,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      toast.success('Merci!', {
        description: 'Votre commentaire a été envoyé'
      })

      setFeedback('')
      setIsOpen(false)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast.error('Erreur', {
        description: 'Impossible d\'envoyer le commentaire'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Feedback Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-2xl border-2 border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-900">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/50 dark:to-yellow-950/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                    Feedback Beta
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Aidez-nous à améliorer la plateforme
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Partagez vos commentaires, suggestions ou bugs:
                </label>
                <Textarea
                  placeholder="Exemple: Le générateur de cartes est très utile, mais j'aimerais pouvoir..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>Envoi...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Vos commentaires nous aident à améliorer l'outil
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 font-semibold text-sm flex items-center gap-2 group animate-pulse hover:animate-none"
        aria-label="Beta Feedback"
      >
        <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Feedback Beta</span>
        <span className="sm:hidden">Feedback</span>

        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
        </span>
      </button>
    </>
  )
}
