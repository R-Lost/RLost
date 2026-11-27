import styles from "./Navbar.module.css";
import {Link} from "react-router";
import logoPic from "../assets/logo.png"
import { AuthButton } from "../AuthButton";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.noUnderline}>
                <span className={styles.subLogoText}>
                    Things
                </span>
                <img src={logoPic} alt="User profile" width={105} className={styles.logoText}/>
                <span className={styles.subLogoText}>
                    , not gone.
                </span>
            </Link>

            <div className={styles.subItemsHolder}>
                <Link to="/search" className={styles.navbarItem}>
                    Find a Lost Item
                </Link>

                <Link to="/found/report" className={styles.navbarItem}>
                    Report a Found Item
                </Link>
                <AuthButton className={styles.navbarItem} />
            </div>
        </nav>
    )
}

export default Navbar