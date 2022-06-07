import styles from "./styles.module.css"
import InputText from "../Form/InputText/index"
import { FiArrowRight} from "react-icons/fi"
import { Link } from 'react-router-dom';

export default function LoginForm() {

    return (
        <div className={styles.formContainer}>
            <form className={styles.loginForm} method="POST">
                <InputText name="Email" type="email" required={true} />
                <InputText name="Password" type="password" required={true} />
                <button className={styles.loginForm__submitButton} type="submit">Login</button>
            </form>
            <p className={styles.registerLink}><Link to="/register">Register here <FiArrowRight/></Link></p>    
        </div>
         
    )
}