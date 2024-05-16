import { pgTable, uuid } from "drizzle-orm/pg-core";
import { movies } from "./movies";
import { users } from "./users";

export const favorites = pgTable("favorites", {
  id: uuid("id").defaultRandom().primaryKey(),
  movieId: uuid("movieId")
    .references(() => movies.id, { onDelete: "cascade" })
    .notNull(),
  author: uuid("author")
    .references(() => users.id)
    .notNull(),
});
