import { FavoriteRepository } from "../../infrastructure/repositories/FavoriteRepository";
import { NewFavorite } from "../entities/Favorite";

export class FavoriteService {
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }

  /**
   * Crée un nouveau favori.
   * @param favorite - Les données du nouveau favori à créer.
   * @returns Le favori créé.
   */
  public createFavorite(favorite: NewFavorite) {
    if (!favorite) return;
    return this.favoriteRepository.createFavorite(favorite);
  }

  /**
   * Récupère un favori par son identifiant.
   * @param id - L'identifiant du favori à récupérer.
   * @returns Le favori correspondant à l'identifiant spécifié, ou undefined si non trouvé.
   */
  public getFavoriteById(id: string) {
    if (!id) return;
    return this.favoriteRepository.getFavoriteById(id);
  }

  /**
   * Supprime un favori par son identifiant.
   * @param id - L'identifiant du favori à supprimer.
   * @returns True si le favori a été supprimé avec succès, sinon false.
   */
  public deleteFavoriteById(id: string) {
    if (!id) return;
    return this.favoriteRepository.deleteFavoriteById(id);
  }

  /**
   * Met à jour le film associé à un favori par son identifiant.
   * @param id - L'identifiant du favori à mettre à jour.
   * @param movieId - Le nouvel identifiant du film associé au favori.
   * @returns True si la mise à jour a réussi, sinon false.
   */
  public updateFavoriteById(id: string, movieId: string) {
    if (!id) return;
    return this.favoriteRepository.updateFavoriteById(id, movieId);
  }
}
