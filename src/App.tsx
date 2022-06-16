import { useEffect, useState } from "react";
import io from "socket.io-client";

import { Global } from "./global";

import Grid from "./components/Grid/Grid";
import Menu from "./components/Join_Menu/Menu";

import { Room_Socket } from "./services/actions/rooms";
import { Game_Socket } from "./services/actions/game";

export const socket = io("http://localhost:3010");

export interface Game_Config {
  username: string;
  turn: boolean;
  signal: number;
  winners: string[];
}

export interface Server_Config {
  room: string
  key: string
  status: string
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

  const Room = new Room_Socket({ socket, username, room });
  const Game = new Game_Socket({ socket, username, room });

  useEffect(() => {
    socket.on("room_status", (response) => {
      if (response.status === "created") {
        setServer((state) => {
          return {
            ...state,
            room: response.key,
            key: response.key,
            status: "Waiting for player...",
          };
        });
      }

      if (response.status === "joined") {
        setGame((state) => {
          return {
            ...state,
            signal: 1,
          };
        });

        setServer((state) => {
          return {
            ...state,
            room: response.key,
            status: "Conected",
          };
        });
      }

      if (response.status === "joined_peer") {
        setServer((state) => {
          return {
            ...state,
            status: "Peer conected",
          };
        });
      }

      if (response.status === "starting") {
        setServer((state) => {
          return {
            ...state,
            status: "ready",
          };
        });
      }
    });

    socket.on("start_player", (data) => {
      setBoard(data.board);

      if (data.selected === socket.id) {
        setGame((state) => {
          return { ...state, turn: true };
        });
      }
    });

    socket.on("receive_position", (id, board) => {
      console.log(id, socket);

      if (id !== socket.id) {
        setGame((state) => {
          return { ...state, turn: true };
        });
      }

      setBoard(board);
    });

    socket.on("reset", (winners, board) => {
      if (winners[winners.length - 1] === socket.id) {
        setGame((state) => {
          return { ...state, turn: true };
        });
      }

      setBoard(board);
    });

    socket.on("win", (data) => {
      let winners = game.winners;
      winners.push(data.winner);

      setGame((state) => {
        return { ...state, turn: false, winners: winners };
      });
    });

    return () => {
      socket.off("win");
    };
  }, [socket]);

  return (
    <div className="App">
      <Global />

      <Menu 
      Game={{ game, setGame }} 
      Server={{ server, setServer }} />

      <Grid
      Game={{ game, setGame }} 
      Server={{ server, setServer }} 
      board={ board }
      />

      {/* <Grid disabled={turn ? false : true}>
        {board.map((item, index) => (
          <Position
            key={index}
            value={index}
            onClick={(event) => {
              sendPosition(Number((event.target as HTMLButtonElement).value));
            }}
          >
            {item}
          </Position>
        ))}
      </Grid> */}

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
