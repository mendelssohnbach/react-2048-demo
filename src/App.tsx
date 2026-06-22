import Board from './components/Board';

type Board = number[][];

const initialBoard: Board = [
  [0, 0, 2, 0],
  [0, 4, 0, 0],
  [0, 0, 0, 8],
  [2, 0, 0, 0],
];

function App() {
  return (
    <div>
      <h1>2048</h1>
      <Board board={initialBoard} />
    </div>
  );
}

export default App;
