import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { actors } from "../../infrastructure/data/schema/actors";

export type Actor = InferSelectModel<typeof actors>;
export type NewActor = InferInsertModel<typeof actors>;

export type ActorColumns = { [K in keyof Actor]?: boolean };
