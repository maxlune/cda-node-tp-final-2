import { and, eq } from "drizzle-orm";
import { db } from "../data";
import {
  actors,
  comments,
  genres,
  movies,
  ratings,
  users,
} from "../data/schema";
import { NewMovie } from "../../domain/entities/Movie";

export class MoviesRepository {
  /**
   * Récupère tous les films avec leurs informations depuis la base de données.
   * @returns Une liste de tous les films avec leurs identifiants, titres et années.
   * @throws Error si la récupération des films échoue.
   */
  public getAllMovies() {
    try {
      return db
        .select({
          id: movies.id,
          title: movies.title,
          year: movies.year,
          rating: {
            id: ratings.id,
            rating: ratings.rating,
          },
          genre: {
            id: genres.id,
            genre: genres.title,
          },
          actors: {
            id: actors.id,
            actors: actors.name,
          },
        })
        .from(movies)
        .leftJoin(comments, eq(movies.id, comments.movieId))
        .leftJoin(ratings, eq(movies.id, ratings.movieId))
        .leftJoin(genres, eq(movies.id, genres.movieId))
        .leftJoin(actors, eq(movies.id, actors.movieId))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer les films");
    }
  }

  /**
   * Récupère un film par son identifiant depuis la base de données.
   * @param id - L'identifiant du film à récupérer.
   * @returns Les informations du film correspondant à l'identifiant spécifié, y compris les commentaires associés.
   * @throws Error si la récupération du film échoue.
   */
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
          rating: {
            id: ratings.id,
            rating: ratings.rating,
          },
          genre: {
            id: genres.id,
            genre: genres.title,
          },
          actors: {
            id: actors.id,
            actors: actors.name,
          },
        })
        .from(movies)
        .leftJoin(comments, eq(movies.id, comments.movieId))
        .leftJoin(ratings, eq(movies.id, ratings.movieId))
        .leftJoin(genres, eq(movies.id, genres.movieId))
        .leftJoin(actors, eq(movies.id, actors.movieId))
        .where(eq(movies.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le film");
    }
  }

  /**
   * Enregistre un nouveau film dans la base de données.
   * @param movie - Les données du nouveau film à enregistrer.
   * @returns L'identifiant du film enregistré.
   * @throws Error si l'enregistrement du film échoue.
   */
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

  /**
   * Supprime un film par son identifiant depuis la base de données.
   * @param id - L'identifiant du film à supprimer.
   * @returns True si la suppression du film réussit, sinon false.
   * @throws Error si la suppression du film échoue.
   */
  public deleteMovieById(id: string) {
    try {
      return db.delete(movies).where(eq(movies.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le film");
    }
  }

  /**
   * Met à jour les informations d'un film par son identifiant dans la base de données.
   * @param id - L'identifiant du film à mettre à jour.
   * @param title - Le nouveau titre du film.
   * @param year - La nouvelle année de sortie du film.
   * @returns Les informations du film mises à jour.
   * @throws Error si la mise à jour du film échoue.
   */
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
