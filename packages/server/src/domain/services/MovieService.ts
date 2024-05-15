import { MoviesRepository } from "../../infrastructure/repositories/MovieRepository";
import { NewMovie } from "../entities/Movie";

export class MovieService {
  private moviesRepository: MoviesRepository;

  constructor() {
    this.moviesRepository = new MoviesRepository();
  }
  getAllMovies() {
    return this.moviesRepository.getAllMovies();
  }

  async addMovie(movie: NewMovie) {
    if (movie?.title?.trim().length < 1 || movie?.title?.trim().length < 1)
      return;
    const newPost = await this.moviesRepository.saveMovies(movie);
    return newPost[0].id;
  }
}
