import { Socket } from "socket.io-client";

import { Game_Config } from "../../App";
import { Server_Config } from "../../App";

import { Game_Socket } from "../../services/actions/game";

interface Props {
  socket: Socket;
  Game: {
    game: Game_Config;
    setGame: Function;
  };
  Server: {
    server: Server_Config;
  };
}

export default function Extras({ socket, Game, Server }: Props) {
  const { game } = Game;
  const { username } = game;

  const { server } = Server;
  const { room } = server;

  const reset = () => {
    new Game_Socket({ socket, username, room }).reset(game.winners);
  };

  return <button onClick={reset}>Novo jogo</button>;
}
