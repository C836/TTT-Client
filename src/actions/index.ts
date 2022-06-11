import io from "socket.io-client"
const socket = io("http://localhost:3010")

export function sendMessage(input:string|undefined){
    socket.emit("send-message", {message: input})
}