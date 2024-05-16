import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { movies } from "./movies";

export const genres = pgTable("genres", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("content").notNull(),
  movieId: uuid("movieId")
    .references(() => movies.id)
    .notNull(),
});
