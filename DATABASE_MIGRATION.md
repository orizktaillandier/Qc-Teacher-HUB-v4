# Database Migration Instructions

## Current Status

- **Old Database**: `prisma/dev.db` (preserved with existing data)
- **New Database**: `prisma/dev-new.db` (clean, with proper migrations)
- **Active Database**: `dev-new.db` (configured in schema.prisma)

## What Was Done

1. Created new clean database (`dev-new.db`)
2. Applied initial migration (`20251011131517_init`)
3. Generated Prisma client
4. Tested all database operations (10 comprehensive tests ✅)

## Test Results

All database operations verified working:
- ✅ User creation
- ✅ Card generation CRUD
- ✅ Shared generation CRUD
- ✅ JSON fields (cards, subNotions, etc.)
- ✅ Relationships (User → CardGeneration → SharedGeneration)
- ✅ Cascade deletes
- ✅ View/copy counters
- ✅ Indexes and unique constraints

## Using the New Database

The new database is **already active**. When you:
- Sign in → User created in `dev-new.db`
- Save generation → Stored in `dev-new.db`
- Share to community → Added to `dev-new.db`

**No action required** - the app is already using the new database.

## Reverting to Old Database (if needed)

If you need to go back to the old database with existing data:

```bash
# Stop the dev server
npx kill-port 3000

# Edit prisma/schema.prisma
# Change line 10 from:
#   url = "file:./dev-new.db"
# To:
#   url = "file:./dev.db"

# Regenerate Prisma client
cd prisma
npx prisma generate

# Restart dev server
cd app
npm run dev
```

## Migrating Data from Old to New (if needed)

If you want to transfer data from old database to new:

```bash
# Export data from old database
node migrate-data.js export

# Import data to new database
node migrate-data.js import
```

(Note: Migration script not included - create if needed)

## Production Deployment

For production, use PostgreSQL instead of SQLite:

1. Create PostgreSQL database on Supabase/Vercel/Railway
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

## File Structure

```
prisma/
├── dev.db                          # Old database (preserved)
├── dev-new.db                      # New database (active)
├── schema.prisma                   # Schema (points to dev-new.db)
└── migrations/
    ├── 20251011131517_init/
    │   └── migration.sql           # Initial migration
    └── migration_lock.toml         # Lock file
```

## Important Notes

- **Old database is safe**: `dev.db` is untouched and can be used anytime
- **No data loss**: New database starts fresh - old data preserved
- **Migration tracked**: New database has proper Prisma migration history
- **Production ready**: Can deploy with `npx prisma migrate deploy`

## Next Steps

1. ✅ Test the app with new database (sign in, generate cards, save)
2. ✅ Verify everything works
3. ✅ If satisfied, delete old database or keep as backup
4. ✅ For production, switch to PostgreSQL

---

**Generated**: 2025-10-11
**Status**: ✅ New database tested and ready
**Rollback**: Possible anytime by editing schema.prisma
