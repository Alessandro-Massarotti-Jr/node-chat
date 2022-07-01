import { useUser } from "../../../providers/User";
import { useChat } from "../../../providers/Chat";
import styles from "./styles.module.css"

export default function Message({sender,receiver,message}){

    const { user, setUser } = useUser();
    const { chat, setChat } = useChat();

    if(user.id == sender && chat.userId == receiver){
        return(
            <div className={`${styles.message}  ${sender==user.id ? styles.active : ''}`}>
                <p>{message}</p>
            </div>
        );    
    }else if(user.id == receiver && chat.userId == sender){
        return(
            <div className={`${styles.message}  ${sender==user.id ? styles.active : ''}`}>
                <p>{message}</p>
            </div>
        );    
    }
  
}