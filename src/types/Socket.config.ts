export interface SocketConfig {
  socket: any;
  username: string;
  room: string;
}

export interface ServerConfig {
  ingame: boolean;
  room: string;
  key: string;
  status: string;
}

export interface GameConfig {
  ready_to_start: boolean;
  username: string;
  turn: boolean;
  signal: number;
  winners: string[];
}
