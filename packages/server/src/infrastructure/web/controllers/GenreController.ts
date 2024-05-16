import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { CustomRequest } from "../../../types/express";
import { GenreService } from "../../../domain/services/GenreService";

const genreService = new GenreService();

/**
 * Crée un nouveau genre de film.
 */
export const createGenre = async (req: CustomRequest, res: Response) => {
  const { movieId } = req.params;
  const { title } = req.body;

  await genreService.createGenre({ title, movieId });
  response(res, { statusCode: 201, message: "Genre created" });
};

/**
 * Récupère un genre par son identifiant.
 */
export const getGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const genres = await genreService.getGenreById(id);
  console.table(genres);
  response(res, { statusCode: 200, data: genres, message: "OK" });
};

/**
 * Supprime un genre par son identifiant.
 */
export const deleteGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await genreService.deleteGenreById(id);
  response(res, { statusCode: 200, message: "Genre deleted" });
};

/**
 * Met à jour un genre par son identifiant.
 */
export const updateGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  await genreService.updateGenreById(id, title);
  response(res, { statusCode: 200, message: "Genre updated" });
};
