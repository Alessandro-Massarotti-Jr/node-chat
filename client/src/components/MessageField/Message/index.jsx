import { useUser } from "../../../providers/User";
import styles from "./styles.module.css"

export default function Message({sender,receiver,message}){

    const {user, setUser} = useUser();

   return(
       <div className={`${styles.message}  ${sender==user.id ? styles.active : ''}`}>
           <p>{message}</p>
       </div>
   );    
}