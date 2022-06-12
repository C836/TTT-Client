import { useEffect, useState } from "react";
import io from "socket.io-client";

import { Global } from "./global";
import { Container } from "./components/Grid/Container";
import { Position } from "./components/Grid/Position";

import { newMove } from "./actions/index";

const socket = io("http://localhost:3010");

function App() {
  const [username, setUsername] = useState<string>();
  const [room, setRoom] = useState<string>();

  const Positions = [...Array(9).keys()];

  function joinRoom() {
    if (username && room) {
      socket.emit("join_room", room);
    }
  }

  function createRoom() {
    if (username) {
      socket.emit("create_room", room);
    }
  }

  function sendPosition(position: string) {
    const data = {
      room: room,
      user: username,
      position: position,
    };

    socket.emit("send_position", data);
  }

  useEffect(() => {
    socket.on("room_status", (response) => {
      console.log(response)
      setRoom(response.key);
    })

    socket.on("receive_position", (data) => {
      console.log(data)
    });
  }, [socket]);

  return (
    <div className="App">
      <Global />

      <input
        type={"text"}
        placeholder={"Apelido"}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
        type={"text"}
        placeholder={"Sala"}
        onChange={(event) => setRoom(event.target.value)}
      />

      <button onClick={createRoom}>Create</button>
      <button onClick={joinRoom}>Join</button>

      <Container>
        {Positions.map((item) => (
          <Position
            key={item}
            value={item}
            onClick={(event) => {
              sendPosition((event.target as HTMLButtonElement).value);
            }}
          >
            {item}
          </Position>
        ))}
      </Container>
    </div>
  );
}

export default App;
