'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Home,
  Zap,
  Library,
  Globe,
  FileText,
  BookOpen,
  Settings,
  HelpCircle,
  User,
  Moon,
  Sun,
  Sparkles,
  Clock,
  Download,
  Share2,
} from "lucide-react"
import { useTheme } from "next-themes"

interface CommandPaletteProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter()
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [setOpen])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Rechercher une action ou une page..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/home"))}
          >
            <Home className="mr-2 h-4 w-4" />
            <span>Accueil</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/generator"))}
          >
            <Zap className="mr-2 h-4 w-4" />
            <span>Générateur de cartes</span>
            <CommandShortcut>⌘G</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/library"))}
          >
            <Library className="mr-2 h-4 w-4" />
            <span>Ma bibliothèque</span>
            <CommandShortcut>⌘L</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/shared-library"))}
          >
            <Globe className="mr-2 h-4 w-4" />
            <span>Bibliothèque partagée</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions rapides">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/generator"))}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Créer des cartes</span>
          </CommandItem>
          <CommandItem>
            <Clock className="mr-2 h-4 w-4" />
            <span>Voir mes cartes récentes</span>
          </CommandItem>
          <CommandItem>
            <Download className="mr-2 h-4 w-4" />
            <span>Exporter en PDF</span>
          </CommandItem>
          <CommandItem>
            <Share2 className="mr-2 h-4 w-4" />
            <span>Partager avec la communauté</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Paramètres">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Mode clair</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Mode sombre</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Thème système</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Aide">
          <CommandItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Centre d'aide</span>
            <CommandShortcut>?</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Documentation</span>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Raccourcis clavier</span>
            <CommandShortcut>⌘/</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
