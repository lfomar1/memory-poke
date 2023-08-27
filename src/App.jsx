import "./App.css";
import { useFetch } from "./components/useFetch";
function App() {
  const { data } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0."
  );
  const imgHandler = (url) => {
    console.log(url);
  };
  return (
    <div>
      <ul>
        {data?.results.map((pokemon) => (
          <li key={pokemon.url}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(
                pokemon.url
              )}.png`}
              alt={pokemon.name}
              onClick={() => imgHandler(pokemon.url)}
            />
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function getPokemonIdFromUrl(url) {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
}
export default App;
