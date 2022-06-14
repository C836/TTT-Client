import { useEffect, useState } from "react";
import io from "socket.io-client";

import { Global } from "./global";

import { Grid } from "./components/Grid/Grid";
import { Position } from "./components/Grid/Position";
import { Menu } from "./components/Join_Menu/Menu";

import { Rooms } from "./actions/rooms";
import { Games } from "./actions/game";

const socket = io("http://localhost:3010");

function App() {
  const [game, setGame] = useState({ username: "", turn: false });
  const { username, turn } = game;

  const [server, setServer] = useState({ room: "", key: "", status: "" });
  const { room, key, status } = server;

  const [board, setBoard] = useState(Array(9).fill(""))

  const Room = new Rooms({ socket, username, room });

  function sendPosition(position: number) {
    if(turn === true){
      setGame({ ...game, turn: false })
      new Games({ socket, username, room, turn, position }).new_move();
    }
  }

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
      if(data.selected === socket.id){
        setGame((state) => {return{...state, turn: true }})
      }
    })

    socket.on("receive_position", (data) => {
      setGame((state) => {return { ...state, turn: true }})
    });
  }, [socket]);

  return (
    <div className="App">
      <Global />

      <Menu>
        <input
          type={"text"}
          placeholder={"Apelido"}
          onChange={(event) =>
            setGame({ ...game, username: event.target.value })
          }
        />

        <input
          type={"text"}
          placeholder={"Sala"}
          onChange={(event) =>
            setServer({ ...server, room: event.target.value })
          }
        />

        <button onClick={() => Room.create_room()}>Create</button>
        <button onClick={() => Room.join_room()}>Join</button>

        <p>{key}</p>
        {status !== "ready" 
        ? <p>{status}</p> 
        : <button onClick={() => new Games({ socket, username, room }).choose_player()}>Start Game</button>}
      </Menu>

      <Grid
      disabled = {turn ? false : true}
      >
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
      </Grid>
    </div>
  );
}

export default App;
