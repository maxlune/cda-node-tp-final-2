import { Socket } from "socket.io";
import { MessageService } from "../../../../domain/services/MessageService";

const messageService = new MessageService();

/**
 * Envoie un message à une salle de discussion spécifique.
 * @param socket - Le socket sur lequel envoyer le message.
 * @param data - Les données du message à envoyer.
 * @param userId - L'identifiant de l'auteur du message.
 */
export const sendMessage = async (
  socket: Socket,
  data: { authorId: string; roomId: string; content: string },
  userId: string
) => {
  try {
    const message = await messageService.sendMessage({
      ...data,
      author: userId,
    });
    if (!message) throw new Error("Impossible de créer le message");
    console.log("message sent");

    socket.to(data.roomId).emit("message", message);
  } catch (error) {
    console.error(error);
    socket.emit("error", "Impossible de créer le message");
  }
};

/**
 * Supprime un message d'une salle de discussion.
 * @param socket - Le socket sur lequel envoyer la notification de suppression du message.
 * @param data - Les données du message à supprimer.
 * @param userId - L'identifiant de l'utilisateur demandant la suppression du message.
 */
export const deleteMessage = async (
  socket: Socket,
  data: { id: string; roomId: string },
  userId: string
) => {
  try {
    await messageService.deleteMessage({ ...data, userId });
    socket.to(data.roomId).emit("deletedMessage", data.id);
  } catch (error) {
    console.error(error);
    socket.emit("error", "Impossible de supprimer le message");
  }
};
