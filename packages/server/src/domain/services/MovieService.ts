import { MoviesRepository } from "../../infrastructure/repositories/MovieRepository";

export class MovieService {
  private moviesRepository: MoviesRepository;

  constructor() {
    this.moviesRepository = new MoviesRepository();
  }
  getAllMovies() {
    return this.moviesRepository.getAllMovies();
  }
}
