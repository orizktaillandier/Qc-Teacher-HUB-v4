'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Megaphone, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BetaTesterBanner() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="container mx-auto px-6 pt-6"
    >
      <Card className="relative border-2 border-orange-400 dark:border-orange-600 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 shadow-xl overflow-hidden">
        {/* Minimized State */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-3 flex-1">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <Megaphone className="h-7 w-7 text-orange-600 dark:text-orange-400 flex-shrink-0" />
              </motion.div>
              <p className="text-base font-semibold text-orange-900 dark:text-orange-100">
                💬 N'oubliez pas: Votre feedback est essentiel! Utilisez le bouton orange en bas à droite
              </p>
            </div>
            <button
              className="p-2 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors flex-shrink-0"
              aria-label="Agrandir"
            >
              <ChevronDown className="h-5 w-5 text-orange-800 dark:text-orange-200" />
            </button>
          </motion.div>
        )}

        {/* Expanded State */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Minimize button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
              aria-label="Minimiser"
            >
              <ChevronUp className="h-5 w-5 text-orange-800 dark:text-orange-200" />
            </button>

          <div className="p-8">
            {/* Header with Icon */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="p-3 rounded-full bg-orange-200 dark:bg-orange-900/50"
              >
                <Megaphone className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-display font-bold text-orange-900 dark:text-orange-100">
                  Message important!
                </h2>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Prenez 2 minutes pour lire ce message 👇
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4 text-orange-900 dark:text-orange-50">
              <p className="text-base leading-relaxed">
                Bienvenue sur <strong>ProfStudio</strong>! Merci de faire partie de nos premiers utilisateurs. 🎉
              </p>

              <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="text-orange-600 dark:text-orange-400">⚠️</span>
                  À savoir sur cette version:
                </h3>
                <ul className="space-y-2 text-sm list-disc list-inside ml-2">
                  <li>C'est la <strong>première version déployée</strong> - il y aura des bogues</li>
                  <li>Tout ne fonctionne pas parfaitement (et c'est normal!)</li>
                  <li>Il y a beaucoup, beaucoup de place pour l'amélioration</li>
                </ul>
              </div>

              {/* Feedback CTA - Most Important Part */}
              <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 rounded-lg p-6 border-2 border-orange-400 dark:border-orange-600">
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="p-3 rounded-full bg-orange-500 dark:bg-orange-600"
                  >
                    <MessageCircle className="h-7 w-7 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl mb-2 text-orange-900 dark:text-orange-50">
                      Votre mission: Donnez-nous du FEEDBACK!
                    </h3>
                    <p className="text-base mb-3 leading-relaxed">
                      Utilisez tout ce que vous voyez dans l'app, mais surtout: <strong>utilisez le bouton de feedback</strong> autant que possible!
                    </p>
                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-orange-800 dark:text-orange-200 bg-orange-200/50 dark:bg-orange-900/30 rounded-md p-2 border border-orange-400/50">
                      <span className="text-xl">👉</span>
                      <span>Regardez en bas à droite de votre écran → Bouton orange "Feedback"</span>
                    </div>
                    <div className="bg-white/60 dark:bg-black/30 rounded-md p-3 text-sm space-y-1">
                      <p className="flex items-center gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        Une idée d'amélioration? <strong>Feedback!</strong>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        Un bogue trouvé? <strong>Feedback!</strong>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        Vous voulez juste dire bonjour? <strong>Feedback!</strong>
                      </p>
                    </div>
                    <p className="text-sm mt-3 font-semibold text-orange-800 dark:text-orange-200">
                      Le feedback est notre ressource #1 pour améliorer ProfStudio. N'hésitez jamais!
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-base font-semibold text-orange-800 dark:text-orange-200 pt-2">
                Merci d'être ici! 🚀
              </p>
            </div>
          </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}
