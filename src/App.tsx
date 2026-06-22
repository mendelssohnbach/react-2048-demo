interface TileProps {
  value: number;
}

function Tile({ value }: TileProps) {
  return <div style={{ border: '1px solid black', padding: '10px', margin: '5px' }}>{value}</div>;
}

export default function App() {
  return (
    <div>
      <h1>2048</h1>
      <Tile value={2} />
      <Tile value={4} />
      <Tile value={8} />
    </div>
  );
}
