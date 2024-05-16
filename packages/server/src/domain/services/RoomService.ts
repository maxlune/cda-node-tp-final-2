import { RoomRepository } from "../../infrastructure/repositories/RoomRepository";

export class RoomService {
  private roomRepository: RoomRepository;

  constructor() {
    this.roomRepository = new RoomRepository();
  }

  /**
   * Crée une nouvelle salle de discussion.
   * @returns L'identifiant de la nouvelle salle de discussion créée.
   * @throws Error si la création de la salle échoue.
   */
  public createRoom() {
    try {
      return this.roomRepository.createRoom();
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de créer la room");
    }
  }

  /**
   * Récupère tous les messages d'une salle de discussion.
   * @param roomId - L'identifiant de la salle de discussion.
   * @returns Une liste des messages de la salle de discussion spécifiée.
   */
  public getAllMessagesRoom(roomId: string) {
    if (!roomId || roomId.trim().length < 5) return;
    return this.roomRepository.getMessagesRoom(roomId);
  }
}
