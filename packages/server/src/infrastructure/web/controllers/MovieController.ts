import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { MovieService } from "../../../domain/services/MovieService";
import { CustomRequest } from "../../../types/express";

const movieService = new MovieService();

export const getAllMovies = async (req: Request, res: Response) => {
  const movies = await movieService.getAllMovies();
  console.table(movies);
  console.log(req.body);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: movies,
  });
};

export const createMovie = async (req: CustomRequest, res: Response) => {
  const { title, year } = req.body;

  const movie = { title, year };

  const createdMovie = await movieService.addMovie(movie);
  if (!createdMovie)
    return response(res, { statusCode: 400, message: "Movie not created" });
  response(res, { statusCode: 201, message: "Movie created" });
};

export const getMovieById = async (req: Request, res: Response) => {
  const movieId = req.params.id;
  const movie = await movieService.getMovieById(movieId);
  if (!movie) {
    response(res, { statusCode: 404, message: "Movie not found" });
  } else {
    console.table(movie[0]);
    response(res, { statusCode: 200, message: "OK", data: movie[0] });
  }
};

export const deleteMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await movieService.deleteMovieById(id);
  response(res, { statusCode: 200, message: "Movie deleted" });
};

export const updateMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, year } = req.body;
  await movieService.updateMovieById(id, title, year);
  response(res, { statusCode: 200, message: "Movie updated" });
};
