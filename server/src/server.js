import express from "express";
import { routes } from "./routes.js"
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { Server } from "socket.io"
import http from "http"

import { Messages } from "./controllers/MessagesController.js";

const port = process.env.PORT
const app = express();
const server = http.createServer(app)
const io = new Server(server,{cors: {origin: "*"}});



app.use(cors({origin: '*',}));
app.use(express.json());
app.use(routes);


io.on("connection", (socket) => {
    console.log(`socket conectado: ${socket.id}`);

    async function findMessages(data){
        const response = await Messages.socket.getChat(data);
        const allMessages = [];
        console.log(response.data);
        response.data.forEach((item)=>{
            // socket.broadcast.emit('sendmessage',{ id:item.id, sender:item.sender, receiver:item.receiver, message:item.message})
            allMessages.push({ sender:item.sender, receiver:item.receiver, message:item.message});
        })    
        socket.emit('sendmessage',{messages:allMessages});       
    }

    async function saveNewMessage(data){
        await Messages.socket.save(data);
        findMessages(data);
    }

    socket.on('SendMessage',data=>{
        saveNewMessage(data);
       
       
    })

    socket.on('requestChat',data =>{

        findMessages(data);
    })
   
});

server.listen( port, () => { 
    console.log("HTTP Server runing in port: "+port) 
});




