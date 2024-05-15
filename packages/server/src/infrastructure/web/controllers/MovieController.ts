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
