import { ThemeConsumer } from "styled-components";

interface Data {
  socket: any;
  username: string;
  room: string;
  turn?: boolean | undefined;
  position?: number | undefined;
  signal?: number | undefined;
}

export class Games implements Data {
  socket: any;
  username: string;
  room: string;
  turn: boolean | undefined;
  position: number | undefined;
  signal: number | undefined;

  constructor(data: Data) {
    this.socket = data.socket,
    this.username = data.username,
    this.room = data.room;
    this.turn = data.turn;
    this.position = data.position;
    this.signal = data.signal;
  }

  choose_player() {
    this.socket.emit("choose_player", {
      room: this.room
    })
  }

  new_move(board: string[]) {
    this.socket.emit("send_position", {
      room: this.room,
      username: this.username,
      position: this.position,
      signal: this.signal,

      board: board
    });
  }

  reset(winners: string[]) {
    this.socket.emit("reset", {
      room: this.room,
      username: this.username,
      winners: winners
    })
  }
}
