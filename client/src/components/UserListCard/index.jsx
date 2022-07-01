import styles from "./styles.module.css"
import { ImUser } from "react-icons/im"
import { useChat } from "../../providers/Chat";

export default function ({ userData }) {

    const { setChat } = useChat();

    function handleChatChange(){
        const chatData = {
            userName:userData.name,
            userId:userData.id,
            userEmail:userData.email
        }
        setChat(chatData);
    }

    return (
        <li onClick={handleChatChange} className={styles.userCard}>
            <div className={styles.userCard__icon}>
                <ImUser/>
            </div>
            <div className={styles.userCard__text}>
                <h3>{userData.name}</h3>
                <p>{userData.email}</p>
            </div>
        </li>
    );
}