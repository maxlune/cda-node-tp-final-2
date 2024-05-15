import { eq } from "drizzle-orm";
import { db } from "../data";
import { comments, movies, users } from "../data/schema";

export class MoviesRepository {
  /**
   * Récupère la liste de tous les films du fichier movies.json
  //  * TODO
  //  * @returns {Movie[]} - Un tableau de tous les films
   */
  getAllMovies() {
    try {
      return db
        .select({
          id: movies.id,
          title: movies.title,
          year: movies.year,
          author: {
            id: users.id,
            username: users.username,
          },
        })
        .from(movies)
        .leftJoin(comments, eq(movies.id, comments.movieId))
        .leftJoin(users, eq(movies.author, users.id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer les films");
    }
  }
}
