import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { ratings } from "../../infrastructure/data/schema/ratings";

export type Rating = InferSelectModel<typeof ratings>;
export type NewRating = InferInsertModel<typeof ratings>;

export type RatingColumns = { [K in keyof Rating]?: boolean };
