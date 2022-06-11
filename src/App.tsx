import { Global } from "./global";
import { Container } from "./components/Grid/Container";
import { Position } from "./components/Grid/Position";

import { newMove } from "./actions/index";

function App() {
  const Positions = [...Array(9).keys()];

  const handleSubmit = (e:any) => {
    newMove(e.target.value);
  };

  return (
    <div className="App">
      <Global />
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
