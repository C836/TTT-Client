import { useState } from "react";
import io from "socket.io-client";

import { Global } from "./assets/global";
import { theme } from "./assets/theme"

import Grid from "./components/Grid/Grid";
import Menu from "./components/Join_Menu/Menu";

import socket_handlers from "./services/handlers/socket_handlers";
import Extras from "./components/Extras/Extras";

export const socket = io("http://localhost:3010");

export interface Game_Config {
  ready_to_start: boolean;
  username: string;
  turn: boolean;
  signal: number;
  winners: string[];
}

export interface Server_Config {
  ingame: boolean,
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
    ready_to_start: false,
    username: "",
    turn: true,
    signal: 0,
    winners: [""],
  });

  const [server, setServer] = useState<Server_Config>({
    ingame: false,
    room: "",
    key: "",
    status: "",
  });

  const [board, setBoard] = useState<string[]>([]);

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
        Server={{ server, setServer }} 
      />

      <Grid
        board={board}
        Game={{ game, setGame }}
        Server={{ server }}
      />

      <Extras
        socket={socket}
        Game={{ game, setGame }}
        Server={{ server }}
      />
    </div>
  );
}

export default App;
