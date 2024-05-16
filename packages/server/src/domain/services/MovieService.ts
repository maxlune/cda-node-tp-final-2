import { MoviesRepository } from "../../infrastructure/repositories/MovieRepository";
import { Movie, NewMovie } from "../entities/Movie";

export class MovieService {
  private moviesRepository: MoviesRepository;

  constructor() {
    this.moviesRepository = new MoviesRepository();
  }

  /**
   * Récupère tous les films.
   * @returns Une liste de tous les films disponibles.
   */
  public getAllMovies() {
    return this.moviesRepository.getAllMovies();
  }

  /**
   * Ajoute un nouveau film.
   * @param movie - Les données du nouveau film à ajouter.
   * @returns L'identifiant du nouveau film ajouté.
   */
  public async addMovie(movie: NewMovie) {
    if (movie?.title?.trim().length < 1 || movie?.title?.trim().length < 1)
      return;
    const newMovie = await this.moviesRepository.saveMovies(movie);
    return newMovie[0].id;
  }

  /**
   * Récupère un film par son identifiant.
   * @param id - L'identifiant du film à récupérer.
   * @returns Le film correspondant à l'identifiant spécifié, ou undefined si non trouvé.
   */
  public getMovieById(id: string) {
    if (!id || id.trim().length < 1) return;
    return this.moviesRepository.getMovieById(id);
  }

  /**
   * Supprime un film par son identifiant.
   * @param id - L'identifiant du film à supprimer.
   * @returns True si le film a été supprimé avec succès, sinon false.
   */
  public deleteMovieById(id: string) {
    if (!id) return;
    return this.moviesRepository.deleteMovieById(id);
  }

  /**
   * Met à jour les informations d'un film par son identifiant.
   * @param id - L'identifiant du film à mettre à jour.
   * @param title - Le nouveau titre du film.
   * @param year - La nouvelle année de sortie du film.
   * @returns True si la mise à jour a réussi, sinon false.
   */
  public updateMovieById(id: string, title: string, year: number) {
    if (!id) return;
    return this.moviesRepository.updateMovieById(id, title, year);
  }
}
