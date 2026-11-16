import './Homescreen.css';
import { useNavigate } from 'react-router';
import {useEffect, useRef} from "react";
import {animIn} from "../utils/animText.ts";

const UNIVERSITY_NAME = "University of California, Riverside";

function Homescreen() {
  const buttonsRef1 = useRef<HTMLButtonElement>(null);
  const buttonsRef2 = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
      if (buttonsRef1.current)
          animIn(buttonsRef1.current, 400, 0.8)
      if (buttonsRef2.current)
          animIn(buttonsRef2.current, 400, 0.8)
  }, [])

  return (
    <div className="homescreen">
      <h1>{UNIVERSITY_NAME}'s Lost & Found</h1>
      <p> Did you find or lose something on campus? You're at the right spot!</p>
      <p> Use the buttons below or give a description of your lost item in the search bar up top.</p>

        <button ref={buttonsRef1} className="button-lost" onClick={() => navigate('/Lost')}>
          Lost an item?
        </button>

        <button ref={buttonsRef2} className="button-found" onClick={() => navigate('/Found')}>
          Found an item?
        </button>
    </div>
  )
}

export default Homescreen;