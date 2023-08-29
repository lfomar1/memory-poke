import "./App.css";
import { useFetch } from "./components/useFetch";
import { useEffect, useState } from "react";
import GameOverModal from "./components/GameOverModal";
import NewGameModal from "./components/NewGameModal";

function App() {
  const [limit, setLimit] = useState(6);
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
  );

  // Fetch data using the custom useFetch hook
  const { data, loading } = useFetch(url);

  const [arr, setArr] = useState([]);
  const [score, setScore] = useState(0);
  const [isNewGame, setNewGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [shuffledData, setShuffledData] = useState([]); // Shuffled data array

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }
  });
  const imgHandler = (url) => {
    setShuffledData(shuffleArray(shuffledData));
    if (!arr.includes(url)) {
      const newArr = [...arr, url];
      setArr(newArr);
      console.log(newArr);
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("highScore", newScore);
      }
    } else setIsGameOver(true);
  };

  const restartGameHandler = () => {
    setScore(0);
    setIsGameOver(false);
    setArr([]);
  };

  useEffect(() => {
    setNewGame(true);
  }, []);

  const quitGame = () => {
    setNewGame(true);
    setIsGameOver(false);
    setScore(0);
    setArr([]);
    setShuffledData(shuffleArray(data?.results || []));
  };

  const modeHandler = (newLimit) => {
    setNewGame(false);
    setLimit(newLimit);
    setUrl(`https://pokeapi.co/api/v2/pokemon?limit=${newLimit}&offset=0`);
  };

  useEffect(() => {
    setShuffledData(data?.results || []);
  }, [data]);

  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  return (
    <div>
      {isNewGame ? (
        <div>
          <NewGameModal
            easyMode={() => modeHandler(6)}
            mediumMode={() => modeHandler(10)}
            hardMode={() => modeHandler(16)}
          />
        </div>
      ) : (
        <div>
          {isGameOver && (
            <GameOverModal
              score={score}
              restart={restartGameHandler}
              highScore={highScore}
              quit={quitGame}
            />
          )}

          {!isGameOver && (
            <ul className="game-board">
              {loading && <p>loading...</p>}
              {shuffledData.map((pokemon) => (
                <li key={pokemon.url} className="cards">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(
                      pokemon.url
                    )}.png`}
                    alt={pokemon.name}
                    onClick={() => {
                      imgHandler(pokemon.url);
                    }}
                  />
                  <div className="pokemon-name">{pokemon.name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function getPokemonIdFromUrl(url) {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
}
export default App;
