import "./newGameModal.css";
const GameOverModal = ({ score, restart, highScore, quit }) => {
  return (
    <div className="gameover-modal">
      <h1>Game Over your score is {score}</h1>
      <button onClick={restart}>Restart the game</button>
      <button onClick={quit}>Quit Game</button>
      <h1>Your record is {highScore}</h1>
    </div>
  );
};
export default GameOverModal;
