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
  const [game, setGame] = useState({ username: "", turn: false, signal: 0, winners: [""] });
  const { username, turn, signal } = game;

  const [server, setServer] = useState({ room: "", key: "", status: "" });
  const { room, key, status } = server;

  const [board, setBoard] = useState(Array(9).fill(""))

  const Room = new Rooms({ socket, username, room });

  function sendPosition(position: number) {
    if(turn === true){
      new Games({ socket, username, room, turn, position, signal }).new_move();
    }
  }

  function updateBoard(data:any){
    let state = board;
    state[data.position] = data.signal === 0 ? "O" : "X"

    setBoard(state)
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

      if (response.status === "joined") {
        setGame((state) => {
          return {
            ...state,
            signal: 1
          }
        })

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

    socket.on("register_position", (data) => {
      setGame((state) => {return { ...state, turn: false }})

      updateBoard(data)
    })

    socket.on("receive_position", (data) => {
      setGame((state) => {return { ...state, turn: true }})

      updateBoard(data)
    });

    socket.on("win", (data) => {
      let winners = game.winners
      winners.push(data.winner)
      
      setGame((state) => {return { ...state, winners: winners }})
    })

    return () => {
      socket.off("win");
    };
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

      {signal}

      {/* placeholder */}
      <>
        {game.winners.map(item => (
          <p>{item}</p>
        ))}
      </>

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
