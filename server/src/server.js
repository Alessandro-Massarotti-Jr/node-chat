import express from "express";
import { routes } from "./routes.js"
import cors from "cors";

import { Server } from "socket.io"
import http from "http"

import { Messages } from "./controllers/MessagesController.js";


const app = express();
app.use(cors({origin: `${process.env.CORS_DOMAINS}`,}));
app.use(express.json());
const server = http.createServer(app)
const io = new Server(server,{cors: {
    origin: `${process.env.CORS_DOMAINS}`,
    methods:["GET","POST"]
}});




app.use(routes);


io.on("connection", (socket) => {
    console.log(`socket conectado: ${socket.id}`);

    async function findMessages(data){
        const response = await Messages.socket.getChat(data);
        const allMessages = [];
        response.data.forEach((item)=>{
            // socket.broadcast.emit('sendmessage',{ id:item.id, sender:item.sender, receiver:item.receiver, message:item.message})
            allMessages.push({ sender:item.sender, receiver:item.receiver, message:item.message});
        })    
        socket.emit('sendmessage',{messages:allMessages});       
    }

    async function saveNewMessage(data){
        await Messages.socket.save(data);
        socket.broadcast.emit("hasNewMessages",data);
        socket.emit("hasNewMessages",data);
    }

    socket.on('SendMessage',data=>{
        saveNewMessage(data);
    })

    socket.on('requestChat',data =>{

        findMessages(data);
    })
   
});

server.listen( process.env.PORT, () => { 
    console.log("HTTP Server runing in port: "+process.env.PORT) 
});




