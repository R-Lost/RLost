import './Homescreen.css';

const UNIVERSITY_NAME = "{Name of University}"; 

function Homescreen() {
  return (
    <div className="homescreen">
      <h1>{UNIVERSITY_NAME}'s lost and found</h1>
      <p> Did you find or lose something on campus? You're at the right spot!</p>

        <button className="button-lost" onClick={() => alert ("Oh no! You lost an item!")}>
          <img src="" alt="Lost an item?"/>
        </button>

        <button className="button-found" onClick={() => alert("Thank you for reporting it :D")}>
          <img src="" alt="Found an item?"/>
        </button>
    </div>
  )
}

export default Homescreen;