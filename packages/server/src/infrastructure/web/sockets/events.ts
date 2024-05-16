import { Server } from "socket.io";
import { authenticateSocket } from "../../../utils/socketCookies";
import { createRoom, joinRoom } from "../controllers/sockets/RoomController";
import {
  deleteMessage,
  sendMessage,
} from "../controllers/sockets/MessageController";

export function setupSocketEvent(io: Server) {
  io.on("connection", (socket) => {
    const userId = authenticateSocket(socket);
    if (!userId) return;

    console.info(`${socket.id} connected`);

    socket.on("createRoom", () => {
      console.log("test create room");

      createRoom(socket);
    });

    socket.on("joinRoom", (roomId: string) => {
      joinRoom(socket, roomId);
    });

    socket.on("sendMessage", (data) => {
      console.log("message sent");

      sendMessage(socket, data, userId);
    });

    socket.on("deleteMessage", (data: { id: string; roomId: string }) => {
      deleteMessage(socket, data, "54qsd56-dsf5d4s56-sd54f5ds");
    });

    socket.on("disconnect", () => {
      console.info(`${socket.id} disconnected`);
    });
  });
}
