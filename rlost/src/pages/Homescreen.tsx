import instructionPic from "../assets/instructions.png";
import styles from "./Homescreen.module.css";

function Homescreen() {
    return (
        <div className={styles.parent}>
            <img src={instructionPic} alt="User profile" className={styles.instructionPic}/>
        </div>
    )
}

export default Homescreen;