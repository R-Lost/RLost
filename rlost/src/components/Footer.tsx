import styles from "./Footer.module.css";
import {Link} from "react-router";

const Footer = () => {
    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.logoText}>
                <span>
                    @2026 R'Lost
                </span>
            </Link>
        </nav>
    )
}

export default Footer