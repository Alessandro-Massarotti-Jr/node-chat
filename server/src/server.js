import express from "express";
import { routes } from "./routes.js"
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { Server } from "socket.io"
import http from "http"

const port = process.env.PORT
const app = express();
const server = http.createServer(app)
const io = new Server(server,{cors: {origin: "*"}});



app.use(cors({origin: '*',}));
app.use(express.json());
app.use(routes);


io.on("connection", (socket) => {
    console.log(`socket conectado: ${socket.id}`);
    console.log("ola");
    socket.on('SendMessage',message=>{
        console.log('menssagem recebida '+message)
        socket.emit('sendOld','ola do server')
    })
   
});

server.listen( port, () => { 
    console.log("HTTP Server runing in port: "+port) 
});




