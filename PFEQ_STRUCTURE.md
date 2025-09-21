# PFEQ Primary School Structure for Cascading Filters

## 📚 **Programme de formation de l'école québécoise (PFEQ)**
### Quebec Education Program - Primary Level Structure

*Research Date: September 19, 2025*
*Status: Foundation Research Complete*

---

## 🎯 **HIERARCHICAL FILTER STRUCTURE**

Our cascading filter system follows the official PFEQ structure:

```
1. CYCLE → 2. GRADE/YEAR → 3. SUBJECT → 4. NOTIONS
```

---

## 📊 **1. CYCLES (Premier Niveau)**

Quebec primary education is organized into **3 two-year cycles**:

| Cycle | French Name | Grades | Ages | Years |
|-------|-------------|--------|------|-------|
| **1er cycle** | Premier cycle primaire | 1ère-2e | 6-8 | Grade 1-2 |
| **2e cycle** | Deuxième cycle primaire | 3e-4e | 8-10 | Grade 3-4 |
| **3e cycle** | Troisième cycle primaire | 5e-6e | 10-12 | Grade 5-6 |

### Implementation Keys:
```typescript
cycles = [
  { key: "cycle1-primaire", label: "1er cycle primaire", grades: ["1", "2"] },
  { key: "cycle2-primaire", label: "2e cycle primaire", grades: ["3", "4"] },
  { key: "cycle3-primaire", label: "3e cycle primaire", grades: ["5", "6"] }
]
```

---

## 📈 **2. GRADES/YEARS (Deuxième Niveau)**

Once a cycle is selected, show only the corresponding grades:

| Cycle Selected | Available Grades |
|----------------|------------------|
| 1er cycle primaire | 1ère année, 2e année |
| 2e cycle primaire | 3e année, 4e année |
| 3e cycle primaire | 5e année, 6e année |

### Implementation Logic:
```typescript
const getGradesForCycle = (cycleKey: string) => {
  const cycleGradeMap = {
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
  }
  return cycleGradeMap[cycleKey] || []
}
```

---

## 📚 **3. SUBJECTS/LEARNING DOMAINS (Troisième Niveau)**

The PFEQ organizes subjects into **5 learning domains** (domaines d'apprentissage):

### **A) Langue française**
- **Français, langue d'enseignement**

### **B) Mathématiques**
- **Mathématique**

### **C) Science et technologie**
- **Science et technologie**

### **D) Univers social**
- **Géographie, histoire et éducation à la citoyenneté**

### **E) Arts**
- **Arts plastiques**
- **Art dramatique**
- **Danse**
- **Musique**

### **F) Développement personnel**
- **Éducation physique et à la santé**
- **Éthique et culture religieuse**

### **G) Langues secondes**
- **Anglais, langue seconde**

### Implementation Array:
```typescript
subjects = [
  // Core subjects for primary
  { key: "francais", label: "Français", domain: "langue-francaise", icon: "📝" },
  { key: "mathematiques", label: "Mathématiques", domain: "mathematiques", icon: "🔢" },
  { key: "sciences", label: "Science et technologie", domain: "science-technologie", icon: "🔬" },
  { key: "univers-social", label: "Univers social", domain: "univers-social", icon: "🌍" },
  { key: "arts", label: "Arts", domain: "arts", icon: "🎨" },
  { key: "anglais", label: "Anglais, langue seconde", domain: "langues-secondes", icon: "🇬🇧" },
  { key: "education-physique", label: "Éducation physique", domain: "developpement-personnel", icon: "⚽" },
  { key: "ethique", label: "Éthique et culture religieuse", domain: "developpement-personnel", icon: "🤝" }
]
```

---

## 🎯 **4. NOTIONS (Quatrième Niveau)**

Notions are **subject-specific learning objectives** that vary by subject and cycle.

### **Subject-Dependent Notions**

#### **Français (French Language)**
- Lecture (Reading)
- Écriture (Writing)
- Communication orale (Oral Communication)
- Grammaire (Grammar)
- Vocabulaire (Vocabulary)
- Littérature (Literature)

#### **Mathématiques (Mathematics)**
- Nombres naturels (Natural Numbers)
- Opérations (Operations)
- Géométrie (Geometry)
- Mesure (Measurement)
- Statistiques (Statistics)
- Probabilités (Probability)

#### **Science et technologie**
- Matière (Matter)
- Énergie (Energy)
- Forces et mouvements (Forces and Motion)
- Systèmes et interactions (Systems and Interactions)
- Techniques et instrumentation (Techniques and Instrumentation)

#### **Univers social**
- Géographie (Geography)
- Histoire (History)
- Éducation à la citoyenneté (Citizenship Education)

### Implementation Strategy:
```typescript
const getNotionsForSubject = (subjectKey: string, cycleKey: string) => {
  // This will query our knowledge base to get actual PFEQ-aligned notions
  // for the specific subject and cycle combination
  return knowledgeRetriever.getAvailableNotions(subjectKey, cycleKey)
}
```

---

## 🔄 **CASCADING FILTER LOGIC**

### **Filter Dependencies:**
1. **Select Cycle** → Enables Grade selection
2. **Select Grade** → Enables Subject selection
3. **Select Subject** → Enables Notion selection
4. **Select Notion** → Enable form submission

### **Validation Rules:**
- Each filter level depends on the previous selection
- Clearing a parent filter resets all child filters
- Only show options that exist in our knowledge base
- Maintain PFEQ curriculum alignment at every level

### **Implementation Pattern:**
```typescript
interface FilterState {
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
}

const handleFilterChange = (level: keyof FilterState, value: string) => {
  // Clear dependent filters when parent changes
  const newState = { ...filterState, [level]: value };

  if (level === 'cycle') {
    newState.grade = '';
    newState.subject = '';
    newState.notion = '';
  } else if (level === 'grade') {
    newState.subject = '';
    newState.notion = '';
  } else if (level === 'subject') {
    newState.notion = '';
  }

  setFilterState(newState);
}
```

---

## ✅ **IMPLEMENTATION CHECKLIST**

- [x] **Research PFEQ official structure**
- [x] **Document cycle-grade relationships**
- [x] **Identify core subjects for primary**
- [ ] **Query knowledge base for available notions**
- [ ] **Implement cascading filter components**
- [ ] **Add validation logic**
- [ ] **Test PFEQ compliance**

---

## 📋 **NEXT STEPS**

1. **Create knowledge base query methods** to get available options dynamically
2. **Implement cascading select components** with proper dependencies
3. **Add PFEQ validation** to ensure curriculum alignment
4. **Test filter combinations** with real knowledge base data

---

*This structure ensures our Quebec Teacher Hub v4 maintains strict PFEQ compliance while providing an intuitive cascading filter experience.*