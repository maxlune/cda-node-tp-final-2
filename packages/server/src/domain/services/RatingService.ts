import { RatingRepository } from "../../infrastructure/repositories/RatingRepository";
import { NewRating } from "../entities/Rating";

export class RatingService {
  private ratingRepository: RatingRepository;

  constructor() {
    this.ratingRepository = new RatingRepository();
  }

  public createRating(rating: NewRating) {
    if (!rating) return;
    return this.ratingRepository.createRating(rating);
  }

  public getRatingById(id: string) {
    if (!id || id.trim().length < 1) return;
    return this.ratingRepository.getRatingById(id);
  }

  public deleteRatingById(id: string) {
    if (!id) return;
    return this.ratingRepository.deleteRatingById(id);
  }

  public updateRatingById(id: string, rating: number) {
    if (!id) return;
    return this.ratingRepository.updateRatingById(id, rating);
  }
}
