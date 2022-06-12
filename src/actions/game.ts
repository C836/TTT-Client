interface Data {
  socket: any;
  username: string;
  room: string;
  position: number
}

export class Games implements Data {
  socket: any;
  username: string;
  room: string;
  position: number;

  constructor(data: Data) {
    (this.socket = data.socket),
    (this.username = data.username),
    (this.room = data.room);
    (this.position = data.position)
  }

  new_move() {
    this.socket.emit("send_position", { room: this.room, user: null, position: this.position });
  }
}
