# API Documentation - Quebec Teacher Hub v4

## Base URL
Development: `http://localhost:3000/api`

## Endpoints

### POST /api/generate-card-v2

Generate 8 educational task cards aligned with Quebec PFEQ curriculum.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "cycle": "cycle2-primaire",
  "grade": "3",
  "subject": "mathematiques",
  "notion": "fractions"
}
```

**Parameters:**

| Field | Type | Required | Description | Values |
|-------|------|----------|-------------|--------|
| `cycle` | string | Yes | Educational cycle | `cycle1-primaire`, `cycle2-primaire`, `cycle3-primaire` |
| `grade` | string | Yes | Grade level | `1`, `2`, `3`, `4`, `5`, `6` |
| `subject` | string | Yes | Subject area | See supported subjects below |
| `notion` | string | Yes | Specific notion/topic | See notions per subject below |

#### Response

**Success (200 OK):**
```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "number": 1,
        "title": "Carte Fractions",
        "question": "Quelle fraction est représentée? [visual:fraction:2:3:2]",
        "answer": "2/3",
        "difficulty": "easy",
        "theme": "Fractions"
      },
      // ... 7 more cards
    ],
    "metadata": {
      "subject": "mathematiques",
      "notion": "fractions",
      "cycle": "cycle2-primaire",
      "grade": "3",
      "generatedAt": "2025-01-15T10:30:00.000Z",
      "sessionId": "card_v2_1234567890_abc123"
    }
  }
}
```

**Error (400 Bad Request):**
```json
{
  "success": false,
  "error": "Missing required fields: cycle, grade, subject, notion"
}
```

**Error (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Card generation failed"
}
```

### Supported Subjects and Notions

#### Mathematics (`mathematiques`)
- `nombres-naturels` - Natural numbers
- `fractions` - Fractions
- `nombres-decimaux` - Decimal numbers
- `addition-soustraction` - Addition and subtraction
- `multiplication-division` - Multiplication and division
- `figures-planes` - Plane figures
- `solides` - 3D solids
- `perimetre` - Perimeter
- `aire` - Area
- `volume` - Volume

#### French (`francais-langue-enseignement`)
- `strategies-lecture` - Reading strategies
- `comprehension` - Text comprehension
- `classes-mots` - Word classes
- `groupe-nom` - Noun groups
- `present` - Present tense
- `imparfait` - Imperfect tense
- `accord-gn` - Noun agreement
- `accord-sujet-verbe` - Subject-verb agreement

#### Science & Technology (`science-et-technologie`)
- `etats-matiere` - States of matter
- `cycle-vie` - Life cycles
- `chaine-alimentaire` - Food chain
- `systeme-solaire` - Solar system
- `cycle-eau` - Water cycle

## Visual Component Codes

The API returns visual codes in questions that should be parsed and rendered:

### Syntax
`[visual:type:param1:param2:...]`

### Available Visual Types

| Code | Description | Example |
|------|-------------|---------|
| `angle` | Angle visualization | `[visual:angle:45:100]` |
| `triangle` | Triangle with angles | `[visual:triangle:50:60:x]` |
| `triangle-sides` | Triangle with side lengths | `[visual:triangle-sides:3:4:5:right]` |
| `fraction` | Fraction pie chart | `[visual:fraction:3:4:3]` |
| `numberline` | Number line with markers | `[visual:numberline:0:10:3,5,7]` |
| `grid` | Grid for area/multiplication | `[visual:grid:3:4:6]` |
| `clock` | Analog clock | `[visual:clock:3:15]` |
| `shape` | Geometric shapes | `[visual:shape:hexagon:100]` |
| `graph` | Bar graph | `[visual:graph:2,4,3,5]` |

## Rate Limiting

- No hard rate limits in development
- Recommended: Max 10 requests per minute to avoid API quota issues

## Authentication

Currently no authentication required (development mode).

## Examples

### Generate Math Cards (Fractions)
```bash
curl -X POST http://localhost:3000/api/generate-card-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "cycle": "cycle2-primaire",
    "grade": "3",
    "subject": "mathematiques",
    "notion": "fractions"
  }'
```

### Generate French Cards (Conjugation)
```bash
curl -X POST http://localhost:3000/api/generate-card-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "cycle": "cycle3-primaire",
    "grade": "5",
    "subject": "francais-langue-enseignement",
    "notion": "present"
  }'
```

### Generate Science Cards (States of Matter)
```bash
curl -X POST http://localhost:3000/api/generate-card-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "cycle": "cycle2-primaire",
    "grade": "4",
    "subject": "science-et-technologie",
    "notion": "etats-matiere"
  }'
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad request (missing or invalid parameters)
- `500` - Internal server error (generation failed)

Always check the `success` field in the response to determine if the request was successful.

## Notes

1. Each request generates exactly 8 cards
2. Cards have progressive difficulty: 2 easy, 3 medium, 3 hard
3. Questions are simple and direct (no context)
4. Answers include explanations when helpful
5. Visual codes must be parsed client-side for rendering
6. Generation typically takes 3-5 seconds

## Future Endpoints (Planned)

- `GET /api/cards/:sessionId` - Retrieve previously generated cards
- `POST /api/export-pdf` - Export cards to PDF
- `GET /api/answer-sheet/:sessionId` - Generate answer sheet
- `GET /api/corriger/:sessionId` - Generate answer key