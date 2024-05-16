import { eq } from "drizzle-orm";
import { NewFavorite } from "../../domain/entities/Favorite";
import { db } from "../data";
import { movies, users } from "../data/schema";
import { favorites } from "../data/schema/favorites";

export class FavoriteRepository {
  /**
   * Crée un nouveau favori dans la base de données.
   * @param favorite - Les données du nouveau favori à créer.
   * @returns L'identifiant du favori créé.
   * @throws Error si la création du favori échoue.
   */
  public createFavorite(favorite: NewFavorite) {
    try {
      return db.insert(favorites).values(favorite).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le favori");
    }
  }

  /**
   * Récupère un favori par son identifiant depuis la base de données.
   * @param id - L'identifiant du favori à récupérer.
   * @returns Les informations du favori correspondant à l'identifiant spécifié.
   * @throws Error si la récupération du favori échoue.
   */
  public getFavoriteById(id: string) {
    try {
      return db
        .select({
          id: favorites.id,
          author: {
            id: users.id,
            username: users.username,
          },
          movieId: {
            id: movies.id,
            title: movies.title,
            year: movies.year,
          },
        })
        .from(favorites)
        .leftJoin(movies, eq(favorites.movieId, movies.id))
        .leftJoin(users, eq(favorites.author, users.id))
        .where(eq(favorites.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le favori");
    }
  }

  /**
   * Supprime un favori par son identifiant depuis la base de données.
   * @param id - L'identifiant du favori à supprimer.
   * @returns True si la suppression du favori réussit, sinon false.
   * @throws Error si la suppression du favori échoue.
   */
  public deleteFavoriteById(id: string) {
    try {
      return db.delete(favorites).where(eq(favorites.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le favori");
    }
  }

  /**
   * Met à jour les informations d'un favori par son identifiant dans la base de données.
   * @param id - L'identifiant du favori à mettre à jour.
   * @param movieId - Le nouvel identifiant du film associé au favori.
   * @returns Les informations du favori mises à jour.
   * @throws Error si la mise à jour du favori échoue.
   */
  public updateFavoriteById(id: string, movieId: string) {
    try {
      return db
        .update(favorites)
        .set({
          movieId,
        })
        .where(eq(favorites.id, id))
        .returning();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de modifier le favori");
    }
  }
}
