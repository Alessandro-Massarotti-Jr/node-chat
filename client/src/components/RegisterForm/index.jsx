import styles from "./styles.module.css"
import InputText from "../Form/InputText"

export default function RefisterForm(){
    return (
        <div className={styles.formContainer}>
            <form className={styles.loginForm} method="POST">
                <InputText name="Name" type="text" required={true} />
                <InputText name="Email" type="email" required={true} />
                <InputText name="Password" type="password" required={true} />
                <button className={styles.loginForm__submitButton} type="submit">Register</button>
            </form>
        </div>
    )

}