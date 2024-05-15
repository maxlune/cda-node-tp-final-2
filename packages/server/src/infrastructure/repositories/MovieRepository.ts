import { eq } from "drizzle-orm";
import { db } from "../data";
import { comments, movies, users } from "../data/schema";
import { NewMovie } from "../../domain/entities/Movie";

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
        })
        .from(movies)
        .leftJoin(comments, eq(movies.id, comments.movieId))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer les films");
    }
  }

  saveMovies(movie: NewMovie) {
    try {
      return db
        .insert(movies)
        .values(movie)
        .returning({ id: movies.id })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de sauvegarder le film");
    }
  }
}
