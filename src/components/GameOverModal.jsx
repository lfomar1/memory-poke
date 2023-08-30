import "./gameOverModal.css";
const GameOverModal = ({ score, restart, highScore, quit }) => {
  return (
    <div>
      <div className="gameover-modal">
        <div className="score">Score is {score} 🔥</div>
        <div className="record">Record is {highScore} 🏆</div>
        <div className="game-over-buttons">
          <button onClick={restart}>Restart</button>
          <button onClick={quit}>Quit</button>
        </div>
      </div>
    </div>
  );
};
export default GameOverModal;
