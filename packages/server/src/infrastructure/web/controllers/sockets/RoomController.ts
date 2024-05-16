import { Socket } from "socket.io";
import { RoomService } from "../../../../domain/services/RoomService";

const roomService = new RoomService();

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

export const createRoom = async (socket: Socket) => {
  try {
    const room = await roomService.createRoom();
    socket.emit("room", room);
    console.log("created room");
    // TODO
    // socket.join(room.id);
  } catch (error) {
    console.error(error);
    socket.emit("error", "Impossible de créer la salle");
  }
};
