CREATE TABLE IF NOT EXISTS "ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rating" integer NOT NULL,
	"movieId" uuid NOT NULL,
	"author" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
