import { FavoriteRepository } from "../../infrastructure/repositories/FavoriteRepository";
import { NewFavorite } from "../entities/Favorite";

export class FavoriteService {
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }

  public createFavorite(favorite: NewFavorite) {
    if (!favorite) return;
    return this.favoriteRepository.createFavorite(favorite);
  }

  public getFavoriteById(id: string) {
    if (!id) return;
    return this.favoriteRepository.getFavoriteById(id);
  }

  public deleteFavoriteById(id: string) {
    if (!id) return;
    return this.favoriteRepository.deleteFavoriteById(id);
  }

  public updateFavoriteById(id: string, movieId: string) {
    if (!id) return;
    return this.favoriteRepository.updateFavoriteById(id, movieId);
  }
}
