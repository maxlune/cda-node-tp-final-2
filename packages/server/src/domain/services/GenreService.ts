import { GenreRepository } from "../../infrastructure/repositories/GenreRepository";
import { NewGenre } from "../entities/Genre";

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }

  /**
   * Crée un nouveau genre.
   * @param genre - Les données du nouveau genre à créer.
   * @returns Le genre créé.
   */
  public createGenre(genre: NewGenre) {
    if (!genre || genre.title.trim().length < 1) return;
    return this.genreRepository.createGenre(genre);
  }

  /**
   * Récupère un genre par son identifiant.
   * @param id - L'identifiant du genre à récupérer.
   * @returns Le genre correspondant à l'identifiant spécifié, ou undefined si non trouvé.
   */
  public getGenreById(id: string) {
    if (!id) return;
    return this.genreRepository.getGenreById(id);
  }

  /**
   * Supprime un genre par son identifiant.
   * @param id - L'identifiant du genre à supprimer.
   * @returns True si le genre a été supprimé avec succès, sinon false.
   */
  public deleteGenreById(id: string) {
    if (!id) return;
    return this.genreRepository.deleteGenreById(id);
  }

  /**
   * Met à jour le titre d'un genre par son identifiant.
   * @param id - L'identifiant du genre à mettre à jour.
   * @param title - Le nouveau titre du genre.
   * @returns True si la mise à jour a réussi, sinon false.
   */
  public updateGenreById(id: string, title: string) {
    if (!id) return;
    return this.genreRepository.updateGenreById(id, title);
  }
}
