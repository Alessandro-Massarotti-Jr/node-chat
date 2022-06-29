import styles from "./styles.module.css"

import {TbLoader} from "react-icons/tb"

export default function Loading(){

    return(
        <div className={styles.loading}>
            <div className={styles.loading__icon}>
                <TbLoader/>
            </div>
        </div>
    );
}