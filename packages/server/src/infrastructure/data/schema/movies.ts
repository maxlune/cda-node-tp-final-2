import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const movies = pgTable("movies", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  year: integer("year"),
});
