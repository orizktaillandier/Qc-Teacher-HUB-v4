# Quebec Teacher Hub v4 - Security Guidelines

## 🔒 Environment Variables Security

### ✅ Safe to Commit
- `app/.env.example` - Template with placeholder values
- `SECURITY.md` - This documentation file

### ❌ NEVER Commit (Protected by .gitignore)
- `app/.env.local` - Contains real API keys and secrets
- `app/.env` - Any environment file with real values
- Any file matching `**/.env*` patterns

## 🛡️ Security Verification

### Checking Environment Files
```bash
# Verify .env files are ignored
cd quebec-teacher-hub-v4
git status --ignored | grep env

# Should show:
# ✅ app/.env.example (tracked)
# ✅ app/.env.local (ignored)
```

### Setting Up Environment
1. Copy the template: `cp app/.env.example app/.env.local`
2. Replace placeholder values with real credentials
3. Never commit `.env.local` (protected by .gitignore)

## 🔑 Sensitive Data in v4

### API Keys (Keep Secret)
- `OPENAI_API_KEY` - OpenAI API access
- `ANTHROPIC_API_KEY` - Claude API access
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `NEXTAUTH_SECRET` - Authentication secret
- `DATABASE_URL` - Contains database password

### Public Values (Safe in .env.example)
- `GOOGLE_CLIENT_ID` - Public OAuth identifier
- `NEXT_PUBLIC_APP_URL` - Public app URL
- Configuration flags and timeouts
- Non-sensitive organizational data

## 🚫 Git Security Rules

### .gitignore Protection
```gitignore
# Environment variables - CRITICAL: Never commit these files
app/.env
app/.env.*
app/.env.local
**/.env
**/.env.local
**/.env.*.local
```

### Pre-commit Verification
Before any commit, verify:
```bash
# Check for accidentally staged .env files
git diff --cached --name-only | grep -E '\.env'

# Should return empty (no .env files staged)
```

## 🔧 Current Environment Status

### Files Copied from v3
- ✅ `app/.env.local` - Working configuration copied from v3
- ✅ All API keys and database credentials preserved
- ✅ Quebec Law 25 compliance settings maintained
- ✅ AI model configurations updated for v4

### Git Security Status
- ✅ `.env.local` properly ignored by git
- ✅ `.env.example` template created for sharing
- ✅ Enhanced .gitignore with explicit .env exclusions
- ✅ No sensitive data in committed files

## 📋 Environment Variables Overview

### Database & Storage
- `DATABASE_URL` - Supabase PostgreSQL connection
- `KNOWLEDGE_DB_PATH` - SQLite knowledge base path
- `STORAGE_DIR` - Local file storage directory

### Authentication
- `NEXTAUTH_SECRET` - JWT signing secret
- `NEXTAUTH_URL` - Auth callback URL
- `GOOGLE_CLIENT_ID/SECRET` - OAuth credentials

### AI Services
- `OPENAI_API_KEY` - Primary AI service
- `ANTHROPIC_API_KEY` - Fallback AI service
- `AI_MODEL` - Model selection configuration

### Quebec Compliance
- Law 25 privacy settings
- COPPA student data protection
- Rate limiting for personal data
- Data retention policies

### Feature Flags
- `USE_HEROUI_INTERFACE=true` - v4 UI framework
- `ENABLE_MULTI_FORMAT_EXPORT=true` - PDF/export features
- `ENABLE_FRENCH_EXCELLENCE=true` - Quebec French optimization

## ⚠️ Security Reminders

1. **Never commit .env files** - They contain sensitive API keys
2. **Regenerate secrets** - If accidentally committed, rotate all keys
3. **Use .env.example** - For sharing configuration templates
4. **Verify .gitignore** - Before any commit containing new .env files
5. **Regular audits** - Check for exposed secrets in git history

---

**Environment setup complete and secured** ✅
**All sensitive data protected from git commits** ✅
**Template available for safe sharing** ✅