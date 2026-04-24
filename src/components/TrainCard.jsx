export default function TrainCard({ train }) {
  return (
    <div>
      <h3>{train.number}</h3>
      <p>{train.route}</p>
      <p>{train.time}</p>
      <p>{train.duration}</p>
    </div>
  );
}