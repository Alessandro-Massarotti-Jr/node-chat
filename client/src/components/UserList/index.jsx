import { useEffect, useState } from "react";
import { useUser } from "../../providers/User";
import UserListCard from "../UserListCard";

import { BsArrowLeftRight } from "react-icons/bs"

import styles from "./styles.module.css"



export default function UserList() {

    const apiUrl = process.env.REACT_APP_API_URL
    const[users,setUsers] = useState([]);

    const[showMobiileNav,setShowMobileNav] = useState(false);

    const {user,setUser}= useUser();

    function handleShowMobileNav(){
        if(showMobiileNav){
            setShowMobileNav(false)
        }else{
            setShowMobileNav(true)
        }
    }

    useEffect(() => {
        
        fetch(`${apiUrl}/getUsers`).then((resp) => resp.json()).then((data) => {
            setUsers([])
            data.data.forEach((userData) => {
                if(userData.id != user.id )
                setUsers(current => [...current, <UserListCard key={userData.id}  userData={userData} setNav={setShowMobileNav}  />])
            })
        }).catch((err) => { console.log(err) })

    }, []);



    return (<>
        <div className={styles.listContainer}>
            <ul>
            {users}
            </ul>  
        </div>

          

        <div className={`${styles.listContainer__mobile} ${showMobiileNav ? styles.active : ''}`}>
            <ul>
            {users}
            </ul>  
            <div onClick={handleShowMobileNav} className={styles.listContainer__mobile__control}>
               <BsArrowLeftRight/>
            </div>
        </div>
        </>

    );
}