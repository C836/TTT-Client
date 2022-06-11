import io from "socket.io-client";
const socket = io("http://localhost:3010");

export function newMove(position: number) {
  socket.emit("newMove", { user: null, position: position });
}
