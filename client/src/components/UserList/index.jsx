import { useEffect, useState } from "react";
import { useUser } from "../../providers/User";
import UserListCard from "../UserListCard";

import styles from "./styles.module.css"



export default function UserList() {

    const apiUrl = process.env.REACT_APP_API_URL
    const[users,setUsers] = useState([]);

    const {user,setUser}= useUser();

    useEffect(() => {
        
        fetch(`${apiUrl}/getUsers`).then((resp) => resp.json()).then((data) => {
            setUsers([])
            data.data.forEach((userData) => {
                if(userData.id != user.id )
                setUsers(current => [...current, <UserListCard key={userData.id}  userData={userData} />])
            })
        }).catch((err) => { console.log(err) })

    }, []);



    return (
        <div className={styles.listContainer}>
            <ul>
            {users}
            </ul>  
        </div>
    

    );
}