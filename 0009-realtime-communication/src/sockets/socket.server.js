import { Server } from "socket.io"

export default function initializeSocket(httpServer) {
    const io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id)

        socket.on("elon", (msg) => {  // is an event
            console.log(msg)
            socket.broadcast.emit("musk","hello from server via socket")
        })

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id)
        })

    })
}

// io= whole server

// socket = single user

// emit =to fire an event

// on = event listen karna 

//io.emit(): Sends an event to everyone connected to the server, including the sender.

// socket.emit(): Sends an event to only that one specific client (if called on a client socket, it sends to the server; if called on a server socket, it sends to that single connected client).

// socket.broadcast.emit(): Sends an event to everyone else connected to the server except that sender.