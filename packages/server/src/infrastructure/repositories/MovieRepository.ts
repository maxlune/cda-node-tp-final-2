import { and, eq } from "drizzle-orm";
import { db } from "../data";
import { comments, movies, users } from "../data/schema";
import { NewMovie } from "../../domain/entities/Movie";

export class MoviesRepository {
  /**
   * Récupère la liste de tous les films du fichier movies.json
  //  * TODO
  //  * @returns {Movie[]} - Un tableau de tous les films
   */
  public getAllMovies() {
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

  public getMovieById(id: string): Promise<any> {
    try {
      return db
        .select({
          id: movies.id,
          title: movies.title,
          year: movies.year,
          comments: {
            id: comments.id,
            content: comments.content,
            date: comments.date,
          },
        })
        .from(movies)
        .leftJoin(comments, eq(movies.id, comments.movieId))
        .where(eq(movies.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le film");
    }
  }

  public saveMovies(movie: NewMovie) {
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

  public deleteMovieById(id: string) {
    try {
      return db.delete(movies).where(eq(movies.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le film");
    }
  }

  public updateMovieById(id: string, title: string, year: number) {
    try {
      return db
        .update(movies)
        .set({
          title,
          year,
        })
        .where(eq(movies.id, id))
        .returning();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le film");
    }
  }
}
