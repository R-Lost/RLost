import styles from "./App.module.css";
import Profile from './pages/Profile';
import Homescreen from './pages/Homescreen';
import Lost from './pages/Lost';
import Found from './pages/Found';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route, Routes} from "react-router";
import WaitingAI from "./pages/WaitingAI.tsx";
import Searchbar from './components/Searchbar';
import SearchResults from './pages/SearchResults';
import { Navigate } from "react-router";

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
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/search/results" element={<SearchResults />} />
                    <Route path="/lost/report" element={<Lost />} />
                    <Route path="/found/report" element={<Found />} />
                    <Route path="/loading" element={<WaitingAI />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/lost" element={<Navigate to="/search" replace />} />
                    <Route path="/found" element={<Navigate to="/found/report" replace />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App;