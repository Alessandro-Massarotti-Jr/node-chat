import { io } from "socket.io-client";
import { useEffect, useState } from "react";

import {BiSend} from "react-icons/bi"

import styles from "./styles.module.css"


const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

export default function MessageField() {

  const [response, setResponse] = useState([]);

  const [user, setUser] = useState("User");
  const [message, setMessage] = useState();

  useEffect(() => {
    socket.on('sendmessage', message => {
      console.log(message);
      setResponse(current => [...current, message])
    });

  }, [socket]);




  function sendMessage() {
    socket.emit('SendMessage', { user: user, message: message })
  }

  return (
    <div className={styles.messageField}>
      <div className={styles.messageField__top}>
        <h2>Messages</h2>
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