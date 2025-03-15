import { Server } from "socket.io";
import http from "http";

export default function initSocket(server: http.Server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", (msg) => {
      io.emit("receiveMessage", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}
