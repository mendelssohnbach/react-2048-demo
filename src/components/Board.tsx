type Board = number[][];

interface BoardProps {
  board: Board;
}

function Board({ board }: BoardProps) {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="cell"
          >
            {value !== 0 ? value : ''}
          </div>
        )),
      )}
    </div>
  );
}

export default Board;
