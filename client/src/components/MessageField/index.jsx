import { io } from "socket.io-client";
import { useEffect, useState } from "react";

import {BiSend} from "react-icons/bi"

import styles from "./styles.module.css";
import Message from "./Message";
import { useNavigate } from "react-router-dom";


const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

export default function MessageField() {

  const [response, setResponse] = useState([]);

  const [user, setUser] = useState("User");
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  

  function logout(){
    localStorage.removeItem('auth_token');
    navigate('/login',{replace:true})
  }


  useEffect(() => {

    socket.on('sendmessage', message => {
      console.log(message);
      setResponse(current => [...current, <Message user={message.user} message={message.message}/>])
    });

  }, [socket]);




  function sendMessage() {
    socket.emit('SendMessage', { user: user, message: message })
  }

  return (
    <div className={styles.messageField}>
      <div className={styles.messageField__top}>
        <h2>Messages</h2>
        <button onClick={()=>{logout()}}>Logout</button>
      </div>
      <div className={styles.messageField__messagesContainer}>

        {response}

        </div>
      <div className={styles.messageField__messageInput}>
        <input type="text" placeholder="message" onChange={(event) => { setMessage(event.target.value) }} />
        <button onClick={() => { sendMessage() }}><BiSend/></button>
      </div>
    </div>
  )
}