# Security Guidelines - Quebec Teacher Hub v5

## Critical Security Rules

### 1. Environment Variables
- **NEVER** commit `.env.local` or `.env` files to version control
- **ALWAYS** use `.env.example` as a template for new developers
- **NEVER** share actual credentials in chat, email, or documentation
- **ALWAYS** verify `.env*` is in `.gitignore` before first commit

### 2. Credential Rotation Schedule

Rotate credentials on these schedules:

| Credential Type | Rotation Frequency | Priority |
|----------------|-------------------|----------|
| NEXTAUTH_SECRET | Every 90 days | CRITICAL |
| OpenAI API Key | Every 90 days or if exposed | HIGH |
| Anthropic API Key | Every 90 days or if exposed | HIGH |
| Google OAuth Credentials | Every 180 days | HIGH |
| Database Credentials | Every 90 days | CRITICAL |
| TASK_SECRET | Every 90 days | HIGH |
| Stripe Keys | Every 180 days | HIGH (when implemented) |

### 3. Credential Rotation Steps

#### NEXTAUTH_SECRET
```bash
# Generate new secret
openssl rand -base64 32

# Steps:
1. Generate new secret using command above
2. Update .env.local with new NEXTAUTH_SECRET
3. Restart application
4. All users will be logged out and need to re-authenticate
5. Monitor error logs for 24 hours
```

#### OpenAI API Key
```bash
# Steps:
1. Go to https://platform.openai.com/api-keys
2. Create new API key with descriptive name (e.g., "QTH-v5-Production-2025-01")
3. Update OPENAI_API_KEY in .env.local
4. Test key with a sample card generation
5. Revoke old key in OpenAI dashboard
6. Monitor usage for 24 hours
```

#### Anthropic API Key
```bash
# Steps:
1. Go to https://console.anthropic.com/settings/keys
2. Create new API key with descriptive name
3. Update ANTHROPIC_API_KEY in .env.local
4. Test key if using Claude models
5. Delete old key in Anthropic dashboard
6. Monitor usage for 24 hours
```

#### Google OAuth Credentials
```bash
# Steps:
1. Go to Google Cloud Console: https://console.cloud.google.com
2. Navigate to APIs & Services > Credentials
3. Create new OAuth 2.0 Client ID
4. Set authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google (development)
   - https://yourdomain.com/api/auth/callback/google (production)
5. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local
6. Test Google sign-in flow
7. Delete old OAuth credentials after 48 hours of testing
```

#### Database Credentials (Supabase)
```bash
# Steps:
1. Go to Supabase Dashboard > Settings > Database
2. Click "Reset database password"
3. Copy new password
4. Update DATABASE_URL in .env.local
   Format: postgresql://postgres:[NEW_PASSWORD]@[HOST]:[PORT]/postgres
5. Restart application
6. Test database connectivity
7. Update SUPABASE_SERVICE_ROLE_KEY if rotating service keys
```

#### TASK_SECRET
```bash
# Generate new secret
openssl rand -base64 32

# Steps:
1. Generate new secret using command above
2. Update TASK_SECRET in .env.local
3. Clear any pending background jobs
4. Restart application
```

### 4. Emergency Credential Compromise Response

If credentials are exposed (committed to git, shared publicly, etc.):

**IMMEDIATE ACTIONS (Within 5 minutes):**
1. Rotate the compromised credential immediately
2. Revoke/delete old credential
3. Check access logs for unauthorized usage
4. Update .env.local with new credential
5. Restart application

**SHORT-TERM ACTIONS (Within 24 hours):**
1. Review git history to confirm credential was not committed
2. If committed, use `git filter-branch` or BFG Repo-Cleaner to remove from history
3. Force push cleaned history (coordinate with team)
4. Rotate all related credentials as precaution
5. Monitor error logs and usage metrics

**LONG-TERM ACTIONS (Within 1 week):**
1. Review security practices with team
2. Set up secret scanning tools (e.g., GitHub secret scanning)
3. Implement pre-commit hooks to prevent credential commits
4. Document incident in security log
5. Update this document with lessons learned

### 5. Pre-Production Checklist

Before deploying to production:

- [ ] Verify `.env.local` is not committed to repository
- [ ] Confirm all credentials in production are different from development
- [ ] Test Google OAuth with production callback URL
- [ ] Verify Supabase is in production mode (not test mode)
- [ ] Confirm OpenAI billing limits are set
- [ ] Enable Sentry error monitoring
- [ ] Set up Upstash Redis for production rate limiting
- [ ] Configure proper CORS settings
- [ ] Enable HTTPS redirect
- [ ] Test middleware route protection
- [ ] Review all environment variables are set correctly
- [ ] Set up backup credentials in secure vault (e.g., 1Password, AWS Secrets Manager)

### 6. Credential Storage Best Practices

**Development:**
- Store in `.env.local` (never commit)
- Use `.env.example` as template
- Share setup instructions, never actual credentials

**Production:**
- Use platform environment variable system (Vercel, Railway, etc.)
- Enable automatic encrypted backups
- Implement least-privilege access controls
- Use separate credentials for staging and production

**Team Sharing (when necessary):**
- Use secure credential managers (1Password, Bitwarden, etc.)
- Share with time-limited access
- Log all credential access
- Rotate after team member departure

### 7. Monitoring and Alerts

Set up alerts for:
- Unusual API usage patterns (OpenAI, Anthropic)
- Failed authentication attempts (>10 in 5 minutes)
- Database connection errors
- Rate limit violations
- New OAuth sign-ins from unexpected locations

### 8. Compliance Notes

**Quebec Law 25 Requirements:**
- Credentials must be encrypted at rest
- Access logs must be maintained for 730 days
- Credential rotation must be documented
- Breaches must be reported within 72 hours

**COPPA Compliance (Student Data):**
- Additional encryption for student-related credentials
- Stricter access controls
- Enhanced monitoring and logging
- Regular security audits

---

## Quick Reference

### Generate Secrets
```bash
# NEXTAUTH_SECRET, TASK_SECRET (32 bytes)
openssl rand -base64 32

# NEXTAUTH_SECRET (64 bytes for extra security)
openssl rand -base64 64
```

### Test Credential Validity
```bash
# Test OpenAI API key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Test Database connection
psql $DATABASE_URL -c "SELECT 1"
```

### Emergency Contacts
- Security Lead: [Add contact]
- OpenAI Support: help.openai.com
- Supabase Support: supabase.com/support
- Google Cloud Support: cloud.google.com/support

---

**Last Updated:** 2025-01-XX
**Next Review Date:** [Set 90 days from today]
**Document Owner:** Security Lead
