import chatImage from "../../assets/img/chat.jpg"
import styles from "./styles.module.css"

export default function FormBanner(){
    return(
        <div className={styles.container}>
          <div className={styles.banner}>
            <img src={chatImage} alt="chat" />
          </div>
        </div>     
    )
}