import { useNavigate } from "react-router-dom"
import RegisterForm from "../components/RegisterForm";
import FormContainer from "../components/FormContainer";
import FormBanner from "../components/FormBanner";
import styles from "./login.module.css"

export default function Login(){
    let navigate = useNavigate();
    navigate('/')
    return(
    <div className={styles.login}>
        <FormBanner/>
        <FormContainer>
           <RegisterForm/>
        </FormContainer>
    </div>
    )
}