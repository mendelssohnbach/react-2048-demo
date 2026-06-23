export interface MoveResult {
  board: Board;
  gained: number;
}

export type Board = number[][];

// 空のボード（4×4、すべて0）を作る
export function createEmptyBoard(): Board {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

// 空きマスにランダムで2か4を追加する
export function addRandomTile(board: Board): Board {
  const emptyCells: { r: number; c: number }[] = [];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) {
        emptyCells.push({ r, c });
      }
    }
  }

  if (emptyCells.length === 0) return board;

  const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newValue = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((row) => [...row]);
  newBoard[r][c] = newValue;

  return newBoard;
}

// ゲーム開始時のボードを作る（タイルを2つ追加）
export function createInitialBoard(): Board {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
}

// 1行を左にスライドして合体させる
function slideRowLeft(row: number[]): { row: number[]; gained: number } {
  // Step 1: 0を取り除く
  const tiles = row.filter((v) => v !== 0);

  let gained = 0;

  //  Step 2: 左から合体
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] === tiles[i + 1]) {
      tiles[i] *= 2;
      gained += tiles[i];
      tiles.splice(i + 1, 1);
    }
  }

  // Step 3: 右側を0で埋める
  while (tiles.length < 4) {
    tiles.push(0);
  }

  return { row: tiles, gained };
}

export function moveLeft(board: Board): MoveResult {
  let totalGained = 0;
  const newBoard = board.map((row) => {
    const { row: newRow, gained } = slideRowLeft(row);
    totalGained += gained;
    return newRow;
  });
  return { board: newBoard, gained: totalGained };
}

export function moveRight(board: Board): MoveResult {
  let totalGained = 0;
  const newBoard = board.map((row) => {
    const reversed = [...row].reverse();
    const { row: slid, gained } = slideRowLeft(reversed);
    totalGained += gained;
    return slid.reverse();
  });
  return { board: newBoard, gained: totalGained };
}

function transpose(board: Board): Board {
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
}

export function moveUp(board: Board): MoveResult {
  const transposed = transpose(board);
  const { board: moved, gained } = moveLeft(transposed);

  return { board: transpose(moved), gained };
}

export function moveDown(board: Board): MoveResult {
  const transposed = transpose(board);
  const { board: moved, gained } = moveRight(transposed);

  return { board: transpose(moved), gained };
}

export function isGameOver(board: Board): boolean {
  // 空きマスがあればまだ続けられる
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) return false;
    }
  }

  // 横方向に隣り合う同じ数字があれば続けられる
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === board[r][c + 1]) return false;
    }
  }

  // 縦方向に隣り合う同じ数字があれば続けられる
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === board[r + 1][c]) return false;
    }
  }

  return true;
}

export function boardsEqual(a: Board, b: Board): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}
