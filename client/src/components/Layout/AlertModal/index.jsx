import styles from "./styles.module.css"

export default function AlertModal({title,text}){
    return(
        <div className={styles.modalContainer}>
             <div className={styles.modalCard}>
                 <strong className={styles.modalCard__title}>{title}</strong>
                 <span className={styles.modalCard__text}>{text}</span>
             </div>
        </div>
    );
}