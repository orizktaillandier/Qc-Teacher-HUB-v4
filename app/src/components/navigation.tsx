'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  GraduationCap,
  Home,
  Zap,
  Settings,
  HelpCircle,
  Menu,
  LogOut,
  User,
  Library,
  Globe
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const navItems = [
    { href: '/home', label: 'Accueil', icon: Home, color: 'text-purple-600 dark:text-purple-400' },
    { href: '/generator', label: 'Générateur', icon: Zap, color: 'text-blue-600 dark:text-blue-400' },
    { href: '/library', label: 'Bibliothèque', icon: Library, color: 'text-pink-600 dark:text-pink-400' },
    { href: '/shared-library', label: 'Partagé', icon: Globe, color: 'text-green-600 dark:text-green-400' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-purple-100/50 dark:border-purple-900/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/home" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400 relative" />
              </div>
              <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-pink-400 bg-clip-text text-transparent">Quebec Teacher Hub</span>
              <span className="font-bold text-xl sm:hidden bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-pink-400 bg-clip-text text-transparent">QTH</span>
            </Link>
            <Badge className="ml-2 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white border-0">v5.0</Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`transition-all active:scale-95 ${isActive ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white border-0' : ''}`}
                  >
                    <Icon className={`mr-2 h-4 w-4 ${isActive ? '' : item.color}`} />
                    {item.label}
                  </Button>
                </Link>
              )
            })}

            <Separator orientation="vertical" className="h-8 mx-2" />

            {/* Auth Section */}
            {status === 'loading' ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full transition-all active:scale-95">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{session.user?.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 dark:text-red-400"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                onClick={() => signIn('google')}
                className="transition-all active:scale-95"
              >
                <User className="mr-2 h-4 w-4" />
                Se connecter
              </Button>
            )}

            <Button variant="ghost" size="icon" className="transition-all active:scale-95">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Aide</span>
            </Button>

            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            {status === 'loading' ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : session ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                <AvatarFallback>
                  {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            ) : null}

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="transition-all active:scale-95">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {session && (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{session.user?.name}</p>
                        <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}

                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link key={item.href} href={item.href}>
                      <DropdownMenuItem className={`cursor-pointer ${isActive ? 'bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-pink-900/40' : ''}`}>
                        <Icon className={`mr-2 h-4 w-4 ${item.color}`} />
                        {item.label}
                      </DropdownMenuItem>
                    </Link>
                  )
                })}

                <DropdownMenuSeparator />

                {session ? (
                  <>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Mon profil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Aide
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 dark:text-red-400"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Aide
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => signIn('google')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Se connecter
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}