import { useEffect, useState } from "react";
import io from "socket.io-client";

import { Global } from "./global";
import { Container } from "./components/Grid/Container";
import { Position } from "./components/Grid/Position";

import { Rooms } from "./actions/rooms";
import { Games } from "./actions/game";

const socket = io("http://localhost:3010");

function App() {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const Room = new Rooms({ socket, username, room });

  const Positions = [...Array(9).keys()];

  function sendPosition(position: number) {
    const Game = new Games({ socket, username, room, position});
    Game.new_move()
  }

  useEffect(() => {
    socket.on("room_status", (response) => {
      console.log(response);
      setRoom(response.key);
    });

    socket.on("receive_position", (data) => {
      console.log(data);
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

      <button onClick={() => Room.create_room()}>Create</button>
      <button onClick={() => Room.join_room()}>Join</button>

      <Container>
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
      </Container>
    </div>
  );
}

export default App;
