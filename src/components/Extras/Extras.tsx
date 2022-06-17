import { Socket } from "socket.io-client";

import { Game_Config } from "../../App";
import { Server_Config } from "../../App";

import { Game_Socket } from "../../services/actions/game";
import { Room_Socket } from "../../services/actions/rooms";

interface Props {
  socket: Socket;
  board: string[];
  Game: {
    game: Game_Config;
    setGame: Function;
  };
  Server: {
    server: Server_Config;
    setServer: Function;
  };
}

export default function Extras({ socket, board, Game, Server }: Props) {
  const { game, setGame } = Game;
  const { username, turn, signal, winners } = game;

  const { server, setServer } = Server;
  const { room, key, status } = server;

  const new_Room = new Room_Socket({ socket, username, room });
  const new_Game = new Game_Socket({ socket, username, room });

  const reset = () => {
    new Game_Socket({ socket, username, room }).reset(game.winners);
  };

  return <button onClick={reset}>Novo jogo</button>;
}
