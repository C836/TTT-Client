import { Socket_Config } from "../../App";

export class Game_Socket implements Socket_Config {
  socket: any;
  username: string;
  room: string;

  constructor(data: Socket_Config) {
    this.socket = data.socket,
    this.username = data.username,
    this.room = data.room;
  }

  choose_player() {
    this.socket.emit("choose_player", this.room);
  }

  new_move(
    position: number, 
    signal: number, 
    board: string[]){
    this.socket.emit("send_position", {
      room: this.room,
      username: this.username,
      position: position,
      signal: signal,
      board: board,
    });
  }

  reset(winners: string[]) {
    this.socket.emit("reset", {
      room: this.room,
      winners: winners,
    });
  }
}