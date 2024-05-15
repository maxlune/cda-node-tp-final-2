ALTER TABLE "movies" DROP CONSTRAINT "movies_author_users_id_fk";
--> statement-breakpoint
ALTER TABLE "movies" DROP COLUMN IF EXISTS "author";