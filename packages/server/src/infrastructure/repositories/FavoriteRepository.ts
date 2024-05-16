import { eq } from "drizzle-orm";
import { NewFavorite } from "../../domain/entities/Favorite";
import { db } from "../data";
import { movies, users } from "../data/schema";
import { favorites } from "../data/schema/favorites";

export class FavoriteRepository {
  public createFavorite(favorite: NewFavorite) {
    try {
      return db.insert(favorites).values(favorite).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le favori");
    }
  }

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

  public deleteFavoriteById(id: string) {
    try {
      return db.delete(favorites).where(eq(favorites.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le favori");
    }
  }

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
