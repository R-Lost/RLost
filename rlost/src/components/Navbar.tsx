import styles from "./Navbar.module.css";
import {Link} from "react-router";
import logoPic from "../assets/logo.png"

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.noUnderline}>
                <img src={logoPic} alt="User profile" width={105} className={styles.logoText}/>
                <span className={styles.subLogoText}>
                    UCR Campus-Wide Lost & Found System
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