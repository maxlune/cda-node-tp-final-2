import { Request, Response } from "express";
import { RatingService } from "../../../domain/services/RatingService";
import { CustomRequest } from "../../../types/express";
import { response } from "../../../utils/response";

const ratingService = new RatingService();

/**
 * Crée une nouvelle note pour un film.
 */
export const createRating = async (req: CustomRequest, res: Response) => {
  const { movieId } = req.params;
  const { userId } = req.user;
  console.log(req.user);

  const { rating } = req.body;

  await ratingService.createRating({ rating, movieId, author: userId });
  response(res, { statusCode: 201, message: "Rating created" });
};

/**
 * Récupère la note par son identifiant.
 */
export const getRatingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ratings = await ratingService.getRatingById(id);
  console.table(ratings);
  response(res, { statusCode: 200, data: ratings, message: "OK" });
};

/**
 * Supprime une note par son identifiant.
 */
export const deleteRatingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await ratingService.deleteRatingById(id);
  response(res, { statusCode: 200, message: "Rating deleted" });
};

/**
 * Met à jour une évaluation par son identifiant.
 */
export const updateRatingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating } = req.body;
  await ratingService.updateRatingById(id, rating);
  response(res, { statusCode: 200, message: "Rating updated" });
};
