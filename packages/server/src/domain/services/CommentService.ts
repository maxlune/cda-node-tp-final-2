import { CommentRepository } from "../../infrastructure/repositories/CommentRepository";
import { NewComment } from "../entities/Comment";

export class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }
  /**
   * Récupère un commentaire par son identifiant.
   * @param id - L'identifiant du commentaire à récupérer.
   * @returns Le commentaire correspondant à l'identifiant spécifié, ou undefined si non trouvé.
   */
  public getCommentById(id: string) {
    if (!id || id.trim().length < 5) return;
    return this.commentRepository.getCommentById(id);
  }

  /**
   * Crée un nouveau commentaire.
   * @param comment - Les données du nouveau commentaire à créer.
   * @returns Le commentaire créé.
   */
  public createComment(comment: NewComment) {
    if (!comment || comment.content.trim().length < 1) return;
    return this.commentRepository.createComment(comment);
  }

  /**
   * Supprime un commentaire par son identifiant.
   * @param id - L'identifiant du commentaire à supprimer.
   * @returns True si le commentaire a été supprimé avec succès, sinon false.
   */
  public deleteCommentById(id: string) {
    if (!id) return;
    return this.commentRepository.deleteCommentById(id);
  }

  /**
   * Met à jour le contenu d'un commentaire par son identifiant.
   * @param id - L'identifiant du commentaire à mettre à jour.
   * @param content - Le nouveau contenu du commentaire.
   * @returns True si la mise à jour a réussi, sinon false.
   */
  public updateCommentById(id: string, content: string) {
    if (!id) return;
    return this.commentRepository.updateCommentById(id, content);
  }
}
