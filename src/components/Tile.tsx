interface TileStyle {
  background: string;
  color: string;
}

const TILE_COLORS: Record<number, TileStyle> = {
  2: { background: '#eee4da', color: '#776e65' },
  4: { background: '#ede0c8', color: '#776e65' },
  8: { background: '#f2b179', color: '#f9f6f2' },
  16: { background: '#f59563', color: '#f9f6f2' },
  32: { background: '#f67c5f', color: '#f9f6f2' },
  64: { background: '#f65e3b', color: '#f9f6f2' },
  128: { background: '#edcf72', color: '#f9f6f2' },
  256: { background: '#edcc61', color: '#f9f6f2' },
  512: { background: '#edc850', color: '#f9f6f2' },
  1024: { background: '#edc53f', color: '#f9f6f2' },
  2048: { background: '#edc22e', color: '#f9f6f2' },
};

const DEFAULT_TILE_STYLE: TileStyle = { background: '#3c3a32', color: '#f9f6f2' };

interface TileProps {
  value: number;
}

function Tile({ value }: TileProps) {
  if (value === 0) return <div className="cell" />;

  const style = TILE_COLORS[value] ?? DEFAULT_TILE_STYLE;

  return (
    <div
      className="cell tile"
      style={{ backgroundColor: style.background, color: style.color }}
    >
      {value}
    </div>
  );
}

export default Tile;
