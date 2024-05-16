import { Socket } from "socket.io";
import { RoomService } from "../../../../domain/services/RoomService";

const roomService = new RoomService();

/**
 * Rejoint une salle de discussion spécifique.
 * @param socket - Le socket qui rejoint la salle de discussion.
 * @param roomId - L'identifiant de la salle de discussion à rejoindre.
 */
export const joinRoom = async (socket: Socket, roomId: string) => {
  try {
    const messages = await roomService.getAllMessagesRoom(roomId);
    socket.join(roomId);
    socket.emit("messages", messages);
    console.log("room joined");
  } catch (error) {
    console.error(error);
    socket.emit("error", "Impossible de rejoindre la salle");
  }
};

/**
 * Crée une nouvelle salle de discussion.
 * @param socket - Le socket utilisé pour créer la salle de discussion.
 */
export const createRoom = async (socket: Socket) => {
  try {
    const room = await roomService.createRoom();
    socket.emit("room", room);
    console.log("created room");
  } catch (error) {
    console.error(error);
    socket.emit("error", "Impossible de créer la salle");
  }
};
