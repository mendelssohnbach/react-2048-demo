import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { createInitialBoard } from './utils/gameLogic';

function App() {
  const [board, setBoard] = useState(() => createInitialBoard());
  const [score, setScore] = useState<number>(0);

  const handleRestart = () => {
    setBoard(createInitialBoard());
    setScore(0);
  };

  return (
    <div className="game-container">
      <h1>2048</h1>
      <p>スコア：{score}</p>
      <button onClick={handleRestart}>リスタート</button>
      <Board board={board} />
    </div>
  );
}

export default App;
