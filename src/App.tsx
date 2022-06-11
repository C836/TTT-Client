import { sendMessage } from "./actions/index"
import { useRef } from "react"

function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    sendMessage(inputRef.current?.value)
  }

  return (
    <div className="App">
      <input ref={inputRef} />
      <button onClick={ handleSubmit }>Enviar</button>
    </div>
  )
}

export default App
