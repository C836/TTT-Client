import { Socket_Config } from "../../App";

export class Room_Socket implements Socket_Config {
  socket: any;
  username: string;
  room: string;

  constructor(data: Socket_Config) {
    this.socket = data.socket,
    this.username = data.username,
    this.room = data.room;
  }

  join_room() {
    if (this.username && this.room) {
      this.socket.emit("join_room", this.room);
    }
  }

  create_room() {
    if (this.username) {
      this.socket.emit("create_room", this.room);
    }
  }
}
