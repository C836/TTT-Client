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

  const handleSubmit = (e:any) => {
    newMove(e.target.value);
  };

  function joinRoom(){
    if(username && room){
      socket.emit("join_room", room)
    }
  }

  return (
    <div className="App">
      <Global />

      <input
        type={"text"}
        placeholder={"Apelido"}
        onChange={(event) => 
          setUsername(event.target.value)}
      />

      <input 
        type={"text"} 
        placeholder={"Sala"}
        onChange={(event) =>
          setRoom(event.target.value)} />

      <button onClick={joinRoom}>Join</button>

      <Container>
        {Positions.map((item) => (
          <Position
          key={item}
          value={item}
          onClick={handleSubmit}
          >{item}</Position>
        ))}
      </Container>
    </div>
  );
}

export default App;
