ALTER TABLE "genres" DROP CONSTRAINT "genres_movieId_movies_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "genres" ADD CONSTRAINT "genres_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
