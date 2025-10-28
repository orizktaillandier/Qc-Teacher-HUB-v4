'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CommandPalette } from "@/components/command-palette"
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
  Globe,
  Command,
  Clock,
  Star,
  Keyboard,
  Sparkles,
  FileText,
  Shield
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
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [commandOpen, setCommandOpen] = useState(false)

  const navItems = [
    { href: '/home', label: 'Accueil', icon: Home, color: 'text-orange-500' },
    { href: '/generators', label: 'Générateurs', icon: Zap, color: 'text-blue-500' },
    { href: '/library', label: 'Bibliothèque', icon: Library, color: 'text-green-500' },
    { href: '/shared-library', label: 'Partagé', icon: Globe, color: 'text-purple-500' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-card backdrop-blur-md z-50 border-b-2 border-border shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/home" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl bg-primary/10 transition-all group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl hidden sm:inline">ProfStudio</span>
              <span className="font-display font-bold text-xl sm:hidden">PS</span>
            </Link>
            <Badge variant="outline" className="ml-2 border-primary/30">Beta</Badge>
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
                    className={`transition-all hover:scale-105 active:scale-95`}
                  >
                    <Icon className={`mr-2 h-4 w-4 ${isActive ? '' : item.color}`} />
                    {item.label}
                  </Button>
                </Link>
              )
            })}

            {/* Admin Link - Only for qcteachhub@gmail.com */}
            {session?.user?.email === 'qcteachhub@gmail.com' && (
              <Link href="/admin">
                <Button
                  variant={pathname?.startsWith('/admin') ? "default" : "ghost"}
                  className="transition-all hover:scale-105 active:scale-95"
                >
                  <Shield className={`mr-2 h-4 w-4 ${pathname?.startsWith('/admin') ? '' : 'text-orange-500'}`} />
                  Admin
                </Button>
              </Link>
            )}

            <Separator orientation="vertical" className="h-8 mx-2" />

            {/* Command Palette Trigger */}
            <Button
              variant="outline"
              className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
              onClick={() => setCommandOpen(true)}
            >
              <Command className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline-flex">Rechercher...</span>
              <span className="inline-flex lg:hidden">Rechercher...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">Ctrl</span>K
              </kbd>
            </Button>

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
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{session.user?.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Actions rapides
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer">
                      <Sparkles className="mr-2 h-4 w-4 text-primary" />
                      <span>Créer des cartes</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Clock className="mr-2 h-4 w-4 text-secondary" />
                      <span>Cartes récentes</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Star className="mr-2 h-4 w-4 text-accent" />
                      <span>Favoris</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  {session.user?.email === 'qcteachhub@gmail.com' && (
                    <>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                          Administration
                        </DropdownMenuLabel>
                        <Link href="/admin/feedback">
                          <DropdownMenuItem className="cursor-pointer">
                            <Shield className="mr-2 h-4 w-4 text-orange-500" />
                            <span>Feedback Beta</span>
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setCommandOpen(true)}
                  >
                    <Keyboard className="mr-2 h-4 w-4" />
                    Raccourcis clavier
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                      Ctrl+K
                    </kbd>
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
                      <DropdownMenuItem className={`cursor-pointer ${isActive ? 'bg-primary/10' : ''}`}>
                        <Icon className={`mr-2 h-4 w-4 ${item.color}`} />
                        {item.label}
                      </DropdownMenuItem>
                    </Link>
                  )
                })}

                <DropdownMenuSeparator />

                {session && session.user?.email === 'qcteachhub@gmail.com' && (
                  <>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2">
                      Administration
                    </DropdownMenuLabel>
                    <Link href="/admin/feedback">
                      <DropdownMenuItem className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4 text-orange-500" />
                        Feedback Beta
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                  </>
                )}

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

      {/* Command Palette */}
      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
    </nav>
  )
}