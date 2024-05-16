import { MoviesRepository } from "../../infrastructure/repositories/MovieRepository";
import { Movie, NewMovie } from "../entities/Movie";

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
    const newMovie = await this.moviesRepository.saveMovies(movie);
    return newMovie[0].id;
  }

  getMovieById(id: string) {
    if (!id || id.trim().length < 1) return;
    return this.moviesRepository.getMovieById(id);
  }

  deleteMovieById(id: string) {
    if (!id) return;
    return this.moviesRepository.deleteMovieById(id);
  }

  updateMovieById(id: string, title: string, year: number) {
    if (!id) return;
    return this.moviesRepository.updateMovieById(id, title, year);
  }
}
