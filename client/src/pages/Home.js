import {Navigate} from "react-router-dom";
import MessageField from "../components/MessageField";
import UserList from "../components/UserList";
import styles from "./home.module.css"


export default function Home(){
  
  
  
   

    return (
    <div className={styles.home}>
    {/* <Navigate to="/login" replace={true} /> */}
     <UserList/>
     <MessageField/>
    </div>

    );
}