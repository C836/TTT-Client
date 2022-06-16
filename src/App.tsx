import { useEffect, useState } from "react";
import io from "socket.io-client";

import { Global } from "./global";

import Grid from "./components/Grid/Grid";
import Menu from "./components/Join_Menu/Menu";

import { Room_Socket } from "./services/actions/rooms";
import { Game_Socket } from "./services/actions/game";
import socket_handlers from "./services/handlers/socket_handlers";

export const socket = io("http://localhost:3010");

export interface Game_Config {
  username: string;
  turn: boolean;
  signal: number;
  winners: string[];
}

export interface Server_Config {
  room: string;
  key: string;
  status: string;
}

export interface Socket_Config {
  socket: any;
  username: string;
  room: string;
}

function App() {
  const [game, setGame] = useState<Game_Config>({
    username: "",
    turn: false,
    signal: 0,
    winners: [""],
  });
  const { username, turn, signal } = game;

  const [server, setServer] = useState<Server_Config>({
    room: "",
    key: "",
    status: "",
  });
  const { room, key, status } = server;

  const [board, setBoard] = useState([""]);

  socket_handlers({
    socket,
    game,
    setBoard,
    setGame,
    setServer,
  });

  return (
    <div className="App">
      <Global />

      <Menu 
        Game={{ game, setGame }} 
        Server={{ server, setServer }} />

      <Grid
        Game={{ game, setGame }}
        Server={{ server, setServer }}
        board={board}
      />

      <button
        onClick={() =>
          new Game_Socket({ socket, username, room }).reset(game.winners)
        }
      >
        Novo jogo
      </button>
    </div>
  );
}

export default App;