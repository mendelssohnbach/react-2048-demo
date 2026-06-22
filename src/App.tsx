import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import {
  addRandomTile,
  createInitialBoard,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  type Board as BoardType,
  type MoveResult,
} from './utils/gameLogic';

function App() {
  const [board, setBoard] = useState(() => createInitialBoard());
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const moves: Record<string, (board: BoardType) => MoveResult> = {
      ArrowLeft: moveLeft,
      ArrowRight: moveRight,
      ArrowUp: moveUp,
      ArrowDown: moveDown,
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      const moveFn = moves[e.key];
      if (!moveFn) return;

      e.preventDefault();
      const result = moveFn(board);
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
