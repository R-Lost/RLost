import styles from "./Navbar.module.css";
import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link to="/">
                <span className={styles.logoText}>
                    R'Lost
                </span>
            </Link>

            <div className={styles.subItemsHolder}>
                <Link to="/lost" className={styles.navbarItem}>
                    Lost Item
                </Link>

                <Link to="/found" className={styles.navbarItem}>
                    Found Item
                </Link>
            </div>
        </nav>
    )
}

export default Navbar