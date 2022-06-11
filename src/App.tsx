import { useRef } from "react"

import { Global } from "./global"

import { sendMessage } from "./actions/index"

function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    sendMessage(inputRef.current?.value)
  }

  return (
    <div className="App">
      <Global />

      <input ref={inputRef} />
      <button onClick={ handleSubmit }>Enviar</button>
    </div>
  )
}

export default App
