import { useRef } from "react"

import { Global } from "./global"
import { Grid } from "./components/Grid/Grid"

import { sendMessage } from "./actions/index"

function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    sendMessage(inputRef.current?.value)
  }

  return (
    <div className="App">
      <Global />
      <Grid>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
      </Grid>
      <input ref={inputRef} />
      <button onClick={ handleSubmit }>Enviar</button>
    </div>
  )
}

export default App
