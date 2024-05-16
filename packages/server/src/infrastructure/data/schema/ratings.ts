import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { movies } from "./movies";
import { users } from "./users";

export const ratings = pgTable("ratings", {
  id: uuid("id").defaultRandom().primaryKey(),
  rating: integer("rating").notNull(),
  movieId: uuid("movieId")
    .references(() => movies.id, { onDelete: "cascade" })
    .notNull(),
  author: uuid("author")
    .references(() => users.id)
    .notNull(),
});
