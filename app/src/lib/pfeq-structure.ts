// PFEQ Structure with complete notion hierarchy
// Based on official Quebec Education Program (PFEQ) documents

export interface SubNotion {
  value: string;
  label: string;
  cycles?: string[]; // Which cycles this sub-notion applies to
}

export interface Notion {
  value: string;
  label: string;
  subNotions: SubNotion[];
}

export interface Subject {
  value: string;
  label: string;
  notions: Notion[];
}

export const PFEQ_STRUCTURE: Subject[] = [
  {
    value: 'mathematiques',
    label: 'Mathématiques',
    notions: [
      {
        value: 'arithmetique',
        label: 'Arithmétique',
        subNotions: [
          { value: 'nombres-naturels', label: 'Nombres naturels' },
          { value: 'nombres-entiers', label: 'Nombres entiers', cycles: ['cycle3-primaire'] },
          { value: 'fractions', label: 'Fractions', cycles: ['cycle2-primaire', 'cycle3-primaire'] },
          { value: 'nombres-decimaux', label: 'Nombres décimaux', cycles: ['cycle2-primaire', 'cycle3-primaire'] },
          { value: 'pourcentages', label: 'Pourcentages', cycles: ['cycle3-primaire'] }
        ]
      },
      {
        value: 'operations',
        label: 'Opérations',
        subNotions: [
          { value: 'addition-soustraction', label: 'Addition et soustraction' },
          { value: 'multiplication-division', label: 'Multiplication et division' },
          { value: 'calcul-mental', label: 'Calcul mental' },
          { value: 'estimation', label: 'Estimation' },
          { value: 'priorite-operations', label: 'Priorité des opérations', cycles: ['cycle3-primaire'] }
        ]
      },
      {
        value: 'geometrie',
        label: 'Géométrie',
        subNotions: [
          { value: 'figures-planes', label: 'Figures planes' },
          { value: 'solides', label: 'Solides' },
          { value: 'angles', label: 'Angles', cycles: ['cycle3-primaire'] },
          { value: 'symetrie', label: 'Symétrie' },
          { value: 'transformation', label: 'Transformations géométriques' },
          { value: 'reperage-espace', label: 'Repérage dans l\'espace' }
        ]
      },
      {
        value: 'mesure',
        label: 'Mesure',
        subNotions: [
          { value: 'longueur', label: 'Longueur' },
          { value: 'perimetre', label: 'Périmètre' },
          { value: 'aire', label: 'Aire', cycles: ['cycle2-primaire', 'cycle3-primaire'] },
          { value: 'volume', label: 'Volume', cycles: ['cycle3-primaire'] },
          { value: 'masse', label: 'Masse' },
          { value: 'temps', label: 'Temps' },
          { value: 'temperature', label: 'Température' },
          { value: 'angles-mesure', label: 'Mesure d\'angles', cycles: ['cycle3-primaire'] }
        ]
      },
      {
        value: 'statistique',
        label: 'Statistique',
        subNotions: [
          { value: 'collecte-donnees', label: 'Collecte de données' },
          { value: 'tableaux', label: 'Tableaux' },
          { value: 'diagrammes', label: 'Diagrammes' },
          { value: 'moyenne', label: 'Moyenne arithmétique', cycles: ['cycle3-primaire'] },
          { value: 'mode', label: 'Mode' }
        ]
      },
      {
        value: 'probabilite',
        label: 'Probabilité',
        subNotions: [
          { value: 'evenements', label: 'Événements possibles/impossibles' },
          { value: 'prediction', label: 'Prédiction' },
          { value: 'equiprobable', label: 'Équiprobable' }
        ]
      }
    ]
  },
  {
    value: 'francais-langue-enseignement',
    label: 'Français',
    notions: [
      {
        value: 'lecture',
        label: 'Lecture',
        subNotions: [
          { value: 'strategies-lecture', label: 'Stratégies de lecture' },
          { value: 'comprehension', label: 'Compréhension' },
          { value: 'inference', label: 'Inférence' },
          { value: 'texte-narratif', label: 'Texte narratif' },
          { value: 'texte-descriptif', label: 'Texte descriptif' },
          { value: 'texte-informatif', label: 'Texte informatif' }
        ]
      },
      {
        value: 'ecriture',
        label: 'Écriture',
        subNotions: [
          { value: 'planification', label: 'Planification' },
          { value: 'redaction', label: 'Rédaction' },
          { value: 'revision', label: 'Révision' },
          { value: 'schema-narratif', label: 'Schéma narratif' },
          { value: 'paragraphe', label: 'Structure du paragraphe' }
        ]
      },
      {
        value: 'grammaire',
        label: 'Grammaire',
        subNotions: [
          { value: 'classes-mots', label: 'Classes de mots' },
          { value: 'groupe-nom', label: 'Groupe du nom' },
          { value: 'groupe-verbe', label: 'Groupe du verbe' },
          { value: 'fonctions', label: 'Fonctions syntaxiques' },
          { value: 'phrase-types', label: 'Types et formes de phrases' }
        ]
      },
      {
        value: 'conjugaison',
        label: 'Conjugaison',
        subNotions: [
          { value: 'present', label: 'Présent de l\'indicatif' },
          { value: 'imparfait', label: 'Imparfait' },
          { value: 'passe-compose', label: 'Passé composé', cycles: ['cycle2-primaire', 'cycle3-primaire'] },
          { value: 'futur-simple', label: 'Futur simple' },
          { value: 'conditionnel', label: 'Conditionnel présent', cycles: ['cycle3-primaire'] }
        ]
      },
      {
        value: 'accords',
        label: 'Accords',
        subNotions: [
          { value: 'accord-gn', label: 'Accord dans le groupe du nom' },
          { value: 'accord-sujet-verbe', label: 'Accord sujet-verbe' },
          { value: 'participe-passe-etre', label: 'Participe passé avec être' },
          { value: 'participe-passe-avoir', label: 'Participe passé avec avoir', cycles: ['cycle3-primaire'] }
        ]
      },
      {
        value: 'orthographe',
        label: 'Orthographe',
        subNotions: [
          { value: 'mots-frequents', label: 'Mots fréquents' },
          { value: 'homophones', label: 'Homophones' },
          { value: 'accents', label: 'Accents' },
          { value: 'familles-mots', label: 'Familles de mots' }
        ]
      }
    ]
  },
  {
    value: 'science-et-technologie',
    label: 'Science et technologie',
    notions: [
      {
        value: 'univers-materiel',
        label: 'Univers matériel',
        subNotions: [
          { value: 'etats-matiere', label: 'États de la matière' },
          { value: 'changements-etat', label: 'Changements d\'état' },
          { value: 'melanges-solutions', label: 'Mélanges et solutions' },
          { value: 'forces-mouvements', label: 'Forces et mouvements' },
          { value: 'energie', label: 'Formes d\'énergie' }
        ]
      },
      {
        value: 'univers-vivant',
        label: 'Univers vivant',
        subNotions: [
          { value: 'besoins-essentiels', label: 'Besoins essentiels' },
          { value: 'cycle-vie', label: 'Cycle de vie' },
          { value: 'chaine-alimentaire', label: 'Chaîne alimentaire' },
          { value: 'habitat', label: 'Habitat' },
          { value: 'adaptation', label: 'Adaptation' },
          { value: 'systemes-corps', label: 'Systèmes du corps', cycles: ['cycle3-primaire'] }
        ]
      },
      {
        value: 'terre-espace',
        label: 'Terre et espace',
        subNotions: [
          { value: 'systeme-solaire', label: 'Système solaire' },
          { value: 'rotation-revolution', label: 'Rotation et révolution' },
          { value: 'saisons', label: 'Saisons' },
          { value: 'cycle-eau', label: 'Cycle de l\'eau' },
          { value: 'phenomenes-meteo', label: 'Phénomènes météorologiques' },
          { value: 'phases-lune', label: 'Phases de la Lune', cycles: ['cycle3-primaire'] }
        ]
      }
    ]
  }
];

// Helper function to get notions for a specific subject
export function getNotionsForSubject(subjectKey: string): Notion[] {
  const subject = PFEQ_STRUCTURE.find(s => s.value === subjectKey);
  return subject?.notions || [];
}

// Helper function to get sub-notions for a specific notion
export function getSubNotionsForNotion(subjectKey: string, notionKey: string, cycleKey?: string): SubNotion[] {
  const notions = getNotionsForSubject(subjectKey);
  const notion = notions.find(n => n.value === notionKey);

  if (!notion) return [];

  // Filter sub-notions by cycle if specified
  if (cycleKey) {
    return notion.subNotions.filter(sn =>
      !sn.cycles || sn.cycles.length === 0 || sn.cycles.includes(cycleKey)
    );
  }

  return notion.subNotions;
}

// Map old notion values to new structure for backward compatibility
export const NOTION_MAPPING: Record<string, { notion: string; subNotion?: string }> = {
  // Mathematics mappings
  'geometrie-mesure': { notion: 'geometrie' },
  'operations': { notion: 'operations' },
  'fractions-pourcentages': { notion: 'arithmetique', subNotion: 'fractions' },

  // French mappings
  'grammaire': { notion: 'grammaire' },
  'lecture': { notion: 'lecture' },
  'ecriture': { notion: 'ecriture' },

  // Science mappings
  'univers-vivant': { notion: 'univers-vivant' },
  'univers-materiel': { notion: 'univers-materiel' },
  'terre-espace': { notion: 'terre-espace' }
};