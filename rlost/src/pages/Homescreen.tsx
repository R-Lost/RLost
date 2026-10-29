import './Homescreen.css';
import { useNavigate } from 'react-router';

const UNIVERSITY_NAME = "{Name of University}"; 

function Homescreen() {
  const navigate = useNavigate();
  return (
    <div className="homescreen">
      <h1>{UNIVERSITY_NAME}'s lost and found</h1>
      <p> Did you find or lose something on campus? You're at the right spot!</p>

        <button className="button-lost" onClick={() => navigate('/Lost')}>
          <img src="" alt="Lost an item?"/>
        </button>

        <button className="button-found" onClick={() => navigate('/Found')}>
          <img src="" alt="Found an item?"/>
        </button>
    </div>
  )
}

export default Homescreen;