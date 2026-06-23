import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import {
  addRandomTile,
  boardsEqual,
  createInitialBoard,
  isGameOver,
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
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const moves: Record<string, (board: BoardType) => MoveResult> = {
      ArrowLeft: moveLeft,
      ArrowRight: moveRight,
      ArrowUp: moveUp,
      ArrowDown: moveDown,
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      const moveFn = moves[e.key];
      if (!moveFn) return;

      e.preventDefault();
      const result = moveFn(board);

      if (boardsEqual(board, result.board)) return;

      const newBoard = addRandomTile(result.board);
      setBoard(newBoard);
      setScore((prev) => prev + result.gained);

      if (isGameOver(newBoard)) {
        setGameOver(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board, gameOver]);

  const handleRestart = () => {
    setBoard(createInitialBoard());
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>2048</h1>
      <div className="score-box">
        <div className="score-label">
          <div>{score}</div>
        </div>
      </div>
      <button onClick={handleRestart}>リスタート</button>
      {gameOver && (
        <div className="game-over">
          <p>ゲームオーバー！</p>
        </div>
      )}
      <Board board={board} />
    </div>
  );
}

export default App;
