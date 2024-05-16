import { beforeAll, describe, it, expect } from "@jest/globals";
import { sql } from "drizzle-orm";
import { createdUser } from "../jest.setup";
import { db } from "../../infrastructure/data";
import { MovieService } from "../../domain/services/MovieService";
import { NewMovie } from "../../domain/entities/Movie";

function expectNullableAny(value: any) {
  if (value !== null) {
    expect(value).toEqual(expect.anything());
  } else {
    expect(value).toBeNull();
  }
}

describe("MovieService", () => {
  let movieService: MovieService;
  let createdMovieID: string | undefined;
  let newMovie: NewMovie = {
    title: "Interstellar",
    year: 2014,
  };

  beforeAll(async () => {
    movieService = new MovieService();
    newMovie.id = createdUser.id;
    await db.execute(sql`SET search_path TO test`);
  });

  it("should add a new movie", async () => {
    createdMovieID = await movieService.addMovie(newMovie);
    expect(createdMovieID).toBeTruthy();
  });

  it("should get all movies", async () => {
    const movies = await movieService.getAllMovies();
    movies.forEach((movie: any) => {
      expect(movie).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        year: expect.any(Number),
      });
      expectNullableAny(movie.title);
    });
  });
});
