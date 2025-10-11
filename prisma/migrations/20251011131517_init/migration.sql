-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "card_generations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "notion" TEXT NOT NULL,
    "subNotions" TEXT NOT NULL,
    "card_count" INTEGER NOT NULL,
    "theme" TEXT,
    "font_family" TEXT,
    "cards" JSONB NOT NULL,
    "textPositions" TEXT,
    "editedTexts" TEXT,
    "fontSize" INTEGER,
    "isBold" BOOLEAN,
    "isItalic" BOOLEAN,
    "isUnderline" BOOLEAN,
    "textAlign" TEXT,
    "textBackground" INTEGER,
    "selectedCharacter" TEXT,
    "selectedMood" TEXT,
    "showIllustrations" BOOLEAN,
    "illustrationScale" INTEGER,
    "illustrationColor" TEXT,
    "transparentBackground" BOOLEAN,
    "illustrationTransforms" TEXT,
    "themeType" TEXT,
    "selectedAdvancedTheme" INTEGER,
    "selectedDalleTheme" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "card_generations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "shared_generations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "author_name" TEXT,
    "author_email" TEXT,
    "cycle" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "notion" TEXT NOT NULL,
    "subNotions" TEXT NOT NULL,
    "card_count" INTEGER NOT NULL,
    "theme" TEXT,
    "font_family" TEXT,
    "cards" JSONB NOT NULL,
    "textPositions" TEXT,
    "editedTexts" TEXT,
    "fontSize" INTEGER,
    "isBold" BOOLEAN,
    "isItalic" BOOLEAN,
    "isUnderline" BOOLEAN,
    "textAlign" TEXT,
    "textBackground" INTEGER,
    "selectedCharacter" TEXT,
    "selectedMood" TEXT,
    "showIllustrations" BOOLEAN,
    "illustrationScale" INTEGER,
    "illustrationColor" TEXT,
    "transparentBackground" BOOLEAN,
    "illustrationTransforms" TEXT,
    "themeType" TEXT,
    "selectedAdvancedTheme" INTEGER,
    "selectedDalleTheme" INTEGER,
    "views" INTEGER NOT NULL DEFAULT 0,
    "copies" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shared_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "shared_generations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE INDEX "card_generations_user_id_idx" ON "card_generations"("user_id");

-- CreateIndex
CREATE INDEX "card_generations_created_at_idx" ON "card_generations"("created_at");

-- CreateIndex
CREATE INDEX "shared_generations_user_id_idx" ON "shared_generations"("user_id");

-- CreateIndex
CREATE INDEX "shared_generations_shared_at_idx" ON "shared_generations"("shared_at");

-- CreateIndex
CREATE INDEX "shared_generations_subject_idx" ON "shared_generations"("subject");

-- CreateIndex
CREATE INDEX "shared_generations_grade_idx" ON "shared_generations"("grade");
