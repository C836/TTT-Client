interface Data {
  socket: any,
  username: string,
  room: string
}

export class Rooms implements Data{
  socket: any
  username: string
  room: string

  constructor(data:Data){
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