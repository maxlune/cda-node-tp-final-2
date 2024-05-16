import { eq } from "drizzle-orm";
import { NewActor } from "../../domain/entities/Actor";
import { db } from "../data";
import { movies } from "../data/schema";
import { actors } from "../data/schema/actors";

export class ActorRepository {
  public createActor(actor: NewActor) {
    try {
      return db.insert(actors).values(actor).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer l'acteur");
    }
  }

  public getActorById(id: string) {
    try {
      return db
        .select({
          id: actors.id,
          name: actors.name,
          movieId: {
            id: movies.id,
            title: movies.title,
          },
        })
        .from(actors)
        .leftJoin(movies, eq(movies.id, actors.movieId))
        .where(eq(actors.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer l'acteur");
    }
  }

  public deleteActorById(id: string) {
    try {
      return db.delete(actors).where(eq(actors.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer l'acteur");
    }
  }

  public updateActorById(id: string, name: string, movieId: string) {
    try {
      return db
        .update(actors)
        .set({
          name,
          movieId,
        })
        .where(eq(actors.id, id))
        .returning();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de modifier l'acteur");
    }
  }
}
