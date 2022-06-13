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
  const [user, setUser] = useState({ username: "" });
  const { username } = user;

  const [server, setServer] = useState({ room: "", key: "", status: "" });
  const { room, key, status } = server;

  const Room = new Rooms({ socket, username, room });

  const Positions = [...Array(9).keys()];

  function sendPosition(position: number) {
    new Games({ socket, username, room, position }).new_move();
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
    });

    socket.on("receive_position", (data) => {
      console.log(data);
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
            setUser({ ...user, username: event.target.value })
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
        <p>{status}</p>
      </Menu>

      <Grid>
        {Positions.map((item) => (
          <Position
            key={item}
            value={item}
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
