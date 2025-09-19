"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Select,
  SelectItem,
  Input,
  Textarea,
  Switch,
  Chip,
  Divider,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

interface FormData {
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
  exerciseType: string;
  problemCount: string;
  timeLimit: string;
  instructions: string;
  includeAnswerKey: boolean;
}

const cycles = [
  { key: "prescolaire", label: "Préscolaire" },
  { key: "cycle1-primaire", label: "1er cycle primaire" },
  { key: "cycle2-primaire", label: "2e cycle primaire" },
  { key: "cycle3-primaire", label: "3e cycle primaire" },
  { key: "cycle1-secondaire", label: "1er cycle secondaire" },
  { key: "cycle2-secondaire", label: "2e cycle secondaire" },
];

const subjects = [
  { key: "mathematiques", label: "Mathématiques", icon: "🔢" },
  { key: "francais", label: "Français", icon: "📝" },
  { key: "sciences", label: "Sciences et technologie", icon: "🔬" },
  { key: "histoire", label: "Histoire et éducation à la citoyenneté", icon: "🏛️" },
  { key: "geographie", label: "Géographie", icon: "🌍" },
  { key: "arts", label: "Arts", icon: "🎨" },
  { key: "anglais", label: "Anglais langue seconde", icon: "🇬🇧" },
];

const exerciseTypes = [
  { key: "calculation", label: "Calculs" },
  { key: "vocabulary", label: "Vocabulaire" },
  { key: "grammar", label: "Grammaire" },
  { key: "classification", label: "Classification" },
  { key: "problem-solving", label: "Résolution de problèmes" },
];

export function QuebecTeacherHubInterface() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cycle: "",
    grade: "",
    subject: "",
    notion: "",
    exerciseType: "",
    problemCount: "10",
    timeLimit: "",
    instructions: "",
    includeAnswerKey: true,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Prevent hydration mismatch for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectionChange = (key: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsGenerating(false);
  };

  const isFormValid = formData.cycle && formData.subject && formData.notion;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border-color bg-card-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold quebec-gradient bg-clip-text text-transparent">
                Quebec Teacher Hub
              </div>
              <Chip color="secondary" variant="flat" size="sm">
                v4 Development
              </Chip>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                isIconOnly
                variant="ghost"
                onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted ? (theme === "dark" ? <SunIcon /> : <MoonIcon />) : <div className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form Panel */}
          <div className="lg:col-span-2">
            <Card className="quebec-card">
              <CardHeader className="pb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Générateur d'exercices</h2>
                  <p className="quebec-text-muted mt-1">
                    Créez des exercices alignés sur le PFEQ avec des contextes québécois authentiques
                  </p>
                </div>
              </CardHeader>
              <CardBody className="space-y-6">

                {/* Row 1: Cycle and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Cycle"
                    placeholder="Sélectionnez un cycle"
                    selectedKeys={formData.cycle ? [formData.cycle] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      handleSelectionChange("cycle")(value);
                    }}
                    isRequired
                  >
                    {cycles.map((cycle) => (
                      <SelectItem key={cycle.key} value={cycle.key} textValue={cycle.label}>
                        {cycle.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Matière"
                    placeholder="Sélectionnez une matière"
                    selectedKeys={formData.subject ? [formData.subject] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      handleSelectionChange("subject")(value);
                    }}
                    isRequired
                  >
                    {subjects.map((subject) => (
                      <SelectItem key={subject.key} value={subject.key} textValue={subject.label}>
                        {subject.icon} {subject.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Row 2: Notion and Exercise Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Notion"
                    placeholder="Ex: Fractions, Verbes, Classification..."
                    value={formData.notion}
                    onValueChange={handleSelectionChange("notion")}
                    isRequired
                  />

                  <Select
                    label="Type d'exercice"
                    placeholder="Sélectionnez un type"
                    selectedKeys={formData.exerciseType ? [formData.exerciseType] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      handleSelectionChange("exerciseType")(value);
                    }}
                  >
                    {exerciseTypes.map((type) => (
                      <SelectItem key={type.key} value={type.key} textValue={type.label}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Row 3: Problem Count and Time Limit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre de problèmes"
                    type="number"
                    placeholder="10"
                    value={formData.problemCount}
                    onValueChange={handleSelectionChange("problemCount")}
                    min={1}
                    max={50}
                  />

                  <Input
                    label="Limite de temps (minutes)"
                    type="number"
                    placeholder="Optionnel"
                    value={formData.timeLimit}
                    onValueChange={handleSelectionChange("timeLimit")}
                    min={5}
                    max={120}
                  />
                </div>

                {/* Instructions */}
                <Textarea
                  label="Instructions spéciales"
                  placeholder="Instructions additionnelles pour personnaliser l'exercice..."
                  value={formData.instructions}
                  onValueChange={handleSelectionChange("instructions")}
                  minRows={3}
                />

                {/* Options */}
                <div className="flex items-center justify-between">
                  <Switch
                    isSelected={formData.includeAnswerKey}
                    onValueChange={(checked) =>
                      setFormData(prev => ({ ...prev, includeAnswerKey: checked }))
                    }
                  >
                    Inclure le corrigé pour l'enseignant
                  </Switch>
                </div>

                <Divider />

                {/* Generate Button */}
                <Button
                  color="primary"
                  size="lg"
                  onPress={handleGenerate}
                  isLoading={isGenerating}
                  isDisabled={!isFormValid}
                  className="w-full"
                >
                  {isGenerating ? "Génération en cours..." : "Générer l'exercice"}
                </Button>

              </CardBody>
            </Card>
          </div>

          {/* Status Panel */}
          <div className="space-y-6">

            {/* Status Card */}
            <Card className="quebec-card">
              <CardHeader>
                <h3 className="text-lg font-semibold">Statut du système v4</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Interface utilisateur</span>
                    <Chip color="success" size="sm">✅ Fonctionnel</Chip>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dropdowns (HeroUI)</span>
                    <Chip color="success" size="sm">✅ Réparé</Chip>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mode sombre</span>
                    <Chip color="success" size="sm">✅ Opérationnel</Chip>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Turbopack</span>
                    <Chip color="success" size="sm">✅ Activé</Chip>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Génération d'exercices</span>
                    <Chip color="warning" size="sm">⏳ En cours</Chip>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Progress Card */}
            <Card className="quebec-card">
              <CardHeader>
                <h3 className="text-lg font-semibold">Progression v4</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <div className="text-sm quebec-text-muted">Phase 1: Foundation</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>✅ Dossier v4 créé</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>✅ Documentation complète</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>✅ Analyse UI Typebot</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>🚧 Interface HeroUI + Turbopack</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>⏳ Intégration GitHub</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Notes Card */}
            <Card className="quebec-card">
              <CardHeader>
                <h3 className="text-lg font-semibold">Notes techniques</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-2 text-sm quebec-text-muted">
                  <p>• NextUI → HeroUI (dépréciations évitées)</p>
                  <p>• Dropdowns maintenant visibles en mode sombre</p>
                  <p>• Architecture simple et maintenable</p>
                  <p>• Prêt pour intégration avec v3 backend</p>
                </div>
              </CardBody>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}