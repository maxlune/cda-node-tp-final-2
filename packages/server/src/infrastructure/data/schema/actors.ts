import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { movies } from "./movies";

export const actors = pgTable("actors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  movieId: uuid("movieId")
    .references(() => movies.id, { onDelete: "cascade" })
    .notNull(),
});
