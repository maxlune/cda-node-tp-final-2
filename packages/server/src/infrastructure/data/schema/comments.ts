import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { movies } from "./movies";
import { users } from "./users";

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  movieId: uuid("movieId")
    .references(() => movies.id)
    .notNull(),
  author: uuid("author")
    .references(() => users.id)
    .notNull(),
});
