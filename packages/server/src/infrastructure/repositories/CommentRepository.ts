import { NewComment } from "../../domain/entities/Comment";
import { db } from "../data";
import { comments, movies, users } from "../data/schema";
import { eq } from "drizzle-orm";

export class CommentRepository {
  /**
   * Récupère un commentaire par son identifiant depuis la base de données.
   * @param id - L'identifiant du commentaire à récupérer.
   * @returns Les informations du commentaire correspondant à l'identifiant spécifié.
   * @throws Error si la récupération du commentaire échoue.
   */
  public getCommentById(id: string) {
    try {
      return db
        .select({
          id: comments.id,
          content: comments.content,
          date: comments.date,
          author: {
            id: users.id,
            username: users.username,
          },
        })
        .from(comments)
        .leftJoin(users, eq(users.id, comments.author))
        .where(eq(comments.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le commentaire");
    }
  }

  /**
   * Crée un nouveau commentaire dans la base de données.
   * @param comment - Les données du nouveau commentaire à créer.
   * @returns L'identifiant du commentaire créé.
   * @throws Error si la création du commentaire échoue.
   */
  public createComment(comment: NewComment) {
    try {
      return db.insert(comments).values(comment).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le commentaire");
    }
  }

  /**
   * Supprime un commentaire par son identifiant depuis la base de données.
   * @param id - L'identifiant du commentaire à supprimer.
   * @returns True si la suppression du commentaire réussit, sinon false.
   * @throws Error si la suppression du commentaire échoue.
   */
  public deleteCommentById(id: string) {
    try {
      return db.delete(comments).where(eq(comments.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le commentaire");
    }
  }

  /**
   * Met à jour les informations d'un commentaire par son identifiant dans la base de données.
   * @param id - L'identifiant du commentaire à mettre à jour.
   * @param content - Le nouveau contenu du commentaire.
   * @returns Les informations du commentaire mises à jour.
   * @throws Error si la mise à jour du commentaire échoue.
   */
  public updateCommentById(id: string, content: string) {
    try {
      return db
        .update(comments)
        .set({
          content,
        })
        .where(eq(comments.id, id))
        .returning();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de modifier le commentaire");
    }
  }
}
