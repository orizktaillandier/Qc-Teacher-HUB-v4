'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // TODO: Log to Sentry when it's configured
    // Sentry.captureException(error, { extra: errorInfo })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle className="text-2xl">Une erreur est survenue</CardTitle>
              </div>
              <CardDescription>
                Désolé, quelque chose s'est mal passé. Notre équipe a été notifiée
                de ce problème.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error details for development */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                    Détails de l'erreur (mode développement):
                  </h3>
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm font-mono text-red-900 dark:text-red-200">
                      {this.state.error.message}
                    </p>
                    {this.state.errorInfo && (
                      <details className="mt-2">
                        <summary className="text-xs text-red-700 dark:text-red-300 cursor-pointer hover:underline">
                          Stack trace
                        </summary>
                        <pre className="mt-2 text-xs text-red-800 dark:text-red-200 overflow-auto max-h-40 whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}

              {/* User-friendly message for production */}
              {process.env.NODE_ENV === 'production' && (
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                    Que faire?
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• Essayez de rafraîchir la page</li>
                    <li>• Vérifiez votre connexion Internet</li>
                    <li>• Si le problème persiste, contactez le support</li>
                  </ul>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={this.handleReset}
                  variant="default"
                  className="flex items-center gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Réessayer
                </Button>
                <Link href="/home">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
