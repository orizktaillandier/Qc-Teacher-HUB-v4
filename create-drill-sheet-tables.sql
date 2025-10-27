-- SQL to create drill_sheet_generations and shared_drill_sheets tables
-- Run this in Supabase SQL Editor
-- This version is safe to run multiple times

-- Create drill_sheet_generations table
CREATE TABLE IF NOT EXISTS "public"."drill_sheet_generations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "notion" TEXT NOT NULL,
    "subNotions" TEXT NOT NULL,
    "exercise_count" INTEGER NOT NULL,
    "difficulty" TEXT DEFAULT 'uniform',
    "include_answer_key" BOOLEAN NOT NULL DEFAULT true,
    "theme" TEXT DEFAULT 'simple',
    "font_family" TEXT,
    "fontSize" INTEGER DEFAULT 12,
    "header_style" TEXT,
    "exercises" JSONB NOT NULL,
    "custom_title" TEXT,
    "custom_instructions" TEXT,
    "show_difficulty" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drill_sheet_generations_pkey" PRIMARY KEY ("id")
);

-- Create indexes for drill_sheet_generations (only if they don't exist)
CREATE INDEX IF NOT EXISTS "drill_sheet_generations_user_id_idx" ON "public"."drill_sheet_generations"("user_id");
CREATE INDEX IF NOT EXISTS "drill_sheet_generations_created_at_idx" ON "public"."drill_sheet_generations"("created_at");
CREATE INDEX IF NOT EXISTS "drill_sheet_generations_subject_idx" ON "public"."drill_sheet_generations"("subject");
CREATE INDEX IF NOT EXISTS "drill_sheet_generations_notion_idx" ON "public"."drill_sheet_generations"("notion");

-- Add foreign key constraint (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'drill_sheet_generations_user_id_fkey'
    ) THEN
        ALTER TABLE "public"."drill_sheet_generations"
        ADD CONSTRAINT "drill_sheet_generations_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- Create shared_drill_sheets table
CREATE TABLE IF NOT EXISTS "public"."shared_drill_sheets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "author_name" TEXT,
    "author_email" TEXT,
    "cycle" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "notion" TEXT NOT NULL,
    "subNotions" TEXT NOT NULL,
    "exercise_count" INTEGER NOT NULL,
    "difficulty" TEXT DEFAULT 'uniform',
    "include_answer_key" BOOLEAN NOT NULL DEFAULT true,
    "theme" TEXT DEFAULT 'simple',
    "font_family" TEXT,
    "fontSize" INTEGER DEFAULT 12,
    "header_style" TEXT,
    "exercises" JSONB NOT NULL,
    "custom_title" TEXT,
    "custom_instructions" TEXT,
    "show_difficulty" BOOLEAN DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "copies" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shared_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shared_drill_sheets_pkey" PRIMARY KEY ("id")
);

-- Create indexes for shared_drill_sheets (only if they don't exist)
CREATE INDEX IF NOT EXISTS "shared_drill_sheets_user_id_idx" ON "public"."shared_drill_sheets"("user_id");
CREATE INDEX IF NOT EXISTS "shared_drill_sheets_shared_at_idx" ON "public"."shared_drill_sheets"("shared_at");
CREATE INDEX IF NOT EXISTS "shared_drill_sheets_subject_idx" ON "public"."shared_drill_sheets"("subject");
CREATE INDEX IF NOT EXISTS "shared_drill_sheets_grade_idx" ON "public"."shared_drill_sheets"("grade");
CREATE INDEX IF NOT EXISTS "shared_drill_sheets_views_idx" ON "public"."shared_drill_sheets"("views");

-- Add foreign key constraint (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'shared_drill_sheets_user_id_fkey'
    ) THEN
        ALTER TABLE "public"."shared_drill_sheets"
        ADD CONSTRAINT "shared_drill_sheets_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
