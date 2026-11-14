import styles from "./App.module.css";
import Homescreen from './pages/Homescreen';
import Lost from './pages/Lost';
import Found from './pages/Found';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route, Routes} from "react-router";
import WaitingAI from "./pages/WaitingAI.tsx";
import Searchbar from './components/Searchbar';

function App(){
    return (
        <div className={styles.app}>
            <header className={styles.topBars}>
                <Navbar />
                <Searchbar />
            </header>
            <div className={styles.main}>
                <Routes>
                    <Route path="/" element={<Homescreen />} />
                    <Route path="/lost" element={<Lost />} />
                    <Route path="/found" element={<Found />} />
                    <Route path="/loading" element={<WaitingAI />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App;