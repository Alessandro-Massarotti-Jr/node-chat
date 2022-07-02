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

  const [message, setMessage] = useState('');

  const navigate = useNavigate();


  function logout() {
    setUser({});
    setResponse([]);
    navigate('/login', { replace: true })
  }



  let flag = true;


  useEffect(() => { 

    if(chat.userId){
      socket.on('sendmessage', data => {
        const messages = data.messages;
        if(messages[0].sender == user.id && messages[0].receiver == chat.userId){
          setResponse([]);
          messages.forEach(message =>{
            setResponse(current => [...current, <Message key={message.id} receiver={message.receiver} sender={message.sender} message={message.message} />])
          }) 
        }else if(messages[0].receiver == user.id && messages[0].sender == chat.userId){
          setResponse([]);
          messages.forEach(message =>{
            setResponse(current => [...current, <Message key={message.id} receiver={message.receiver} sender={message.sender} message={message.message} />])
          }) 
        }
      });
     socket.on("hasNewMessages",data=>{

      if(data.sender == user.id && data.receiver == chat.userId){
        socket.emit('requestChat', { sender:user.id, receiver:chat.userId, message: message });
      }else if(data.receiver == user.id && data.sender == chat.userId){
        socket.emit('requestChat', { sender:user.id, receiver:chat.userId, message: message });
      }
     
     })
     if(flag){
      socket.emit('requestChat', { sender:user.id, receiver:chat.userId, message: message });
      flag=false
     }
    
    }
    
  }, [socket,chat]);





  function sendMessage(event) {
    event.preventDefault();

    if(message == null || message == undefined || message ==''){
      return
    }
    socket.emit('SendMessage', { sender:user.id, receiver:chat.userId, message: message });
    setMessage('');
    
  }


  

  return (
    <div className={styles.messageField}>
      <div className={styles.messageField__top}>
        <h2>{chat.userId ? chat.userName : 'Messages'}</h2>
        <button className={styles.logoutButton} onClick={() => { logout() }}><TbLogout /></button>
      </div>

      <div id="scrollingContainer" className={styles.messageField__messagesContainer}>

        {response}

      </div>

      {chat.userId &&
        <form onSubmit={(event) => { sendMessage(event) }} className={styles.messageField__messageInput}>
          <input type="text" placeholder="message" value={message} onChange={(event) => { setMessage(event.target.value) }} />
          <button type="submit"><BiSend /></button>
        </form>
      }

    </div>
  )
}