import { eq } from "drizzle-orm";
import { db } from "../data";
import { movies, users } from "../data/schema";
import { ratings } from "../data/schema/ratings";
import { NewRating } from "../../domain/entities/Rating";

export class RatingRepository {
  /**
   * Récupère une note par son identifiant depuis la base de données.
   * @param id - L'identifiant de la note à récupérer.
   * @returns Les informations de la note correspondant à l'identifiant spécifié, y compris les détails du film noté et de l'auteur de la note.
   * @throws Error si la récupération de la note échoue.
   */
  public getRatingById(id: string) {
    try {
      return db
        .select({
          id: ratings.id,
          rating: ratings.rating,
          movieId: {
            id: movies.id,
            title: movies.title,
            year: movies.year,
          },
          author: {
            id: users.id,
            username: users.username,
          },
        })
        .from(ratings)
        .leftJoin(users, eq(users.id, ratings.author))
        .leftJoin(movies, eq(movies.id, ratings.movieId))
        .where(eq(ratings.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer la note");
    }
  }

  /**
   * Crée une nouvelle note dans la base de données.
   * @param rating - Les données de la nouvelle note à créer.
   * @returns L'identifiant de la note créée.
   * @throws Error si la création de la note échoue.
   */
  public createRating(rating: NewRating) {
    try {
      return db.insert(ratings).values(rating).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer la note");
    }
  }

  /**
   * Supprime une note par son identifiant depuis la base de données.
   * @param id - L'identifiant de la note à supprimer.
   * @returns True si la suppression de la note réussit, sinon false.
   * @throws Error si la suppression de la note échoue.
   */
  public deleteRatingById(id: string) {
    try {
      return db.delete(ratings).where(eq(ratings.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer la note");
    }
  }

  /**
   * Met à jour les informations d'une note par son identifiant dans la base de données.
   * @param id - L'identifiant de la note à mettre à jour.
   * @param rating - La nouvelle valeur de la note.
   * @returns Les informations de la note mises à jour.
   * @throws Error si la mise à jour de la note échoue.
   */
  public updateRatingById(id: string, rating: number) {
    try {
      return db
        .update(ratings)
        .set({
          rating,
        })
        .where(eq(ratings.id, id))
        .returning();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer la note");
    }
  }
}
