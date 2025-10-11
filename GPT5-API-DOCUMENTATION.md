# GPT-5 API Documentation
**CRITICAL: This is the authoritative reference for GPT-5 API usage**

## Key GPT-5 API Parameters & Options

### Available Models
- `gpt-5` - Full model (primary)
- `gpt-5-mini` - Smaller, faster variant (fallback)
- `gpt-5-nano` - Smallest variant (not used in this project)

### Core Parameters

| Parameter | Purpose | Typical Values / Notes |
|-----------|---------|----------------------|
| `model` | Which GPT-5 variant to use | `"gpt-5"`, `"gpt-5-mini"`, `"gpt-5-nano"` |
| `input` / `messages` | The prompt / conversation history | Array of `{ role, content }` objects |
| `text` | Controls output style / detail | Object with `verbosity`: `"low"`, `"medium"`, `"high"` and `format` for output type |
| `reasoning` | Control internal thinking depth | Object with `effort`: `"minimal"`, `"low"`, `"medium"`, `"high"` |
| ~~`temperature`~~ | ~~Sampling randomness~~ | **NOT SUPPORTED in GPT-5** |
| ~~`top_p`~~ | ~~Nucleus sampling control~~ | **NOT SUPPORTED in GPT-5** |
| `stream` | Whether to stream responses | Boolean: `true` for partial outputs |
| `truncation` | Handle context exceeding window | `"auto"` or `"disabled"` |
| `tools` | External tools/APIs model can call | Array of tool definitions |
| `tool_choice` | How strictly model must use tools | `"none"`, `"auto"`, `"required"` |

## Good Default Settings for Quebec Teacher Hub

```javascript
{
  model: "gpt-5",
  text: {
    verbosity: "medium",
    format: { type: "json_object" }  // For structured outputs
  },
  reasoning: { effort: "low" },  // Use "medium" for complex card generation
  // NO temperature or top_p - NOT SUPPORTED
  stream: false,
  truncation: "auto",
  tools: [],
  tool_choice: "auto"
}
```

## Settings for Card Generation

### For 8 Educational Cards (Production)
```javascript
{
  model: "gpt-5",
  input: [
    { role: "system", content: "Tu es un expert en création de cartes à tâches PFEQ..." },
    { role: "user", content: buildStructuredPrompt(...) }
  ],
  text: {
    verbosity: "medium",  // Detailed enough for educational content
    format: { type: "json_object" }  // Force JSON output (moved from response_format)
  },
  reasoning: { effort: "medium" }, // Better quality for educational accuracy
  // NO SAMPLING PARAMETERS - Not supported in GPT-5
  stream: false,
  truncation: "auto"
}
```

### For Quick Testing (4 Cards)
```javascript
{
  model: "gpt-5-mini",
  text: {
    verbosity: "low",
    format: { type: "json_object" }
  },
  reasoning: { effort: "minimal" },
  // NO temperature or sampling parameters
  stream: false,
  truncation: "auto"
}
```

## Important Notes

1. **NO `max_tokens` or `max_completion_tokens`** - These are deprecated for GPT-5
2. **NO `temperature` or `top_p`** - GPT-5 does NOT support sampling parameters
3. **Use `text.verbosity`** instead of token limits to control output length
4. **Use `text.format`** for structured outputs (e.g., JSON)
5. **Use `reasoning.effort`** to trade off quality vs speed:
   - `"minimal"` - Fastest, good for simple tasks
   - `"low"` - Good default balance
   - `"medium"` - Better for complex educational content
   - `"high"` - Maximum quality (slowest)

## Python Example (Reference)
```python
from openai import OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

resp = client.responses.create(
    model="gpt-5",
    input=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Write a Python function to sort a list."}
    ],
    text={"verbosity": "medium"},
    reasoning={"effort": "low"},
    temperature=0.7,
    top_p=1.0,
    stream=False,
    truncation="auto",
    tools=[],
    tool_choice="auto"
)
```

## JavaScript/TypeScript Adaptation
```typescript
const completion = await openai.responses.create({
  model: "gpt-5",
  input: messages,
  text: {
    verbosity: "medium",
    format: { type: "json_object" }  // JSON format moved to text.format
  },
  reasoning: { effort: "medium" },
  // NO temperature or top_p - NOT SUPPORTED
  stream: false,
  truncation: "auto"
});
```

## Migration Checklist
- [ ] Remove all `max_tokens` / `max_completion_tokens` parameters
- [ ] Add `text` object with `verbosity` setting
- [ ] Add `reasoning` object with `effort` setting
- [ ] Change `messages` to `input` (if using new API)
- [ ] Use `client.responses.create()` instead of `client.chat.completions.create()`