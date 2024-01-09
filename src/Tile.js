const Tile = ({ style, char }) => {
  return (
    <div
      className={`tile ${style}`}
    >
      {char}
    </div>
  );
};

export default Tile;
