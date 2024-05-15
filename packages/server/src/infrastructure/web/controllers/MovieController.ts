import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { MovieService } from "../../../domain/services/MovieService";

const movieService = new MovieService();

export const getAllMovies = async (req: Request, res: Response) => {
  const movies = await movieService.getAllMovies();
  console.table(movies);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: movies,
  });
};
