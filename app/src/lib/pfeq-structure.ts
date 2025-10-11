/**
 * PFEQ (Programme de formation de l'école québécoise) Structure
 * Complete hierarchical structure for Quebec primary education curriculum
 *
 * Hierarchy: Cycle → Grade → Subject → Notion → Sub-notions
 */

// ============================================
// TYPES
// ============================================

export interface Cycle {
  key: string
  label: string
  grades: string[]
  description?: string
}

export interface Grade {
  key: string
  label: string
  cycleKey: string
}

export interface Subject {
  key: string
  label: string
  domain: string
  icon: string
  availableInCycles: string[]
}

export interface Notion {
  key: string
  label: string
  subjectKey: string
  cycleKeys: string[]
  subNotions?: SubNotion[]
}

export interface SubNotion {
  key: string
  label: string
  description?: string
}

// ============================================
// DATA STRUCTURE
// ============================================

/**
 * 1. CYCLES - First level of hierarchy
 */
export const cycles: Cycle[] = [
  {
    key: 'cycle1-primaire',
    label: '1er cycle primaire',
    grades: ['1', '2'],
    description: 'Apprentissages fondamentaux (6-8 ans)'
  },
  {
    key: 'cycle2-primaire',
    label: '2e cycle primaire',
    grades: ['3', '4'],
    description: 'Consolidation des apprentissages (8-10 ans)'
  },
  {
    key: 'cycle3-primaire',
    label: '3e cycle primaire',
    grades: ['5', '6'],
    description: 'Approfondissement et transition (10-12 ans)'
  }
]

/**
 * 2. GRADES - Second level of hierarchy
 */
export const grades: Grade[] = [
  // Cycle 1
  { key: '1', label: '1ère année', cycleKey: 'cycle1-primaire' },
  { key: '2', label: '2e année', cycleKey: 'cycle1-primaire' },
  // Cycle 2
  { key: '3', label: '3e année', cycleKey: 'cycle2-primaire' },
  { key: '4', label: '4e année', cycleKey: 'cycle2-primaire' },
  // Cycle 3
  { key: '5', label: '5e année', cycleKey: 'cycle3-primaire' },
  { key: '6', label: '6e année', cycleKey: 'cycle3-primaire' }
]

/**
 * 3. SUBJECTS - Third level of hierarchy
 */
export const subjects: Subject[] = [
  {
    key: 'francais-langue-enseignement',
    label: 'Français, langue d\'enseignement',
    domain: 'langue-francaise',
    icon: '📝',
    availableInCycles: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire']
  },
  {
    key: 'mathematiques',
    label: 'Mathématiques',
    domain: 'mathematiques',
    icon: '🔢',
    availableInCycles: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire']
  },
  {
    key: 'science-et-technologie',
    label: 'Science et technologie',
    domain: 'science-technologie',
    icon: '🔬',
    availableInCycles: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire']
  },
  {
    key: 'univers-social',
    label: 'Géographie, histoire et éducation à la citoyenneté',
    domain: 'univers-social',
    icon: '🌍',
    availableInCycles: ['cycle2-primaire', 'cycle3-primaire'] // Note: starts at cycle 2
  }
  // REMOVED FOR LAUNCH: Arts plastiques, Art dramatique, Danse, Musique, Anglais, Éducation physique, Éthique
  // These can be re-enabled after testing phase
]

/**
 * 4. NOTIONS - Fourth level of hierarchy
 * These are subject-specific and cycle-dependent
 */
export const notions: Notion[] = [
  // ========== FRANÇAIS ==========
  {
    key: 'lecture',
    label: 'Lecture',
    subjectKey: 'francais-langue-enseignement',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'comprehension', label: 'Compréhension de textes' },
      { key: 'strategies', label: 'Stratégies de lecture' },
      { key: 'fluence', label: 'Fluidité' },
      { key: 'appreciation', label: 'Appréciation d\'œuvres littéraires' },
      { key: 'inference', label: 'Inférences' }
    ]
  },
  {
    key: 'ecriture',
    label: 'Écriture',
    subjectKey: 'francais-langue-enseignement',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'textes-varies', label: 'Textes variés' },
      { key: 'processus', label: 'Processus d\'écriture' },
      { key: 'conventions', label: 'Conventions linguistiques' },
      { key: 'calligraphie', label: 'Calligraphie' },
      { key: 'revision', label: 'Révision et correction' }
    ]
  },
  {
    key: 'communication-orale',
    label: 'Communication orale',
    subjectKey: 'francais-langue-enseignement',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'ecoute', label: 'Écoute' },
      { key: 'prise-parole', label: 'Prise de parole' },
      { key: 'interaction', label: 'Interaction' },
      { key: 'presentation', label: 'Présentation orale' }
    ]
  },
  {
    key: 'grammaire',
    label: 'Grammaire',
    subjectKey: 'francais-langue-enseignement',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'classes-mots', label: 'Classes de mots' },
      { key: 'fonctions', label: 'Fonctions dans la phrase' },
      { key: 'accords', label: 'Accords' },
      { key: 'conjugaison', label: 'Conjugaison' },
      { key: 'phrase', label: 'Types et formes de phrases' }
    ]
  },
  {
    key: 'orthographe',
    label: 'Orthographe',
    subjectKey: 'francais-langue-enseignement',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'usage', label: 'Orthographe d\'usage' },
      { key: 'grammaticale', label: 'Orthographe grammaticale' },
      { key: 'strategies', label: 'Stratégies orthographiques' },
      { key: 'mots-frequents', label: 'Mots fréquents (3000 mots)' }
    ]
  },
  {
    key: 'lexique',
    label: 'Lexique (Vocabulaire)',
    subjectKey: 'francais-langue-enseignement',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'formation-mots', label: 'Formation des mots' },
      { key: 'relations', label: 'Relations entre les mots' },
      { key: 'champs-lexicaux', label: 'Champs lexicaux' },
      { key: 'sens', label: 'Sens propre et figuré' }
    ]
  },
  {
    key: 'syntaxe-ponctuation',
    label: 'Syntaxe et ponctuation',
    subjectKey: 'francais-langue-enseignement',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'construction', label: 'Construction de phrases' },
      { key: 'ponctuation', label: 'Signes de ponctuation' },
      { key: 'paragraphes', label: 'Organisation en paragraphes' }
    ]
  },
  {
    key: 'organisation-texte',
    label: 'Organisation et cohérence du texte',
    subjectKey: 'francais-langue-enseignement',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'structure', label: 'Structure des textes' },
      { key: 'marqueurs', label: 'Marqueurs de relation' },
      { key: 'coherence', label: 'Cohérence textuelle' },
      { key: 'progression', label: 'Progression de l\'information' }
    ]
  },

  // ========== MATHÉMATIQUES ==========
  {
    key: 'arithmetique',
    label: 'Arithmétique',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'sens-nombre', label: 'Sens du nombre' },
      { key: 'valeur-position', label: 'Valeur de position' },
      { key: 'nombres-pairs-impairs', label: 'Nombres pairs et impairs' },
      { key: 'multiples-diviseurs', label: 'Multiples et diviseurs' }
    ]
  },
  {
    key: 'nombres-naturels',
    label: 'Nombres naturels',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'representation', label: 'Représentation' },
      { key: 'comparaison', label: 'Comparaison et ordre' },
      { key: 'decomposition', label: 'Décomposition' },
      { key: 'arrondissement', label: 'Arrondissement' }
    ]
  },
  {
    key: 'operations',
    label: 'Opérations',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'addition', label: 'Addition' },
      { key: 'soustraction', label: 'Soustraction' },
      { key: 'multiplication', label: 'Multiplication' },
      { key: 'division', label: 'Division' },
      { key: 'calcul-mental', label: 'Calcul mental' },
      { key: 'estimation', label: 'Estimation' }
    ]
  },
  {
    key: 'fractions',
    label: 'Fractions',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'representation', label: 'Représentation' },
      { key: 'equivalence', label: 'Équivalence' },
      { key: 'comparaison', label: 'Comparaison' },
      { key: 'operations', label: 'Opérations sur les fractions' },
      { key: 'fractions-decimales', label: 'Fractions décimales' }
    ]
  },
  {
    key: 'decimaux',
    label: 'Nombres décimaux',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle3-primaire'],
    subNotions: [
      { key: 'representation', label: 'Représentation' },
      { key: 'operations', label: 'Opérations' },
      { key: 'conversion', label: 'Conversion' },
      { key: 'pourcentage', label: 'Pourcentage' }
    ]
  },
  {
    key: 'patterns-algebre',
    label: 'Patterns et algèbre',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'regularites', label: 'Régularités et suites' },
      { key: 'patterns', label: 'Patterns numériques' },
      { key: 'egalite', label: 'Relations d\'égalité' },
      { key: 'expressions', label: 'Expressions algébriques simples' }
    ]
  },
  {
    key: 'geometrie',
    label: 'Géométrie',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'figures-planes', label: 'Figures planes' },
      { key: 'solides', label: 'Solides' },
      { key: 'transformations', label: 'Transformations géométriques' },
      { key: 'reperage', label: 'Repérage dans l\'espace' },
      { key: 'angles', label: 'Angles' },
      { key: 'symetrie', label: 'Symétrie' },
      { key: 'coordonnees', label: 'Coordonnées' }
    ]
  },
  {
    key: 'mesure',
    label: 'Mesure',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'longueur', label: 'Longueur' },
      { key: 'surface', label: 'Surface (aire)' },
      { key: 'volume', label: 'Volume' },
      { key: 'masse', label: 'Masse' },
      { key: 'capacite', label: 'Capacité' },
      { key: 'temps', label: 'Temps' },
      { key: 'temperature', label: 'Température' },
      { key: 'monnaie', label: 'Monnaie' }
    ]
  },
  {
    key: 'statistique',
    label: 'Statistique',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'collecte', label: 'Collecte de données' },
      { key: 'organisation', label: 'Organisation des données' },
      { key: 'interpretation', label: 'Interprétation' },
      { key: 'diagrammes', label: 'Diagrammes et graphiques' },
      { key: 'moyenne', label: 'Moyenne arithmétique' }
    ]
  },
  {
    key: 'probabilite',
    label: 'Probabilité',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle3-primaire'],
    subNotions: [
      { key: 'experimentation', label: 'Expérimentation' },
      { key: 'prediction', label: 'Prédiction' },
      { key: 'denombrement', label: 'Dénombrement' },
      { key: 'evenements', label: 'Événements probables' }
    ]
  },
  {
    key: 'resolution-problemes',
    label: 'Résolution de problèmes',
    subjectKey: 'mathematiques',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'strategies', label: 'Stratégies de résolution' },
      { key: 'raisonnement', label: 'Raisonnement mathématique' },
      { key: 'communication', label: 'Communication mathématique' },
      { key: 'validation', label: 'Validation de solutions' }
    ]
  },

  // ========== SCIENCE ET TECHNOLOGIE ==========
  // Univers matériel
  {
    key: 'matiere',
    label: 'La matière',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'proprietes', label: 'Propriétés et caractéristiques' },
      { key: 'etats', label: 'États de la matière' },
      { key: 'changements-physiques', label: 'Changements physiques' },
      { key: 'changements-chimiques', label: 'Changements chimiques' },
      { key: 'melanges', label: 'Mélanges et solutions' },
      { key: 'separation', label: 'Techniques de séparation' }
    ]
  },
  {
    key: 'energie',
    label: 'L\'énergie',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'formes', label: 'Formes d\'énergie' },
      { key: 'transformation', label: 'Transformation de l\'énergie' },
      { key: 'sources', label: 'Sources d\'énergie' },
      { key: 'conservation', label: 'Conservation de l\'énergie' },
      { key: 'energie-renouvelable', label: 'Énergies renouvelables' }
    ]
  },
  {
    key: 'forces-mouvements',
    label: 'Forces et mouvements',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'effets-forces', label: 'Effets des forces' },
      { key: 'machines-simples', label: 'Machines simples' },
      { key: 'equilibre', label: 'Équilibre' },
      { key: 'friction', label: 'Friction et résistance' },
      { key: 'gravite', label: 'Gravité' }
    ]
  },
  {
    key: 'lumiere-son',
    label: 'Lumière et son',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'proprietes-lumiere', label: 'Propriétés de la lumière' },
      { key: 'reflexion-refraction', label: 'Réflexion et réfraction' },
      { key: 'proprietes-son', label: 'Propriétés du son' },
      { key: 'propagation', label: 'Propagation' }
    ]
  },
  {
    key: 'electricite-magnetisme',
    label: 'Électricité et magnétisme',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle3-primaire'],
    subNotions: [
      { key: 'circuits', label: 'Circuits électriques' },
      { key: 'conducteurs-isolants', label: 'Conducteurs et isolants' },
      { key: 'magnetisme', label: 'Magnétisme' },
      { key: 'electro-aimants', label: 'Électro-aimants' }
    ]
  },
  // Univers vivant
  {
    key: 'univers-vivant',
    label: 'L\'univers vivant',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'caracteristiques', label: 'Caractéristiques du vivant' },
      { key: 'organisation', label: 'Organisation du vivant' },
      { key: 'metabolisme', label: 'Métabolisme' },
      { key: 'besoins', label: 'Besoins essentiels' },
      { key: 'croissance', label: 'Croissance et développement' }
    ]
  },
  {
    key: 'animaux',
    label: 'Les animaux',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'classification', label: 'Classification' },
      { key: 'adaptation', label: 'Adaptation' },
      { key: 'alimentation', label: 'Alimentation' },
      { key: 'reproduction', label: 'Reproduction' },
      { key: 'habitat', label: 'Habitat' }
    ]
  },
  {
    key: 'plantes',
    label: 'Les plantes',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'parties', label: 'Parties de la plante' },
      { key: 'photosynthese', label: 'Photosynthèse' },
      { key: 'reproduction', label: 'Reproduction' },
      { key: 'cycle-vie', label: 'Cycle de vie' },
      { key: 'besoins', label: 'Besoins des plantes' }
    ]
  },
  {
    key: 'ecosystemes',
    label: 'Écosystèmes',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'chaine-alimentaire', label: 'Chaîne alimentaire' },
      { key: 'biodiversite', label: 'Biodiversité' },
      { key: 'relations', label: 'Relations entre vivants' },
      { key: 'cycles-naturels', label: 'Cycles naturels' },
      { key: 'impact-humain', label: 'Impact humain' }
    ]
  },
  {
    key: 'corps-humain',
    label: 'Corps humain',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'anatomie', label: 'Anatomie' },
      { key: 'systemes', label: 'Systèmes du corps' },
      { key: 'sens', label: 'Les cinq sens' },
      { key: 'sante', label: 'Santé et hygiène' },
      { key: 'alimentation-saine', label: 'Alimentation saine' }
    ]
  },
  // Terre et espace
  {
    key: 'terre-espace',
    label: 'Terre et espace',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'systeme-solaire', label: 'Système Terre-Lune-Soleil' },
      { key: 'jour-nuit', label: 'Cycle jour/nuit' },
      { key: 'saisons', label: 'Les saisons' },
      { key: 'phases-lune', label: 'Phases de la Lune' },
      { key: 'planetes', label: 'Planètes' }
    ]
  },
  {
    key: 'phenomenes-geologiques',
    label: 'Phénomènes géologiques',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'roches-mineraux', label: 'Roches et minéraux' },
      { key: 'sol', label: 'Types de sol' },
      { key: 'erosion', label: 'Érosion' },
      { key: 'volcanisme', label: 'Volcans et tremblements' },
      { key: 'fossiles', label: 'Fossiles' }
    ]
  },
  {
    key: 'meteorologie',
    label: 'Météorologie',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'temperature', label: 'Température' },
      { key: 'precipitation', label: 'Précipitations' },
      { key: 'nuages', label: 'Types de nuages' },
      { key: 'vents', label: 'Vents' },
      { key: 'cycle-eau', label: 'Cycle de l\'eau' }
    ]
  },
  // Univers technologique
  {
    key: 'conception-technologique',
    label: 'Conception technologique',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'cahier-charges', label: 'Cahier des charges' },
      { key: 'schemas', label: 'Schémas et plans' },
      { key: 'prototypes', label: 'Prototypes' },
      { key: 'tests', label: 'Tests et ajustements' }
    ]
  },
  {
    key: 'materiaux',
    label: 'Matériaux',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle1-primaire', 'cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'proprietes', label: 'Propriétés des matériaux' },
      { key: 'choix', label: 'Choix des matériaux' },
      { key: 'recyclage', label: 'Recyclage' },
      { key: 'durabilite', label: 'Durabilité' }
    ]
  },
  {
    key: 'systemes-mecanismes',
    label: 'Systèmes et mécanismes',
    subjectKey: 'science-et-technologie',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'engrenages', label: 'Engrenages' },
      { key: 'poulies', label: 'Poulies' },
      { key: 'leviers', label: 'Leviers' },
      { key: 'transmission', label: 'Transmission du mouvement' }
    ]
  },

  // ========== UNIVERS SOCIAL ==========
  {
    key: 'geographie',
    label: 'Géographie',
    subjectKey: 'univers-social',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'territoire', label: 'Organisation du territoire' },
      { key: 'cartes', label: 'Lecture de cartes' },
      { key: 'regions', label: 'Régions du Québec' },
      { key: 'ressources', label: 'Ressources naturelles' }
    ]
  },
  {
    key: 'histoire',
    label: 'Histoire',
    subjectKey: 'univers-social',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'nouvelle-france', label: 'La Nouvelle-France' },
      { key: 'societe-canadienne', label: 'La société canadienne' },
      { key: 'quebec-moderne', label: 'Le Québec moderne' },
      { key: 'premieres-nations', label: 'Les Premières Nations' }
    ]
  },
  {
    key: 'citoyennete',
    label: 'Éducation à la citoyenneté',
    subjectKey: 'univers-social',
    cycleKeys: ['cycle2-primaire', 'cycle3-primaire'],
    subNotions: [
      { key: 'droits-responsabilites', label: 'Droits et responsabilités' },
      { key: 'democratie', label: 'Démocratie' },
      { key: 'institutions', label: 'Institutions québécoises' }
    ]
  }
]

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get grades for a specific cycle
 */
export function getGradesForCycle(cycleKey: string): Grade[] {
  return grades.filter(grade => grade.cycleKey === cycleKey)
}

/**
 * Get subjects available for a specific cycle
 */
export function getSubjectsForCycle(cycleKey: string): Subject[] {
  return subjects.filter(subject => subject.availableInCycles.includes(cycleKey))
}

/**
 * Get notions for a specific subject and cycle
 */
export function getNotionsForSubjectAndCycle(subjectKey: string, cycleKey: string): Notion[] {
  return notions.filter(
    notion => notion.subjectKey === subjectKey && notion.cycleKeys.includes(cycleKey)
  )
}

/**
 * Get sub-notions for a specific notion
 */
export function getSubNotions(notionKey: string): SubNotion[] {
  const notion = notions.find(n => n.key === notionKey)
  return notion?.subNotions || []
}

/**
 * Validate if a complete filter selection is valid according to PFEQ
 */
export function validateFilterSelection(
  cycleKey: string,
  gradeKey: string,
  subjectKey: string,
  notionKey: string
): boolean {
  // Check if grade belongs to cycle
  const grade = grades.find(g => g.key === gradeKey)
  if (!grade || grade.cycleKey !== cycleKey) return false

  // Check if subject is available in cycle
  const subject = subjects.find(s => s.key === subjectKey)
  if (!subject || !subject.availableInCycles.includes(cycleKey)) return false

  // Check if notion belongs to subject and is available in cycle
  const notion = notions.find(n => n.key === notionKey)
  if (!notion || notion.subjectKey !== subjectKey || !notion.cycleKeys.includes(cycleKey)) {
    return false
  }

  return true
}