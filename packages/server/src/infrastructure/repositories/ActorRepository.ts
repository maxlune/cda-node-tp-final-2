import { eq } from "drizzle-orm";
import { NewActor } from "../../domain/entities/Actor";
import { db } from "../data";
import { movies } from "../data/schema";
import { actors } from "../data/schema/actors";

export class ActorRepository {
  /**
   * Crée un nouvel acteur dans la base de données.
   * @param actor - Les données du nouvel acteur à créer.
   * @returns L'identifiant de l'acteur créé.
   * @throws Error si la création de l'acteur échoue.
   */
  public createActor(actor: NewActor) {
    try {
      return db.insert(actors).values(actor).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer l'acteur");
    }
  }

  /**
   * Récupère un acteur par son identifiant depuis la base de données.
   * @param id - L'identifiant de l'acteur à récupérer.
   * @returns Les informations de l'acteur correspondant à l'identifiant spécifié.
   * @throws Error si la récupération de l'acteur échoue.
   */
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

  /**
   * Supprime un acteur par son identifiant depuis la base de données.
   * @param id - L'identifiant de l'acteur à supprimer.
   * @returns True si la suppression de l'acteur réussit, sinon false.
   * @throws Error si la suppression de l'acteur échoue.
   */
  public deleteActorById(id: string) {
    try {
      return db.delete(actors).where(eq(actors.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer l'acteur");
    }
  }

  /**
   * Met à jour les informations d'un acteur par son identifiant dans la base de données.
   * @param id - L'identifiant de l'acteur à mettre à jour.
   * @param name - Le nouveau nom de l'acteur.
   * @param movieId - Le nouvel identifiant du film associé à l'acteur.
   * @returns Les informations de l'acteur mises à jour.
   * @throws Error si la mise à jour de l'acteur échoue.
   */
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
