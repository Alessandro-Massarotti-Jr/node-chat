import { io } from "socket.io-client";
import {useEffect, useState} from "react";


const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

export default function MessageField(){

    const [response, setResponse] = useState([]);

    const [user,setUser] = useState();
    const [message,setMessage] = useState();

    useEffect(() => {       
        socket.on('sendmessage', message=>{
            console.log(message);
            setResponse(current => [...current, message])
         });

    }, [socket]);

   
    
   
    function sendMessage(){
      socket.emit('SendMessage',{user:user ,message: message})
    }

    return(<>
    <h1>Messages</h1>
    <div>{response}</div>
    <input type="text" placeholder="user" onChange={(event)=>{setUser(event.target.value)}}/>
    <input type="text" placeholder="message" onChange={(event)=>{setMessage(event.target.value)}}/>
    <button onClick={()=>{sendMessage()}}>Click em mim</button>
    </>)
}