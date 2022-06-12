interface Room {
  socket: any,
  username: string | undefined,
  room: string | undefined
}

export class Rooms implements Room{
  socket: any
  username: string | undefined
  room: string | undefined

  constructor(data:Room){
    this.socket = data.socket,
    this.username = data.username,
    this.room = data.room    
  }

  join_room(){
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