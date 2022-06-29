import styles from "./styles.module.css"

export default function Message({user,message}){
   return(
       <div className={`${styles.message}  ${styles.active}`}>
           <p>{message}</p>
       </div>
   );    
}