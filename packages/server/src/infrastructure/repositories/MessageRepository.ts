import { and, eq } from "drizzle-orm";
import { db } from "../data";
import { messages } from "../data/schema";

export class MessageRepository {
  /**
   * Crée un nouveau message dans la base de données.
   * @param roomId - L'identifiant de la salle de discussion associée au message.
   * @param author - L'identifiant de l'auteur du message.
   * @param content - Le contenu du message.
   * @returns L'identifiant du message créé.
   * @throws Error si la création du message échoue.
   */
  public createMessage(roomId: string, author: string, content: string) {
    try {
      return db
        .insert(messages)
        .values({
          author,
          content,
          roomId,
        })
        .execute();
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de créer le message");
    }
  }

  /**
   * Supprime un message par son identifiant depuis la base de données.
   * @param id - L'identifiant du message à supprimer.
   * @param userId - L'identifiant de l'utilisateur effectuant la suppression.
   * @returns True si la suppression du message réussit, sinon false.
   * @throws Error si la suppression du message échoue.
   */
  public deleteMessage(id: string, userId: string) {
    try {
      return db
        .delete(messages)
        .where(and(eq(messages.id, id), eq(messages.author, userId)))
        .execute();
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de supprimer le message");
    }
  }
}
