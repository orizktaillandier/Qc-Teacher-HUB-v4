'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/navigation'
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface AdminStats {
  stats: {
    totalUsers: number
    totalCardGenerations: number
    totalDrillSheetGenerations: number
    totalGenerations: number
    totalFeedback: number
  }
  recentActivity: Array<{
    type: string
    id: string
    subject: string
    notion: string
    count: number
    created_at: string
    user_name: string
    user_email: string
  }>
  topUsers: Array<{
    name: string
    email: string
    cardGenerations: number
    drillSheetGenerations: number
    totalGenerations: number
    feedbackCount: number
  }>
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
      return
    }

    if (status === 'authenticated' && session?.user?.email === 'qcteachhub@gmail.com') {
      fetchStats()
    } else if (status === 'authenticated') {
      // Not admin, redirect to home
      router.push('/home')
    }
  }, [status, session, router])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
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

  if (!stats) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-muted-foreground">Erreur de chargement</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white dark:from-gray-900 dark:to-gray-950 pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-orange-600" />
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Vue d'ensemble de la plateforme ProfStudio Beta
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Utilisateurs
                </CardTitle>
                <Users className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Beta testers actifs
                </p>
              </CardContent>
            </Card>

            {/* Total Generations */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Générations
                </CardTitle>
                <Zap className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.stats.totalGenerations}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.stats.totalCardGenerations} cartes + {stats.stats.totalDrillSheetGenerations} exercices
                </p>
              </CardContent>
            </Card>

            {/* Total Feedback */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Feedback
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.stats.totalFeedback}</div>
                <p className="text-xs text-muted-foreground">
                  Commentaires reçus
                </p>
              </CardContent>
            </Card>

            {/* Engagement Rate */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Engagement
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.stats.totalUsers > 0
                    ? (stats.stats.totalGenerations / stats.stats.totalUsers).toFixed(1)
                    : '0'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Générations par utilisateur
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-orange-600" />
                        Activité Récente
                      </CardTitle>
                      <CardDescription>
                        Dernières générations sur la plateforme
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentActivity.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        Aucune activité récente
                      </p>
                    ) : (
                      stats.recentActivity.map((activity, index) => (
                        <div
                          key={`${activity.type}-${activity.id}`}
                          className="flex items-start justify-between pb-4 border-b last:border-0"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={activity.type === 'card' ? 'default' : 'secondary'} className="text-xs">
                                {activity.type === 'card' ? 'Cartes' : 'Exercices'}
                              </Badge>
                              <span className="text-sm font-medium">
                                {activity.subject} - {activity.notion}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {activity.user_name || activity.user_email}
                              {' • '}
                              {activity.count} {activity.type === 'card' ? 'cartes' : 'exercices'}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(activity.created_at).toLocaleDateString('fr-CA', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Accès Rapide</CardTitle>
                  <CardDescription>Actions administrateur</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/admin/feedback">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Voir Feedback
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <Users className="h-4 w-4 mr-2" />
                    Gérer Utilisateurs
                    <Badge variant="secondary" className="ml-auto">Bientôt</Badge>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <FileText className="h-4 w-4 mr-2" />
                    Rapports
                    <Badge variant="secondary" className="ml-auto">Bientôt</Badge>
                  </Button>
                </CardContent>
              </Card>

              {/* Top Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Utilisateurs</CardTitle>
                  <CardDescription>Les plus actifs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.topUsers.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Aucun utilisateur actif
                      </p>
                    ) : (
                      stats.topUsers.map((user, index) => (
                        <div key={user.email} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">{user.totalGenerations}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.cardGenerations}C + {user.drillSheetGenerations}E
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
