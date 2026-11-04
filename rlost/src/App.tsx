import styles from "./App.module.css";
import Profile from './pages/Profile';
import Homescreen from './pages/Homescreen';
import Lost from './pages/Lost';
import Found from './pages/Found';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route, Routes} from "react-router";
import WaitingAI from "./pages/WaitingAI.tsx";

function App(){
    return (
        <div className={styles.app}>
            <Navbar />
            <div className={styles.main}>
                <Routes>
                    <Route path="/" element={<Homescreen />} />
                    <Route path="/lost" element={<Lost />} />
                    <Route path="/found" element={<Found />} />
                    <Route path="/loading" element={<WaitingAI />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App;