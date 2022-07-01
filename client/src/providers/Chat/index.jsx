import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react"

export const ChatContext = createContext({});

export const ChatProvider = ({children})=>{

    const [chat,setChat] = useState({});

    return(
        <ChatContext.Provider value={{chat,setChat}}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);