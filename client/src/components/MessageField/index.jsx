import { io } from "socket.io-client";
import { useEffect, useState } from "react";

import { BiSend } from "react-icons/bi"

import styles from "./styles.module.css";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../providers/User";
import { TbLogout } from "react-icons/tb";
import { useChat } from "../../providers/Chat";


const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

export default function MessageField() {

  const { user, setUser } = useUser();
  const { chat, setChat } = useChat();

  const [response, setResponse] = useState([]);

  const [message, setMessage] = useState();

  const navigate = useNavigate();


  function logout() {
    setUser({});
    navigate('/login', { replace: true })
  }


  useEffect(() => {

    socket.on('sendmessage', message => {
      console.log(message);
      setResponse(current => [...current, <Message receiver={message.receiver} sender={message.sender} message={message.message} />])
    });

  }, [socket]);




  function sendMessage(event) {
    event.preventDefault();
    if(message == null || message == undefined || message ==''){
      return
    }
    socket.emit('SendMessage', { sender:user.id, receiver:chat.userId, message: message })
    setMessage('');
  }

  return (
    <div className={styles.messageField}>
      <div className={styles.messageField__top}>
        <h2>{chat ? chat.userName : 'Messages'}</h2>
        <button className={styles.logoutButton} onClick={() => { logout() }}><TbLogout /></button>
      </div>
      <div className={styles.messageField__messagesContainer}>

        {response}

      </div>
      {chat &&
        <form onSubmit={(event) => { sendMessage(event) }} className={styles.messageField__messageInput}>
          <input type="text" placeholder="message" value={message} onChange={(event) => { setMessage(event.target.value) }} />
          <button type="submit"><BiSend /></button>
        </form>
      }

    </div>
  )
}