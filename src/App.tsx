import { useRef } from "react";

import { Global } from "./global";
import { Container } from "./components/Grid/Container";
import { Position } from "./components/Grid/Position";

import { sendMessage } from "./actions/index";

function App() {
  const Positions = [...Array(9).keys()];
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    sendMessage(inputRef.current?.value);
  };

  return (
    <div className="App">
      <Global />
      <Container>
        {Positions.map((item) => (
          <Position>{item}</Position>
        ))}
      </Container>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default App;
