import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { favorites } from "../../infrastructure/data/schema/favorites";

export type Favorite = InferSelectModel<typeof favorites>;
export type NewFavorite = InferInsertModel<typeof favorites>;

export type FavoriteColumns = { [K in keyof Favorite]?: boolean };
