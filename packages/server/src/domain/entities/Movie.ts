import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { movies } from "../../infrastructure/data/schema";

export type Movie = InferSelectModel<typeof movies>;
export type NewMovie = InferInsertModel<typeof movies>;

export type MovieColumns = { [K in keyof Movie]?: boolean };
