import styles from "./Navbar.module.css";
import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.noUnderline}>
                <span className={styles.logoText}>
                    R'Lost
                </span>
                <span className={styles.subLogoText}>
                    UCR's Complete Lost & Found Solution
                </span>
            </Link>

            <div className={styles.subItemsHolder}>
                <Link to="/lost" className={styles.navbarItem}>
                    Lost Item
                </Link>

                <Link to="/found" className={styles.navbarItem}>
                    Found Item
                </Link>
                <Link to="/profile" className={styles.navbarItem}>
                    Profile
                </Link>
            </div>
        </nav>
    )
}

export default Navbar