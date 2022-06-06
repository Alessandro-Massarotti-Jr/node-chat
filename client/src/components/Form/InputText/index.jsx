import styles from "./styles.module.css"
import { useState } from "react"

export default function InputText({name,type,required }) {

    const [inputActive,setInputActive] = useState(" ")



    function disableInput(inputValue){
         if(!inputValue){
            setInputActive("")
         }
         else{
            setInputActive("active")
         } 
    }

    return (
        <div className={styles.loginForm__inputContainer + ' ' + styles[inputActive]}>
            <label className={styles.loginForm__inputTypeTextLabel} htmlFor={name}>{name}</label>
            <input onChange={(event) => { disableInput(event.target.value) }} onClick={() => { setInputActive("active") }} className={styles.loginForm__inputTypeText} name={name} type={type}  required={required}/>
        </div>
    )
}