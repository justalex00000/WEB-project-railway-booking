export default function WagonSelector({ setWagon }) {
  return (
    <div>
      <h3>Оберіть вагон</h3>
      {[1, 2, 3].map((w) => (
        <button key={w} onClick={() => setWagon(w)}>
          Вагон {w}
        </button>
      ))}
    </div>
  );
}