import Tile from './Tile';

type Board = number[][];

interface BoardProps {
  board: Board;
}

function Board({ board }: BoardProps) {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            value={value}
          />
        )),
      )}
    </div>
  );
}

export default Board;
