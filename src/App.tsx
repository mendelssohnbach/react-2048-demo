import { useState } from 'react';

function App() {
  const [tiles, setTiles] = useState<number[]>([2, 4, 8, 16]);

  const addTile = () => {
    setTiles([...tiles, 32]);
  };

  return (
    <div>
      <p>{tiles.join(', ')}</p>
      <button onClick={addTile}>タイルを追加</button>
    </div>
  );
}

export default App;
