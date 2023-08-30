import "./newGameModal.css";
const NewGameModal = ({ easyMode, mediumMode, hardMode }) => {
  return (
    <div className="new-game-modal">
      <div className="new-game-title">
        Welcome to the Poke Game
        <img
          src="https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
          alt="pokebola"
        />
      </div>
      <div>Select Difficulty : </div>
      <div className="buttons">
        <button onClick={easyMode}>Easy</button>
        <button onClick={mediumMode}>Medium</button>
        <button onClick={hardMode}>Hard</button>
      </div>
    </div>
  );
};
export default NewGameModal;
