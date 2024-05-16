import { GenreRepository } from "../../infrastructure/repositories/GenreRepository";
import { NewGenre } from "../entities/Genre";

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }

  public createGenre(genre: NewGenre) {
    if (!genre || genre.title.trim().length < 1) return;
    return this.genreRepository.createGenre(genre);
  }

  public getGenreById(id: string) {
    if (!id) return;
    return this.genreRepository.getGenreById(id);
  }

  public deleteGenreById(id: string) {
    if (!id) return;
    return this.genreRepository.deleteGenreById(id);
  }

  public updateGenreById(id: string, title: string) {
    if (!id) return;
    return this.genreRepository.updateGenreById(id, title);
  }
}
