import styles from "./styles.module.css"

export default function ({ name, email }) {
    return (
        <li className={styles.userCard}>
            <div>
                <h3>{name}</h3>
                <p>{email}</p>
            </div>
        </li>
    );
}