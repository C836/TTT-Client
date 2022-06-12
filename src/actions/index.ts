import io from "socket.io-client"
const socket = io("http://localhost:3010");

export function newMove(position: number) {
  socket.emit("new_move", { user: null, position: position });
}
