import './Homescreen.css';
import { useNavigate } from 'react-router';
import {useEffect, useRef} from "react";
import {animIn} from "../utils/animText.ts";
import Searchbar from "../components/Searchbar";

const UNIVERSITY_NAME = "University of California, Riverside";

function Homescreen() {
  const lostTagRef = useRef<HTMLDivElement>(null);
  const buttonsRef2 = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
      if (lostTagRef.current)
          animIn(lostTagRef.current, 400, 0.8)
      if (buttonsRef2.current)
          animIn(buttonsRef2.current, 400, 0.8)
  }, [])

  return (
    <div className="homescreen">
      <h1>{UNIVERSITY_NAME}'s Lost & Found</h1>
      <p> Did you find or lose something on campus? You're at the right spot!</p>
      <div className="homescreen-search">
        <div ref={lostTagRef} className="lost-tag">
          Lost an item?
        </div>
        <div className="homescreen-search-actions">
          <Searchbar variant="hero" />
          <button ref={buttonsRef2} className="button-found" onClick={() => navigate('/found/report')}>
            Found an item?
          </button>
        </div>
      </div>
    </div>
  )
}

export default Homescreen;