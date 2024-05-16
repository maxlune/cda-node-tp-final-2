import { RatingRepository } from "../../infrastructure/repositories/RatingRepository";
import { NewRating } from "../entities/Rating";

export class RatingService {
  private ratingRepository: RatingRepository;

  constructor() {
    this.ratingRepository = new RatingRepository();
  }

  /**
   * Crée une nouvelle évaluation.
   * @param rating - Les données de la nouvelle évaluation à créer.
   * @returns L'évaluation créée.
   */
  public createRating(rating: NewRating) {
    if (!rating) return;
    return this.ratingRepository.createRating(rating);
  }

  /**
   * Récupère une évaluation par son identifiant.
   * @param id - L'identifiant de l'évaluation à récupérer.
   * @returns L'évaluation correspondant à l'identifiant spécifié, ou undefined si non trouvée.
   */
  public getRatingById(id: string) {
    if (!id || id.trim().length < 1) return;
    return this.ratingRepository.getRatingById(id);
  }

  /**
   * Supprime une évaluation par son identifiant.
   * @param id - L'identifiant de l'évaluation à supprimer.
   * @returns True si l'évaluation a été supprimée avec succès, sinon false.
   */
  public deleteRatingById(id: string) {
    if (!id) return;
    return this.ratingRepository.deleteRatingById(id);
  }

  /**
   * Met à jour l'évaluation d'un élément par son identifiant.
   * @param id - L'identifiant de l'évaluation à mettre à jour.
   * @param rating - La nouvelle évaluation à attribuer.
   * @returns True si la mise à jour a réussi, sinon false.
   */
  public updateRatingById(id: string, rating: number) {
    if (!id) return;
    return this.ratingRepository.updateRatingById(id, rating);
  }
}
