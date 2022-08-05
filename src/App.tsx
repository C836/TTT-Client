import { useState } from "react";
import io from "socket.io-client";

import { Global } from "./assets/global";

import Grid from "./components/Grid/Grid";
import { Menu } from "./views/Menu/Menu"

import socket_handlers from "./services/handlers/socket_handlers";
import Extras from "./components/Extras/Extras";
import { GameConfig, ServerConfig } from "./types";

export const socket = io("http://localhost:3010");

function App() {
  const [game, setGame] = useState<GameConfig>({
    ready_to_start: false,
    username: "",
    turn: true,
    signal: 0,
    winners: [""],
  });

  const [server, setServer] = useState<ServerConfig>({
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
