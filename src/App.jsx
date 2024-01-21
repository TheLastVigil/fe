import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

function App() {
  const [current, setCurrent] = useState({});
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    getRandomCharecter();
  }, []);

  const getRandomCharecter = () => {
    fetch("http://localhost:3000/random")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.name);
        setCurrent(data);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    if (!userInput) {
      setError("Please enter something");
      return;
    }
    if (userInput.toLowerCase() === current.name.toLowerCase()) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    setError("");
    getRandomCharecter();
    setUserInput("");
  };

  return (
    <div className="wrapper">
      {current && (
        <div className="container">
          <img src={current.image} />
        </div>
      )}
      <div className="column">
        <div className="row">
          <div className="gap">
            <input
              type="text"
              value={userInput}
              placeholder="what is my name?"
              onChange={(e) => setUserInput(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
          </div>
          <button onClick={handleClick}>submit</button>
        </div>
        <p>Your score is: {score}</p>
      </div>
    </div>
  );
}

export default App;
