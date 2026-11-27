import styles from "./SubNavBar.module.css";
import {Link, useLocation} from "react-router";
import Searchbar from "./Searchbar.tsx";

const UNIVERSITY_NAME = "University of California, Riverside";

function SubNavBar() {
    const { pathname } = useLocation();

    return (
        <div className={styles.parent}>
            {pathname == "/" && <h1 className={styles.infoTextHeading}>{UNIVERSITY_NAME}'s Lost & Found</h1>}
            {pathname == "/" && <p className={styles.infoTextSubHeading}> Did you find or lose something on campus? You're at the right spot!</p>}

            <div className={styles.subItemsHolder}>
                <div className={styles.reportButtons}>
                    <Link to="/search" className={styles.navbarItem}>
                        Report a Lost Item
                    </Link>

                    <Link to="/found/report" className={styles.navbarItem}>
                        Report a Found Item
                    </Link>
                </div>

                <Searchbar />
            </div>
        </div>
    )
}

export default SubNavBar;