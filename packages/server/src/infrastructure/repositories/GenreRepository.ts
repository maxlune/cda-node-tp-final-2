import { eq } from "drizzle-orm";
import { NewGenre } from "../../domain/entities/Genre";
import { db } from "../data";
import { genres } from "../data/schema/genres";

export class GenreRepository {
  public createGenre(genre: NewGenre) {
    try {
      return db.insert(genres).values(genre).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le genre");
    }
  }

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

  public deleteGenreById(id: string) {
    try {
      return db.delete(genres).where(eq(genres.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le genre");
    }
  }

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
