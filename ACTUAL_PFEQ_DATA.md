# ACTUAL PFEQ DATA STRUCTURE - Quebec Teacher Hub v4

## 📊 **KNOWLEDGE BASE ANALYSIS**
*Based on actual knowledge base exploration - September 19, 2025*

**Database Stats:**
- **Total Chunks**: 346
- **Distinct Subjects**: 10
- **Distinct Notions**: 18
- **Table**: `knowledge_chunks`

---

## 🎯 **VALIDATED HIERARCHICAL FILTER STRUCTURE**

```
1. CYCLE → 2. GRADE → 3. SUBJECT → 4. NOTION
```

---

## 📚 **1. CYCLES (Confirmed from Knowledge Base)**

✅ **Knowledge Base Contains:**
- `cycle1-primaire` (Grade 1-2)
- `cycle2-primaire` (Grade 3-4)
- `cycle3-primaire` (Grade 5-6)

### Implementation:
```typescript
const cycles = [
  { key: "cycle1-primaire", label: "1er cycle primaire", grades: ["1", "2"] },
  { key: "cycle2-primaire", label: "2e cycle primaire", grades: ["3", "4"] },
  { key: "cycle3-primaire", label: "3e cycle primaire", grades: ["5", "6"] }
]
```

---

## 📈 **2. GRADES (Derived from Cycles)**

Since grades are derived from cycles, we maintain the same structure as documented.

---

## 📚 **3. SUBJECTS (From Actual Knowledge Base)**

✅ **Available Subjects in Knowledge Base:**

| Subject Key | French Name | Domain | Icon |
|-------------|-------------|---------|------|
| **francais-langue-enseignement** | Français, langue d'enseignement | Langue française | 📝 |
| **mathematique** / **mathematiques** | Mathématiques | Mathématiques | 🔢 |
| **science-et-technologie** | Science et technologie | Science et technologie | 🔬 |
| **univers-social** | Univers social | Univers social | 🌍 |
| **arts-plastiques** | Arts plastiques | Arts | 🎨 |
| **art-dramatique** | Art dramatique | Arts | 🎭 |
| **danse** | Danse | Arts | 💃 |
| **musique** | Musique | Arts | 🎵 |
| **education-physique-et-a-la-sante** | Éducation physique et à la santé | Développement personnel | ⚽ |

### ⚠️ **Subject Key Inconsistencies Found:**
- `mathematique` vs `mathematiques` (both exist)
- Need to normalize to single key

### Implementation Array:
```typescript
const subjects = [
  { key: "francais-langue-enseignement", label: "Français", icon: "📝" },
  { key: "mathematiques", label: "Mathématiques", icon: "🔢" }, // Normalized
  { key: "science-et-technologie", label: "Science et technologie", icon: "🔬" },
  { key: "univers-social", label: "Univers social", icon: "🌍" },
  { key: "arts-plastiques", label: "Arts plastiques", icon: "🎨" },
  { key: "art-dramatique", label: "Art dramatique", icon: "🎭" },
  { key: "danse", label: "Danse", icon: "💃" },
  { key: "musique", label: "Musique", icon: "🎵" },
  { key: "education-physique-et-a-la-sante", label: "Éducation physique", icon: "⚽" }
]
```

---

## 🎯 **4. NOTIONS (From Actual Knowledge Base)**

✅ **Available Notions in Knowledge Base:**

### **Core Subject Notions:**
| Notion Key | Subject Context | Description |
|------------|-----------------|-------------|
| **francais-communication-orale** | Français | Communication orale |
| **francais-ecriture-redaction** | Français | Écriture et rédaction |
| **francais-grammaire-orthographe** | Français | Grammaire et orthographe |
| **francais-lecture-comprehension** | Français | Lecture et compréhension |
| **francais-litterature-appreciation** | Français | Littérature et appréciation |
| **nombres-naturels** | Mathématiques | Nombres naturels |
| **operations** | Mathématiques | Opérations |
| **nombres-operations-arithmetique** | Mathématiques | Nombres et opérations |
| **geometrie-mesure** | Mathématiques | Géométrie et mesure |
| **univers-materiel** | Science et technologie | Univers matériel |
| **univers-vivant** | Science et technologie | Univers vivant |
| **terre-et-espace** | Science et technologie | Terre et espace |

### **Arts Notions:**
| Notion Key | Subject | Description |
|------------|---------|-------------|
| **arts-plastiques** | Arts plastiques | Arts plastiques généraux |
| **art-dramatique** | Art dramatique | Art dramatique général |
| **danse** | Danse | Danse générale |
| **musique** | Musique | Musique générale |

### **Other Notions:**
| Notion Key | Subject | Description |
|------------|---------|-------------|
| **univers-social** | Univers social | Univers social général |
| **education-physique-et-a-la-sante** | Éducation physique | Éducation physique générale |

---

## 🔄 **CASCADING FILTER IMPLEMENTATION STRATEGY**

### **Database Query Method:**
```typescript
const getNotionsForSubject = async (subjectKey: string, cycleKey: string) => {
  const db = new Database(dbPath, { readonly: true });
  const notions = db.prepare(`
    SELECT DISTINCT notion_key
    FROM knowledge_chunks
    WHERE subject_key = ?
    AND cycle_keys LIKE ?
    ORDER BY notion_key
  `).all(subjectKey, `%${cycleKey}%`);

  db.close();
  return notions.map(n => n.notion_key);
}
```

### **Validation Rules:**
1. **Cycle Selection** → Show only grades for that cycle
2. **Grade Selection** → Show all subjects available in knowledge base
3. **Subject Selection** → Query knowledge base for notions in that subject + cycle
4. **Notion Selection** → Enable exercise generation

---

## ⚠️ **IMPORTANT FINDINGS & NEXT STEPS**

### **✅ What Works:**
- Clear cycle structure matches PFEQ standards
- Comprehensive subject coverage across all major domains
- Detailed notions for core subjects (French, Math, Science)

### **🔧 Issues to Address:**
1. **Subject Key Inconsistency**: `mathematique` vs `mathematiques`
2. **Arts Structure**: Some arts have general vs specific notions
3. **Notion Granularity**: Varies between subjects

### **📋 Implementation Priority:**
1. Fix subject key normalization
2. Create dynamic notion loading based on subject+cycle
3. Implement proper fallbacks for missing combinations
4. Add validation to ensure PFEQ compliance

---

## 🚀 **READY FOR CASCADING FILTER IMPLEMENTATION**

The knowledge base structure is solid and contains authentic PFEQ-aligned content. We can now proceed with confidence to implement the cascading filter system that dynamically queries this rich database.

**Next Phase**: Implement the cascading filter components with proper knowledge base integration.