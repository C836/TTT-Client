interface Data {
  socket: any;
  username: string;
  room: string;
  position?: number | undefined;
}

export class Games implements Data {
  socket: any;
  username: string;
  room: string;
  position: number | undefined;

  constructor(data: Data) {
    (this.socket = data.socket),
    (this.username = data.username),
    (this.room = data.room);
    this.position = data.position;
  }

  choose_player() {
    this.socket.emit("choose_player", {
      room: this.room
    })
  }

  new_move() {
    this.socket.emit("send_position", {
      room: this.room,
      user: this.username,
      position: this.position,
    });
  }
}
