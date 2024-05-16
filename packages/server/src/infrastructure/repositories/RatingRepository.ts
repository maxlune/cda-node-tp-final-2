import { eq } from "drizzle-orm";
import { db } from "../data";
import { movies, users } from "../data/schema";
import { ratings } from "../data/schema/ratings";
import { NewRating } from "../../domain/entities/Rating";

export class RatingRepository {
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

  public createRating(rating: NewRating) {
    try {
      return db.insert(ratings).values(rating).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer la note");
    }
  }

  public deleteRatingById(id: string) {
    try {
      return db.delete(ratings).where(eq(ratings.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer la note");
    }
  }

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
