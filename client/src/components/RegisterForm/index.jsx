import styles from "./styles.module.css"
import InputText from "../Form/InputText"
import { FiArrowRight} from "react-icons/fi"
import { Link } from 'react-router-dom';
import Loading from "../Loading";
import { useState } from "react";

export default function RefisterForm(){

    const [loading,setLoading] = useState(false);


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState(''); 
    const [name,setName] = useState('');

    async function register(event){
        event.preventDefault();
        setLoading(true);
        var data={
            email: email,
            password: password,
            name: name
        }

        var string1 = JSON.stringify(data);

        var parsed = JSON.parse(string1);  

        const apiUrl = process.env.REACT_APP_API_URL;

        const request = await fetch(apiUrl+'/createUser',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:string1
        })
       const dataJson = await request.json();
       console.log(dataJson);
       setLoading(false);
    }

    return (
        <div className={styles.formContainer}>
            {loading && <Loading/> }
            <form onSubmit={(event)=>{register(event)}} className={styles.loginForm} method="POST">
                <InputText name="Name" type="text" value={name} setValue={setName} required={true} />
                <InputText name="Email" type="email" value={email} setValue={setEmail} required={true} />
                <InputText name="Password" type="password" value={password} setValue={setPassword} required={true} />
                <button  className={styles.loginForm__submitButton} type="submit">Register</button>
            </form>
            <p className={styles.loginLink}><Link to="/login">Login here <FiArrowRight/></Link></p>
        </div>
    )

}