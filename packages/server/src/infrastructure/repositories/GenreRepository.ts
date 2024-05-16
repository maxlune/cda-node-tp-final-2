import { eq } from "drizzle-orm";
import { NewGenre } from "../../domain/entities/Genre";
import { db } from "../data";
import { genres } from "../data/schema/genres";

export class GenreRepository {
  /**
   * Crée un nouveau genre dans la base de données.
   * @param genre - Les données du nouveau genre à créer.
   * @returns L'identifiant du genre créé.
   * @throws Error si la création du genre échoue.
   */
  public createGenre(genre: NewGenre) {
    try {
      return db.insert(genres).values(genre).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le genre");
    }
  }

  /**
   * Récupère un genre par son identifiant depuis la base de données.
   * @param id - L'identifiant du genre à récupérer.
   * @returns Les informations du genre correspondant à l'identifiant spécifié.
   * @throws Error si la récupération du genre échoue.
   */
  public getGenreById(id: string) {
    try {
      return db
        .select({
          id: genres.id,
          title: genres.title,
        })
        .from(genres)
        .where(eq(genres.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le genre");
    }
  }

  /**
   * Supprime un genre par son identifiant depuis la base de données.
   * @param id - L'identifiant du genre à supprimer.
   * @returns True si la suppression du genre réussit, sinon false.
   * @throws Error si la suppression du genre échoue.
   */
  public deleteGenreById(id: string) {
    try {
      return db.delete(genres).where(eq(genres.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le genre");
    }
  }

  /**
   * Met à jour les informations d'un genre par son identifiant dans la base de données.
   * @param id - L'identifiant du genre à mettre à jour.
   * @param title - Le nouveau titre du genre.
   * @returns Les informations du genre mises à jour.
   * @throws Error si la mise à jour du genre échoue.
   */
  public updateGenreById(id: string, title: string) {
    try {
      return db
        .update(genres)
        .set({
          title,
        })
        .where(eq(genres.id, id))
        .returning();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de modifier le genre");
    }
  }
}
