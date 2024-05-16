import { MessageRepository } from "../../infrastructure/repositories/MessageRepository";

export class MessageService {
  private messageRepository: MessageRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
  }

  /**
   * Envoie un message dans une salle de discussion.
   * @param data - Les données du message à envoyer.
   * @param data.roomId - L'identifiant de la salle de discussion.
   * @param data.author - L'auteur du message.
   * @param data.content - Le contenu du message.
   * @returns Le message envoyé, ou undefined si les données sont invalides.
   */
  public sendMessage(data: {
    roomId: string;
    author: string;
    content: string;
  }) {
    if (
      !data.roomId ||
      data.roomId?.trim()?.length < 5 ||
      !data.author ||
      data.author?.trim()?.length < 5 ||
      !data.content ||
      data.content?.trim()?.length < 5
    ) {
      console.error(
        "Impossible de créer le message: les données sont invalides"
      );
      return;
    }

    return this.messageRepository.createMessage(
      data.roomId,
      data.author,
      data.content
    );
  }

  /**
   * Supprime un message.
   * @param data - Les données du message à supprimer.
   * @param data.id - L'identifiant du message à supprimer.
   * @param data.userId - L'identifiant de l'utilisateur effectuant la suppression.
   * @returns True si le message a été supprimé avec succès, sinon false.
   */
  public deleteMessage(data: { id: string; userId: string }) {
    if (
      !data.id ||
      data.id?.trim()?.length < 5 ||
      !data.userId ||
      data.userId?.trim()?.length < 5
    ) {
      console.error(
        "Impossible de supprimer le message: les données sont invalides"
      );
      return;
    }
    return this.messageRepository.deleteMessage(data.id, data.userId);
  }
}
