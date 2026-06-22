import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>カウンター</h1>
      <Counter />
    </div>
  );
}

export default App;
