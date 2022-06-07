import { useEffect, useState } from "react";
import UserListCard from "../UserListCard";

import styles from "./styles.module.css"



export default function UserList() {

    const apiUrl = process.env.REACT_APP_API_URL
    const[users,setUsers] = useState([]);

    useEffect(() => {
        
        fetch(`${apiUrl}/getUsers`).then((resp) => resp.json()).then((data) => {
            setUsers([])
            data.data.forEach((user) => {
                setUsers(current => [...current, <UserListCard key={user.id} name={user.name} email={user.email} />])
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