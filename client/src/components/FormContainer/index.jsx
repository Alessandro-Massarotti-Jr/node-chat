import styles from "./styles.module.css"

export default function FormContainer({children}){
    return(
        <div className={styles.formContainer}>
            {children}
        </div>
    )
}