import { eq } from "drizzle-orm";
import { db } from "../data";
import { messages, rooms, users } from "../data/schema";

export class RoomRepository {
  /**
   * Crée une nouvelle salle de discussion dans la base de données.
   * @returns L'identifiant de la nouvelle salle de discussion créée.
   * @throws Error si la création de la salle de discussion échoue.
   */
  public createRoom() {
    try {
      return db.insert(rooms).values({}).execute();
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de créer la room");
    }
  }

  /**
   * Récupère les messages d'une salle de discussion spécifiée par son identifiant.
   * @param roomId - L'identifiant de la salle de discussion pour laquelle récupérer les messages.
   * @returns Les messages de la salle de discussion spécifiée, avec les détails de l'auteur de chaque message.
   * @throws Error si la récupération des messages de la salle de discussion échoue.
   */
  public getMessagesRoom(roomId: string) {
    try {
      return db
        .select({
          id: messages.id,
          content: messages.content,
          author: {
            id: users.id,
            username: users.username,
          },
          date: messages.date,
        })
        .from(rooms)
        .leftJoin(messages, eq(rooms.id, messages.roomId))
        .leftJoin(users, eq(messages.author, users.id))
        .where(eq(rooms.id, roomId))
        .execute();
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de récupérer les messages de la room");
    }
  }
}
