import styles from "./App.module.css";
import Welcome from './pages/Welcome';
import Homescreen from './Homescreen';
import Lost from './pages/Lost';
import Found from './pages/Found';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route, Routes} from "react-router";

function App(){
    return (
        <div className={styles.app}>
            <Navbar />
            <Homescreen />
            <div className={styles.main}>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/Lost" element={<Lost />} />
                    <Route path="/Found" element={<Found />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App;