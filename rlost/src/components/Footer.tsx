import styles from "./Footer.module.css";
import {Link} from "react-router";

const Footer = () => {
    return (
        <nav className={styles.nav}>
            <Link to="/">
                <span className={styles.logoText}>
                    R'Lost
                </span>
            </Link>
        </nav>
    )
}

export default Footer