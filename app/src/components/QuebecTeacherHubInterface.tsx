"use client";

import { useState, useEffect } from "react";
import { Listbox, Switch as HeadlessSwitch } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import clsx from "clsx";

interface FormData {
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
  includeAnswerKey: boolean;
}

interface GeneratedCard {
  problem: string;
  answer?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  visualElements: {
    backgroundColor: string;
    borderColor: string;
    icon: string;
  };
}

interface KnowledgeData {
  subjects: Array<{ key: string; label: string; icon: string }>;
  notions: Array<{ key: string; label: string }>;
  grades: Array<{ key: string; label: string }>;
}

// PFEQ-compliant cycles (Primary only for now)
const cycles = [
  { key: "cycle1-primaire", label: "1er cycle primaire (1ère-2e)" },
  { key: "cycle2-primaire", label: "2e cycle primaire (3e-4e)" },
  { key: "cycle3-primaire", label: "3e cycle primaire (5e-6e)" },
];

// Static grade mapping based on cycle selection
const getGradesForCycle = (cycleKey: string) => {
  const cycleGradeMap: Record<string, Array<{ key: string; label: string }>> = {
    "cycle1-primaire": [
      { key: "1", label: "1ère année" },
      { key: "2", label: "2e année" }
    ],
    "cycle2-primaire": [
      { key: "3", label: "3e année" },
      { key: "4", label: "4e année" }
    ],
    "cycle3-primaire": [
      { key: "5", label: "5e année" },
      { key: "6", label: "6e année" }
    ]
  };
  return cycleGradeMap[cycleKey] || [];
};

// Knowledge base subjects (will be loaded dynamically)
const defaultSubjects = [
  { key: "francais-langue-enseignement", label: "Français, langue d'enseignement", icon: "📝" },
  { key: "mathematiques", label: "Mathématiques", icon: "🔢" },
  { key: "science-et-technologie", label: "Science et technologie", icon: "🔬" },
  { key: "univers-social", label: "Univers social", icon: "🌍" },
  { key: "arts-plastiques", label: "Arts plastiques", icon: "🎨" },
  { key: "art-dramatique", label: "Art dramatique", icon: "🎭" },
  { key: "danse", label: "Danse", icon: "💃" },
  { key: "musique", label: "Musique", icon: "🎵" },
  { key: "education-physique-et-a-la-sante", label: "Éducation physique et à la santé", icon: "⚽" },
];


// Custom Select Component using Headless UI
interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

function CustomSelect({ label, value, onChange, options, placeholder, required, disabled }: CustomSelectProps) {
  // Ensure value is never undefined to maintain controlled state
  const controlledValue = value || "";
  const selectedOption = options.find(option => option.value === controlledValue);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Listbox value={controlledValue} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-default rounded-lg border py-3 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1",
              disabled
                ? "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-quebec-500 focus:ring-quebec-500"
            )}
          >
            <span className={clsx(
              "block truncate",
              disabled ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"
            )}>
              {selectedOption ? (
                <>
                  {selectedOption.icon && <span className="mr-2">{selectedOption.icon}</span>}
                  {selectedOption.label}
                </>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  clsx(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-quebec-100 dark:bg-quebec-900' : 'text-gray-900 dark:text-gray-100'
                  )
                }
              >
                {({ selected, active }) => (
                  <>
                    <span className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}>
                      {option.icon && <span className="mr-2">{option.icon}</span>}
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-quebec-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export function QuebecTeacherHubInterface() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cycle: "",
    grade: "",
    subject: "",
    notion: "",
    includeAnswerKey: true,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCard, setGeneratedCard] = useState<GeneratedCard | null>(null);
  const [knowledgeData, setKnowledgeData] = useState<KnowledgeData>({
    subjects: defaultSubjects,
    notions: [],
    grades: []
  });
  const [isLoadingNotions, setIsLoadingNotions] = useState(false);

  // Prevent hydration mismatch for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load grades when cycle changes
  useEffect(() => {
    if (formData.cycle) {
      const grades = getGradesForCycle(formData.cycle);
      setKnowledgeData(prev => ({ ...prev, grades }));
      // Reset dependent fields
      setFormData(prev => ({ ...prev, grade: "", subject: "", notion: "" }));
    }
  }, [formData.cycle]);

  // Load notions when subject and cycle change
  useEffect(() => {
    if (formData.subject && formData.cycle) {
      loadNotionsForSubject(formData.subject, formData.cycle);
      // Reset notion when subject changes
      setFormData(prev => ({ ...prev, notion: "" }));
    }
  }, [formData.subject, formData.cycle]);

  const loadNotionsForSubject = async (subjectKey: string, cycleKey: string) => {
    setIsLoadingNotions(true);
    try {
      const response = await fetch(`/api/notions?subject=${encodeURIComponent(subjectKey)}&cycle=${encodeURIComponent(cycleKey)}`);
      const data = await response.json();

      if (data.success && data.data.notions) {
        // Filter and format the notions properly for this subject+cycle
        const notionOptions = data.data.notions.map((notion: string) => ({
          key: notion,
          label: formatNotionLabel(notion)
        }));

        setKnowledgeData(prev => ({ ...prev, notions: notionOptions }));
      } else {
        // Fallback notions based on subject
        const fallbackNotions = getFallbackNotions(subjectKey);
        setKnowledgeData(prev => ({ ...prev, notions: fallbackNotions }));
      }
    } catch (error) {
      console.error('Error loading notions:', error);
      // Fallback notions based on subject
      const fallbackNotions = getFallbackNotions(subjectKey);
      setKnowledgeData(prev => ({ ...prev, notions: fallbackNotions }));
    } finally {
      setIsLoadingNotions(false);
    }
  };

  const formatNotionLabel = (notionKey: string): string => {
    const notionLabels: Record<string, string> = {
      'francais-communication-orale': 'Communication orale',
      'francais-ecriture-redaction': 'Écriture et rédaction',
      'francais-grammaire-orthographe': 'Grammaire et orthographe',
      'francais-lecture-comprehension': 'Lecture et compréhension',
      'francais-litterature-appreciation': 'Littérature et appréciation',
      'nombres-naturels': 'Nombres naturels',
      'operations': 'Opérations',
      'nombres-operations-arithmetique': 'Nombres et opérations',
      'geometrie-mesure': 'Géométrie et mesure',
      'univers-materiel': 'Univers matériel',
      'univers-vivant': 'Univers vivant',
      'terre-et-espace': 'Terre et espace',
      'arts-plastiques': 'Arts plastiques',
      'art-dramatique': 'Art dramatique',
      'danse': 'Danse',
      'musique': 'Musique',
      'univers-social': 'Univers social',
      'education-physique-et-a-la-sante': 'Éducation physique et à la santé'
    };
    return notionLabels[notionKey] || notionKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getFallbackNotions = (subjectKey: string) => {
    const fallbacks: Record<string, Array<{ key: string; label: string }>> = {
      'francais-langue-enseignement': [
        { key: 'francais-lecture-comprehension', label: 'Lecture et compréhension' },
        { key: 'francais-ecriture-redaction', label: 'Écriture et rédaction' },
        { key: 'francais-communication-orale', label: 'Communication orale' },
        { key: 'francais-grammaire-orthographe', label: 'Grammaire et orthographe' }
      ],
      'mathematiques': [
        { key: 'nombres-naturels', label: 'Nombres naturels' },
        { key: 'operations', label: 'Opérations' },
        { key: 'geometrie-mesure', label: 'Géométrie et mesure' }
      ],
      'science-et-technologie': [
        { key: 'univers-materiel', label: 'Univers matériel' },
        { key: 'univers-vivant', label: 'Univers vivant' },
        { key: 'terre-et-espace', label: 'Terre et espace' }
      ]
    };
    return fallbacks[subjectKey] || [];
  };

  const handleFieldChange = (key: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedCard(null);

    console.log('🚀 Starting card generation with:', formData);

    try {
      const response = await fetch('/api/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('📦 Full API response:', data);

      if (data.success) {
        console.log('✅ Generation successful!');
        if (data.debug) {
          console.log('🔍 Debug info:', data.debug);
          console.log('🤖 GPT-5 used:', data.debug.gpt5Used);
          console.log('🎯 Tokens used:', data.debug.tokensUsed);
          console.log('📝 Raw GPT-5 output:', data.debug.rawOutput);
        }
        console.log('🎴 Generated card:', data.data.card);
        setGeneratedCard(data.data.card);
      } else {
        console.error('❌ Generation failed:', data.error);
        // TODO: Show error message to user
      }
    } catch (error) {
      console.error('❌ Generation error:', error);
      // TODO: Show error message to user
    } finally {
      setIsGenerating(false);
    }
  };

  const isFormValid = formData.cycle && formData.grade && formData.subject && formData.notion;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-quebec-600 to-quebec-800 bg-clip-text text-transparent">
                Quebec Teacher Hub
              </div>
              <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:text-purple-200">
                v4 Development
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )
                ) : (
                  <div className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex w-full">
        {/* Navigation Sidebar */}
        <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-quebec-600 bg-quebec-50 dark:bg-quebec-900 dark:text-quebec-300 rounded-lg">
                  <span className="mr-3">📝</span>
                  Générateur d'exercices
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <span className="mr-3">📚</span>
                  Mes matériels
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <span className="mr-3">📊</span>
                  Statistiques
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <span className="mr-3">⚙️</span>
                  Paramètres
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Form Panel */}
        <div className="flex-1 px-8 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Générateur d'exercices</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Créez des exercices alignés sur le PFEQ avec des contextes québécois authentiques
                  </p>
                </div>
              </div>
              <div className="px-6 py-6 space-y-6">

                {/* Row 1: Cycle and Grade */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Cycle"
                    value={formData.cycle}
                    onChange={(value) => handleFieldChange("cycle", value)}
                    options={cycles.map(cycle => ({ value: cycle.key, label: cycle.label }))}
                    placeholder="Sélectionnez un cycle"
                    required
                  />

                  <CustomSelect
                    label="Année/Niveau"
                    value={formData.grade}
                    onChange={(value) => handleFieldChange("grade", value)}
                    options={knowledgeData.grades.map(grade => ({ value: grade.key, label: grade.label }))}
                    placeholder={formData.cycle ? "Sélectionnez une année" : "Sélectionnez d'abord un cycle"}
                    disabled={!formData.cycle}
                    required
                  />
                </div>

                {/* Row 2: Subject and Notion */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Matière"
                    value={formData.subject}
                    onChange={(value) => handleFieldChange("subject", value)}
                    options={knowledgeData.subjects.map(subject => ({ value: subject.key, label: subject.label, icon: subject.icon }))}
                    placeholder={formData.cycle ? "Sélectionnez une matière" : "Sélectionnez d'abord un cycle"}
                    disabled={!formData.cycle}
                    required
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Notion <span className="text-red-500">*</span>
                    </label>
                    {formData.subject && formData.cycle ? (
                      isLoadingNotions ? (
                        <div className="flex items-center justify-center py-3 px-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-4 h-4 border-2 border-quebec-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Chargement des notions...</span>
                        </div>
                      ) : (
                        <CustomSelect
                          label=""
                          value={formData.notion}
                          onChange={(value) => handleFieldChange("notion", value)}
                          options={knowledgeData.notions.map(notion => ({ value: notion.key, label: notion.label }))}
                          placeholder="Sélectionnez une notion"
                          required
                        />
                      )
                    ) : (
                      <div className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 py-3 px-3 text-gray-500 dark:text-gray-400">
                        {!formData.cycle ? "Sélectionnez d'abord un cycle" : "Sélectionnez d'abord une matière"}
                      </div>
                    )}
                  </div>
                </div>


                {/* Options */}
                <div className="flex items-center justify-between">
                  <HeadlessSwitch.Group>
                    <div className="flex items-center space-x-3">
                      <HeadlessSwitch
                        checked={formData.includeAnswerKey}
                        onChange={(checked) => handleFieldChange("includeAnswerKey", checked)}
                        className={clsx(
                          formData.includeAnswerKey ? 'bg-quebec-600' : 'bg-gray-200 dark:bg-gray-700',
                          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-quebec-500 focus:ring-offset-2'
                        )}
                      >
                        <span
                          className={clsx(
                            formData.includeAnswerKey ? 'translate-x-6' : 'translate-x-1',
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                          )}
                        />
                      </HeadlessSwitch>
                      <HeadlessSwitch.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Inclure le corrigé pour l'enseignant
                      </HeadlessSwitch.Label>
                    </div>
                  </HeadlessSwitch.Group>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={!isFormValid || isGenerating}
                  className={clsx(
                    'w-full py-3 px-4 rounded-lg font-medium text-white transition-colors',
                    !isFormValid || isGenerating
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-quebec-600 hover:bg-quebec-700 focus:outline-none focus:ring-2 focus:ring-quebec-500 focus:ring-offset-2'
                  )}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Génération de la carte...</span>
                    </div>
                  ) : (
                    "Générer une carte à tâches"
                  )}
                </button>

                {/* GPT-5 Generated A4 Task Cards Display */}
                {generatedCard && (
                  <div className="mt-8 space-y-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Cartes à tâches générées - Format A4 imprimable</h3>

                    {/* A4 Pages with 4 cards each */}
                    <div className="space-y-6">
                      <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">📝 Pages de cartes à tâches (4 cartes par page)</h4>
                      {generatedCard.questionPages && generatedCard.questionPages.map((page, index) => (
                        <div key={index} className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg">
                          <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                            <span className="font-medium">Page {index + 1} - Cartes {index * 4 + 1} à {index * 4 + 4}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-4">Format A4 Paysage - Optimisé pour impression</span>
                          </div>
                          <div
                            className="bg-white dark:bg-gray-800 overflow-auto"
                            style={{ maxHeight: '800px', minHeight: '400px' }}
                            dangerouslySetInnerHTML={{ __html: page }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Answer Sheet */}
                    <div className="border-2 border-blue-300 dark:border-blue-600 rounded-lg overflow-hidden shadow-lg">
                      <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 border-b border-blue-300 dark:border-blue-600">
                        <h4 className="text-md font-semibold">📋 Feuille réponse élève</h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Format A4 - À photocopier pour chaque élève</span>
                      </div>
                      <div
                        className="bg-white dark:bg-gray-800 overflow-auto p-4"
                        style={{ maxHeight: '600px' }}
                        dangerouslySetInnerHTML={{ __html: generatedCard.answerSheet }}
                      />
                    </div>

                    {/* Teacher Answer Key */}
                    <div className="border-2 border-green-300 dark:border-green-600 rounded-lg overflow-hidden shadow-lg">
                      <div className="bg-green-100 dark:bg-green-900 px-4 py-2 border-b border-green-300 dark:border-green-600">
                        <h4 className="text-md font-semibold">🔑 Corrigé enseignant</h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Document confidentiel</span>
                      </div>
                      <div
                        className="bg-white dark:bg-gray-800 overflow-auto p-4"
                        style={{ maxHeight: '400px' }}
                        dangerouslySetInnerHTML={{ __html: generatedCard.corriger }}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="text-center space-x-4 print:hidden">
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center justify-center mx-auto gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Imprimer les cartes
                      </button>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 shadow-lg"
                      >
                        🔄 Générer une autre carte
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                      >
                        🖨️ Imprimer les 3 pages
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
        </div>
      </main>
    </div>
  );
}