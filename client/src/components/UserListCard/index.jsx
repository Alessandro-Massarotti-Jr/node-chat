import styles from "./styles.module.css"
import { ImUser } from "react-icons/im"

export default function ({ name, email }) {
    return (
        <li className={styles.userCard}>
            <div className={styles.userCard__icon}>
                <ImUser/>
            </div>
            <div className={styles.userCard__text}>
                <h3>{name}</h3>
                <p>{email}</p>
            </div>
        </li>
    );
}