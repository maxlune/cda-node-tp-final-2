import { Request, Response } from "express";
import { FavoriteService } from "../../../domain/services/FavoriteService";
import { CustomRequest } from "../../../types/express";
import { response } from "../../../utils/response";

const favoriteService = new FavoriteService();

/**
 * Crée un nouveau favori pour un film.
 */
export const createFavorite = async (req: CustomRequest, res: Response) => {
  const { movieId } = req.params;
  const { userId } = req.user;
  console.log(req.user);

  await favoriteService.createFavorite({ movieId, author: userId });
  response(res, { statusCode: 201, message: "Favorite created" });
};

/**
 * Récupère un favori par son identifiant.
 */
export const getFavoriteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const favorites = await favoriteService.getFavoriteById(id);
  console.table(favorites);
  response(res, { statusCode: 200, data: favorites, message: "OK" });
};

/**
 * Supprime un favori par son identifiant.
 */
export const deleteFavoriteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await favoriteService.deleteFavoriteById(id);
  response(res, { statusCode: 200, message: "Favorite deleted" });
};

/**
 * Met à jour un favori par son identifiant.
 */
export const updateFavoriteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { movieId } = req.body;
  await favoriteService.updateFavoriteById(id, movieId);
  response(res, { statusCode: 200, message: "Favorite updated" });
};
