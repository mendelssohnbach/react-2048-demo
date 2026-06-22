import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import { addRandomTile, createInitialBoard, moveLeft, moveRight } from './utils/gameLogic';

function App() {
  const [board, setBoard] = useState(() => createInitialBoard());
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let result = null;

      if (e.key === 'ArrowLeft') result = moveLeft(board);
      if (e.key === 'ArrowRight') result = moveRight(board);

      if (!result) return;

      e.preventDefault();
      const newBoard = addRandomTile(result.board);
      setBoard(newBoard);
      setScore((prev) => prev + result.gained);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board]);

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
