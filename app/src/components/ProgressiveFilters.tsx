'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ChevronRight,
  ChevronLeft,
  Check,
  School,
  GraduationCap,
  BookOpen,
  Lightbulb,
  Sparkles,
  X
} from 'lucide-react'
import {
  cycles,
  getGradesForCycle,
  getSubjectsForCycle,
  getNotionsForSubjectAndCycle,
  getSubNotions,
  type Cycle,
  type Grade,
  type Subject,
  type Notion,
  type SubNotion
} from '@/lib/pfeq-structure'

interface ProgressiveFiltersProps {
  onFiltersComplete: (filters: {
    cycle: string
    grade: string
    subject: string
    notion: string
    subNotions: string[]
    cardCount: number
  }) => void
}

export function ProgressiveFilters({ onFiltersComplete }: ProgressiveFiltersProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCycle, setSelectedCycle] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedNotion, setSelectedNotion] = useState('')
  const [selectedSubNotions, setSelectedSubNotions] = useState<string[]>([])
  const [cardCount, setCardCount] = useState(8)

  const [availableGrades, setAvailableGrades] = useState<Grade[]>([])
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([])
  const [availableNotions, setAvailableNotions] = useState<Notion[]>([])
  const [availableSubNotions, setAvailableSubNotions] = useState<SubNotion[]>([])

  const steps = [
    {
      id: 'cycle',
      title: 'Choisissez le cycle d\'apprentissage',
      icon: <School className="h-8 w-8" />,
      color: 'from-blue-500 to-purple-600',
      description: 'Sélectionnez le niveau scolaire de vos élèves'
    },
    {
      id: 'grade',
      title: 'Sélectionnez l\'année scolaire',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-600',
      description: 'Précisez l\'année exacte'
    },
    {
      id: 'subject',
      title: 'Choisissez la matière',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'from-pink-500 to-red-600',
      description: 'Quelle matière voulez-vous enseigner?'
    },
    {
      id: 'notion',
      title: 'Sélectionnez la notion principale',
      icon: <Lightbulb className="h-8 w-8" />,
      color: 'from-orange-500 to-yellow-600',
      description: 'Quel concept voulez-vous explorer?'
    },
    {
      id: 'subnotions',
      title: 'Précisez les sous-notions (optionnel)',
      icon: <Sparkles className="h-8 w-8" />,
      color: 'from-green-500 to-teal-600',
      description: 'Ajoutez des détails spécifiques'
    }
  ]

  // Update available options when selections change
  useEffect(() => {
    if (selectedCycle) {
      const grades = getGradesForCycle(selectedCycle)
      setAvailableGrades(grades)
    }
  }, [selectedCycle])

  useEffect(() => {
    if (selectedCycle) {
      const subjects = getSubjectsForCycle(selectedCycle)
      setAvailableSubjects(subjects)
    }
  }, [selectedCycle])

  useEffect(() => {
    if (selectedSubject && selectedCycle) {
      const notions = getNotionsForSubjectAndCycle(selectedSubject, selectedCycle)
      setAvailableNotions(notions)
    }
  }, [selectedSubject, selectedCycle])

  useEffect(() => {
    if (selectedNotion) {
      const subNotions = getSubNotions(selectedNotion)
      setAvailableSubNotions(subNotions)
    }
  }, [selectedNotion])

  const handleCycleSelect = (cycle: Cycle) => {
    setSelectedCycle(cycle.key)
    setCurrentStep(1)
    // Reset downstream selections
    setSelectedGrade('')
    setSelectedSubject('')
    setSelectedNotion('')
    setSelectedSubNotions([])
  }

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade.key)
    setCurrentStep(2)
    // Reset downstream selections
    setSelectedSubject('')
    setSelectedNotion('')
    setSelectedSubNotions([])
  }

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject.key)
    setCurrentStep(3)
    // Reset downstream selections
    setSelectedNotion('')
    setSelectedSubNotions([])
  }

  const handleNotionSelect = (notion: Notion) => {
    setSelectedNotion(notion.key)

    // Check if there are sub-notions
    const subNotions = getSubNotions(notion.key)
    if (subNotions.length > 0) {
      setCurrentStep(4)
    } else {
      // No sub-notions, complete the flow
      handleComplete()
    }
  }

  const handleSubNotionToggle = (subNotionId: string) => {
    setSelectedSubNotions(prev =>
      prev.includes(subNotionId)
        ? prev.filter(id => id !== subNotionId)
        : [...prev, subNotionId]
    )
  }

  const handleComplete = () => {
    onFiltersComplete({
      cycle: selectedCycle,
      grade: selectedGrade,
      subject: selectedSubject,
      notion: selectedNotion,
      subNotions: selectedSubNotions,
      cardCount
    })
  }

  const resetStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    // Reset all selections after this step
    if (stepIndex === 0) {
      setSelectedCycle('')
      setSelectedGrade('')
      setSelectedSubject('')
      setSelectedNotion('')
      setSelectedSubNotions([])
    } else if (stepIndex === 1) {
      setSelectedGrade('')
      setSelectedSubject('')
      setSelectedNotion('')
      setSelectedSubNotions([])
    } else if (stepIndex === 2) {
      setSelectedSubject('')
      setSelectedNotion('')
      setSelectedSubNotions([])
    } else if (stepIndex === 3) {
      setSelectedNotion('')
      setSelectedSubNotions([])
    } else if (stepIndex === 4) {
      setSelectedSubNotions([])
    }
  }

  const getSelectionLabel = (stepId: string) => {
    switch (stepId) {
      case 'cycle':
        return cycles.find(c => c.key === selectedCycle)?.label || ''
      case 'grade':
        return availableGrades.find(g => g.key === selectedGrade)?.label || ''
      case 'subject':
        return availableSubjects.find(s => s.key === selectedSubject)?.label || ''
      case 'notion':
        return availableNotions.find(n => n.key === selectedNotion)?.label || ''
      case 'subnotions':
        return `${selectedSubNotions.length} sélectionnée(s)`
      default:
        return ''
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: index <= currentStep ? 1 : 0.8,
                  opacity: index <= currentStep ? 1 : 0.3
                }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                      ? `bg-gradient-to-br ${step.color} text-white`
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }
                  transition-all duration-300
                `}
              >
                {index < currentStep ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="font-bold">{index + 1}</span>
                )}
              </motion.div>
              {index < currentStep && getSelectionLabel(step.id) && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs mt-2 text-center max-w-[100px] text-gray-600 dark:text-gray-400 truncate"
                >
                  {getSelectionLabel(step.id)}
                </motion.span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                h-1 flex-1 mx-2 transition-all duration-500
                ${index < currentStep
                  ? 'bg-green-500'
                  : 'bg-gray-200 dark:bg-gray-700'
                }
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Selected Values Pills */}
      {currentStep > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {selectedCycle && currentStep > 0 && (
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => resetStep(0)}
            >
              {getSelectionLabel('cycle')}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}
          {selectedGrade && currentStep > 1 && (
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => resetStep(1)}
            >
              {getSelectionLabel('grade')}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}
          {selectedSubject && currentStep > 2 && (
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => resetStep(2)}
            >
              {getSelectionLabel('subject')}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}
          {selectedNotion && currentStep > 3 && (
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => resetStep(3)}
            >
              {getSelectionLabel('notion')}
              <X className="ml-2 h-3 w-3" />
            </Badge>
          )}
        </motion.div>
      )}

      {/* Current Step Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Card className="p-8 shadow-xl border-2">
            <div className="space-y-6">
              {/* Back Button */}
              {currentStep > 0 && (
                <div className="flex justify-start">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Retour
                  </Button>
                </div>
              )}

              {/* Step Header */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className={`
                    w-20 h-20 rounded-full mx-auto flex items-center justify-center
                    bg-gradient-to-br ${steps[currentStep].color} text-white
                  `}
                >
                  {steps[currentStep].icon}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid gap-3">
                {currentStep === 0 && (
                  <>
                    {cycles.map((cycle, index) => (
                      <motion.div
                        key={cycle.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full justify-between py-6 hover:scale-[1.02] transition-transform"
                          onClick={() => handleCycleSelect(cycle)}
                        >
                          <span className="font-medium">{cycle.label}</span>
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    ))}
                  </>
                )}

                {currentStep === 1 && availableGrades.map((grade, index) => (
                  <motion.div
                    key={grade.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full justify-between py-6 hover:scale-[1.02] transition-transform"
                      onClick={() => handleGradeSelect(grade)}
                    >
                      <span className="font-medium">{grade.label}</span>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ))}

                {currentStep === 2 && (
                  <div className="grid grid-cols-2 gap-3">
                    {availableSubjects.map((subject, index) => (
                      <motion.div
                        key={subject.key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full h-24 hover:scale-[1.02] transition-transform flex flex-col items-center justify-center gap-2 p-4"
                          onClick={() => handleSubjectSelect(subject)}
                        >
                          <span className="text-3xl flex-shrink-0">{subject.icon}</span>
                          <span className="font-medium text-xs text-center leading-tight line-clamp-2">{subject.label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                    {availableNotions.map((notion, index) => (
                      <motion.div
                        key={notion.key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full py-4 hover:scale-[1.02] transition-transform"
                          onClick={() => handleNotionSelect(notion)}
                        >
                          <span className="font-medium text-sm">{notion.label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {currentStep === 4 && (
                  <>
                    {availableSubNotions.length > 0 ? (
                      <>
                        <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
                          {availableSubNotions.map((subNotion, index) => (
                            <motion.div
                              key={subNotion.key}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.02 }}
                            >
                              <Button
                                variant={selectedSubNotions.includes(subNotion.key) ? "default" : "outline"}
                                size="lg"
                                className="w-full py-4 transition-all"
                                onClick={() => handleSubNotionToggle(subNotion.key)}
                              >
                                <span className="font-medium text-sm">{subNotion.label}</span>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-center text-gray-500 py-4">
                        Aucune sous-notion disponible pour cette notion
                      </p>
                    )}

                    {/* Number of cards selection */}
                    <div className="mt-6 space-y-2">
                      <Label htmlFor="card-count" className="text-center block">Nombre de cartes à générer</Label>
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCardCount(Math.max(1, cardCount - 1))}
                          disabled={cardCount <= 1}
                        >
                          -
                        </Button>
                        <Input
                          id="card-count"
                          type="number"
                          value={cardCount}
                          onChange={(e) => setCardCount(parseInt(e.target.value) || 8)}
                          min="1"
                          max="20"
                          className="w-20 text-center"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCardCount(Math.min(20, cardCount + 1))}
                          disabled={cardCount >= 20}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6"
                    >
                      <Button
                        size="lg"
                        className={`w-full bg-gradient-to-r ${steps[4].color} text-white hover:scale-[1.02] transition-transform`}
                        onClick={handleComplete}
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Générer {cardCount} carte{cardCount > 1 ? 's' : ''}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}