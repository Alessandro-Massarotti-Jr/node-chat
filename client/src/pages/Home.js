import { io } from "socket.io-client";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";


export default function Home(){
  
    const [response, setResponse] = useState("");
  
    let socket

    useEffect(() => {

      const apiUrl = process.env.REACT_APP_API_URL;
       socket = io(apiUrl);
       socket.on('sendOld', message=>{console.log(message)});


    }, []);

    function sendMessage(){
      socket.emit('SendMessage',"ola mundo")
    }
  
   

    return (<>
    {/* <Navigate to="/login" replace={true} /> */}
     <h1>Home</h1>
     <button onClick={()=>{sendMessage()}}>Click em mim</button>
    </>

    );
}