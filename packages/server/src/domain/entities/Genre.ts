import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { genres } from "../../infrastructure/data/schema/genres";

export type Genre = InferSelectModel<typeof genres>;
export type NewGenre = InferInsertModel<typeof genres>;

export type GenreColumns = { [K in keyof Genre]?: boolean };
